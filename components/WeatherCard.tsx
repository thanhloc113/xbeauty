
"use client";

import { useEffect, useState, type ChangeEvent } from "react";

/* =========================================================
   TYPES
========================================================= */

type City = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
};

type WeatherInfo = {
  icon: string;
  title: string;
};

type WeatherData = {
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  weather_code: number;
  wind_speed_10m: number;
  time: string;
};

type WeatherApiResponse = {
  current: WeatherData;
};

/* =========================================================
   CITIES
========================================================= */

const CITIES: City[] = [
  {
    id: "ho-chi-minh",
    name: "Hồ Chí Minh",
    latitude: 10.77,
    longitude: 106.70,
  },
  {
    id: "quang-ninh",
    name: "Quảng Ninh",
    latitude: 20.95,
    longitude: 107.08,
  },
  {
    id: "hai-phong",
    name: "Hải Phòng",
    latitude: 20.86,
    longitude: 106.68,
  },
  {
    id: "thai-binh",
    name: "Thái Bình",
    latitude: 20.44,
    longitude: 106.34,
  },
  {
    id: "nam-dinh",
    name: "Nam Định",
    latitude: 20.25,
    longitude: 106.18,
  },
  {
    id: "ninh-binh",
    name: "Ninh Bình",
    latitude: 20.08,
    longitude: 106.00,
  },
  {
    id: "thanh-hoa",
    name: "Thanh Hóa",
    latitude: 19.76,
    longitude: 105.89,
  },
  {
    id: "nghe-an",
    name: "Nghệ An",
    latitude: 18.80,
    longitude: 105.72,
  },
  {
    id: "ha-tinh",
    name: "Hà Tĩnh",
    latitude: 18.34,
    longitude: 105.90,
  },
  {
    id: "quang-binh",
    name: "Quảng Bình",
    latitude: 17.47,
    longitude: 106.62,
  },
  {
    id: "quang-tri",
    name: "Quảng Trị",
    latitude: 17.47,
    longitude: 107.19,
  },
  {
    id: "hue",
    name: "Huế",
    latitude: 16.47,
    longitude: 107.59,
  },
  {
    id: "da-nang",
    name: "Đà Nẵng",
    latitude: 16.05,
    longitude: 108.20,
  },
  {
    id: "quang-nam",
    name: "Quảng Nam",
    latitude: 15.88,
    longitude: 108.33,
  },
  {
    id: "quang-ngai",
    name: "Quảng Ngãi",
    latitude: 15.12,
    longitude: 108.80,
  },
  {
    id: "binh-dinh",
    name: "Bình Định",
    latitude: 13.78,
    longitude: 109.22,
  },
  {
    id: "phu-yen",
    name: "Phú Yên",
    latitude: 13.10,
    longitude: 109.31,
  },
  {
    id: "khanh-hoa",
    name: "Khánh Hòa",
    latitude: 12.24,
    longitude: 109.20,
  },
  {
    id: "ninh-thuan",
    name: "Ninh Thuận",
    latitude: 11.56,
    longitude: 108.99,
  },
  {
    id: "binh-thuan",
    name: "Bình Thuận",
    latitude: 10.93,
    longitude: 108.10,
  },
  {
    id: "ba-ria-vung-tau",
    name: "Bà Rịa – Vũng Tàu",
    latitude: 10.35,
    longitude: 107.08,
  },
  {
    id: "tien-giang",
    name: "Tiền Giang",
    latitude: 10.36,
    longitude: 106.36,
  },
  {
    id: "ben-tre",
    name: "Bến Tre",
    latitude: 10.24,
    longitude: 106.38,
  },
  {
    id: "tra-vinh",
    name: "Trà Vinh",
    latitude: 9.93,
    longitude: 106.34,
  },
  {
    id: "soc-trang",
    name: "Sóc Trăng",
    latitude: 9.60,
    longitude: 105.98,
  },
  {
    id: "bac-lieu",
    name: "Bạc Liêu",
    latitude: 9.29,
    longitude: 105.72,
  },
  {
    id: "ca-mau",
    name: "Cà Mau",
    latitude: 9.18,
    longitude: 105.15,
  },
  {
    id: "kien-giang",
    name: "Kiên Giang",
    latitude: 10.01,
    longitude: 105.08,
  },
];

