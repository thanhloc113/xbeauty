"use client"

import { useEffect, useState } from "react"
import ProductReviewSlider from "./ProductReviewSlider"
import TestPR from "./TestPR"

type Review = {
  media_type: "image" | "video"
  media_url: string
  display_order: number
}

type Product = {
  id: number
  name: string
  image: string
  short_description: string
  best_price: number
  original_price: number
  rating: number
  review_count: number
  sold: number
  flash_sale_start: string | null
  flash_sale_end: string | null
  affiliate_link: string
  preview: string
  tags: string[]
  reviews: Review[]
}

function getFlashSaleStatus(start: string | null, end: string | null) {
  const now = Date.now()
  if (!start || !end) return "none"

  const s = new Date(start).getTime()
  const e = new Date(end).getTime()

  if (now < s) return "coming"
  if (now <= e) return "active"
  return "ended"
}

function countdown(time: string) {
  const diff = new Date(time).getTime() - Date.now()
  if (diff <= 0) return "00:00:00"

  const h = Math.floor(diff / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)

  return `${h}:${m.toString().padStart(2, "0")}:${s
    .toString()
    .padStart(2, "0")}`
}

export default function TestCP() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/test/testdb")
        const data = await res.json()
        setProducts(data || [])
      } catch (err) {
        console.error("Fetch lỗi:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <p className="text-white">Đang tải sản phẩm...</p>

  return (
    <div className="flex flex-wrap gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

/* ================= ITEM ================= */

function ProductCard({ product }: { product: Product }) {
  const [status, setStatus] = useState<"none" | "coming" | "active" | "ended">("none")
  const [timeLeft, setTimeLeft] = useState("")
  const [openReview, setOpenReview] = useState(false)

  useEffect(() => {
    const run = () => {
      const st = getFlashSaleStatus(product.flash_sale_start, product.flash_sale_end)
      setStatus(st)

      if (st === "active" && product.flash_sale_end) {
        setTimeLeft(countdown(product.flash_sale_end))
      } else if (st === "coming" && product.flash_sale_start) {
        setTimeLeft(countdown(product.flash_sale_start))
      } else {
        setTimeLeft("00:00:00")
      }
    }

    run()
    const t = setInterval(run, 1000)
    return () => clearInterval(t)
  }, [product.flash_sale_start, product.flash_sale_end])

  const discount =
    product.original_price && product.best_price
      ? Math.round((1 - product.best_price / product.original_price) * 100)
      : 0

  return (
    <>
      <div className="w-[240px] border rounded-lg overflow-hidden bg-[#0f172a] text-white">

        <img src={product.image} className="w-full h-[200px] object-cover" />

        <div className="p-3">
          <h2 className="text-sm font-semibold line-clamp-2">{product.name}</h2>

          {/* TAG */}
          {product.tags?.[0] && (
            <span className="text-xs bg-red-500 px-2 py-0.5 rounded">
              {product.tags[0]}
            </span>
          )}

          <p className="text-xs text-gray-400 mt-1 line-clamp-2">
            {product.short_description}
          </p>

          <div className="text-xs mt-1">
            ⭐ {product.rating} ({product.review_count})
          </div>

          <div className="text-xs text-gray-400">
            Đã bán {product.sold}+
          </div>

          {/* PRICE */}
          <div className="mt-1">
            <span className="text-red-400 font-bold">
              {product.best_price?.toLocaleString()}
            </span>
            <span className="ml-2 text-gray-400 line-through text-xs">
              {product.original_price?.toLocaleString()}
            </span>
            {discount > 0 && (
              <span className="ml-1 text-xs bg-red-500 px-1 rounded">
                -{discount}%
              </span>
            )}
          </div>

          {/* FLASH */}
          <div className="text-xs mt-1">
            {status === "active" && <p className="text-red-400">⏳ {timeLeft}</p>}
            {status === "coming" && <p className="text-orange-400">⏳ {timeLeft}</p>}
          </div>

          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setOpenReview(true)}
              className="flex-1 bg-blue-500 rounded py-1 text-xs"
            >
              Review
            </button>

            <a
              href={product.affiliate_link}
              target="_blank"
              className="flex-1 bg-pink-500 rounded py-1 text-xs text-center"
            >
              Mua
            </a>
          </div>
        </div>
      </div>

      {/* POPUP */}
      {openReview && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="w-[90vw] h-[80vh] bg-black rounded-lg overflow-hidden relative">

            <button
              onClick={() => setOpenReview(false)}
              className="absolute top-3 right-3 text-white z-50"
            >
              ✕
            </button>

            <TestPR
              reviews={product.reviews}
              caption={product.preview}
              productName={product.name}
              affiliateLink={product.affiliate_link}
            />
          </div>
        </div>
      )}
    </>
  )
}