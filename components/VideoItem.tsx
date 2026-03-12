"use client";
import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  title: string;
  poster?: string;
  isPlaying?: boolean;
  onPlay?: () => void;
};

export default function VideoItem({
  src,
  title,
  poster,
  isPlaying,
  onPlay,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const loopCountRef = useRef(0);

  const [localPlaying, setLocalPlaying] = useState(false);
  const playing = isPlaying ?? localPlaying;

  // play / pause control
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (playing) {
      video.play();
    } else {
      video.pause();
      setTimeout(() => {
      video.currentTime = 0;
      loopCountRef.current = 0;
    }, 600); // khớp với duration-500
      loopCountRef.current = 0; // reset loop
    }
  }, [playing]);

  // loop tối đa 5 lần
  useEffect(() => {
  const video = videoRef.current;
  if (!video) return;

  const handleTimeUpdate = () => {
    if (video.currentTime >= video.duration - 0.2) {
      if (loopCountRef.current < 4) {
        loopCountRef.current += 1;

        video.currentTime = 0;
        video.play().catch(() => {});
      }
    }
  };

  video.addEventListener("timeupdate", handleTimeUpdate);

  return () => {
    video.removeEventListener("timeupdate", handleTimeUpdate);
  };
}, []);

  const togglePlay = () => {
    if (onPlay) {
      onPlay();
    } else {
      setLocalPlaying((p) => !p);
    }
  };

  return (
 <div className="relative 
    w-[42vw] 
    lg:w-[14vw] 
    aspect-[9/16] 
    max-w-[260px]
    overflow-hidden rounded-xl bg-black shrink-0"
    >
    <video
      ref={videoRef}
      src={src}
      className="w-full h-full object-cover cursor-pointer"
      onClick={togglePlay}
      playsInline
      preload="metadata"
    />
    {poster && (
      <img
        src={poster}
        alt={title}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-600 pointer-events-none ${
          playing ? "opacity-0" : "opacity-100"
        }`}
      />
    )}

    {!playing && (
      <button
        onClick={togglePlay}
        className="absolute py-5 inset-0 flex items-center justify-center"
      >
        <div className="bg-black/40 backdrop-blur-md text-white w-12 h-12 rounded-full flex items-center justify-center text-xl">
          ▶
        </div>
      </button>
    )}

    <div className="absolute top-2 left-2 right-2">
      <p className="text-[11px] text-white px-2 py-1 rounded-md bg-black/30 backdrop-blur-md leading-snug">
        {title}
      </p>
    </div>

  </div>
);
}