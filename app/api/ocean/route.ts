import { NextRequest, NextResponse } from "next/server";

type TideExtreme = {
  dt: number;
  date: string;
  type: "High" | "Low";
  height: number;
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const lat = Number(searchParams.get("lat"));
    const lon = Number(searchParams.get("lon"));

    if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
      return NextResponse.json(
        { error: "Tọa độ không hợp lệ" },
        { status: 400 }
      );
    }

    const worldTidesKey = process.env.WORLDTIDES_API_KEY;

    if (!worldTidesKey) {
      return NextResponse.json(
        {
          error: "Thiếu WORLDTIDES_API_KEY trong .env.local",
        },
        { status: 500 }
      );
    }

    // --------------------------------------------------
    // 1. UV INDEX - Open-Meteo
    // --------------------------------------------------

    const uvUrl = new URL(
      "https://api.open-meteo.com/v1/forecast"
    );

    uvUrl.searchParams.set("latitude", String(lat));
    uvUrl.searchParams.set("longitude", String(lon));
    uvUrl.searchParams.set("hourly", "uv_index");
    uvUrl.searchParams.set("forecast_days", "1");
    uvUrl.searchParams.set("timezone", "auto");

    // --------------------------------------------------
    // 2. THỦY TRIỀU - WorldTides
    // --------------------------------------------------

    const tideUrl = new URL(
      "https://www.worldtides.info/api/v3"
    );

    tideUrl.searchParams.set("extremes", "");
    tideUrl.searchParams.set("lat", String(lat));
    tideUrl.searchParams.set("lon", String(lon));
    tideUrl.searchParams.set("key", worldTidesKey);
    tideUrl.searchParams.set("days", "1");

    const [uvResponse, tideResponse] = await Promise.all([
      fetch(uvUrl.toString(), {
        next: {
          revalidate: 1800,
        },
      }),

      fetch(tideUrl.toString(), {
        next: {
          revalidate: 1800,
        },
      }),
    ]);

    if (!uvResponse.ok) {
      throw new Error("Không lấy được dữ liệu UV");
    }

    if (!tideResponse.ok) {
      throw new Error("Không lấy được dữ liệu thủy triều");
    }

    const uvData = await uvResponse.json();
    const tideData = await tideResponse.json();

    // --------------------------------------------------
    // UV hiện tại
    // --------------------------------------------------

    const times: string[] = uvData.hourly?.time ?? [];
    const uvValues: number[] = uvData.hourly?.uv_index ?? [];

    const now = new Date();

    let closestIndex = 0;
    let closestDifference = Infinity;

    times.forEach((time, index) => {
      const difference = Math.abs(
        new Date(time).getTime() - now.getTime()
      );

      if (difference < closestDifference) {
        closestDifference = difference;
        closestIndex = index;
      }
    });

    const currentUV = Number(
      uvValues[closestIndex] ?? 0
    );

    // --------------------------------------------------
    // Thủy triều
    // --------------------------------------------------

    const extremes: TideExtreme[] = tideData.extremes ?? [];

    const nowUnix = Math.floor(Date.now() / 1000);

    const nextTide =
      extremes.find((tide) => tide.dt > nowUnix) ?? null;

    const previousTide =
      [...extremes]
        .reverse()
        .find((tide) => tide.dt <= nowUnix) ?? null;

    return NextResponse.json({
      uv: {
        value: currentUV,
        level: getUVLevel(currentUV),
        time: times[closestIndex] ?? null,
      },

      tide: {
        previous: previousTide,
        next: nextTide,
        extremes,
      },

      timezone: uvData.timezone ?? "auto",

      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Ocean API error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Không thể lấy dữ liệu biển",
      },
      { status: 500 }
    );
  }
}

function getUVLevel(uv: number) {
  if (uv < 3) {
    return {
      label: "Thấp",
      description: "Ít nguy cơ từ tia UV",
    };
  }

  if (uv < 6) {
    return {
      label: "Vừa",
      description: "Nên bảo vệ da khi ở ngoài trời",
    };
  }

  if (uv < 8) {
    return {
      label: "Cao",
      description: "Nên hạn chế nắng trực tiếp",
    };
  }

  if (uv < 11) {
    return {
      label: "Rất cao",
      description: "Cần bảo vệ da nghiêm túc",
    };
  }

  return {
    label: "Cực cao",
    description: "Nên tránh nắng trực tiếp",
  };
}