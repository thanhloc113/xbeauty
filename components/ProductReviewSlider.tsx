"use client"

import { useEffect, useRef, useState } from "react"
import { ProductIngredient, ProductReview, ProductReviewData, ProductReview as ProductReviewType, ScoreItem } from "@/types/product"
import { formatNumber } from "@/utils/formatPrice"
import FlashSaleCountdown from "./FlashSaleCountdown"
import { FlashSaleStatus } from "@/hooks/useFlashSaleStatus"

type ReviewInput = ProductReviewType

/* =========================================================
   REVIEW TYPES
========================================================= */

type ReviewSection =
  | "effectiveness"
  | "ingredients"
  | "suitability"
  | "experience"
  | "reliability"



/* =========================================================
   SCORE BAR
========================================================= */

function ScoreBar({
  label,
  score,
  description,
}: ScoreItem) {
  const safeScore = Math.min(Math.max(score, 0), 10)
  const percent = safeScore * 10

  return (
    <div className="space-y-1.5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs font-semibold text-white">
            {label}
          </div>

          {description && (
            <div className="mt-0.5 text-[10px] leading-relaxed text-white/40">
              {description}
            </div>
          )}
        </div>

        {/* <div className="shrink-0 text-sm font-bold text-pink-300">
          // {safeScore.toFixed(1)}
        </div> */}
      </div>
          { score >0 && (
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-pink-500
                    via-fuchsia-400
                    to-violet-400
                    transition-all
                    duration-500
                  "
                  style={{
                    width: `${percent}%`,
                  }}
                />
              </div>
          ) }

    </div>
  )
}

/* =========================================================
   REVIEW CONTENT
========================================================= */

