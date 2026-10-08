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

    const worldTidesKey =
      process.env.WORLDTIDES_API_KEY;

    if (!worldTidesKey) {
      return NextResponse.json(
        {
          error:
            "Thiếu WORLDTIDES_API_KEY trong .env.local",
        },
        { status: 500 }
      );
    }

    // --------------------------------------------------
    // 1. WEATHER + UV - Open-Meteo
    // --------------------------------------------------

    const weatherUrl = new URL(
      "https://api.open-meteo.com/v1/forecast"
    );

    weatherUrl.searchParams.set(
      "latitude",
      String(lat)
    );

    weatherUrl.searchParams.set(
      "longitude",
      String(lon)
    );

    weatherUrl.searchParams.set(
      "current",
      [
        "temperature_2m",
        "relative_humidity_2m",
        "cloud_cover",
        "wind_speed_10m",
        "wind_direction_10m",
      ].join(",")
    );

    weatherUrl.searchParams.set(
      "hourly",
      "uv_index"
    );

    weatherUrl.searchParams.set(
      "forecast_days",
      "1"
    );

    weatherUrl.searchParams.set(
      "timezone",
      "auto"
    );

    // --------------------------------------------------
    // 2. THỦY TRIỀU - WorldTides
    // --------------------------------------------------

    const tideUrl = new URL(
      "https://www.worldtides.info/api/v3"
    );

    tideUrl.searchParams.set(
      "extremes",
      ""
    );

    tideUrl.searchParams.set(
      "lat",
      String(lat)
    );

    tideUrl.searchParams.set(
      "lon",
      String(lon)
    );

    tideUrl.searchParams.set(
      "key",
      worldTidesKey
    );

    tideUrl.searchParams.set(
      "days",
      "1"
    );

    // --------------------------------------------------
    // 3. GỌI 2 API SONG SONG
    // --------------------------------------------------

    const [
      weatherResponse,
      tideResponse,
    ] = await Promise.all([
      fetch(weatherUrl.toString(), {
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

    if (!weatherResponse.ok) {
      throw new Error(
        "Không lấy được dữ liệu thời tiết"
      );
    }

    if (!tideResponse.ok) {
      throw new Error(
        "Không lấy được dữ liệu thủy triều"
      );
    }

    const weatherData =
      await weatherResponse.json();

    const tideData =
      await tideResponse.json();

    // --------------------------------------------------
    // 4. UV HIỆN TẠI
    // --------------------------------------------------

    const times: string[] =
      weatherData.hourly?.time ?? [];

    const uvValues: number[] =
      weatherData.hourly?.uv_index ?? [];

    const now = new Date();

    let closestIndex = 0;
    let closestDifference = Infinity;

    times.forEach((time, index) => {
      const difference = Math.abs(
        new Date(time).getTime() -
          now.getTime()
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
    // 5. THỜI TIẾT HIỆN TẠI
    // --------------------------------------------------

    const current =
      weatherData.current ?? {};

    const weather = {
      temperature: Number(
        current.temperature_2m ?? 0
      ),

      humidity: Number(
        current.relative_humidity_2m ?? 0
      ),

      cloudCover: Number(
        current.cloud_cover ?? 0
      ),

      windSpeed: Number(
        current.wind_speed_10m ?? 0
      ),

      windDirection: Number(
        current.wind_direction_10m ?? 0
      ),
    };

    // --------------------------------------------------
    // 6. THỦY TRIỀU
    // --------------------------------------------------

    const extremes: TideExtreme[] =
      tideData.extremes ?? [];

    const nowUnix = Math.floor(
      Date.now() / 1000
    );

    const nextTide =
      extremes.find(
        (tide) => tide.dt > nowUnix
      ) ?? null;

    const previousTide =
      [...extremes]
        .reverse()
        .find(
          (tide) =>
            tide.dt <= nowUnix
        ) ?? null;

    // --------------------------------------------------
    // 7. RESPONSE
    // --------------------------------------------------

    return NextResponse.json({
      weather: {
        temperature:
          weather.temperature,

        humidity:
          weather.humidity,

        cloudCover:
          weather.cloudCover,

        windSpeed:
          weather.windSpeed,

        windDirection:
          weather.windDirection,
      },

      uv: {
        value: currentUV,

        level:
          getUVLevel(currentUV),

        time:
          times[closestIndex] ?? null,
      },

      tide: {
        previous:
          previousTide,

        next:
          nextTide,

        extremes,
      },

      timezone:
        weatherData.timezone ??
        "auto",

      updatedAt:
        new Date().toISOString(),
    });
  } catch (error) {
    console.error(
      "Ocean API error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Không thể lấy dữ liệu biển",
      },
      {
        status: 500,
      }
    );
  }
}

function getUVLevel(uv: number) {
  if (uv < 3) {
    return {
      label: "Thấp",
      description:
        "Ít nguy cơ từ tia UV",
    };
  }

  if (uv < 6) {
    return {
      label: "Vừa",
      description:
        "Nên bảo vệ da khi ở ngoài trời",
    };
  }

  if (uv < 8) {
    return {
      label: "Cao",
      description:
        "Nên hạn chế nắng trực tiếp",
    };
  }

  if (uv < 11) {
    return {
      label: "Rất cao",
      description:
        "Cần bảo vệ da nghiêm túc",
    };
  }

  return {
    label: "Cực cao",
    description:
      "Nên tránh nắng trực tiếp",
  };
}