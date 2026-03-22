"use client"

import { useEffect, useState } from "react"
import ProductReviewSlider from "./ProductReviewSlider"

type ReviewInput = {
  id?: number
  product_id: number
  media_type: "image" | "video"
  media_url: string
  display_order: number
}

export default function EditProductReviews({
  productId,
  onClose
}: {
  productId: number
  onClose?: () => void
}) {
  const [reviews, setReviews] = useState<ReviewInput[]>([])
  const [caption, setCaption] = useState("")
  const [showPreview, setShowPreview] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  console.log(reviews);
  // LOAD DATA
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/product-reviews?product_id=${productId}`)
      const data = await res.json()

      setCaption(data.caption || "")

      const formatted = (data.reviews || []).map((r: ReviewInput) => ({
        id: r.id,
        product_id: productId,
        media_type: r.media_type,
        media_url: r.media_url,
        display_order: r.display_order
      }))

      setReviews(formatted)
    }

    fetchData()
  }, [productId])

  // ADD
  const addReview = () => {
    setReviews(prev => [
      ...prev,
      {
        product_id: productId,
        media_type: "image",
        media_url: "",
        display_order: prev.length
      }
    ])
  }

  // CHANGE
  const changeField = (
    index: number,
    field: keyof ReviewInput,
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

  // DELETE
  const deleteReview = (index: number) => {
    setReviews(prev => {
      const updated = [...prev]
      updated.splice(index, 1)

      return updated.map((r, i) => ({
        ...r,
        display_order: i
      }))
    })
  }

  // SAVE ALL
  const saveAll = async () => {
    try {
      setLoading(true)
      setMessage(null)

      const res = await fetch("/api/product-reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          product_id: productId,
          caption,
          reviews
        })
      })

      if (!res.ok) throw new Error()

      // ✅ SUCCESS
      setMessage("Cập nhật thành công ✅")
      setShowPreview(false)

      // 🔥 đóng popup CHA sau 0.8s
      setTimeout(() => {
        onClose?.()
      }, 800)

    } catch (err) {
      console.error(err)
      setMessage("Cập nhật thất bại ❌")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">

      {/* ACTION */}
      <div className="flex gap-2 items-center">
        <button
          onClick={addReview}
          className="bg-black text-white px-3 py-1 rounded"
        >
          Add review
        </button>

        <button
          onClick={() => setShowPreview(true)}
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          Xem lại
        </button>

        <button
          onClick={saveAll}
          disabled={loading}
          className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
        >
          {loading ? "Đang lưu..." : "Update All"}
        </button>

        {message && (
          <span
            className={`text-sm px-2 py-1 rounded ${
              message.includes("thành công")
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {message}
          </span>
        )}
      </div>

      {/* CAPTION */}
      <div className="border p-3 rounded">
        <div className="text-sm mb-1 font-semibold">Caption (chung)</div>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="border w-full p-2"
        />
      </div>

      {/* LIST */}
      <div className="max-h-[60vh] overflow-y-auto space-y-4">
        {reviews.map((r, i) => (
          <div key={i} className="border p-3 rounded">

            <select
              value={r.media_type}
              onChange={(e) =>
                changeField(i, "media_type", e.target.value)
              }
              className="border w-full mb-2 p-1"
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
              className="border w-full mb-2 p-1"
            />

            <button
              onClick={() => deleteReview(i)}
              className="bg-red-500 text-white px-3 py-1 rounded mt-2"
            >
              Delete
            </button>

          </div>
        ))}
      </div>

      {/* PREVIEW */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[999]">

          <div className="bg-[#0f172a] w-[70vw] h-[80vh] rounded-xl p-4 relative flex flex-col overflow-hidden">

            <button
              onClick={() => setShowPreview(false)}
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
              <ProductReviewSlider
                reviews={reviews}
                caption={caption}
              />
            </div>

          </div>
        </div>
      )}

    </div>
  )
}