"use client"

import { useEffect, useState } from "react"
import ProductReviewSlider from "./ProductReviewSlider"
import { Product, ProductReview } from "@/types/product"

export default function EditProductReviews({
  product,
  onSave
}: {
  product: Product
  onSave?: (product: Product) => void
}) {
  const [reviews, setReviews] = useState<ProductReview[]>(product.reviews)
  const [showPreview, setShowPreview] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)


console.log(product)


  const changeField = (
    index: number,
    field: keyof ProductReview,
    value: string
  ) => {
    setReviews(prev => {
      const updated = [...prev]
      updated[index] = {
        ...updated[index],
        [field]: value
      }
      return updated
    })
  }

  const deleteReview = (index: number) => {
    setReviews(prev =>
      prev
        .filter((_, i) => i !== index)
        .map((r, i) => ({
          ...r,
          display_order: i
        }))
    )
  }

  const validate = () => {
    for (const r of reviews) {
      if (!r.media_url.trim()) {
        setMessage("Thiếu media URL ❌")
        return false
      }
    }
    return true
  }





  return (
    <div className="space-y-4">

      <div className="flex gap-2 items-center">
        <button  className="bg-black text-white px-3 py-1 rounded">
          Add review
        </button>

        <button onClick={() => setShowPreview(true)} className="bg-green-600 text-white px-3 py-1 rounded">
          Xem lại
        </button>

        <button

          disabled={loading}
          className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
        >
          {loading ? "Đang lưu..." : "Update All"}
        </button>

        {message && (
          <span className={`text-sm px-2 py-1 rounded ${
            message.includes("thành công")
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}>
            {message}
          </span>
        )}
      </div>

      <div className="max-h-[60vh] overflow-y-auto space-y-4">
        {reviews.map((r, i) => (
          <div key={i} className="border p-3 rounded space-y-2">

            <select
              value={r.media_type}
              onChange={(e) =>
                changeField(i, "media_type", e.target.value as "image" | "video")
              }
              className="border w-full p-1"
            >
              <option value="image">image</option>
              <option value="video">video</option>
            </select>

            <input
              value={r.media_url}
              onChange={(e) =>
                changeField(i, "media_url", e.target.value)
              }
              placeholder="media url"
              className="border w-full p-1"
            />

            <button
              onClick={() => deleteReview(i)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>

          </div>
        ))}
      </div>

       {/* REVIEW POPUP */}
            {showPreview && (
              <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[999]">
                <div className="bg-[#0f172a] w-[95vw] md:w-[70vw] h-[80vh] rounded-xl p-3 md:p-4 relative flex flex-col overflow-hidden">
                  <button
                    onClick={() => setShowPreview(false)}
                    className="absolute top-3 right-3 z-[1000] w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 text-white text-sm md:text-lg shadow-xl active:scale-95 transition"
                  >
                    ✕
                  </button>
      
                  <div className="w-full h-full">
                    {product.reviews.length === 0 ? (
                      <p className="text-sm text-center text-gray-400">Reviews đang được cập nhật...</p>
                    ) : (
                      <ProductReviewSlider
                        caption={product.short_description || ""}
                        productName={product.name}
                        affiliateLink={product.affiliate_link}
                        reviews={product.reviews}
      
                      />
                    )}
                  </div>
                </div>
              </div>
            )}

    </div>
  )
}