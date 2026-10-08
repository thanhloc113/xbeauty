"use client";

import { ListSeaUrl } from "@/data/products";
import { useEffect, useState } from "react";
import SeaImageSlider from "./SeaImageSlide";

const CITIES = [
 {
    id: "mui-dien",
    name: "Mũi Điện – Đại Lãnh",
    latitude: 12.8464,
    longitude: 109.4651,
  },
  {
    id: "vinh-hy",
    name: "Vĩnh Hy",
    latitude: 11.7139,
    longitude: 109.1917,
  },
  {
    id: "phan-thiet",
    name: "Phan Thiết",
    latitude: 10.9289,
    longitude: 108.1021,
  },

  {
    id: "phu-quoc",
    name: "Phú Quốc",
    latitude: 10.2899,
    longitude: 103.984,
  },
  {
    id: "con-dao",
    name: "Côn Đảo",
    latitude: 8.6833,
    longitude: 106.6000,
  },
  {
    id: "ha-tien",
    name: "Hà Tiên",
    latitude: 10.3833,
    longitude: 104.4833,
  },
  {
    id: "mui-ne",
    name: "Mũi Né",
    latitude: 10.9333,
    longitude: 108.2833,
  },

  {
    id: "ho-tram",
    name: "Hồ Tràm",
    latitude: 10.4690,
    longitude: 107.4408,
  },
  {
    id: "vung-tau",
    name: "Vũng Tàu",
    latitude: 10.3460,
    longitude: 107.0843,
  },
  {
    id: "binh-lap",
    name: "Bình Lập",
    latitude: 11.7750,
    longitude: 109.1900,
  },
  {
    id: "cam-ranh",
    name: "Cam Ranh",
    latitude: 11.9214,
    longitude: 109.1591,
  },
  {
    id: "nha-trang",
    name: "Nha Trang",
    latitude: 12.2388,
    longitude: 109.1967,
  },
  {
    id: "ninh-chu",
    name: "Ninh Chữ",
    latitude: 11.5650,
    longitude: 108.9780,
  },
  {
    id: "quy-nhon",
    name: "Quy Nhơn",
    latitude: 13.7765,
    longitude: 109.2237,
  },
  {
    id: "ky-co",
    name: "Kỳ Co",
    latitude: 13.8860,
    longitude: 109.3070,
  },
  {
    id: "ly-son",
    name: "Lý Sơn",
    latitude: 15.3820,
    longitude: 109.1180,
  },
  {
    id: "sa-huynh",
    name: "Sa Huỳnh",
    latitude: 14.7650,
    longitude: 109.0400,
  },
  {
    id: "hoi-an",
    name: "Hội An",
    latitude: 15.8801,
    longitude: 108.3380,
  },
  {
    id: "da-nang",
    name: "Đà Nẵng",
    latitude: 16.0544,
    longitude: 108.2022,
  },
  {
    id: "lang-co",
    name: "Lăng Cô",
    latitude: 16.3000,
    longitude: 108.0000,
  },
  {
    id: "thuan-an",
    name: "Thuận An",
    latitude: 16.5480,
    longitude: 107.6500,
  },
  {
    id: "cua-tung",
    name: "Cửa Tùng",
    latitude: 17.0000,
    longitude: 107.1000,
  },
  {
    id: "nhat-le",
    name: "Nhật Lệ",
    latitude: 17.4833,
    longitude: 106.6000,
  },
  {
    id: "cua-lo",
    name: "Cửa Lò",
    latitude: 18.8000,
    longitude: 105.7167,
  },
  {
    id: "sam-son",
    name: "Sầm Sơn",
    latitude: 19.7333,
    longitude: 105.9000,
  },
  {
    id: "hai-tien",
    name: "Hải Tiến",
    latitude: 19.9000,
    longitude: 105.9000,
  },
  {
    id: "cat-ba",
    name: "Cát Bà",
    latitude: 20.7278,
    longitude: 107.0482,
  },
  {
    id: "do-son",
    name: "Đồ Sơn",
    latitude: 20.7100,
    longitude: 106.7900,
  },
  {
    id: "ha-long",
    name: "Hạ Long",
    latitude: 20.9500,
    longitude: 107.0800,
  },
  {
    id: "co-to",
    name: "Cô Tô",
    latitude: 20.9833,
    longitude: 107.7667,
  },
];



