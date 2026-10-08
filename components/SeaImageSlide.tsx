"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  cityId: string;
  cityName: string;
  images: string[];
};

export default function SeaImageSlider({
  cityId,
  cityName,
  images,
}: Props) {
  const [activeIndex, setActiveIndex] =
    useState(0);

  // useEffect(() => {
  //   setActiveIndex(0);
  // }, [cityId]);

  if (!images.length) {
    return null;
  }

  const next = () => {
    setActiveIndex(
      (current) =>
        (current + 1) % images.length
    );
  };

  const previous = () => {
    setActiveIndex(
      (current) =>
        (current - 1 + images.length) %
        images.length
    );
  };

  return (
    <div className="relative h-[520px] w-full overflow-hidden rounded-3xl bg-black/20">

          <img
             src={images[activeIndex]}
           alt={`${cityName} - ảnh biển`}
            className="
              h-full
              w-full
              object-contain
              fill
            "
          />

      {/* <Image
        src={images[activeIndex]}
        alt={`${cityName} - ảnh biển`}
        fill
        sizes="(max-width: 768px) 100vw, 700px"
        className="object-cover"
        priority={activeIndex === 0}
      /> */}

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      <div className="absolute bottom-5 left-5">
        <p className="text-xs text-white/60">
          📍 Điểm đến
        </p>

        <h3 className="mt-1 text-xl font-semibold text-white">
          {cityName}
        </h3>
      </div>

      <div className="absolute right-4 top-4 rounded-full bg-black/40 px-3 py-1.5 text-xs text-white backdrop-blur-md">
        {activeIndex + 1} / {images.length}
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={previous}
            aria-label="Ảnh trước"
            className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-2xl text-white backdrop-blur-md transition hover:bg-black/60"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Ảnh tiếp theo"
            className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-2xl text-white backdrop-blur-md transition hover:bg-black/60"
          >
            ›
          </button>
        </>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-5 right-5 flex gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() =>
                setActiveIndex(index)
              }
              className={`h-1.5 rounded-full transition-all ${
                index === activeIndex
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}