"use client";

import { useState } from "react";
import VideoItem from "./VideoItem";
import { scrollToId } from "@/utils/scrollToId";

type Video = {
  url: string;
  title: string;
  poster?:string;
};

type Props = {
  videos: Video[];
  linkId?:string;
};

export default function VideoSlide({ videos,linkId = "footer" }: Props) {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  return (
    <div className="w-full flex flex-col items-center py-[5px]">

      {/* video scroll */}
      <div className="w-full overflow-x-auto">
        <div className="flex justify-center gap-6 px-6 py-[5px] w-max mx-auto">
          {videos.map((video, index) => (
            <VideoItem
              key={index}
              src={video.url}
              poster={video.poster}
              title={video.title}
              isPlaying={playingIndex === index}
              onPlay={() =>
                setPlayingIndex(prev => (prev === index ? null : index))
              }
            />
          ))}
        </div>
      </div>

      {/* button */}
  <div className="flex justify-center mt-2">
    <button
      onClick={() => scrollToId(linkId, 100000)}
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