"use client"

import { Product } from "@/types/product"
import { ProductReview } from "@/types/review"
import { useEffect, useState } from "react"
import ProductReviewSlider from "./ProductReviewSlider"
import { formatPriceDisplay, formatNumber } from "@/utils/formatPrice"

type ReviewInput = {
  id?: number
  product_id: number
  media_type: "image" | "video"
  media_url: string
  display_order: number
}

function getFlashSaleStatus(start: string | null, end: string | null) {
  const now = Date.now()

  if (!start || !end) return "none"

  const startTime = new Date(start).getTime()
  const endTime = new Date(end).getTime()

  if (now < startTime) return "coming"
  if (now >= startTime && now <= endTime) return "active"

  return "ended"
}

function countdown(time: string) {
  const end = new Date(time).getTime()
  const now = Date.now()
  const diff = end - now

  if (diff <= 0) return "00:00:00"

  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`
}

export default function UserProductItem({ product }: { product: Product }) {
  const [status, setStatus] = useState<"none" | "coming" | "active" | "ended">("none")
  const [timeLeft, setTimeLeft] = useState("")
  const [openReview, setOpenReview] = useState(false)
  const [reviews, setReviews] = useState<ProductReview[]>([])
  const [caption, setCaption] = useState("")
  const [loading, setLoading] = useState(false)

  const benefitList = Array.isArray(product.benefits)
  ? product.benefits
  : product.benefits?.split(" ")

  const problemList = Array.isArray(product.main_problem)
  ? product.main_problem
  : product.main_problem?.split(",") || []

  /* FLASH SALE */
  useEffect(() => {
    function updateFlashSale() {
      const newStatus = getFlashSaleStatus(
        product.flash_sale_start,
        product.flash_sale_end
      )

      setStatus(newStatus)

      if (newStatus === "active" && product.flash_sale_end) {
        setTimeLeft(countdown(product.flash_sale_end))
      }

      if (newStatus === "coming" && product.flash_sale_start) {
        setTimeLeft(countdown(product.flash_sale_start))
      }

      if (newStatus === "ended") {
        setTimeLeft("00:00:00")
      }
    }

    updateFlashSale()
    const timer = setInterval(updateFlashSale, 1000)
    return () => clearInterval(timer)
  }, [product.flash_sale_start, product.flash_sale_end])

  /* LOAD REVIEW */
  useEffect(() => {
    if (!openReview) return

    const load = async () => {
      setLoading(true)

      const res = await fetch(`/api/product-reviews?product_id=${product.id}`)
      const data = await res.json()

      const raw = data.reviews || []

      const formatted = raw.map((r: ReviewInput, index: number) => ({
        id: r.id,
        product_id: data.product_id,
        media_type: r.media_type,
        media_url: r.media_url,
        display_order: r.display_order ?? index
      }))

      setReviews(formatted)
      setCaption(data.caption || "")
      setLoading(false)
    }

    load()
  }, [openReview, product.id])

  const discount =
    product.original_price && product.best_price
      ? Math.round((1 - product.best_price / product.original_price) * 100)
      : 0

  return (
    <>
      <div className="w-full max-w-[260px] rounded-xl border border-pink-400/60 backdrop-blur-md overflow-hidden flex flex-col">

        {/* IMAGE */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />

          {/* TAG TOP LEFT */}
          {product.highlight_tag && (
            <span
              className="
                absolute top-2 left-2
                text-[10px] md:text-xs
                bg-red-500 text-white
                px-2 py-0.5 rounded-md
                shadow-md
              "
            >
              {product.highlight_tag}
            </span>
          )}
        </div>

        {/* CONTENT */}
        <div className="p-2 md:p-4">

          {/* NAME */}
          <h2 className="font-semibold text-xs md:text-sm leading-snug line-clamp-2 md:line-clamp-3">
            {product.name}
          </h2>

          {/* DESC */}
          {/* <p className="text-[10px] md:text-xs text-pink-300 mt-1 line-clamp-2 min-h-[20px]">
            {product.short_description}
          </p> */}

          {/* SKIN TYPE */}
          {product.skin_type && (
            <div className="mt-1 text-[10px] md:text-xs text-blue-300">
              Phù hợp: <span className="font-medium">{product.skin_type}</span>
            </div>
          )}

          {/* MAIN PROBLEM */}
          
          {problemList.length > 0 && (
            <div className="mt-1">
              <p className="text-[10px] md:text-xs font-semibold text-red-400 uppercase tracking-wide">
                Giảm thiểu các tình trạng:
              </p>

              <ul className="text-[10px] md:text-xs text-red-300 space-y-0.5 mt-0.5">
                {(Array.isArray(product.main_problem)
                  ? product.main_problem
                  : product.main_problem.split(",")
                ).map((b: string, i: number) => (
                  <li key={i}>• {b.trim()}</li>
                ))}
              </ul>
            </div>
          )}

          {/* BENEFITS */}
          {product.benefits && (
            <div className="mt-2">
              {/* <p className="text-[10px] md:text-xs font-semibold text-green-400 uppercase tracking-wide mb-1">
                Hiệu quả
              </p> */}

             <div className="relative w-full min-w-0">
              <div
                className="
                  flex gap-1
                  overflow-x-auto
                  no-scrollbar
                  scroll-smooth
                  snap-x snap-mandatory
                  overscroll-x-contain
                  pb-1
                "
              >
                {(Array.isArray(product.benefits)
                  ? product.benefits
                  : product.benefits.split(",")
                ).map((b: string, i: number) => (
                  <div
                    key={i}
                    className="
                      flex-shrink-0 snap-start
                      flex items-center gap-1
                      px-2 py-1
                      text-[10px] md:text-xs
                      rounded-md
                      border border-green-400/40
                      bg-green-500/10
                      text-green-300
                      whitespace-nowrap
                    "
                  >
                    <span className="text-green-400">✔</span>
                    <span>{b.trim()}</span>
                  </div>
                ))}
              </div>

              {/* fade */}
              <div className="absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-[#0f172a] to-transparent pointer-events-none" />
            </div>
            </div>
          )}

          {/* SOLD */}
          <div className="text-[10px] md:text-xs text-gray-300">
            Đã bán {formatNumber(product.sold)}+
          </div>

          {/* RATING */}
          <div className="text-[10px] md:text-xs mt-1">
            ⭐ {product.rating} ({formatNumber(product.review_count)}+ reviews)
          </div>

          {/* PRICE */}
          <div className="mt-1">
            <span className="text-red-500 font-bold text-sm md:text-base mr-1">
              {formatPriceDisplay(product.best_price, status)?.toLocaleString()}
            </span>

            <span className="text-gray-400 line-through text-[10px] md:text-xs">
              {formatNumber(product.original_price)?.toLocaleString()}
            </span>

            {discount > 0 && (
              <span className="ml-1 text-[10px] text-white bg-red-500 px-1 py-0.5 rounded">
                {status === "active" ? `>-${discount}%` : `-${discount}%`}
              </span>
            )}
          </div>

          {/* INGREDIENTS */}
          {product.ingredients && (
            <div className="text-[10px] text-gray-400 mt-1 line-clamp-1">
              🌿 {product.ingredients}
            </div>
          )}

          {/* USAGE */}
          {product.usage && (
            <div className="text-[10px] text-yellow-300 mt-1">
              📌 {product.usage}
            </div>
          )}

          {/* FLASH SALE */}
          <div className="mt-1 text-[10px] md:text-xs min-h-[16px]">
            {status === "active" && (
              <p className="text-red-500">
                ⏳Flashsale kết thúc sau: {timeLeft}
              </p>
            )}

            {status === "coming" && (
              <p className="text-orange-400">
                ⏳Flashsale sắp bắt đầu: {timeLeft}
              </p>
            )}
          </div>

          {/* BUTTONS */}
          <div className="flex gap-1 mt-2">

            <button
              onClick={() => setOpenReview(true)}
              className="
                flex-1 h-8 text-[11px] md:h-10 md:text-sm
                flex items-center justify-center
                rounded-lg text-white
                bg-[linear-gradient(135deg,#3b82f6,#8b5cf6)]
                active:scale-95 transition
              "
            >
              Xem Reviews
            </button>

            <a
              href={product.affiliate_link}
              target="_blank"
              className="
                relative flex-1 h-8 text-[11px] md:h-10 md:text-sm
                flex items-center justify-center
                rounded-lg text-white overflow-hidden
                bg-[linear-gradient(135deg,#f50fb0,#dd034c)]
                active:scale-95 transition
              "
            >
              <span
                className="
                  absolute inset-0 
                  bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.6),transparent)]
                  animate-[shine_4s_linear_infinite]
                "
              />
              <span className="relative z-10">Mua Ngay</span>
            </a>
          </div>
        </div>
      </div>

      {/* REVIEW POPUP */}
      {openReview && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[999]">

          <div className="bg-[#0f172a] w-[95vw] md:w-[70vw] h-[80vh] rounded-xl p-3 md:p-4 relative flex flex-col overflow-hidden">

            <button
              onClick={() => setOpenReview(false)}
              className="absolute top-3 right-3 z-[1000]
              w-9 h-9 md:w-11 md:h-11 flex items-center justify-center
              rounded-full
              bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600
              text-white text-sm md:text-lg
              shadow-xl
              active:scale-95 transition"
            >
              ✕
            </button>

            <div className="w-full h-full">
              <div className="w-full h-full">
                {loading ? (
                  <p className="text-sm">Đang tải review...</p>
                ) : reviews.length === 0 ? (
                  <p className="text-sm text-center text-gray-400">
                    Reviews đang được cập nhật...
                  </p>
                ) : (
                  <ProductReviewSlider
                    reviews={reviews}
                    caption={caption}
                    productName={product.name}
                    affiliateLink={product.affiliate_link}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}