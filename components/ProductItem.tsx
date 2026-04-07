"use client"

import { Product } from "@/types/product"
import { useEffect, useState } from "react"
import { formatPriceDisplay, formatNumber } from "@/utils/formatPrice"
import EditProductModal from "./EditProductModal"
import ProductReviewSlider from "./ProductReviewSlider"


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




export default function ProductItem({
  product,
  onUpdated
}: {
  product: Product
  onUpdated?: () => void
}) {

  const [status, setStatus] = useState<"none" | "coming" | "active" | "ended">("none")
  const [timeLeft, setTimeLeft] = useState("")
  const [openEdit, setOpenEdit] = useState(false)

// logic update
const [editingProduct, setEditingProduct] = useState<Product | null>(null)
const [draft, setDraft] = useState<Product | null>(null)
const [saving, setSaving] = useState(false)
const displayProduct = draft ?? product
console.log(displayProduct.short_description)
// ✅ NEW
function getFilterValues(product: Product, slug: string) {
  const group = product.productfilter?.find((g) => g.slug === slug)
  return group?.value.map((v) => v.value) || []
}

const skinTypeList = getFilterValues(displayProduct, "loai-da")
const benefitList = getFilterValues(displayProduct, "cong-dung")
// funtion update
function handleSaveLocal(updated: Product) {
  setDraft(updated)
  setEditingProduct(null)
}
async function handleSaveToDB() {
  if (!draft) return

  try {
    setSaving(true)

    const res = await fetch(`/api/list-products/${draft.id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "device-id": localStorage.getItem("device-id") || ""
      },
      body: JSON.stringify(draft)
    })

    if (!res.ok) throw new Error()

    setDraft(null)
    onUpdated?.()

  } catch {
    alert("Lưu thất bại")
  } finally {
    setSaving(false)
  }
}

  useEffect(() => {

    function updateFlashSale() {

      const newStatus = getFlashSaleStatus(
        displayProduct.flash_sale_start,
        displayProduct.flash_sale_end
      )

      setStatus(newStatus)

      if (newStatus === "active" && displayProduct.flash_sale_end) {
        setTimeLeft(countdown(displayProduct.flash_sale_end))
      }

      if (newStatus === "coming" && displayProduct.flash_sale_start) {
        setTimeLeft(countdown(displayProduct.flash_sale_start))
      }

      if (newStatus === "ended") {
        setTimeLeft("00:00:00")
      }
    }

    updateFlashSale()

    const timer = setInterval(updateFlashSale, 1000)

    return () => clearInterval(timer)

  }, [displayProduct.flash_sale_start, displayProduct.flash_sale_end])

  const discount =
    displayProduct.original_price && displayProduct.best_price
      ? Math.round(
          (1 - displayProduct.best_price / displayProduct.original_price) * 100
        )
      : 0

  return (
    <>
      <div className="border rounded-xl p-4 hover:shadow-md transition">

       {/* IMAGE */}
        <div className="relative">
          <img
            src={displayProduct.image}
            alt={displayProduct.name}
            className="w-full h-full object-cover"
          />
          {/* TAG TOP LEFT */}
          {displayProduct.tags?.length > 0 && (
            <span className="absolute top-2 left-2 text-[10px] md:text-xs bg-red-600 text-yellow-200 px-2 py-0.5 rounded-md shadow-md">
              {displayProduct.tags.map((t) => t.name).join(" - ")}
            </span>
          )}
        </div>

          <h2 className="font-semibold text-xs md:text-sm leading-snug line-clamp-2 md:line-clamp-3">
            {displayProduct.name}
          </h2>
        <div className="flex items-center justify-between text-[10px] md:text-xs mt-1">
            <div>⭐ {displayProduct.rating} ({formatNumber(displayProduct.review_count)}+ reviews)</div>
            <div className="text-gray-300">Đã bán {formatNumber(displayProduct.sold)}+</div>
          </div>

          {/* INGREDIENTS */}
          {/* {displayProduct.ingredients && (
            <div className="text-[10px] text-gray-400 mt-1 line-clamp-1">
              🌿 {displayProduct.ingredients}
            </div>
          )} */}

          {/* SKIN TYPE */}
          {skinTypeList.length > 0 && (
            <div className="mt-1 text-[10px] md:text-xs text-blue-300">
              Phù hợp: <span className="font-medium">{skinTypeList.join(", ")}</span>
            </div>
          )}

          {/* BENEFITS */}
          {/* {displayProduct.benefits && (
            <div className="text-[10px] text-green-300 mt-1">
              ✨ Đặc biệt: {displayProduct.benefits}
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
          {/* {displayProduct.usage && (
            <div className="text-[10px] text-yellow-300 mt-1">📌 {displayProduct.usage}</div>
          )} */}

          {/* CTA */}
          {displayProduct.cta && (
            <div className="text-[10px] text-yellow-300 mt-1">👉 {displayProduct.cta}</div>
          )}
        <div className="mt-2">
          <span className="text-red-600 font-bold mr-2">
            {formatPriceDisplay(displayProduct.best_price,status)?.toLocaleString()}
          </span>
          <span className="text-gray-400 line-through ">
            {formatNumber(displayProduct.original_price)?.toLocaleString()}
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
            href={displayProduct.affiliate_link}
            target="_blank"
            className="flex-1 text-center bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
          >
           link tiếp thị
          </a>
                          <a
            href={displayProduct.product_link}
            target="_blank"
            className="flex-1 text-center bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
          >
           link product
          </a>
        </div>
        <div className="flex gap-2 mt-3">

          {/* EDIT PRODUCT */}
          <button
            onClick={() => setEditingProduct(displayProduct)}
            className="flex-1 text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Cập nhật
          </button>

          {/* SAVE */}
          {draft && (
            <button
              onClick={handleSaveToDB}
              disabled={saving}
              className="flex-1 text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {saving ? "Đang lưu..." : "Save"}
            </button>
          )}

        </div>

      </div>

      {/* EDIT REVIEW POPUP */}

{openEdit && (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[999]">
    <div className="bg-[#0f172a] w-[95vw] md:w-[70vw] h-[80vh] rounded-xl p-3 md:p-4 relative flex flex-col overflow-hidden">

      {/* CLOSE */}
      <button
        onClick={() => setOpenEdit(false)}
        className="absolute top-3 right-3 z-[1000] w-10 h-10 flex items-center justify-center rounded-full bg-red-500 text-white"
      >
        ✕
      </button>

      {/* CONTENT */}
      <div className="w-full h-full">
        {displayProduct.reviews.length === 0 ? (
          <p className="text-sm text-center text-gray-400">
            Chưa có review
          </p>
        ) : (
          <ProductReviewSlider
            short_description={displayProduct.short_description || ""}
            productName={displayProduct.name}
            affiliateLink={displayProduct.affiliate_link}
            reviews={displayProduct.reviews}
            benefit={displayProduct.benefits}
            usage={displayProduct.usage}
            ingredient={displayProduct.ingredients}
          />
        )}
      </div>

    </div>
  </div>
)}

        {editingProduct && (
        <>
          {/* OVERLAY */}
          <div
            className="fixed inset-0 bg-black/60 z-50"
            onClick={() => setEditingProduct(null)}
          />

          {/* MODAL */}
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="bg-white w-[95%] max-w-xl rounded-xl p-4 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setEditingProduct(null)}
                className="absolute top-2 right-2 text-gray-500"
              >
                ✕
              </button>

              <h2 className="font-semibold mb-4">
                Edit Product
              </h2>

              <EditProductModal
                product={editingProduct}
                onClose={() => setEditingProduct(null)}
                onSave={handleSaveLocal}
              />
            </div>
          </div>
        </>
      )}
    </>
  )
}