type Tide = {
  dt: number;
  date: string;
  type: "High" | "Low";
  height: number;
};

type WeatherData = {
  temperature: number;
  humidity: number;
  cloudCover: number;
  windSpeed: number;
  windDirection: number;
};

type OceanData = {
  weather: WeatherData;

  uv: {
    value: number;
    level: {
      label: string;
      description: string;
    };
    time: string | null;
  };

  tide: {
    previous: Tide | null;
    next: Tide | null;
    extremes: Tide[];
  };

  timezone: string;
  updatedAt: string;
};

function getWindDirection(degree: number) {
  const directions = [
    "Bắc",
    "Đông Bắc",
    "Đông",
    "Đông Nam",
    "Nam",
    "Tây Nam",
    "Tây",
    "Tây Bắc",
  ];

  const index = Math.round(degree / 45) % 8;

  return directions[index];
}

function formatTime(timestamp: number) {
  return new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(timestamp * 1000));
}

function formatHeight(height: number) {
  return `${height.toFixed(2)} m`;
}

function getUVIcon(uv: number) {
  if (uv < 3) return "☀️";
  if (uv < 6) return "🌤️";
  if (uv < 8) return "☀️";
  if (uv < 11) return "🔥";

  return "☀️";
}

function getTideIcon(type?: "High" | "Low") {
  if (type === "High") return "🌊";

  return "〰️";
}