/* =========================================================
   WEATHER CODES
========================================================= */

const WEATHER_CODES: Record<number, WeatherInfo> = {
  0: {
    icon: "☀️",
    title: "Trời quang",
  },

  1: {
    icon: "🌤️",
    title: "Trời ít mây",
  },

  2: {
    icon: "⛅",
    title: "Mây rải rác",
  },

  3: {
    icon: "☁️",
    title: "Nhiều mây",
  },

  45: {
    icon: "🌫️",
    title: "Sương mù",
  },

  48: {
    icon: "🌫️",
    title: "Sương mù",
  },

  51: {
    icon: "🌦️",
    title: "Mưa phùn nhẹ",
  },

  53: {
    icon: "🌦️",
    title: "Mưa phùn",
  },

  55: {
    icon: "🌧️",
    title: "Mưa phùn dày",
  },

  61: {
    icon: "🌦️",
    title: "Mưa nhẹ",
  },

  63: {
    icon: "🌧️",
    title: "Mưa vừa",
  },

  65: {
    icon: "🌧️",
    title: "Mưa lớn",
  },

  71: {
    icon: "🌨️",
    title: "Tuyết nhẹ",
  },

  73: {
    icon: "🌨️",
    title: "Tuyết vừa",
  },

  75: {
    icon: "❄️",
    title: "Tuyết lớn",
  },

  80: {
    icon: "🌦️",
    title: "Mưa rào nhẹ",
  },

  81: {
    icon: "🌧️",
    title: "Mưa rào",
  },

  82: {
    icon: "⛈️",
    title: "Mưa rào lớn",
  },

  95: {
    icon: "⛈️",
    title: "Dông",
  },

  96: {
    icon: "⛈️",
    title: "Dông kèm mưa đá",
  },

  99: {
    icon: "⛈️",
    title: "Dông mạnh",
  },
};

/* =========================================================
   HELPERS
========================================================= */

function getWeatherInfo(code: number): WeatherInfo {
  return (
    WEATHER_CODES[code] ?? {
      icon: "🌤️",
      title: "Không xác định",
    }
  );
}

function formatTime(time: string): string {
  return time.slice(11, 16);
}

/* =========================================================
   COMPONENT
========================================================= */

