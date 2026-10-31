
"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Film, ListFilm } from "@/data/films";
// Danh sách video


export default function TroiMua() {

const getDailyIndex = (length: number) => {
  const date = new Date();

  const dateKey =
    date.getFullYear() * 10000 +
    (date.getMonth() + 1) * 100 +
    date.getDate();

  return dateKey % length;
};  

const defVideo = getDailyIndex(ListFilm.length)

const [selectedVideo, setSelectedVideo] = useState(ListFilm[defVideo]);

const handleSelectVideo = (video : Film) => {
  setSelectedVideo(video);

  document.getElementById("video-player")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />

      <Hero
        as="h1"
        title="Ngày hôm nay của em thế nào ?"
      />

      <div className="mx-auto w-full max-w-6xl px-4 py-8 md:py-12">

        {/* SECTION 1: VIDEO PLAYER */}

        <section className="mb-12 scroll-mt-24" id="video-player">

          <div className="mb-5">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white md:text-3xl">
              {selectedVideo.title}
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400 md:text-base">
              Hãy chuẩn bị Snack, Coca, thưởng thức trọn vẹn bộ phim và đừng quên ủng hộ các sản phẩm tại website nhé!
            </p>
          </div>

          <div className="aspect-video overflow-hidden rounded-2xl bg-black shadow-xl">
            <video
              
              key={selectedVideo.id}
              src={selectedVideo.videoUrl}
              poster={selectedVideo.poster}
              preload="metadata"
              controls
              controlsList="nodownload"
              disablePictureInPicture
              playsInline
              className="h-full w-full object-contain"
            />
          </div>
        </section>


        {/* SECTION 2: VIDEO PLAYLIST */}

        <section>

          <div className="mb-5">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white md:text-2xl">
              Một chút thư giãn sau ngày dài làm việc mệt mỏi.
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Chọn một bộ phim mà em muốn xem nhé và đừng quên ủng hộ các sản phẩm của website nhé.
            </p>
          </div>


          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">

            {ListFilm.map((video) => {
              const isActive = selectedVideo.id === video.id;

              return (
                <button
                  key={video.id}
                  onClick={() => handleSelectVideo(video)}
                  className={`group overflow-hidden rounded-xl border text-left transition-all duration-200 ${
                    isActive
                      ? "border-pink-500 ring-2 ring-pink-500/20"
                      : "border-gray-200 hover:border-pink-300 dark:border-gray-800 dark:hover:border-pink-500"
                  }`}
                >

                  {/* Poster */}

                  <div className="relative w-full aspect-video overflow-hidden bg-gray-100 dark:bg-gray-900">
                    <img
                      src={video.poster}
                      alt={video.title}
                      className="absolute inset-0 !h-full !w-full max-w-none object-cover"
                    />

                    {/* Play icon */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-gray-900">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="ml-1 h-6 w-6"
                        >
                          <path d="M7.5 4.5v15l12-7.5-12-7.5Z" />
                        </svg>
                      </div>
                    </div>

                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute left-2 top-2 rounded-md bg-pink-500 px-2 py-1 text-xs font-medium text-white">
                        Đang phát
                      </div>
                    )}
                  </div>


                  {/* Video title */}

                  <div className="p-3">
                    <h5 className="line-clamp-1 text-sm font-semibold text-gray-900 dark:text-white md:text-base">
                      {video.title}
                    </h5>

                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                      {video.description}
                    </p>
                  </div>

                </button>
              );
            })}

          </div>

        </section>

      </div>

      <Footer />
    </main>
  );
}
