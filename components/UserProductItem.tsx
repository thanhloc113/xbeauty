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

      const res = await fetch(
        `/api/product-reviews?product_id=${product.id}`
      )
    const data = await res.json()


    const raw = data.reviews || []

    const formatted = raw.map((r: ReviewInput, index: number) => ({
      id: r.id,
      product_id: data.product_id, // 🔥 quan trọng
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
      ? Math.round(
          (1 - product.best_price / product.original_price) * 100
        )
      : 0

  return (
    <>

      <div className="border rounded-xl overflow-hidden hover:shadow-md transition">
      <img
          src={product.image}
          alt={product.name}
           className="w-full aspect-square object-cover rounded-t-xl"
      />

      {/* CONTENT */}
      <div className="p-4">

        <h2 className="font-semibold mt-1 text-sm leading-snug min-h-[60px] line-clamp-3">
          {product.name}
        </h2>

        {product.highlight_tag && (
          <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
            {product.highlight_tag}
          </span>
        )}

        <p className="text-xs text-blue-300 mt-1 min-h-[20px] line-clamp-2">
          {product.short_description}
        </p>
        <div className="text-xs text-gray-300 min-h-[20px]">
          Đã bán {formatNumber(product.sold)}+
        </div>
        <div className="mt-2 text-xs min-h-[20px]">
          ⭐ {product.rating} ({formatNumber(product.review_count)}+ reviews)
        </div>



        <div className="mt-2">
          <span className="text-red-600 font-bold mr-2">
            {formatPriceDisplay(product.best_price,status)?.toLocaleString()}
          </span>
          <span className="text-gray-400 line-through ">
            {formatNumber(product.original_price)?.toLocaleString()}
          </span>

          {discount > 0 && (
            <span className="ml-2 text-xs text-white bg-red-500 px-2 py-1 rounded">
              -{discount}%
            </span>
          )}
        </div>

        <div className="mt-2 text-xs min-h-[20px] flex items-center">
          {status === "active" && (
            <p className="text-red-500 font-medium">
              ⏳ Flashsale kết thúc sau {timeLeft}
            </p>
          )}

          {status === "coming" && (
            <p className="text-orange-500">
              ⏳ Flashsale bắt đầu sau {timeLeft}
            </p>
          )}

        </div>

        {/* BUTTONS */}

        <div className="flex gap-2 mt-3">

          <button
            onClick={() => setOpenReview(true)}
            className="
              relative flex-1 h-10 flex items-center justify-center text-sm font-medium 
              rounded-xl text-white overflow-hidden

              bg-[linear-gradient(135deg,#2563eb,#3b82f6)]

              shadow-[0_4px_10px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,0.3)]

              active:scale-[0.97]
              transition-all duration-200

              drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]
            "
           >


            <span className="relative z-10">Xem Review</span>
          </button>
          <a
           href={product.affiliate_link}
            target="_blank"
  className="
    relative flex-1 h-10 flex items-center justify-center text-sm font-medium 
    rounded-xl text-white overflow-hidden

    bg-[linear-gradient(135deg,#f50fb0,#ff7c11)]

    shadow-[0_4px_10px_rgba(0,0,0,0.25),inset_0_1px_2px_rgba(255,255,255,0.4)]

    active:scale-[0.97]
    transition-all duration-200
  "
>
  {/* Shine chạy liên tục */}
  <span
    className="
      absolute inset-0 
      bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.7),transparent)]
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
        
                  <div className="bg-[#0f172a] w-[70vw] h-[80vh] rounded-xl p-4 relative flex flex-col overflow-hidden">
        
                    <button
                      onClick={() => setOpenReview(false)}
                      className="absolute top-4 right-4 z-[1000]
                      w-11 h-11 flex items-center justify-center
                      rounded-full
                      bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600
                      text-white text-lg font-semibold
                      shadow-2xl
                      hover:scale-110 active:scale-95 transition-all"
                    >
                      ✕
                    </button>
        
                    <div className="w-full h-full">
                  {loading || reviews.length === 0 ? (
                    <p>Đang tải review...</p>
                  ) : (
                    <ProductReviewSlider
                      reviews={reviews}
                      caption={caption}
                    />
                  )}
                    </div>
        
                  </div>
                </div>
      )}
    </>
  )
}