export default function WeatherCard() {
  const [selectedCity, setSelectedCity] = useState<City>(
    CITIES[0]
  );

  const [weather, setWeather] =
    useState<WeatherData | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<string>("");

  /* =======================================================
     LOAD WEATHER
  ======================================================= */

  useEffect(() => {
    let cancelled = false;

    async function loadWeather(): Promise<void> {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams({
          latitude: String(selectedCity.latitude),
          longitude: String(selectedCity.longitude),
        });

        const response = await fetch(
          `/api/weather?${params.toString()}`
        );

        if (!response.ok) {
          throw new Error(
            `Weather API error: ${response.status}`
          );
        }

        const data =
          (await response.json()) as WeatherApiResponse;

        if (!cancelled) {
          setWeather(data.current);
        }
      } catch (error: unknown) {
        console.error("Weather error:", error);

        if (!cancelled) {
          setWeather(null);
          setError(
            "Không thể cập nhật dữ liệu thời tiết."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadWeather();

    return () => {
      cancelled = true;
    };
  }, [selectedCity]);

  /* =======================================================
     WEATHER INFO
  ======================================================= */

  const weatherInfo: WeatherInfo | null = weather
    ? getWeatherInfo(weather.weather_code)
    : null;

  /* =======================================================
     CITY CHANGE
  ======================================================= */

  function handleCityChange(
    event: ChangeEvent<HTMLSelectElement>
  ): void {
    const city = CITIES.find(
      (item: City) => item.id === event.target.value
    );

    if (city) {
      setSelectedCity(city);
    }
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section className="relative w-full max-w-xl overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#171522] via-[#21152c] to-[#30172e] p-5 text-white shadow-2xl sm:p-7">

      {/* Decorative glow */}

      <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-pink-500/20 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative">

        {/* Header */}

        <div className="flex items-start justify-between gap-4">

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/40">
              Thời tiết hiện tại
            </p>

            <div className="mt-2 flex items-center gap-2">

              <span className="text-sm text-white/50">
                📍
              </span>

              <h2 className="text-lg font-semibold sm:text-xl">
                {selectedCity.name}
              </h2>

            </div>
          </div>

          {/* City selector */}

          <select
            value={selectedCity.id}
            onChange={handleCityChange}
            className="max-w-[145px] cursor-pointer appearance-none rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs text-white outline-none backdrop-blur-md transition hover:bg-white/15 focus:border-white/20 sm:text-sm"
          >
            {CITIES.map((city: City) => (
              <option
                key={city.id}
                value={city.id}
                className="bg-[#21152c] text-white"
              >
                {city.name}
              </option>
            ))}
          </select>

        </div>

        {/* Main weather */}

        <div className="mt-10 text-center">

          {/* Loading */}

          {loading && (
            <div className="flex min-h-[230px] flex-col items-center justify-center">

              <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-white/70" />

              <p className="mt-4 text-sm text-white/40">
                Đang cập nhật thời tiết...
              </p>

            </div>
          )}

          {/* Error */}

          {!loading && error && (
            <div className="flex min-h-[230px] flex-col items-center justify-center">

              <div className="text-4xl">
                🌧️
              </div>

              <p className="mt-4 text-sm text-white/50">
                {error}
              </p>

            </div>
          )}

          {/* Weather */}

          {!loading && !error && weather && weatherInfo && (
            <>
              {/* Weather icon */}

              <div className="text-7xl drop-shadow-lg sm:text-8xl">
                {weatherInfo.icon}
              </div>

              {/* Temperature */}

              <div className="mt-5 flex items-start justify-center">

                <span className="text-7xl font-semibold tracking-[-0.06em] sm:text-8xl">
                  {Math.round(weather.temperature_2m)}
                </span>

                <span className="mt-2 text-2xl font-light text-white/40 sm:text-3xl">
                  °C
                </span>

              </div>

              {/* Description */}

              <p className="mt-2 text-base font-medium text-white/70">
                {weatherInfo.title}
              </p>

              {/* Feels like */}

              <p className="mt-1 text-sm text-white/40">
                Cảm giác như{" "}
                <span className="text-white/60">
                  {Math.round(
                    weather.apparent_temperature
                  )}
                  °C
                </span>
              </p>
            </>
          )}

        </div>

        {/* Statistics */}

        {!loading && !error && weather && (
          <>
            <div className="mt-9 grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-md">

              {/* Humidity */}

              <div className="px-2 py-4 text-center sm:px-4">

                <div className="text-lg">
                  💧
                </div>

                <p className="mt-1 text-[11px] uppercase tracking-wide text-white/35">
                  Độ ẩm
                </p>

                <p className="mt-1 text-sm font-semibold sm:text-base">
                  {weather.relative_humidity_2m}%
                </p>

              </div>

              {/* Wind */}

              <div className="px-2 py-4 text-center sm:px-4">

                <div className="text-lg">
                  💨
                </div>

                <p className="mt-1 text-[11px] uppercase tracking-wide text-white/35">
                  Gió
                </p>

                <p className="mt-1 text-sm font-semibold sm:text-base">
                  {Math.round(
                    weather.wind_speed_10m
                  )}

                  <span className="ml-1 text-xs font-normal text-white/40">
                    km/h
                  </span>
                </p>

              </div>

              {/* Temperature */}

              <div className="px-2 py-4 text-center sm:px-4">

                <div className="text-lg">
                  🌡️
                </div>

                <p className="mt-1 text-[11px] uppercase tracking-wide text-white/35">
                  Nhiệt độ
                </p>

                <p className="mt-1 text-sm font-semibold sm:text-base">
                  {Math.round(
                    weather.temperature_2m
                  )}
                  °C
                </p>

              </div>

            </div>

            {/* Update time */}

            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-white/30">

              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />

              <span>
                Cập nhật lúc{" "}
                {formatTime(weather.time)}
              </span>

            </div>
          </>
        )}

      </div>
    </section>
  );
}

