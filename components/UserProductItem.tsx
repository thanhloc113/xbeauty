"use client"

import { Product } from "@/types/product"
import { useEffect, useState } from "react"
import ProductReviewSlider from "./ProductReviewSlider"
import { formatPriceDisplay, formatNumber } from "@/utils/formatPrice"

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

// ✅ NEW
function getFilterValues(product: Product, slug: string) {
  const group = product.productfilter?.find((g) => g.slug === slug)
  return group?.value.map((v) => v.value) || []
}

const skinTypeList = getFilterValues(product, "loai-da")
const benefitList = getFilterValues(product, "cong-dung")



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
          {product.tags?.length > 0 && (
            <span className="absolute top-2 left-2 text-[10px] md:text-xs bg-red-600 text-yellow-200 px-2 py-0.5 rounded-md shadow-md">
              {product.tags.map((t) => t.name).join(" - ")}
            </span>
          )}
        </div>

        {/* CONTENT */}
        <div className="p-2 md:p-4">
          {/* NAME */}
          <h2 className="font-semibold text-xs md:text-sm leading-snug line-clamp-2 md:line-clamp-3">
            {product.name}
          </h2>

          <div className="flex items-center justify-between text-[10px] md:text-xs mt-1">
            <div>⭐ {product.rating} ({formatNumber(product.review_count)}+ reviews)</div>
            <div className="text-gray-300">Đã bán {formatNumber(product.sold)}+</div>
          </div>

          {/* INGREDIENTS */}
          {product.ingredients && (
            <div className="text-[10px] text-gray-400 mt-1 line-clamp-1">
              🌿 {product.ingredients}
            </div>
          )}

          {/* SKIN TYPE */}
          {skinTypeList.length > 0 && (
            <div className="mt-1 text-[10px] md:text-xs text-blue-300">
              Phù hợp: <span className="font-medium">{skinTypeList.join(", ")}</span>
            </div>
          )}

          {/* BENEFITS */}
          {/* BENEFITS Đặc Biệt */}
          {/* {product.benefits && (
          <div className="text-[10px] text-green-300 mt-1">
            ✨ Đặc biệt: {product.benefits}
          </div>
        )} */}
          {benefitList.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {benefitList.map((b, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1 px-2 py-1 text-[10px] md:text-xs rounded-md border border-green-400/40 bg-green-500/10 text-green-300 whitespace-nowrap flex-none"
                >
                  <span className="text-green-400">✔</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          )}

          {/* USAGE */}
          {/* {product.usage && (
            <div className="text-[10px] text-yellow-300 mt-1">📌 {product.usage}</div>
          )} */}
          {product.cta && (
            <div className="text-[10px] text-yellow-300 mt-1">👉 {product.cta}</div>
          )}
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

          {/* FLASH SALE */}
          <div className="mt-1 text-[10px] md:text-xs min-h-[16px]">
            {status === "active" && <p className="text-red-500">⏳Flashsale kết thúc sau: {timeLeft}</p>}
            {status === "coming" && <p className="text-orange-400">⏳Flashsale sắp bắt đầu: {timeLeft}</p>}
          </div>

          {/* BUTTONS */}
          <div className="flex gap-1 mt-2">
            <button
              onClick={() => setOpenReview(true)}
              className="flex-1 h-8 text-[11px] md:h-10 md:text-sm flex items-center justify-center rounded-lg text-white bg-[linear-gradient(135deg,#3b82f6,#8b5cf6)] active:scale-95 transition"
            >
              Xem Chi Tiết
            </button>

            <a
              href={product.affiliate_link || "#"}
              target="_blank"
              className="relative flex-1 h-8 text-[11px] md:h-10 md:text-sm flex items-center justify-center rounded-lg text-white overflow-hidden bg-[linear-gradient(135deg,#f50fb0,#dd034c)] active:scale-95 transition"
            >
              <span className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.6),transparent)] animate-[shine_4s_linear_infinite]" />
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
              className="absolute top-3 right-3 z-[1000] w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 text-white text-sm md:text-lg shadow-xl active:scale-95 transition"
            >
              ✕
            </button>

            <div className="w-full h-full">
              {product.reviews.length === 0 ? (
                <p className="text-sm text-center text-gray-400">Reviews đang được cập nhật...</p>
              ) : (
                <ProductReviewSlider
                  short_description={product.short_description || ""}
                  productName={product.name}
                  affiliateLink={product.affiliate_link}
                  reviews={product.reviews}
                  benefit={product.benefits}
                  usage={product.usage}
                  ingredient={product.ingredients}

                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}