"use client";

import { useEffect, useState } from "react";

const CITIES = [
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
    id: "ho-chi-minh",
    name: "Hồ Chí Minh",
    latitude: 10.77,
    longitude: 106.70,
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

type Tide = {
  dt: number;
  date: string;
  type: "High" | "Low";
  height: number;
};

type OceanData = {
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
    <section className="w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950 via-cyan-950/60 to-blue-950 p-5 text-white shadow-2xl">
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