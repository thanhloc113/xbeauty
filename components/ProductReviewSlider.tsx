"use client"

import { useState, useRef, useEffect } from "react"

// Thay vì khai báo riêng
// export type ProductReview = { ... }

import { ProductReview as ProductReviewType } from "@/types/product"

type ReviewInput = ProductReviewType

export default function ProductReviewSlider({
  reviews,
  short_description,
  productName,
  affiliateLink,
  benefit,
  ingredient,
  usage,
  cta,
  onClose

}: {
  reviews: ReviewInput[]
  short_description: string
  productName: string
  affiliateLink: string | null
  benefit?: string
  ingredient?: string
  usage?: string
  cta?:string
  onClose?: () => void
}) {
  const [current, setCurrent] = useState(0)
  const [expand, setExpand] = useState(false)
  const toggleLockRef = useRef(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSeeking, setIsSeeking] = useState(false)

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const progressRef = useRef<HTMLDivElement | null>(null)
  const isSeekingRef = useRef(false)
  const lastRenderRef = useRef(0)
const [openSection, setOpenSection] = useState<{
  benefit: boolean
  ingredient: boolean
  usage: boolean
}>({
  benefit: true,
  ingredient: false,
  usage: false,
})
const toggleSection = (key: "benefit" | "ingredient" | "usage") => {
  setOpenSection(prev => ({
    ...prev,
    [key]: !prev[key],
  }))
}
const parseList = (str?: string) =>
  str
    ? str.split(",").map(i => i.trim()).filter(Boolean)
    : []

const benefitList = parseList(benefit)
const ingredientList = parseList(ingredient)
const usageList = parseList(usage)
// xử lí toogle xem thêm [
const MAX_LENGTH = 50

const hasExtraContent =
  benefitList.length > 0 ||
  ingredientList.length > 0 ||
  usageList.length > 0

const isLongCaption = short_description.length > MAX_LENGTH

const shouldShowExpand = isLongCaption || hasExtraContent

const displayedCaption = expand
  ? short_description
  : short_description.slice(0, MAX_LENGTH) +
    (isLongCaption ? "..." : "")






  const item = reviews[current]

// proload video kế nếu có
  useEffect(() => {
  const nextIndex = (current + 1) % reviews.length
  const nextItem = reviews[nextIndex]

  if (nextItem?.media_type === "video") {
    const v = document.createElement("video")
    v.src = nextItem.media_url
    v.preload = "auto"
  }
}, [current])
  useEffect(() => {
    isSeekingRef.current = isSeeking
  }, [isSeeking])



  // Update progress mượt
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

const handleTogglePlay = () => {
  const video = videoRef.current
  if (!video || toggleLockRef.current) return

  toggleLockRef.current = true

  if (video.paused) {
    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise.finally(() => {
        toggleLockRef.current = false
      })
    } else {
      toggleLockRef.current = false
    }
  } else {
    video.pause()
    toggleLockRef.current = false
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
    // if (!videoRef.current) return
    // videoRef.current.currentTime = 0
    // videoRef.current.play()
  }

  if (!reviews || reviews.length === 0) return <div>No review</div>
  const productNameLines = productName
  .split("|")
  .map(i => i.trim())
  .filter(Boolean)
  return (
    <div className="flex flex-col w-full h-full rounded-xl overflow-hidden">

      {/* HEADER */}
    <div className="flex flex-col px-3 pt-2 pb-1 text-pink">

  {/* TOP: LENGTH */}
  <div className="text-xs leading-none">
    {current + 1} / {reviews.length}
  </div>

  {/* BOTTOM: PRODUCT NAME */}
  <div className="mt-1 text-center ">
    <div className="font-semibold leading-tight">
      {productNameLines.map((line, idx) => (
        <div
          key={idx}
          className="
            text-[13px]
            leading-tight
            whitespace-nowrap
            overflow-hidden
            text-ellipsis
          "
        >
          {line}
        </div>
      ))}
    </div>
  </div>

</div>
      {/* MEDIA + CAPTION */}
      <div className="relative flex-1 flex justify-center overflow-hidden mt-2">
        {item.media_type === "image" ? (
          <img src={item.media_url} className="w-full h-full object-contain" />
        ) : (
          <>
            <video
              ref={videoRef}
              src={item.media_url}
              onLoadedMetadata={handleLoaded}
              onPointerDown={handleTogglePlay}
              onEnded={handleEnded}
              playsInline
              className="w-full h-full object-contain touch-none"
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
          <button onClick={prev} className="bg-white/10 px-2 py-2 rounded-full">◀</button>
          <button onClick={next} className="bg-white/10 px-2 py-2 rounded-full">▶</button>
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
            className="font-semibold text-pink-400 text-sm leading-relaxed "
          >
          {displayedCaption}
{expand && (
  <div className="mt-3 space-y-2 text-white text-sm">

    {/* BENEFIT */}
    {benefitList.length > 0 && (
      <div className="bg-white/5 rounded-lg">
        <button
          onClick={() => toggleSection("benefit")}
          className="w-full flex items-center justify-between px-3 py-2"
        >
          <div className="flex items-center gap-2 text-pink-300 font-semibold">
            <span>💧</span>
            Công dụng
          </div>
          <span>{openSection.benefit ? "−" : "+"}</span>
        </button>

        {openSection.benefit && (
          <ul className="list-disc pl-6 pb-2 pr-3 space-y-1 text-white/90">
            {benefitList.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    )}

    {/* INGREDIENT */}
    {ingredientList.length > 0 && (
      <div className="bg-white/5 rounded-lg">
        <button
          onClick={() => toggleSection("ingredient")}
          className="w-full flex items-center justify-between px-3 py-2"
        >
          <div className="flex items-center gap-2 text-pink-300 font-semibold">
            <span>🌿</span>
            Thành phần nổi bật
          </div>
          <span>{openSection.ingredient ? "−" : "+"}</span>
        </button>

        {openSection.ingredient && (
          <ul className="list-disc pl-6 pb-2 pr-3 space-y-1 text-white/90">
            {ingredientList.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    )}

    {/* USAGE */}
    {usageList.length > 0 && (
      <div className="bg-white/5 rounded-lg">
        <button
          onClick={() => toggleSection("usage")}
          className="w-full flex items-center justify-between px-3 py-2"
        >
          <div className="flex items-center gap-2 text-pink-300 font-semibold">
            <span>🔥</span>
            Cách dùng
          </div>
          <span>{openSection.usage ? "−" : "+"}</span>
        </button>

        {openSection.usage && (
          <ul className="list-disc pl-6 pb-2 pr-3 space-y-1 text-white/90">
            {usageList.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    )}

  </div>
)}
          </div>
            <div className="flex gap-3 mt-2">
              {shouldShowExpand   && (
                <button
                  onClick={() => setExpand(!expand)}
                  className="text-xs text-pink-300"
                >
                  {expand ? "Thu gọn" : "Xem thêm"}
                </button>
              )}
            {cta && (
              <div className="text-[10px] text-yellow-300 mt-1">👉 {cta}</div>
            )}
              {affiliateLink && (
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
              )}
            </div>
          </div>
        </div>
      </div>
              {expand && (
  <div className="mt-3 space-y-2 text-white text-sm">
    


  </div>
)}
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