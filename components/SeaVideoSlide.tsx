
"use client";

import { useEffect, useState } from "react";

type Props = {
  cityId: string;
  cityName: string;
  url: string[];
};

export default function SeaVideoSlider({
  cityId,
  cityName,
  url,
}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  // useEffect(() => {
  //   setActiveIndex(0);
  // }, [cityId]);

  if (!url.length) {
    return null;
  }

  const next = () => {
    setActiveIndex((current) => (current + 1) % url.length);
  };

  const previous = () => {
    setActiveIndex(
      (current) => (current - 1 + url.length) % url.length
    );
  };

  return (
    <div className="relative mx-auto aspect-[9/16] w-full max-w-[360px] overflow-hidden rounded-3xl bg-black">
      <video
        key={url[activeIndex]}
        src={url[activeIndex]}
        className="h-full w-full object-contain"
        controls
        playsInline
        loop
        controlsList="nodownload"
        preload="metadata"
        aria-label={`${cityName} - video biển`}
      />

      <div className="pointer-events-none absolute inset-0 " />

      {/* <div className="pointer-events-none absolute top-5 left-5">
        <p className="text-xs text-white/70">
          📍 Điểm đến
        </p>

        <h3 className="mt-1 text-xl font-semibold text-white">
          {cityName}
        </h3>
      </div> */}

      {url.length > 1 && (
        <>
          <div className="absolute right-4 top-4 rounded-full bg-black/50 px-3 py-1.5 text-xs text-white backdrop-blur-md">
            {activeIndex + 1} / {url.length}
          </div>

          <button
            type="button"
            onClick={previous}
            aria-label="Video trước"
            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-2xl text-white backdrop-blur-md transition hover:bg-black/70"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Video tiếp theo"
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-2xl text-white backdrop-blur-md transition hover:bg-black/70"
          >
            ›
          </button>

          <div className="absolute bottom-5 right-5 flex gap-1.5">
            {url.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Chuyển đến video ${index + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  index === activeIndex
                    ? "w-6 bg-white"
                    : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
