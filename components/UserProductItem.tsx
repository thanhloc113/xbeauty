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
  const [status, setStatus] = useState<
    "none" | "coming" | "active" | "ended"
  >("none")
  const [timeLeft, setTimeLeft] = useState("")
  const [openReview, setOpenReview] = useState(false)

  function getFilterValues(product: Product, slug: string) {
    const group = product.productfilter?.find((g) => g.slug === slug)
    return group?.value.map((v) => v.value) || []
  }

  const skinTypeList = getFilterValues(product, "loai-da")
  const skinCareList = getFilterValues(product, "skin-care")
  const makeupList = getFilterValues(product, "makeup")
  const benefitList = [...skinCareList, ...makeupList]

  // Ưu tiên thông tin giải quyết vấn đề; chỉ lấy tối đa 2 ý để card scan nhanh.
  const solutionList =
    benefitList.length > 0
      ? benefitList.slice(0, 2)
      : skinTypeList.length > 0
        ? skinTypeList.slice(0, 2)
        : []

  // FLASH SALE
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
      ? Math.round(
          (1 - product.best_price / product.original_price) * 100
        )
      : 0

  return (
    <>
      {/* QUICK SCAN
          Card này chỉ trả lời nhanh:
          - Có giải quyết vấn đề của tôi không?
          - Giá hiện tại bao nhiêu?
          - Có gì cần lưu ý?
          - Nơi bán có tín hiệu đáng tin không?
      */}
      <div className="w-full max-w-[250px] rounded-xl border border-pink-400/50 bg-[#24002f]/95 backdrop-blur-md overflow-hidden flex flex-col transition hover:border-pink-300/80 hover:shadow-lg">

        {/* IMAGE */}
        <div className="relative aspect-square bg-white overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />

          {product.tags?.length > 0 && (
            <span className="absolute top-1.5 left-1.5 max-w-[78%] truncate text-[9px] font-semibold bg-red-600 text-white px-1.5 py-0.5 rounded-md shadow-md">
              {product.tags[0].name}
            </span>
          )}
        </div>

        <div className="p-2 md:p-2.5 flex flex-col">

          {/* NAME + USER RATING */}
          <h2 className="font-semibold text-[11px] md:text-xs leading-snug line-clamp-2 text-fuchsia-200">
            {product.name}
          </h2>

          <div className="mt-1 flex items-center gap-1 text-[9px] md:text-[10px] text-gray-300 whitespace-nowrap overflow-hidden">
            <span className="text-yellow-300 font-medium">
              ★ {product.rating}
            </span>
            <span className="text-gray-400">
              ({formatNumber(product.review_count)}+)
            </span>
            <span className="text-gray-500">·</span>
            <span className="truncate">
              {formatNumber(product.sold)}+ đã bán
            </span>
          </div>

          {/* 01. SOLUTION
              Không dùng nhiều tag; chỉ cho thấy 1–2 vấn đề chính.
          */}
          {solutionList.length > 0 && (
            <div className="mt-2 rounded-lg bg-cyan-400/5 border border-cyan-400/20 px-2 py-1.5">
              <div className="text-[9px] md:text-[10px] text-cyan-300 leading-tight">
                🎯 {solutionList.join(" · ")}
              </div>
            </div>
          )}

          {/* 02. PRICE
              Chưa có dữ liệu so sánh thị trường/value-score trong Product,
              nên chỉ hiển thị giá thật và mức giảm, không tự tạo điểm "đáng tiền".
          */}
          <div className="mt-1.5 flex items-center gap-1.5 min-w-0">
            <span className="text-sm md:text-base font-bold text-white whitespace-nowrap">
              {formatPriceDisplay(
                product.best_price,
                status
              )?.toLocaleString()}
            </span>

            {product.original_price && (
              <span className="text-[9px] md:text-[10px] text-gray-500 line-through whitespace-nowrap">
                {formatNumber(product.original_price)?.toLocaleString()}
              </span>
            )}

            {discount > 0 && (
              <span className="text-[8px] md:text-[9px] text-white bg-red-500 px-1 py-0.5 rounded whitespace-nowrap">
                -{discount}%
              </span>
            )}
          </div>

          {/* FLASH SALE - chỉ giữ tín hiệu ngắn */}
          {(status === "active" || status === "coming") && (
            <div className="mt-0.5 text-[9px] md:text-[10px] leading-tight">
              {status === "active" && (
                <span className="text-red-300">🔥 {timeLeft}</span>
              )}
              {status === "coming" && (
                <span className="text-orange-300">⏳ {timeLeft}</span>
              )}
            </div>
          )}

          {/* 03. CAUTION
              Không có dữ liệu thì không render để card không bị kéo dài.
          */}
          {(product.hook || product.usage) && (
            <div className="mt-1.5 text-[9px] md:text-[10px] text-orange-200 leading-tight line-clamp-2">
              ⚠️ {product.hook || product.usage}
            </div>
          )}

          {/* 04. TRUST
              Chỉ dùng các tín hiệu đang có trong Product.
              Không tự nhận Official Store khi chưa có dữ liệu xác minh.
          */}
          <div className="mt-1.5 text-[9px] md:text-[10px] text-emerald-300 leading-tight truncate">
            🛡️ ★ {product.rating} · {formatNumber(product.review_count)}+ đánh giá
          </div>

          {/* ACTIONS */}
          <div className="flex gap-1.5 mt-2">
            <button
              onClick={() => setOpenReview(true)}
              className="flex-1 h-8 md:h-9 text-[10px] md:text-[11px] flex items-center justify-center rounded-lg text-white bg-[linear-gradient(135deg,#3b82f6,#8b5cf6)] active:scale-95 transition"
            >
              Phân tích
            </button>

            <a
              href={product.affiliate_link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex-1 h-8 md:h-9 text-[10px] md:text-[11px] flex items-center justify-center rounded-lg text-white overflow-hidden bg-[linear-gradient(135deg,#f50fb0,#dd034c)] active:scale-95 transition"
            >
              <span className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.6),transparent)] animate-[shine_4s_linear_infinite]" />
              <span className="relative z-10">Mua ngay</span>
            </a>
          </div>
        </div>
      </div>

      {/* DETAIL REVIEW */}
      {openReview && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[999] p-2">
          <div className="bg-[#0f172a] w-[95vw] md:w-[70vw] h-[88vh] rounded-xl p-3 md:p-4 relative flex flex-col overflow-hidden">
            <button
              onClick={() => setOpenReview(false)}
              className="absolute top-3 right-3 z-[1000] w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 text-white text-sm md:text-lg shadow-xl active:scale-95 transition"
            >
              ✕
            </button>

            <div className="w-full h-full">
              {product.reviews.length === 0 ? (
                <p className="text-sm text-center text-gray-400">
                  Reviews đang được cập nhật...
                </p>
              ) : (
                <ProductReviewSlider
                  short_description={product.short_description || ""}
                  productName={product.name}
                  affiliateLink={product.affiliate_link}
                  reviews={product.reviews}
                  benefit={product.benefits}
                  usage={product.usage}
                  ingredient={product.ingredients}
                  cta={product.cta}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
