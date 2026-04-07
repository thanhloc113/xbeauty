"use client"

import { useState } from "react"
import { Product } from "@/types/product"
import ProductItem from "./ProductItem"
import UserProductItem from "./UserProductItem"

type Props = {
  onClose: () => void
}
// types/product.ts
export type Category = {
  id: number
  name: string
  slug: string
}

export type Industry = {
  id: number
  name: string
  slug: string
}



/* ================= DEFAULT ================= */
const defaultCategories = [
  {
    "id": 2,
    "name": "Kem Chống Nắng"
  },
  {
    "id": 3,
    "name": "Sửa Rửa Mặt"
  },
  {
    "id": 13,
    "name": "Nước Tẩy Trang"
  },
  {
    "id": 7,
    "name": "Serum"
  },
  {
    "id": 16,
    "name": "Kem Dưỡng Ẩm"
  },
  {
    "id": 14,
    "name": "Toner"
  },
  {
    "id": 15,
    "name": "Body Care"
  },
  {
    "id": 10,
    "name": "Son Của Em"
  },
  {
    "id": 9,
    "name": "Kem Lót"
  },
  {
    "id": 5,
    "name": "Kem Nền (Foundation) & Cushion"
  },
  {
    "id": 1,
    "name": "Che Khuyết Điểm"
  },
  {
    "id": 11,
    "name": "Phấn Mắt"
  },
  {
    "id": 8,
    "name": "Phấn Tạo Khối"
  },
  {
    "id": 6,
    "name": "Phần Phủ"
  },
  {
    "id": 4,
    "name": "Mascara"
  },
  {
    "id": 12,
    "name": "Xịt Khóa Nền"
  }
]

const defaultIndustries = [
  { id: 1, name: "Cosmetics", slug: "cosmetics" },
  { id: 2, name: "Pharmaceuticals", slug: "pharmaceuticals" },
  { id: 3, name: "Wellness", slug: "wellness" },
]

const defaultTag = [
  { id: 1, name: "Hàng Viết Được Yêu Thích", slug: "hang_viet_duoc_yeu_thich" },
  { id: 2, name: "Best Choice", slug: "best-choice" },
  { id: 3, name: "Giá tốt", slug: "gia-tot" },
  { id: 4, name: "Yêu thích", slug: "yeu-thich" },
  { id: 5, name: "Hàng hiệu", slug: "hang-hieu" },
  { id: 6, name: "Cao cấp", slug: "cao-cap" },
  { id: 7, name: "Hot trend", slug: "hot-trend" },
  { id: 8, name: "Độc quyền", slug: "doc-quyen" },
  { id: 9, name: "Mới ra mắt", slug: "moi-ra-mat" }
]

const defaultFilter = [
  {
    id: 1,
    slug: "loai-da",
    name: "Loại da",
    value: [
      { id: 1, slug: "da-thuong", value: "Da thường" },
      { id: 2, slug: "da-dau", value: "Da dầu" },
      { id: 3, slug: "da-kho", value: "Da khô" },
      { id: 4, slug: "da-hon-hop", value: "Da hỗn hợp" },
      { id: 5, slug: "da-nhay-cam", value: "Da nhạy cảm" }
    ]
  },
  {
    id: 2,
    slug: "cong-dung",
    name: "Công dụng",
    value: [
      { id: 6, slug: "lam-sach", value: "Làm sạch" },
      { id: 7, slug: "duong-am", value: "Dưỡng ẩm" },
      { id: 8, slug: "lam-sang-da", value: "Làm sáng da" },
      { id: 9, slug: "tri-mun", value: "Trị mụn" },
      { id: 10, slug: "kiem-soat-dau", value: "Kiểm soát dầu" }
    ]
  },
  {
    id: 3,
    slug: "thanh-phan",
    name: "Thành phần",
    value: [
      { id: 16, slug: "tu-nhien", value: "Tự nhiên" },
      { id: 17, slug: "chiet-xuat-tu-nhien", value: "Chiết xuất tự nhiên" },
      { id: 18, slug: "hoat-chat-hieu-qua-cao", value: "Hoạt chất hiệu quả cao" }
    ]
  }
]
/* ================= INIT ================= */

