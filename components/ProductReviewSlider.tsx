"use client"

import { useState } from "react"

type ReviewInput = {
  id?: number
  product_id: number
  media_type: "image" | "video"
  media_url: string
  display_order: number
}

export default function ProductReviewSlider({
  reviews,
  caption
}: {
  reviews: ReviewInput[]
  caption: string
}) {

  const [current, setCurrent] = useState(0)
  const [expand, setExpand] = useState(false)

  console.log("Review:", reviews)
  if (!reviews || reviews.length === 0) {
    return <div>No review</div>
  }

  const next = () => {
    setCurrent((prev) => (prev + 1) % reviews.length)
  }

  const prev = () => {
    setCurrent((prev) =>
      prev === 0 ? reviews.length - 1 : prev - 1
    )
  }

  const item = reviews[current]
  console.log("Item",item.media_url);

  return (
    <div className="relative w-full h-full bg-[#0f172a] overflow-hidden rounded-xl">

      {/* MEDIA */}
      {item.media_type === "image" ? (
        <img
          src={item.media_url}
          className="absolute inset-0 w-full h-full object-contain z-0 pointer-events-none"
        />
      ) : (
        <video
          src={item.media_url}
          controls
          className="absolute inset-0 w-full h-full object-contain z-0"
        />
      )}

      {/* NAV */}
      <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 z-20">
        <button
          onClick={prev}
          className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-2 rounded-full hover:bg-pink-500/60 transition shadow-lg"
        >
          ◀
        </button>

        <button
          onClick={next}
          className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-2 rounded-full hover:bg-indigo-500/60 transition shadow-lg"
        >
          ▶
        </button>
      </div>

      {/* INDEX */}
      <div className="absolute top-3 left-4 text-xs text-white z-20 bg-black/40 px-2 py-1 rounded backdrop-blur">
        {current + 1} / {reviews.length}
      </div>


      {/* CAPTION OVERLAY */}
      <div
        className={`absolute left-0 right-0 bottom-0 text-white transition-all duration-300 z-20 ${
          expand ? "h-[60%]" : "h-[100px]"
        }`}
      >
        {/* gradient bg đẹp hơn */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-purple-900/70 to-transparent"></div>

        <div className="relative p-4 h-full flex flex-col">
          
          <div className={`text-sm leading-relaxed ${
            expand ? "overflow-y-auto pr-1" : "line-clamp-2"
          }`}>
            {caption}
          </div>

          <button
            onClick={() => setExpand(!expand)}
            className="text-xs mt-2 text-pink-300 hover:text-pink-400"
          >
            {expand ? "Thu gọn" : "Xem thêm"}
          </button>

        </div>
      </div>

    </div>
  )
}