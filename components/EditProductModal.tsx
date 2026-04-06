"use client"

import { useState, useEffect } from "react"
import { Product, Tag , ProductFilter, ProductReview} from "@/types/product"
import ProductReviewSlider from "./ProductReviewSlider"

type Props = {
  product: Product
  onClose: () => void
  onSave: (product: Product) => void
  tagOptions?: Tag[] // list tags mặc định từ database
  FilterItem?: ProductFilter[] // list tags mặc định từ database
}
type FilterDef = {
  id: number
  filter_name: string
  filter_slug: string
  values: string
}

function parseValues(str: string): string[] {
  return str
    .replace(/[{}"]/g, "")
    .split(",")
    .map(v => v.trim())
}

type FilterItem = {
  groupSlug: string
  valueSlug: string
}
// conver để hiện UI
function mapProductFilterToItems(filters: ProductFilter): FilterItem[] {
  if (!filters) return []

  const result: FilterItem[] = []

  filters.forEach(group => {
    group.value.forEach(v => {
      result.push({
        groupSlug: group.slug,
        valueSlug: v.slug
      })
    })
  })

  return result
}
// conver nguộc để luu db
function mapArrayToFilter(items: FilterItem[]): ProductFilter {
  const result: ProductFilter = []

  const groupMap: Record<string, FilterItem[]> = {}

  // group theo slug
  items.forEach(item => {
    if (!item.groupSlug || !item.valueSlug) return

    if (!groupMap[item.groupSlug]) {
      groupMap[item.groupSlug] = []
    }

    groupMap[item.groupSlug].push(item)
  })

  // build lại đúng structure
  Object.entries(groupMap).forEach(([slug, values]) => {
    const def = defaultFilter.find(f => f.slug === slug)
    if (!def) return

    result.push({
      id: def.id,
      slug: def.slug,
      name: def.name,
      value: values.map(v => {
        const found = def.value.find(opt => opt.slug === v.valueSlug)
        return found!
      })
    })
  })

  return result
}
const defaultFilter =[
  {
    "id": 1,
    "slug": "loai-da",
    "name": "Loại da",
    "value": [
      {
        "id": 1,
        "slug": "da-thuong",
        "value": "Da thường"
      },
      {
        "id": 2,
        "slug": "da-dau",
        "value": "Da dầu"
      },
      {
        "id": 3,
        "slug": "da-kho",
        "value": "Da khô"
      },
      {
        "id": 4,
        "slug": "da-hon-hop",
        "value": "Da hỗn hợp"
      },
      {
        "id": 5,
        "slug": "da-nhay-cam",
        "value": "Da nhạy cảm"
      }
    ]
  },
  {
    "id": 2,
    "slug": "cong-dung",
    "name": "Công dụng",
    "value": [
      {
        "id": 6,
        "slug": "lam-sach",
        "value": "Làm sạch"
      },
      {
        "id": 7,
        "slug": "duong-am",
        "value": "Dưỡng ẩm"
      },
      {
        "id": 8,
        "slug": "lam-sang-da",
        "value": "Làm sáng da"
      },
      {
        "id": 9,
        "slug": "tri-mun",
        "value": "Trị mụn"
      },
      {
        "id": 10,
        "slug": "kiem-soat-dau",
        "value": "Kiểm soát dầu"
      },
      {
        "id": 11,
        "slug": "chong-nang",
        "value": "Chống nắng"
      },
      {
        "id": 12,
        "slug": "chong-lao-hoa",
        "value": "Chống lão hóa"
      },
      {
        "id": 13,
        "slug": "lam-diu-da",
        "value": "Làm dịu da"
      },
      {
        "id": 14,
        "slug": "tay-te-bao-chet",
        "value": "Tẩy tế bào chết"
      },
      {
        "id": 15,
        "slug": "thu-nho-lo-chan-long",
        "value": "Thu nhỏ lỗ chân lông"
      }
    ]
  },
  {
    "id": 3,
    "slug": "thanh-phan",
    "name": "Thành phần",
    "value": [
      {
        "id": 16,
        "slug": "tu-nhien",
        "value": "Tự nhiên"
      },
      {
        "id": 17,
        "slug": "chiet-xuat-tu-nhien",
        "value": "Chiết xuất tự nhiên"
      },
      {
        "id": 18,
        "slug": "hoat-chat-hieu-qua-cao",
        "value": "Hoạt chất hiệu quả cao"
      }
    ]
  }
]

const defaultTag = [{
  "id": 1,
  "name": "Hàng Viết Được Yêu Thích",
  "slug": "hang_viet_duoc_yeu_thich"
}, {
  "id": 2,
  "name": "Best Choice",
  "slug": "best-choice"
}, {
  "id": 3,
  "name": "Giá tốt",
  "slug": "gia-tot"
}, {
  "id": 4,
  "name": "Yêu thích",
  "slug": "yeu-thich"
}, {
  "id": 5,
  "name": "Hàng hiệu",
  "slug": "hang-hieu"
}, {
  "id": 6,
  "name": "Cao cấp",
  "slug": "cao-cap"
}, {
  "id": 7,
  "name": "Hot trend",
  "slug": "hot-trend"
}, {
  "id": 8,
  "name": "Độc quyền",
  "slug": "doc-quyen"
}, {
  "id": 9,
  "name": "Mới ra mắt",
  "slug": "moi-ra-mat"
}]



/* ================= UTIL ================= */

function formatDatetimeLocal(time: string | null) {
  if (!time) return ""
  const date = new Date(time)
  const offset = date.getTimezoneOffset() * 60000
  const localDate = new Date(date.getTime() - offset)
  return localDate.toISOString().slice(0, 16)
}

/* ================= MAIN ================= */


export default function EditProductModal({
  product,
  onClose,
  onSave,
  tagOptions = defaultTag,

}: Props) {

const [localProductState, setLocalProductState] = useState<Product>({
  ...product,
  short_description: product.short_description || "",
  benefits: product.benefits || "",
  ingredients: product.ingredients || "",
  usage: product.usage || "",
  tags: product.tags || []
})



  useEffect(() => {
    setLocalProductState(product)
  }, [product])

const [filterItems, setFilterItems] = useState<FilterItem[]>([])

useEffect(() => {
  setFilterItems(mapProductFilterToItems(product.productfilter))
}, [product])


function handleReviewChange(newReviews: ProductReview[]) {
  setLocalProductState(prev => ({
    ...prev,
    reviews: newReviews
  }))
}
const [showPreview, setShowPreview] = useState(false)
useEffect(() => {
  handleReviewChange(product.reviews || [])
}, [product])

  if (!localProductState) return null
  function handleChange<K extends keyof Product>(
    field: K,
    value: Product[K]
  ) {
    setLocalProductState(prev => ({
      ...prev!,
      [field]: value
    }))
  }

function handleSubmit() {
  const updatedProduct: Product = {
    ...localProductState,
    productfilter: mapArrayToFilter(filterItems),
  }

  console.log(updatedProduct)
  onSave(updatedProduct)
}

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[700px] max-h-[85vh] overflow-y-auto">

        <p className="text-xl font-bold mb-4">Update Product</p>

        <div className="space-y-4">

          {/* NAME */}
          <div>
            <label className="block font-semibold mb-1">Product Name</label>
            <input
              value={localProductState.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="border w-full p-2 rounded"
            />
          </div>

          {/* IMAGE */}
          <div>
            <label className="block font-semibold mb-1">Image URL</label>
            <input
              value={localProductState.image}
              onChange={(e) => handleChange("image", e.target.value)}
              className="border w-full p-2 rounded"
            />
          </div>

          {/* LINKS */}
          <div>
            <label className="block font-semibold mb-1">Affiliate Link</label>
            <input
              value={localProductState.affiliate_link ?? ""}
              onChange={(e) => handleChange("affiliate_link", e.target.value)}
              className="border w-full p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Product Link</label>
            <input
              value={localProductState.product_link ?? ""}
              onChange={(e) => handleChange("product_link", e.target.value)}
              className="border w-full p-2 rounded"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block font-semibold mb-1">Short Description</label>
            <textarea
              value={localProductState.short_description}
              onChange={(e) => handleChange("short_description", e.target.value)}
              className="border w-full p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Benefits</label>
            <textarea
              value={localProductState.benefits || ""}
              onChange={(e) => handleChange("benefits", e.target.value)}
              className="border w-full p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Ingredients</label>
            <textarea
              value={localProductState.ingredients}
              onChange={(e) => handleChange("ingredients", e.target.value)}
              className="border w-full p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Usage</label>
            <textarea
              value={localProductState.usage}
              onChange={(e) => handleChange("usage", e.target.value)}
              className="border w-full p-2 rounded"
            />
          </div>
 {/* TAGS */}
<div>
  <label className="block font-semibold mb-2">Tags</label>

  <div className="space-y-2">

    {localProductState.tags.map((tag, index) => (
      <div key={index} className="flex gap-2">

        {/* DROPDOWN */}
        <select
          value={tag?.id || ""}
          onChange={(e) => {
            const selectedId = Number(e.target.value)

            const selectedTag = tagOptions.find(t => t.id === selectedId)

            const newTags = [...localProductState.tags]
            newTags[index] = selectedTag!

            handleChange("tags", newTags)
          }}
          className="border w-full p-2 rounded"
        >
          <option value="">-- Select tag --</option>

          {tagOptions.map(option => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>

        {/* DELETE BUTTON */}
        <button
          type="button"
          onClick={() => {
            const newTags = localProductState.tags.filter((_, i) => i !== index)
            handleChange("tags", newTags)
          }}
          className="px-3 bg-red-500 text-white rounded"
        >
          X
        </button>
      </div>
    ))}

  </div>

  {/* ADD BUTTON */}
  <button
    type="button"
    onClick={() => {
      handleChange("tags", [
        ...localProductState.tags,
        tagOptions[0] || { id: 0, name: "", slug: "" }
      ])
    }}
    className="mt-3 px-4 py-2 bg-blue-500 text-white rounded"
  >
    + Add Tag
  </button>
</div>

{/* FILTERS */}
<div>
  <label className="block font-semibold mb-2">Filters</label>

  <div className="space-y-2">

    {filterItems.map((item, index) => {
  const filterDef = defaultFilter.find(f => f.slug === item.groupSlug)
  const options = filterDef?.value || []

  return (
    <div key={index} className="flex gap-2">

      {/* GROUP */}
      <select
        value={item.groupSlug}
        onChange={(e) => {
          const newItems = [...filterItems]
          newItems[index] = {
            groupSlug: e.target.value,
            valueSlug: ""
          }
          setFilterItems(newItems)
        }}
        className="border p-2 rounded"
      >
        <option value="">-- Chọn loại --</option>

        {defaultFilter.map(f => (
          <option key={f.id} value={f.slug}>
            {f.name}
          </option>
        ))}
      </select>

      {/* VALUE */}
      <select
        value={item.valueSlug}
        onChange={(e) => {
          const newItems = [...filterItems]
          newItems[index].valueSlug = e.target.value
          setFilterItems(newItems)
        }}
        className="border p-2 rounded w-full"
      >
        <option value="">-- Chọn giá trị --</option>

        {options.map(v => (
          <option key={v.id} value={v.slug}>
            {v.value}
          </option>
        ))}
      </select>

      {/* DELETE */}
      <button
        type="button"
        onClick={() => {
          setFilterItems(filterItems.filter((_, i) => i !== index))
        }}
        className="px-3 bg-red-500 text-white rounded"
      >
        X
      </button>
    </div>
  )
})}

  </div>

  {/* ADD */}
  <button
    type="button"
    onClick={() => {
        setFilterItems([
          ...filterItems,
          { groupSlug: "", valueSlug: "" }
        ])
    }}
    className="mt-3 px-4 py-2 bg-blue-500 text-white rounded"
  >
    + Add Filter
  </button>
</div>

{/* REVIEWS */}
<div>
  <label className="block font-semibold mb-2">Reviews</label>

  <div className="space-y-3">

    {localProductState.reviews.map((r, index) => (
      <div key={index} className="flex gap-2 items-center">

        {/* TYPE */}
        <select
          value={r.media_type}
          onChange={(e) => {
            const newReviews = [...localProductState.reviews]
            newReviews[index].media_type = e.target.value as "image" | "video"
            handleReviewChange(newReviews)
          }}
          className="border p-2 rounded"
        >
          <option value="image">image</option>
          <option value="video">video</option>
        </select>

        {/* URL */}
        <input
          value={r.media_url || ""}
          onChange={(e) => {
            const newReviews = [...localProductState.reviews]
            newReviews[index].media_url = e.target.value
            handleReviewChange(newReviews)
          }}
          placeholder="media url"
          className="border w-full p-2 rounded"
        />

        {/* DELETE */}
        <button
          type="button"
          onClick={() => {
            const newReviews = localProductState.reviews
              .filter((_, i) => i !== index)
              .map((r, i) => ({
                ...r,
                display_order: i
              }))
            handleReviewChange(newReviews)
          }}
          className="px-3 bg-red-500 text-white rounded"
        >
          X
        </button>

      </div>
    ))}

  </div>

  {/* ADD */}
  <button
    type="button"
    onClick={() => {
      handleReviewChange([
        ...localProductState.reviews,
        {
          id: Date.now(),
          media_url: "",
          media_type: "image",
          display_order: localProductState.reviews.length
        }
      ])
    }}
    className="mt-3 px-4 py-2 bg-blue-500 text-white rounded"
  >
    + Add Review
  </button>
  <button
  type="button"
  onClick={() => setShowPreview(true)}
  className="mt-3 ml-2 px-4 py-2 bg-green-600 text-white rounded"
>
  Xem review
</button>
</div>
          {/* PRICE */}
          <div>
            <label className="block font-semibold mb-1">Pricing</label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                value={localProductState.original_price}
                onChange={(e) => handleChange("original_price", Number(e.target.value))}
                placeholder="Original price"
                className="border p-2 rounded"
              />
              <input
                type="number"
                value={localProductState.best_price}
                onChange={(e) => handleChange("best_price", Number(e.target.value))}
                placeholder="Best price"
                className="border p-2 rounded"
              />
            </div>
          </div>

          {/* STATS */}
          <div>
            <label className="block font-semibold mb-1">Product Stats</label>
            <div className="grid grid-cols-3 gap-3">
              <input
                type="number"
                value={localProductState.rating}
                onChange={(e) => handleChange("rating", Number(e.target.value))}
                placeholder="Rating"
                className="border p-2 rounded"
              />
              <input
                type="number"
                value={localProductState.review_count}
                onChange={(e) => handleChange("review_count", Number(e.target.value))}
                placeholder="Review count"
                className="border p-2 rounded"
              />
              <input
                type="number"
                value={localProductState.sold}
                onChange={(e) => handleChange("sold", Number(e.target.value))}
                placeholder="Sold"
                className="border p-2 rounded"
              />
            </div>
          </div>

          {/* FLASH SALE */}
          <div>
            <label className="block font-semibold mb-1">Flash Sale Time</label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="datetime-local"
                value={formatDatetimeLocal(localProductState.flash_sale_start)}
                onChange={(e) => handleChange("flash_sale_start", e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="datetime-local"
                value={formatDatetimeLocal(localProductState.flash_sale_end)}
                onChange={(e) => handleChange("flash_sale_end", e.target.value)}
                className="border p-2 rounded"
              />
            </div>
          </div>

        </div>
{showPreview && (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[999]">
    <div className="bg-[#0f172a] w-[95vw] md:w-[70vw] h-[80vh] rounded-xl p-3 md:p-4 relative flex flex-col overflow-hidden">

      {/* CLOSE */}
      <button
        onClick={() => setShowPreview(false)}
        className="absolute top-3 right-3 z-[1000] w-10 h-10 flex items-center justify-center rounded-full bg-red-500 text-white"
      >
        ✕
      </button>

      {/* CONTENT */}
      <div className="w-full h-full">
        {localProductState.reviews.length === 0 ? (
          <p className="text-sm text-center text-gray-400">
            Chưa có review
          </p>
        ) : (
          <ProductReviewSlider
            caption={localProductState.short_description || ""}
            productName={localProductState.name}
            affiliateLink={localProductState.affiliate_link}
            reviews={localProductState.reviews}
          />
        )}
      </div>

    </div>
  </div>
)}
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Save
          </button>
        </div>

      </div>
      
    </div>
    
  )
}