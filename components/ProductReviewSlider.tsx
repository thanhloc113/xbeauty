"use client"

import { useState, useRef, useEffect } from "react"

type ReviewInput = {
  id?: number
  product_id: number
  media_type: "image" | "video"
  media_url: string
  display_order: number
}

export default function ProductReviewSlider({
  reviews,
  caption,
  productName,
  affiliateLink,
}: {
  reviews: ReviewInput[]
  caption: string
  productName: string
  affiliateLink: string
}) {
  const [current, setCurrent] = useState(0)
  const [expand, setExpand] = useState(false)
  const [showExpandBtn, setShowExpandBtn] = useState(false) // mới
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSeeking, setIsSeeking] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const captionRef = useRef<HTMLDivElement | null>(null) // ref caption
  const item = reviews[current]
  const isSeekingRef = useRef(false)
  const lastRenderRef = useRef(0)
  const progressRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    isSeekingRef.current = isSeeking
  }, [isSeeking])

  // Kiểm tra xem caption có dài hơn 2 dòng không
  useEffect(() => {
    if (captionRef.current) {
      const el = captionRef.current
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight || "16")
      const maxHeight = lineHeight * 2
      setShowExpandBtn(el.scrollHeight > maxHeight)
    }
  }, [caption, current])

  // thanh progress mượt hơn
  useEffect(() => {
    const video = videoRef.current
    if (!video || !progressRef.current) return

    let rafId: number

    const render = (time: number) => {
      if (!video) return
      if (time - lastRenderRef.current > 41) {
        const percent = video.currentTime / (video.duration || 1)
        progressRef.current!.style.transform = `scaleX(${percent})`
        lastRenderRef.current = time
      }
      if (!video.paused) rafId = requestAnimationFrame(render)
    }

    if (!video.paused) rafId = requestAnimationFrame(render)

    const onPlay = () => { rafId = requestAnimationFrame(render) }
    const onPause = () => { if (rafId) cancelAnimationFrame(rafId) }

    video.addEventListener("play", onPlay)
    video.addEventListener("pause", onPause)

    return () => {
      video.removeEventListener("play", onPlay)
      video.removeEventListener("pause", onPause)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [current])

  // reset video khi đổi slide
  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.pause()
      video.currentTime = 0
    }
  }, [current])

  // toggle play/pause
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onPlay = () => setIsPlaying(true)
    const onPause = () => { if (!isSeekingRef.current) setIsPlaying(false) }

    video.addEventListener("play", onPlay)
    video.addEventListener("pause", onPause)

    return () => {
      video.removeEventListener("play", onPlay)
      video.removeEventListener("pause", onPause)
    }
  }, [current])

  const handleLoaded = () => {
    if (!videoRef.current) return
    setDuration(videoRef.current.duration)
  }

  const handleSeekStart = () => setIsSeeking(true)
  const handleSeekEnd = () => {
    setIsSeeking(false)
    if (videoRef.current && isPlaying) videoRef.current.play()
  }

  const handleTogglePlay = async () => {
    const video = videoRef.current
    if (!video) return
    try {
      if (video.paused) await video.play()
      else video.pause()
    } catch (err) {
      console.log("Play bị block:", err)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (!videoRef.current) return

    videoRef.current.currentTime = value
    setProgress(value)

    if (progressRef.current && duration > 0) {
      progressRef.current.style.transform = `scaleX(${value / duration})`
    }
  }

  const next = () => {
    setCurrent((prev) => (prev + 1) % reviews.length)
    setExpand(false)
    setProgress(0)
  }

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? reviews.length - 1 : prev - 1))
    setExpand(false)
    setProgress(0)
  }

  const handleEnded = () => {
    if (!videoRef.current) return
    videoRef.current.currentTime = 0
    videoRef.current.play()
  }

  if (!reviews || reviews.length === 0) return <div>No review</div>

  return (
    <div className="flex flex-col w-full h-full rounded-xl overflow-hidden">

      {/* HEADER */}
      <div className="relative flex items-center justify-between px-3 py-2 text-pink">
        <div className="text-xs">{current + 1} / {reviews.length}</div>
        <div className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold max-w-[60%] text-center line-clamp-1">
          {productName}
        </div>
        <button className="text-sm">✕</button>
      </div>

      {/* MEDIA + CAPTION */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        {item.media_type === "image" ? (
          <img src={item.media_url} className="w-full h-full object-contain" />
        ) : (
          <>
            <video
              ref={videoRef}
              src={item.media_url}
              onLoadedMetadata={handleLoaded}
              onClick={handleTogglePlay}
              onEnded={handleEnded}
              playsInline
              autoPlay
              className="w-full h-full object-contain"
            />
            {!isPlaying && !isSeeking && (
              <div className="absolute inset-0 flex items-center justify-center text-white text-4xl bg-black/30 pointer-events-none">
                ▶
              </div>
            )}
          </>
        )}

        {/* NAV */}
        <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 z-20">
          <button onClick={prev} className="bg-white/10 px-3 py-2 rounded-full">◀</button>
          <button onClick={next} className="bg-white/10 px-3 py-2 rounded-full">▶</button>
        </div>

        {/* CAPTION + MUA NGAY */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div
            className={`p-3 ${
              expand
                ? "bg-[linear-gradient(to_top,rgba(88,28,135,0.9),rgba(88,28,135,0.6),transparent)] backdrop-blur-md"
                : ""
            }`}
          >
            <div
              ref={captionRef}
              className={`text-white text-sm leading-relaxed line-clamp-2`}
            >
              {caption}
            </div>
            <div className="flex gap-3 mt-2">
              {showExpandBtn && (
                <button
                  onClick={() => setExpand(!expand)}
                  className="text-xs text-pink-300"
                >
                  {expand ? "Thu gọn" : "Xem thêm"}
                </button>
              )}
                <a
                  href={affiliateLink}
                  target="_blank"
                  className="
                    relative
                    text-xs
                    text-white
                    px-3 py-1
                    rounded
                    overflow-hidden
                    bg-[linear-gradient(135deg,#f50fb0,#dd034c)]
                    transition-all
                    inline-block
                  "
                >
                  {/* Shine effect */}
                  <span className="
                    absolute top-0 left-0 h-full w-full 
                    bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.6),transparent)]
                    -translate-x-full 
                    skew-x-12 
                    animate-[shine_4s_linear_infinite]
                    pointer-events-none
                  "></span>

                  <span className="relative z-10">Mua ngay</span>
                </a>
            </div>
          </div>
        </div>
      </div>

      {/* PROGRESS */}
      {item.media_type === "video" && (
        <div className="px-2 py-2 bg-black/40">
          <div className="relative w-full h-[4px] rounded-full bg-white/20 overflow-hidden">
            <div
              ref={progressRef}
              className="absolute top-0 left-0 h-full w-full origin-left bg-[linear-gradient(90deg,#7c3aed,#c084fc)] progress-bar"
              style={{ transform: "scaleX(0)" }}
            />
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={progress}
              onChange={handleSeek}
              onMouseDown={handleSeekStart}
              onMouseUp={handleSeekEnd}
              onTouchStart={handleSeekStart}
              onTouchEnd={handleSeekEnd}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  )
}