function createEmptyProduct(): Product {
  return {
    id:1000000000,
    name: "",
    image: "",
    affiliate_link: "",
    short_description: "",
    benefits: "",
    ingredients: "",
    usage: "",
    best_price: 0,
    original_price: 0,
    rating: 0,
    review_count: 0,
    sold: 0,
    flash_sale_start: "",
    flash_sale_end: "",
    product_link: "",
    reviews: [],
    tags: [],
    productfilter: [],
    category_id :0,
    cta:""
  }
}

/* ================= MAIN ================= */

export default function AddProductModal({ onClose }: Props) {
  const [product, setProduct] = useState<Product>(createEmptyProduct())
  const [showPreview, setShowPreview] = useState(false)
  function updateField<K extends keyof Product>(key: K, value: Product[K]) {
    setProduct(prev => ({ ...prev, [key]: value }))
  }

async function handleSubmit() {
  try {
    const res = await fetch("/api/admin/add-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })

    const data = await res.json()

    if (!res.ok || !data.success) {
      alert("Lỗi khi lưu sản phẩm: " + (data.error || "Unknown error"))
      return
    }

    alert("Sản phẩm đã lưu thành công! ID: " + data.product_id)

    // Gọi callback onSave để update danh sách ngoài parent
    // onSave({ ...product, id: data.product_id })

    // Reset form (nếu muốn)
    setProduct(createEmptyProduct())
    setShowPreview(false)
    onClose() // đóng modal
  } catch (err) {
    console.error(err)
    alert("Có lỗi xảy ra khi lưu sản phẩm")
  }
}

  /* ================= REVIEW ================= */

  function updateReviews(reviews: Product["reviews"]) {
    updateField("reviews", reviews)
  }

function addFilterGroup(slug: string) {
  if (!slug) return

  const exist = product.productfilter.find(g => g.slug === slug)
  if (exist) return

  const def = defaultFilter.find(f => f.slug === slug)
  if (!def) return

  updateField("productfilter", [
    ...product.productfilter,
    {
      id: def.id, // ✅ thêm dòng này
      slug: def.slug,
      name: def.name,
      value: []
    }
  ])
}

function updateFilterValue(groupSlug: string, valueSlug: string) {
  const def = defaultFilter.find(f => f.slug === groupSlug)
  if (!def) return

  const val = def.value.find(v => v.slug === valueSlug)
  if (!val) return

  const newFilter = product.productfilter.map(group => {
    if (group.slug !== groupSlug) return group

    // chống duplicate
    if (group.value.some(v => v.slug === valueSlug)) return group

    return {
      ...group,
      value: [...group.value, { id: val.id, slug: val.slug, value: val.value }]
    }
  })

  updateField("productfilter", newFilter)
}

function removeFilterValue(groupSlug: string, valueSlug: string) {
  const newFilter = product.productfilter.map(group => {
    if (group.slug !== groupSlug) return group

    return {
      ...group,
      value: group.value.filter(v => v.slug !== valueSlug)
    }
  })

  updateField("productfilter", newFilter)
}
  /* ================= UI ================= */

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-[750px] max-h-[90vh] overflow-y-auto">

        <h2 className="text-xl font-bold mb-4">Create Product</h2>

        {/* BASIC */}
        <label className="block font-semibold mb-1">Product Name</label>
        <input
          placeholder="Name"
          value={product.name}
          onChange={(e) => updateField("name", e.target.value)}
          className="border w-full p-2 rounded mb-3"
        />
        <label className="block font-semibold mb-1">Image URL</label>
        <input
          placeholder="Image URL"
          value={product.image}
          onChange={(e) => updateField("image", e.target.value)}
          className="border w-full p-2 rounded mb-3"
        />
        <label className="block font-semibold mb-1">Affiliate Link</label>
        <input
          placeholder="Affiliate Link"
          value={product.affiliate_link}
          onChange={(e) => updateField("affiliate_link", e.target.value)}
          className="border w-full p-2 rounded mb-3"
        />
        <label className="block font-semibold mb-1">Product Link</label>
        <input
          placeholder="Product Link"
          value={product.product_link}
          onChange={(e) => updateField("product_link", e.target.value)}
          className="border w-full p-2 rounded mb-4"
        />

        {/* TEXT */}
        <label className="block font-semibold mb-1">Short description</label>
        <textarea
          placeholder="Short description"
          value={product.short_description}
          onChange={(e) => updateField("short_description", e.target.value)}
          className="border w-full p-2 rounded mb-3"
        />

        <label className="block font-semibold mb-1">Benefits</label>
        <textarea
          placeholder="Benefits"
          value={product.benefits}
          onChange={(e) => updateField("benefits", e.target.value)}
          className="border w-full p-2 rounded mb-3"
        />

        <label className="block font-semibold mb-1">Ingredients</label>
        <textarea
          placeholder="Ingredients"
          value={product.ingredients}
          onChange={(e) => updateField("ingredients", e.target.value)}
          className="border w-full p-2 rounded mb-3"
        />

        <label className="block font-semibold mb-1">Usage</label>
        <textarea
          placeholder="Usage"
          value={product.usage}
          onChange={(e) => updateField("usage", e.target.value)}
          className="border w-full p-2 rounded mb-4"
        />

        {/* PRICE */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <label className="block font-semibold mb-1">Original price</label>
          <input
            type="number"
            placeholder="Original price"
            value={product.original_price}
            onChange={(e) => updateField("original_price", Number(e.target.value))}
            className="border p-2 rounded"
          />
          <label className="block font-semibold mb-1">Best price </label>
          <input
            type="number"
            placeholder="Best price"
            value={product.best_price}
            onChange={(e) => updateField("best_price", Number(e.target.value))}
            className="border p-2 rounded"
          />
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div>
            <label className="block font-semibold mb-1">Rating </label>
          <input
            type="number"
            placeholder="Rating"
            value={product.rating}
            onChange={(e) => updateField("rating", Number(e.target.value))}
            className="border p-2 rounded"
          />
          </div>
          <div>
          <label className="block font-semibold mb-1">Review count </label>
          <input
            type="number"
            placeholder="Review count"
            value={product.review_count}
            onChange={(e) => updateField("review_count", Number(e.target.value))}
            className="border p-2 rounded"
          /></div>
          <div>
          <label className="block font-semibold mb-1">Sold </label>
          <input
            type="number"
            placeholder="Sold"
            value={product.sold}
            onChange={(e) => updateField("sold", Number(e.target.value))}
            className="border p-2 rounded"
          />
          </div>
        </div>

        {/* FLASH SALE */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
          <label className="block font-semibold mb-1">flash sale start </label>
          <input
            type="datetime-local"
            value={product.flash_sale_start}
            onChange={(e) => updateField("flash_sale_start", e.target.value)}
            className="border p-2 rounded"
          />
          </div>
          <div>
          <label className="block font-semibold mb-1">flash sale end </label>
          <input
            type="datetime-local"
            value={product.flash_sale_end}
            onChange={(e) => updateField("flash_sale_end", e.target.value)}
            className="border p-2 rounded"
          />
          </div>
        </div>

        {/* TAG */}
        <div className="mb-4">
          <p className="font-semibold mb-2">Tags</p>

          {product.tags.map((tag, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <select
                value={tag.id}
                onChange={(e) => {
                  const selected = defaultTag.find(t => t.id === Number(e.target.value))!
                  const newTags = [...product.tags]
                  newTags[i] = selected
                  updateField("tags", newTags)
                }}
                className="border p-2 rounded w-full"
              >
                {defaultTag.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>

              <button
                onClick={() =>
                  updateField("tags", product.tags.filter((_, idx) => idx !== i))
                }
                className="px-3 bg-red-500 text-white rounded"
              >
                X
              </button>
            </div>
          ))}

          <button
            onClick={() => updateField("tags", [...product.tags, defaultTag[0]])}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            + Add Tag
          </button>
        </div>

        {/* REVIEWS */}
        <div className="mb-4">
          <p className="font-semibold mb-2">Reviews</p>

          {product.reviews.map((r, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <select
                value={r.media_type}
                onChange={(e) => {
                  const newReviews = [...product.reviews]
                  newReviews[index].media_type = e.target.value as "image" | "video"
                  updateReviews(newReviews)
                }}
                className="border p-2 rounded"
              >
                <option value="image">image</option>
                <option value="video">video</option>
              </select>

              <input
                value={r.media_url}
                onChange={(e) => {
                  const newReviews = [...product.reviews]
                  newReviews[index].media_url = e.target.value
                  updateReviews(newReviews)
                }}
                className="border p-2 rounded w-full"
              />

              <button
                onClick={() =>
                  updateReviews(product.reviews.filter((_, i) => i !== index))
                }
                className="px-3 bg-red-500 text-white rounded"
              >
                X
              </button>
            </div>
          ))}

          <button
            onClick={() =>
              updateReviews([
                ...product.reviews,
                {
                  id:10000000000000,
                  media_type: "image",
                  media_url: "",
                  display_order: product.reviews.length
                }
              ])
            }
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            + Add Review
          </button>
        </div>
          {/* FILTER */}
<div className="mb-5">
  <p className="font-semibold mb-2">Filters</p>

  {/* SELECT ADD NGAY */}
  <select
    onChange={(e) => {
      const slug = e.target.value
      if (!slug) return

      addFilterGroup(slug)
      e.target.value = ""
    }}
    className="border p-2 rounded mb-3 w-full"
  >
    <option value="">-- Thêm filter --</option>

    {defaultFilter
      .filter(
        f => !product.productfilter.some(g => g.slug === f.slug)
      )
      .map(f => (
        <option key={f.id} value={f.slug}>
          {f.name}
        </option>
      ))}
  </select>

  {/* LIST GROUP */}
  {product.productfilter.map(group => {
    const def = defaultFilter.find(f => f.slug === group.slug)
    if (!def) return null

    return (
      <div key={group.slug} className="mb-3 border p-3 rounded">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-2">
          <p className="font-semibold">{group.name}</p>

          <button
            onClick={() =>
              updateField(
                "productfilter",
                product.productfilter.filter(g => g.slug !== group.slug)
              )
            }
            className="text-red-500 text-sm"
          >
            X
          </button>
        </div>

        {/* VALUE */}
        <div className="flex flex-wrap gap-2">
          {def.value.map(v => {
            const selected = group.value.find(val => val.slug === v.slug)

            return (
              <button
                key={v.id}
                onClick={() =>
                  selected
                    ? removeFilterValue(group.slug, v.slug)
                    : updateFilterValue(group.slug, v.slug)
                }
                className={`px-3 py-1 rounded border ${
                  selected
                    ? "bg-blue-500 text-white"
                    : "bg-white"
                }`}
              >
                {v.value}
              </button>
            )
          })}
        </div>
      </div>
    )
  })}
</div>
{/* PREVIEW */}
<div className="mb-4">
  <button
    type="button"
    onClick={() => setShowPreview(prev => !prev)}
    className="px-3 py-1 bg-purple-500 text-white rounded mb-2"
  >
    {showPreview ? "Ẩn preview" : "Xem lại sản phẩm"}
  </button>

  {showPreview && (
    <div className="border p-3 rounded max-h-[400px] overflow-y-auto">
      <UserProductItem
        key={product.name} // nếu chưa có id
        product={product}

      />
    </div>
  )}
</div>
{/* CATEGORY */}
<div className="mb-4">
  <p className="font-semibold mb-2">Category</p>
  <select
    value={product.category_id ?? ""}
    onChange={(e) => updateField("category_id", Number(e.target.value))}
    className="border p-2 rounded w-full"
  >
    <option value="">-- Select Category --</option>
    {defaultCategories.map(c => (
      <option key={c.id} value={c.id}>{c.name}</option>
    ))}
  </select>
</div>
        {/* ACTION */}
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="border px-4 py-2 rounded">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  )
}