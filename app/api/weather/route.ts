
import { NextResponse } from "next/server";

export async function GET(request : Request) {
  try {
    const { searchParams } = new URL(request.url);

    const latitude = searchParams.get("latitude");
    const longitude = searchParams.get("longitude");

    if (!latitude || !longitude) {
      return NextResponse.json(
        {
          error: "Thiếu latitude hoặc longitude",
        },
        { status: 400 }
      );
    }

    const url = new URL("https://api.open-meteo.com/v1/forecast");

    url.searchParams.set("latitude", latitude);
    url.searchParams.set("longitude", longitude);

    url.searchParams.set(
      "current",
      [
        "temperature_2m",
        "relative_humidity_2m",
        "apparent_temperature",
        "weather_code",
        "wind_speed_10m",
      ].join(",")
    );

    url.searchParams.set("timezone", "Asia/Bangkok");

    const response = await fetch(url.toString(), {
      next: {
        revalidate: 600,
      },
    });

    if (!response.ok) {
      throw new Error("Open-Meteo API error");
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Weather API error:", error);

    return NextResponse.json(
      {
        error: "Không thể lấy dữ liệu thời tiết",
      },
      { status: 500 }
    );
  }
}