export default function OceanCard() {
  const [cityId, setCityId] = useState("vungtau");

  const [data, setData] = useState<OceanData | null>(
    null
  );

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(
    null
  );

  const city = CITIES.find(
    (item) => item.id === cityId
  ) ?? CITIES[0];

  const seaImages =
  ListSeaUrl.find(
    (item) => item.id === city.id
  )?.listUrlImage ?? [];

  useEffect(() => {
    let cancelled = false;

    async function loadOceanData() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/ocean?lat=${city.latitude}&lon=${city.longitude}`,
          {
            cache: "no-store",
          }
        );

        const result = await response.json();
        console.log("resuilt",result)  
        if (!response.ok) {
          throw new Error(
            result.error ||
              "Không thể tải dữ liệu biển"
          );
        }

        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Có lỗi xảy ra"
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadOceanData();

    return () => {
      cancelled = true;
    };
  }, [city.latitude, city.longitude]);

  return (
    <section className="w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-950 via-fuchsia-950/70 to-pink-950 p-5 text-white shadow-2xl">
      {/* Header */}

      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-cyan-200/70">
            🌊 Tình trạng biển
          </p>

          <h2 className="mt-1 text-2xl font-bold">
            {city.name}
          </h2>
        </div>

        <select
          value={cityId}
          onChange={(e) =>
            setCityId(e.target.value)
          }
          className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-white outline-none backdrop-blur-md"
        >
          {CITIES.map((item) => (
            <option
              key={item.id}
              value={item.id}
              className="bg-slate-900"
            >
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="grid gap-4 md:grid-cols-2">
          <LoadingBox />
          <LoadingBox />
        </div>
      )}

      {error && !loading && (
        <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-5 text-sm text-red-200">
          <p className="font-semibold">
            Không thể cập nhật dữ liệu
          </p>

          <p className="mt-1 opacity-80">
            {error}
          </p>
        </div>
      )}

      {data && !loading && !error && (
        <>
        
         <div className="mx-auto flex w-full max-w-5xl justify-center mt-5 mb-20">

          <SeaImageSlider
            cityId={city.id}
            cityName={city.name}
            images={seaImages}
          />

         </div>
                     {/* Weather conditions */}

            <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {/* Temperature */}

              <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur-xl">
                <p className="text-xs text-white/50">
                  🌡️ Nhiệt độ
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {data.weather.temperature.toFixed(1)}°
                </p>

                <p className="mt-1 text-xs text-white/40">
                  Không khí
                </p>
              </div>

              {/* Humidity */}

              <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur-xl">
                <p className="text-xs text-white/50">
                  💧 Độ ẩm
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {Math.round(data.weather.humidity)}%
                </p>

                <p className="mt-1 text-xs text-white/40">
                  Độ ẩm không khí
                </p>
              </div>

              {/* Cloud */}

              <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur-xl">
                <p className="text-xs text-white/50">
                  ☁️ Mây
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {Math.round(data.weather.cloudCover)}%
                </p>

                <p className="mt-1 text-xs text-white/40">
                  Độ che phủ
                </p>
              </div>

              {/* Wind */}

              <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur-xl">
                <p className="text-xs text-white/50">
                  💨 Gió
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {data.weather.windSpeed.toFixed(1)}
                  <span className="ml-1 text-sm font-normal text-white/50">
                    km/h
                  </span>
                </p>

                <p className="mt-1 text-xs text-white/40">
                  {getWindDirection(
                    data.weather.windDirection
                  )}
                </p>
              </div>
            </div>
          <div className="grid gap-4 md:grid-cols-2">





            {/* UV */}

            <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur-xl">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-white/60">
                    Tia UV hiện tại
                  </p>

                  <div className="mt-2 flex items-end gap-2">
                    <span className="text-5xl font-bold">
                      {data.uv.value.toFixed(1)}
                    </span>

                    <span className="pb-1 text-lg">
                      {getUVIcon(data.uv.value)}
                    </span>
                  </div>
                </div>

                <div className="rounded-xl bg-white/10 px-3 py-1.5 text-sm">
                  {data.uv.level.label}
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-white/60">
                {data.uv.level.description}
              </p>
            </div>

            {/* Tide */}

            <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur-xl">
              <p className="text-sm text-white/60">
                Thủy triều tiếp theo
              </p>

              {data.tide.next ? (
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-400/10 text-xl">
                      {getTideIcon(
                        data.tide.next.type
                      )}
                    </div>

                    <div>
                      <p className="font-semibold">
                        {data.tide.next.type ===
                        "High"
                          ? "Nước lớn"
                          : "Nước ròng"}
                      </p>

                      <p className="text-sm text-white/50">
                        {formatTime(
                          data.tide.next.dt
                        )}
                      </p>
                    </div>
                  </div>

                  <p className="text-2xl font-bold">
                    {formatHeight(
                      data.tide.next.height
                    )}
                  </p>
                </div>
              ) : (
                <p className="mt-4 text-white/50">
                  Chưa có dữ liệu triều tiếp theo.
                </p>
              )}
            </div>
          </div>

          {/* Tide timeline */}

          {data.tide.extremes.length > 0 && (
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.05] p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold">
                    Lịch thủy triều hôm nay
                  </p>

                  <p className="mt-1 text-xs text-white/40">
                    Dữ liệu dự báo thủy triều
                  </p>
                </div>

                <span className="text-xs text-cyan-200/60">
                  {city.name}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {data.tide.extremes.map(
                  (tide, index) => (
                    <div
                      key={`${tide.dt}-${index}`}
                      className="rounded-xl bg-white/[0.06] p-3"
                    >
                      <div className="flex items-center gap-2">
                        <span>
                          {getTideIcon(
                            tide.type
                          )}
                        </span>

                        <span className="text-xs text-white/50">
                          {tide.type === "High"
                            ? "Nước lớn"
                            : "Nước ròng"}
                        </span>
                      </div>

                      <p className="mt-2 font-semibold">
                        {formatTime(tide.dt)}
                      </p>

                      <p className="text-sm text-white/50">
                        {formatHeight(tide.height)}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </>
      )}

      <p className="mt-4 text-center text-[11px] text-white/30">
        Dữ liệu UV: Open-Meteo · Thủy triều: WorldTides
      </p>
    </section>
  );
}

function LoadingBox() {
  return (
    <div className="h-44 animate-pulse rounded-2xl bg-white/[0.06]" />
  );
}