function ReviewContent({

  data,
  active,
}: {

  data?: ProductReviewData
  active: ReviewSection
}) {
  if (!data) {
    return (
      <div className="py-6 text-center text-xs text-white/40">
        Chưa có dữ liệu đánh giá.
      </div>
    )
  }
  
  /* ========================
     HIỆU QUẢ
  ======================== */

  if (active === "effectiveness") {
    return (
      <div className="space-y-4">
        {/* {data.effectiveness?.summary && (
          <p className="text-xs leading-relaxed text-white/70">
            {data.effectiveness.summary}
          </p>
        )} */}

        {data.effectiveness?.scores &&
          data.effectiveness.scores.length > 0 && (
            <div className="space-y-4">
              {data.effectiveness.scores.map((item) => (
                <ScoreBar
                  key={item.label}
                  {...item}
                />
              ))}
            </div>
          )} 

        {data.effectiveness?.strengths &&
          data.effectiveness.strengths.length > 0 && (
            <div className="rounded-xl border border-emerald-400/10 bg-emerald-400/5 p-3">
              <div className="mb-2 flex items-center gap-2 text-xs font-bold text-emerald-300">
                <span>✓</span>
                Điểm mạnh
              </div>

              <div className="space-y-1.5">
                {data.effectiveness.strengths.map((item) => (
                  <div
                    key={item}
                    className="text-xs leading-relaxed text-white/65"
                  >
                    • {item}
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* {data.effectiveness?.limitations &&
          data.effectiveness.limitations.length > 0 && (
            <div className="rounded-xl border border-amber-400/10 bg-amber-400/5 p-3">
              <div className="mb-2 flex items-center gap-2 text-xs font-bold text-amber-300">
                <span>⚠</span>
                Không nên kỳ vọng
              </div>

              <div className="space-y-1.5">
                {data.effectiveness.limitations.map((item) => (
                  <div
                    key={item}
                    className="text-xs leading-relaxed text-white/65"
                  >
                    • {item}
                  </div>
                ))}
              </div>
            </div>
          )} */}
      </div>
    )
  }

  /* ========================
     THÀNH PHẦN
  ======================== */

  if (active === "ingredients") {
    return (
      <div className="space-y-4">
        {/* {data.ingredients?.summary && (
          <p className="text-xs leading-relaxed text-white/70">
            {data.ingredients?.summary}
          </p>
        )} */}
                {data.ingredients?.safety && (
          <div className="rounded-xl border border-emerald-400/10 bg-emerald-400/5 p-3">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs font-bold text-emerald-300">
                🛡 Đặc tính nổi bật
              </div>

              {/* <div className="text-base font-bold text-pink-300">
                {data.ingredients.safety.score.toFixed(1)}
                <span className="text-[10px] text-white/40">
                  /10
                </span>
              </div> */}
            </div>

            <p className="mt-2 text-xs leading-relaxed text-white/60">
              {data.ingredients.safety.summary}
            </p>

            {/* {data.ingredients.safety.cautions &&
              data.ingredients.safety.cautions.length > 0 && (
                <div className="mt-3 border-t border-white/5 pt-3">
                  <div className="mb-2 text-[11px] font-semibold text-amber-300">
                    ⚠ Cần lưu ý
                  </div>

                  <div className="space-y-1">
                    {data.ingredients.safety.cautions.map((item) => (
                      <div
                        key={item}
                        className="text-[11px] leading-relaxed text-white/55"
                      >
                        • {item}
                      </div>
                    ))}
                  </div>
                </div>
              )} */}
          </div>
        )}
        {data.ingredients?.highlights &&
          data.ingredients.highlights.length > 0 && (
            <div className="space-y-3">
              {data.ingredients.highlights.map((item,index) => (
                <div
                  key={index}
                  className="
                    rounded-xl
                    border
                    border-white/5
                    bg-white/[0.035]
                    p-3
                  "
                >
                  <div className="text-xs font-bold text-pink-300">
                    🧪 {item.name}
                  </div>

                  <p className="mt-1.5 text-xs leading-relaxed text-white/60">
                    {item.notes}
                  </p>
                </div>
              ))}
            </div>
          )}
      </div>
    )
  }

  /* ========================
     ĐỘ PHÙ HỢP
  ======================== */

  if (active === "suitability") {
    return (
      <div className="space-y-5">
        {data.suitability?.summary && (
          <p className="text-xs leading-relaxed text-white/70">
            {data.suitability.summary}
          </p>
        )}

        {data.suitability?.skinTypes &&
          data.suitability.skinTypes.length > 0 && (
            <div>
              <div className="mb-3 text-xs font-bold text-white">
                👤 Phù hợp với loại da
              </div>

              <div className="space-y-4">
                {data.suitability.skinTypes.map((item) => (
                  <ScoreBar
                    key={item.label}
                    {...item}
                  />
                ))}
              </div>
            </div>
          )}

        {/* {data.suitability?.concerns &&
          data.suitability.concerns.length > 0 && (
            <div>
              <div className="mb-3 text-xs font-bold text-white">
                🎯 Phù hợp với nhu cầu
              </div>

              <div className="space-y-4">
                {data.suitability.concerns.map((item) => (
                  <ScoreBar
                    key={item.label}
                    {...item}
                  />
                ))}
              </div>
            </div>
          )} */}

        {data.suitability?.bestFor &&
          data.suitability.bestFor.length > 0 && (
            <div className="rounded-xl border border-emerald-400/10 bg-emerald-400/5 p-3">
              <div className="mb-2 text-xs font-bold text-emerald-300">
                ✓ Dùng tốt cho
              </div>

              <div className="space-y-1.5">
                {data.suitability.bestFor.map((item) => (
                  <div
                    key={item}
                    className="text-xs leading-relaxed text-white/65"
                  >
                    • {item}
                  </div>
                ))}
              </div>
            </div>
          )}

        {data.suitability?.avoidOrConsider &&
          data.suitability.avoidOrConsider.length > 0 && (
            <div className="rounded-xl border border-amber-400/10 bg-amber-400/5 p-3">
              <div className="mb-2 text-xs font-bold text-amber-300">
                ⚠ Nên cân nhắc nếu bạn
              </div>

              <div className="space-y-1.5">
                {data.suitability.avoidOrConsider.map((item) => (
                  <div
                    key={item}
                    className="text-xs leading-relaxed text-white/65"
                  >
                    • {item}
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
    )
  }

  /* ========================
     TRẢI NGHIỆM
  ======================== */

  if (active === "experience") {
    const experienceItems = [
      {
        label: "Kết cấu",
        value: data.experience?.texture,
      },
      {
        label: "Thẩm thấu",
        value: data.experience?.absorption,
      },
      {
        label: "Cảm giác",
        value: data.experience?.finish,
      },
    ].filter(
      (
        item
      ): item is {
        label: string
        value: string
      } => Boolean(item.value)
    )

    return (
      <div className="space-y-5">
        {experienceItems.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {experienceItems.map((item) => (
              <div
                key={item.label}
                className="
                  rounded-xl
                  border
                  border-white/5
                  bg-white/[0.035]
                  p-2.5
                  text-center
                "
              >
                <div className="text-[10px] text-white/40">
                  {item.label}
                </div>

                <div className="mt-1 text-[11px] font-semibold text-white/80">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {data.experience?.timeline &&
          data.experience.timeline.length > 0 && (
            <div>
              <div className="mb-4 text-xs font-bold text-white">
                ⏱ Khi nào có thể cảm nhận hiệu quả?
              </div>

              <div className="space-y-0">
                {data.experience.timeline.map((item, index,timeline) => (
                  <div
                    key={item.label}
                    className="flex gap-3"
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className="
                          flex
                          h-6
                          w-6
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-pink-500/15
                          text-[10px]
                          font-bold
                          text-pink-300
                        "
                      >
                        {index + 1}
                      </div>

                      {index <
                        timeline!.length - 1 && (
                        <div className="my-1 h-full min-h-6 w-px bg-white/10" />
                      )}
                    </div>

                    <div className="pb-4">
                      <div className="text-xs font-semibold text-white">
                        {item.label}
                      </div>

                      <div className="mt-1 text-[11px] leading-relaxed text-white/55">
                        {item.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        {data.experience?.feedback?.positive &&
          data.experience.feedback.positive.length > 0 && (
            <div className="rounded-xl border border-emerald-400/10 bg-emerald-400/5 p-3">
              <div className="mb-2 text-xs font-bold text-emerald-300">
                😊 Người dùng thường thích
              </div>

              <div className="space-y-1.5">
                {data.experience.feedback.positive.map((item) => (
                  <div
                    key={item}
                    className="text-xs leading-relaxed text-white/65"
                  >
                    • {item}
                  </div>
                ))}
              </div>
            </div>
          )}

        {data.experience?.feedback?.negative &&
          data.experience.feedback.negative.length > 0 && (
            <div className="rounded-xl border border-rose-400/10 bg-rose-400/5 p-3">
              <div className="mb-2 text-xs font-bold text-rose-300">
                😕 Một số phản hồi chưa hài lòng
              </div>

              <div className="space-y-1.5">
                {data.experience.feedback.negative.map((item) => (
                  <div
                    key={item}
                    className="text-xs leading-relaxed text-white/65"
                  >
                    • {item}
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
    )
  }

  /* ========================
     ĐỘ TIN CẬY
  ======================== */
  const currentYear = new Date().getFullYear();
  const founded = data.reliability?.brandFoundedYear
  let yearActive = 0;
  if(founded ){
    yearActive = currentYear - founded 
  }
  

  const reliabilityScores = [
    {
      key:"experience",
      label: "Kinh nghiệm thị trường",
      score: yearActive,
      unit: "year"
    },
    {
      key:"standand",
      label: "Đạt tiêu chuẩn",
      score: data.reliability?.standand,
      unit:"sản xuất & kiểm nghiệm"
    },
    {
      key:"popular",
      label: "Độ phổ biến",
      score: formatNumber(data.reliability?.strengths?.sold || 100000),
      unit:"lượt bán / Tiktok & Shopee"
    },
  ]
 

  return (
    <div className="space-y-4">
      {reliabilityScores.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {reliabilityScores.map((item) => (
            <div
              key={item.key}
              className="
                rounded-xl
                border
                border-white/5
                bg-white/[0.035]
                p-2.5
                text-center
              "
            >
              <div className="text-[clamp(8px,1.8vw,10px)] text-white/70">
                {item.label}
              </div>
              {["standand"].includes(item.key) ? (
                <div className="text-[clamp(10px,2vw,18px)] font-bold text-pink-300 my-2">
                  {item.score}
                </div>
              ) : (
                <div className="text-[clamp(10px,2vw,18px)] font-bold text-pink-300 my-2">
                  {item.score}+
                </div>)
              
              }


              <div className="text-[9px] text-white/70">
                {item.unit}
              </div>
            </div>
          ))}
        </div>
      )}

      {data.reliability?.brand && (
        <div className="rounded-xl border border-white/5 bg-white/[0.035] p-3">
          <div className="text-xs font-bold text-green-400">
            🏢 Thương hiệu
          </div>

          <p className="mt-1.5 text-xs leading-relaxed text-white">
            {data.reliability.brand}
          </p>
        </div>
      )}

      {data.reliability?.origin && (
        <div className="rounded-xl border border-white/5 bg-white/[0.035] p-3">
          <div className="text-xs font-bold text-blue-400">
            🏭 Xuất sứ
          </div>

          <p className="mt-1.5 text-xs leading-relaxed text-white">
            {data.reliability.origin}
          </p>
        </div>
      )}

      {data.reliability?.distributor && (
        <div className="rounded-xl border border-white/5 bg-white/[0.035] p-3">
          <div className="text-xs font-bold text-orange-400">
            🛒{data.reliability.distributorType}
          </div>

          <p className="mt-1.5 text-xs leading-relaxed text-white">
            {data.reliability.distributor}
          </p>
        </div>
      )}



      {data.reliability?.strengths?.trust &&
        (
<div className="rounded-xl border border-emerald-400/10 bg-emerald-400/5 p-3">
  <div className="flex items-center justify-center text-center text-xs font-bold text-white/80">
              <span >{data.reliability.strengths.trust}.
              </span>
            </div>

            {/* <div className="space-y-1.5">
              {data.reliability.strengths.map((item) => (
                <div
                  key={item}
                  className="text-xs leading-relaxed text-white/65"
                >
                  • {item}
                </div>
              ))}
            </div> */}
          </div>
        )}

      {/* {data.reliability?.cautions &&
        data.reliability.cautions.length > 0 && (
          <div className="rounded-xl border border-amber-400/10 bg-amber-400/5 p-3">
            <div className="mb-2 text-xs font-bold text-amber-300">
              ⚠ Cần kiểm tra thêm
            </div>

            <div className="space-y-1.5">
              {data.reliability.cautions.map((item) => (
                <div
                  key={item}
                  className="text-xs leading-relaxed text-white/65"
                >
                  • {item}
                </div>
              ))}
            </div>
          </div>
        )} */}
    </div>
  )
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function ProductReviewSlider({
  reviews,
  short_description,
  productName,
  tiktokShopLink,
  affiliateLink,
  reviewData,
  hook,
  cta,
  status,
  timeS,
  timeE,
  promotionProgram,
  rating,
  onClose,
}: {
  reviews: ReviewInput[]
  short_description: string
  productName: string
  tiktokShopLink?: string
  affiliateLink: string | null
  reviewData?: ProductReviewData
  hook?:string
  cta?: string
  status?: FlashSaleStatus
  timeS?: string
  timeE?: string
  rating?: number
  promotionProgram?: string,
  onClose?: () => void

}) {

  const [current, setCurrent] = useState(0)





  const [activeReview, setActiveReview] =
    useState<ReviewSection>("suitability")

  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSeeking, setIsSeeking] = useState(false)

  const videoRef = useRef<HTMLVideoElement | null>(null)

  const progressRef = useRef<HTMLDivElement | null>(null)

  const isSeekingRef = useRef(false)

  const lastRenderRef = useRef(0)

  const toggleLockRef = useRef(false)

  const item = reviews[current]

  const productNameLines = [productName,hook].filter(Boolean)
  /* =========================================================
     PRELOAD NEXT VIDEO
  ========================================================= */

  useEffect(() => {
    if (!reviews?.length) return

    const nextIndex = (current + 1) % reviews.length
    const nextItem = reviews[nextIndex]

    if (nextItem?.media_type === "video") {
      const video = document.createElement("video")

      video.src = nextItem.media_url
      video.preload = "auto"
    }
  }, [current, reviews])

  /* =========================================================
     SEEK STATE
  ========================================================= */

  useEffect(() => {
    isSeekingRef.current = isSeeking
  }, [isSeeking])

  /* =========================================================
     VIDEO PROGRESS
  ========================================================= */

  useEffect(() => {
    const video = videoRef.current

    if (!video || !progressRef.current) return

    let rafId = 0

    const render = (time: number) => {
      if (!video) return

      if (time - lastRenderRef.current > 41) {
        const percent =
          video.currentTime / (video.duration || 1)

        if (progressRef.current) {
          progressRef.current.style.transform =
            `scaleX(${percent})`
        }

        lastRenderRef.current = time
      }

      if (!video.paused) {
        rafId = requestAnimationFrame(render)
      }
    }

    const onPlay = () => {
      rafId = requestAnimationFrame(render)
    }

    const onPause = () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }

    video.addEventListener("play", onPlay)
    video.addEventListener("pause", onPause)

    if (!video.paused) {
      rafId = requestAnimationFrame(render)
    }

    return () => {
      video.removeEventListener("play", onPlay)
      video.removeEventListener("pause", onPause)

      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [current])

  /* =========================================================
     RESET VIDEO WHEN CHANGE SLIDE
  ========================================================= */

  useEffect(() => {
    const video = videoRef.current

    if (!video) return

    video.pause()
    video.currentTime = 0
  }, [current])

  /* =========================================================
     VIDEO PLAY STATE
  ========================================================= */

  useEffect(() => {
    const video = videoRef.current

    if (!video) return

    const onPlay = () => {
      setIsPlaying(true)
    }

    const onPause = () => {
      if (!isSeekingRef.current) {
        setIsPlaying(false)
      }
    }

    video.addEventListener("play", onPlay)
    video.addEventListener("pause", onPause)

    return () => {
      video.removeEventListener("play", onPlay)
      video.removeEventListener("pause", onPause)
    }
  }, [current])

  /* =========================================================
     VIDEO HANDLERS
  ========================================================= */

  const handleLoaded = () => {
    if (!videoRef.current) return

    setDuration(videoRef.current.duration)
  }

  const handleSeekStart = () => {
    setIsSeeking(true)
  }

  const handleSeekEnd = () => {
    setIsSeeking(false)

    if (videoRef.current && isPlaying) {
      videoRef.current.play()
    }
  }

  const handleTogglePlay = () => {
    const video = videoRef.current

    if (!video || toggleLockRef.current) return

    toggleLockRef.current = true

    if (video.paused) {
      const playPromise = video.play()

      if (playPromise !== undefined) {
        playPromise
          .catch(() => {})
          .finally(() => {
            toggleLockRef.current = false
          })
      } else {
        toggleLockRef.current = false
      }

      return
    }

    video.pause()

    toggleLockRef.current = false
  }

  const handleSeek = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number(event.target.value)

    if (!videoRef.current) return

    videoRef.current.currentTime = value

    setProgress(value)

    if (progressRef.current && duration > 0) {
      progressRef.current.style.transform =
        `scaleX(${value / duration})`
    }
  }

  /* =========================================================
     SLIDE NAVIGATION
  ========================================================= */

  const next = () => {
    if (!reviews.length) return

    setCurrent(
      (prev) => (prev + 1) % reviews.length
    )

    setProgress(0)
    setDuration(0)
    setIsPlaying(false)
  }

  const prev = () => {
    if (!reviews.length) return

    setCurrent(
      (prev) =>
        prev === 0
          ? reviews.length - 1
          : prev - 1
    )

    setProgress(0)
    setDuration(0)
    setIsPlaying(false)
  }

  /* =========================================================
     EMPTY STATE
  ========================================================= */

  if (!reviews || reviews.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center text-sm text-white/50">
        Chưa có review.
      </div>
    )
  }

  /* =========================================================
     REVIEW NAVIGATION DATA
  ========================================================= */

  const reviewTabs: {
    key: ReviewSection
    icon: string
    label: string
    description: string
  }[] = [
    {
      key: "suitability",
      icon: "🎯",
      label: "Phù hợp",
      description:
        "Mức độ ưu tiên được đánh giá dựa trên bảng thành phần công bố, có thể khác nhau tùy vào tình trạng da cụ thể và cơ địa mỗi người",
    },
    {
      key: "effectiveness",
      icon: "⚡",
      label: "Hiệu quả",
      description:
        "Độ hiệu quả được đánh giá dựa trên bảng thành phần của sản phẩm, có thể khác nhau cho từng loại da và cơ địa mỗi người.",
    },
    {
      key: "ingredients",
      icon: "🧪",
      label: "Thành phần",
      description:
        "Một số thành phần quan trọng",
    },

    // {
    //   key: "experience",
    //   icon: "💬",
    //   label: "Trải nghiệm",
    //   description:
    //     "Cảm nhận và phản hồi thực tế.",
    // },
    {
      key: "reliability",
      icon: "🛡",
      label: "Tin cậy",
      description:
        "Được tổng hợp từ website của thương hiệu, trang nhà bán hàng và một vài nguồn khác ",
    },
  ]

  const activeTab =
    reviewTabs.find(
      (item) => item.key === activeReview
    ) ?? reviewTabs[0]

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div
      className="
          flex
          w-full
          flex-col
          rounded-xl
          bg-[#111827]
          text-white
      "
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="relative shrink-0 px-3 pb-2 pt-2">
        <div className="text-xs leading-none text-pink-300">
          {current + 1} / {reviews.length}
        </div>

        <div className="mt-1 text-center">
          <div className="font-semibold leading-tight">
            {productNameLines.map((line, index) => (
              <div
                key={`${line}-${index}`}
                className="
                  overflow-hidden
                  text-ellipsis
                  whitespace-nowrap
                  text-[13px]
                  leading-tight
                  text-pink-400
                "
              >
                {line}
              </div>
            ))}
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="
              absolute
              right-3
              top-2
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              from-fuchsia-500
              to-violet-600
              text-xl
              text-white
              shadow-lg
              shadow-fuchsia-500/20
              transition-transform
              active:scale-90
            "
            aria-label="Đóng"
          >
            ×
          </button>
        )}
      </div>

      {/* =====================================================
          MEDIA
      ===================================================== */}

      <div
        className="
          relative
          flex
          h-[42svh]
          w-full
          shrink-0
          items-center
          justify-center
          overflow-hidden
          bg-black/20
        "
      >
        {item.media_type === "image" ? (
          <img
            src={item.media_url}
            alt={productName}
            className="
              h-full
              w-full
              object-contain
            "
          />
        ) : (
          <>
            <video
              ref={videoRef}
              src={item.media_url}
              onLoadedMetadata={handleLoaded}
              onPointerDown={handleTogglePlay}
              playsInline
              preload="metadata"
              className="
                h-full
                w-full
                object-contain
                touch-none
              "
            />

            {!isPlaying && !isSeeking && (
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  flex
                  items-center
                  justify-center
                "
              >
                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    bg-black/45
                    pl-1
                    text-2xl
                    text-white
                    backdrop-blur-sm
                  "
                >
                  ▶
                </div>
              </div>
            )}
          </>
        )}

        {/* PREVIOUS / NEXT */}

        {reviews.length > 1 && (
          <div
            className="
              pointer-events-none
              absolute
              left-0
              right-0
              top-1/2
              z-20
              flex
              -translate-y-1/2
              justify-between
              px-3
            "
          >
            <button
              type="button"
              onClick={prev}
              className="
                pointer-events-auto
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                bg-black/35
                text-sm
                text-white/90
                backdrop-blur-sm
              "
              aria-label="Review trước"
            >
              ◀
            </button>

            <button
              type="button"
              onClick={next}
              className="
                pointer-events-auto
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                bg-black/35
                text-sm
                text-white/90
                backdrop-blur-sm
              "
              aria-label="Review tiếp theo"
            >
              ▶
            </button>
          </div>
        )}

        {/* VIDEO PROGRESS */}

        {item.media_type === "video" && (
          <div
            className="
              absolute
              bottom-0
              left-0
              right-0
              z-30
              px-2
              pb-2
            "
          >
            <div
              className="
                relative
                h-[4px]
                w-full
                overflow-hidden
                rounded-full
                bg-white/20
              "
            >
              <div
                ref={progressRef}
                className="
                  absolute
                  left-0
                  top-0
                  h-full
                  w-full
                  origin-left
                  bg-gradient-to-r
                  from-pink-500
                  via-fuchsia-400
                  to-violet-400
                "
                style={{
                  transform: "scaleX(0)",
                }}
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
                className="
                  absolute
                  left-0
                  top-0
                  h-full
                  w-full
                  cursor-pointer
                  opacity-0
                "
              />
            </div>
          </div>
        )}
      </div>

      {/* =====================================================
          PRODUCT SUMMARY
      ===================================================== */}

      <div
        className="
          shrink-0
          border-t
          border-white/5
          px-4
          pt-3
        "
      >
        {short_description && (
          <p
            className="
            mt-5
            mb-5
              text-center
              text-[12px]
              leading-relaxed
              text-white
            "
          >
            {short_description}
          </p>
        )}

        {/* {reviewData?.overallScore !== undefined && (
          <div className="my-3 flex justify-center">
            <div
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-pink-500/15
                bg-pink-500/[0.05]
                px-4
                py-2
              "
            >
              <div
                className="
                  text-2xl
                  font-black
                  leading-none
                  text-pink-300
                "
              >
                {reviewData.overallScore.toFixed(1)}
              </div>

              <div>
                <div
                  className="
                    text-[9px]
                    font-medium
                    uppercase
                    tracking-[0.14em]
                    text-white/35
                  "
                >
                  XBeauty Score
                </div>

                <div className="mt-0.5 text-xs font-semibold text-white">
                  Đánh giá tổng quan
                </div>
              </div>
            </div>
          </div>
        )} */}
      </div>

      {/* =====================================================
          REVIEW TABS
      ===================================================== */}

      <div
        className="
          no-scrollbar
          flex
          shrink-0
          gap-2
          overflow-x-auto
          px-3
          pb-3
          pt-1
        "
      >
        {reviewTabs.map((item) => {
          const isActive =
            activeReview === item.key

          return (
            <button
              key={item.key}
              type="button"
              onClick={() =>
                setActiveReview(item.key)
              }
              className={`
                shrink-0
                rounded-full
                px-3
                py-2
                text-[11px]
                font-semibold
                transition-all
                duration-200
                ${
                  isActive
                    ? `
                      bg-gradient-to-r
                      from-pink-500
                      via-fuchsia-500
                      to-violet-500
                      text-white
                      shadow-lg
                      shadow-pink-500/20
                    `
                    : `
                      bg-white/[0.045]
                      text-white/45
                    `
                }
              `}
            >
              {item.icon} {item.label}
            </button>
          )
        })}
      </div>

      {/* =====================================================
          REVIEW DETAIL
      ===================================================== */}

      <div
        className="
          px-3
          pb-3
        "
      >
        <div
          className="
            rounded-2xl
            border
            border-white/5
            bg-white/[0.025]
            p-4
          "
        >
          {/* TITLE */}

          <div className="mb-4 flex items-start gap-2.5">
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-pink-500/10
                text-base
              "
            >
              {activeTab.icon}
            </div>

            <div className="min-w-0">
              <div className="text-sm font-bold text-white">
                {activeTab.label}
              </div>

              <div className="mt-0.5 text-[10px] leading-relaxed text-white/60">
                {activeTab.description}
              </div>
            </div>
          </div>

          {/* CONTENT */}

          <ReviewContent

            data={reviewData}
            active={activeReview}
          />
        </div>
      </div>

      {/* =====================================================
          CTA
      ===================================================== */}

      {affiliateLink && (
        <div
          className="
            shrink-0
            border-t
            border-white/5
            bg-[#111827]/95
            p-3
            backdrop-blur-xl
          "
        >
          {cta && (
            <div className="mb-2 text-center text-[11px] text-yellow-300">
              👉 {cta}
            </div>
          )}
          {(status === "active" || status === "coming") && (
          <>
            <div
            className={`

              my-[10px]
              min-w-0
              truncate
              text-center
              text-[clamp(10px,1.8vw,11px)]
              leading-tight
              text-wrap
              
              ${status === "coming" ? "text-gray-400 opacity-80" : "text-lime-400"  }

            `}
          >
            🎁 {promotionProgram} &nbsp;
            <FlashSaleCountdown
              layout={"horizontal"}
              status={status ?? "none"}
              timeStart={timeS}
              timeEnd={timeE}

            />
          </div>

          </>

        )}

        <div
          className="
          mt-auto
          flex
          gap-[clamp(3px,1.2vw,6px)]
          pt-[clamp(7px,2.5vw,10px)]
          "
        >
          {tiktokShopLink ? (
            <a
              href={tiktokShopLink}
              target="_blank"
              rel="noopener noreferrer"
              className="
                relative
                flex
                h-[clamp(24px,8vw,32px)]
                min-w-0
                flex-1
                items-center
                justify-center
                overflow-hidden
                rounded-[clamp(6px,1.5vw,8px)]
                bg-[linear-gradient(135deg,#3b82f6,#8b5cf6)]
                px-1
                text-[clamp(7px,2vw,10px)]
                font-semibold
                text-white
                ring-1
                ring-white/15
                transition
                active:scale-95
                md:h-9
                md:text-[11px]
              "
            >
              <span className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.18),transparent)] animate-[shine_4s_linear_infinite]" />

              <span className="relative z-10 truncate">
                  <span className="shrink-0 text-yellow-300">
                    ★ {rating}
                  </span> Tiktok
              </span>
            </a>
          ) : (
            <span
              className="
                flex
                h-[clamp(24px,8vw,32px)]
                min-w-0
                flex-1
                items-center
                justify-center
                rounded-[clamp(6px,1.5vw,8px)]
                bg-[linear-gradient(135deg,#3b82f6,#8b5cf6)]
                px-1
                text-[clamp(7px,2vw,10px)]
                font-semibold
                text-gray-300
                ring-1
                ring-white/10
                opacity-50
              "
            >
              TikTok
            </span>
          )}

          {affiliateLink ? (
            <a
              href={affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="
                relative
                flex
                h-[clamp(24px,8vw,32px)]
                min-w-0
                flex-1
                items-center
                justify-center
                overflow-hidden
                rounded-[clamp(6px,1.5vw,8px)]
                bg-[linear-gradient(135deg,#f50fb0,#dd034c)]
                px-1
                text-[clamp(7px,2vw,10px)]
                font-semibold
                text-white
                transition
                active:scale-95
                md:h-9
                md:text-[11px]
              "
            >
              <span className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.45),transparent)] animate-[shine_4s_linear_infinite]" />

              <span className="relative z-10 truncate">
                <span className="shrink-0 text-yellow-300">
                    ★ {rating}
                </span> Shopee
              </span>
            </a>
          ) : (
            <span
              className="
                flex
                h-[clamp(24px,8vw,32px)]
                min-w-0
                flex-1
                items-center
                justify-center
                rounded-[clamp(6px,1.5vw,8px)]
                bg-white/5
                px-1
                text-[clamp(7px,2vw,10px)]
                font-semibold
                text-gray-500
                ring-1
                ring-white/10
              "
            >
              Shopee
            </span>
          )}
        </div>

          <div className="mt-1.5 text-center text-[9px] text-white/30">
            Giá và ưu đãi có thể thay đổi theo thời điểm
          </div>
        </div>
      )}
    </div>
  )
}