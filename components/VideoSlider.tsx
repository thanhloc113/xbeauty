"use client";

import { useState, useRef } from "react";
import VideoItem from "./VideoItem";
import { scrollToId } from "@/utils/scrollToId";

type Video = {
  url: string;
  title: string;
  poster?: string;
};

type Props = {
  videos: Video[];
  linkId?: string;
};

export default function VideoSlide({ videos, linkId = "footer" }: Props) {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const sliderRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    const slider = sliderRef.current;
    if (!slider) return;

    isDown.current = true;
    startX.current = e.pageX - slider.offsetLeft;
    scrollLeft.current = slider.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
  };

  const handleMouseUp = () => {
    isDown.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current) return;

    const slider = sliderRef.current;
    if (!slider) return;

    e.preventDefault();

    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX.current) * 1.5;

    slider.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div className="w-full flex flex-col items-center py-[5px]">

      {/* video scroll */}
      <div
        ref={sliderRef}
        className="w-full overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className="flex justify-start gap-6 px-6 py-[5px] w-max">
          {videos.map((video, index) => (
            <VideoItem
              key={index}
              src={video.url}
              poster={video.poster}
              title={video.title}
              isPlaying={playingIndex === index}
              onPlay={() =>
                setPlayingIndex((prev) => (prev === index ? null : index))
              }
            />
          ))}
        </div>
      </div>
{/* hint text */}
<p className="text-sm font-bold text-white mt-2 flex items-center gap-2 select-none">
  ← ... →
</p>
      {/* button */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => scrollToId(linkId)}
          className="w-[220px] flex items-center justify-center
          relative overflow-hidden py-2 rounded-xl font-semibold text-white
          bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500
          shadow-lg shadow-cyan-500/40 hover:scale-105 transition"
        >
          Let do it
        </button>
      </div>

    </div>
  );
}