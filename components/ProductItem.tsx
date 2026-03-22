"use client"

import { Product } from "@/types/product"
import { useEffect, useState } from "react"
import EditProductReviews from "./EditProductReviews"
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


export default function ProductItem({ product }: { product: Product }) {

  const [status, setStatus] = useState<"none" | "coming" | "active" | "ended">("none")
  const [timeLeft, setTimeLeft] = useState("")
  const [openEdit, setOpenEdit] = useState(false)

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
      <div className="border rounded-xl p-4 hover:shadow-md transition">

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg"
        />

        <h2 className="font-semibold mt-3">{product.name}</h2>

        {product.highlight_tag && (
          <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
            {product.highlight_tag}
          </span>
        )}

        <p className="text-sm text-gray-500 mt-1">
          {product.short_description}
        </p>
        <div className="text-sm text-gray-300">
          Đã bán {formatNumber(product.sold)}+
        </div>
        <div className="mt-2 text-sm">
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

        {status === "active" && (
          <p className="text-red-500">
            🔥 Flash sale kết thúc sau {timeLeft}
          </p>
        )}

        {status === "coming" && (
          <p className="text-orange-500">
            ⏳ Flash sale bắt đầu sau {timeLeft}
          </p>
        )}

        {/* BUTTONS */}

        <div className="flex gap-2 mt-3">

          <button
            onClick={() => setOpenEdit(true)}
            className="flex-1 text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Review
          </button>

          <a
            href={product.affiliate_link}
            target="_blank"
            className="flex-1 text-center bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
          >
            Shopee
          </a>

        </div>

      </div>

      {/* EDIT REVIEW POPUP */}

      {openEdit && (
        <>
          {/* OVERLAY */}
          <div
            className="fixed inset-0 bg-black/60 z-50"
            onClick={() => setOpenEdit(false)}
          />

          {/* MODAL */}
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="bg-white w-[95%] max-w-xl rounded-xl p-4 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpenEdit(false)}
                className="absolute top-2 right-2 text-gray-500"
              >
                ✕
              </button>

              <h2 className="font-semibold mb-4">
                Edit Product Reviews
              </h2>

              <EditProductReviews
                productId={product.id}
                onClose={() => setOpenEdit(false)}
              />
            </div>
          </div>
        </>
      )}

    </>
  )
}