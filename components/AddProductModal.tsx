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

const defaultFilter =[
{"id":1,"slug":"loai-da","name":"Loại da","value":[{"id":1,"slug":"da-thuong","value":"Da thường"},{"id":2,"slug":"da-dau","value":"Da dầu"},{"id":3,"slug":"da-kho","value":"Da khô"},{"id":4,"slug":"da-hon-hop","value":"Da hỗn hợp"},{"id":5,"slug":"da-nhay-cam","value":"Da nhạy cảm"}]},{"id":2,"slug":"skin-care","name":"Skin Care","value":[{"id":19,"slug":"lam-sach-sau","value":"Làm sạch sâu"},{"id":20,"slug":"tay-trang","value":"Tẩy trang"},{"id":21,"slug":"loai-bo-ba-nhon","value":"Loại bỏ bã nhờn"},{"id":22,"slug":"lam-sach-diu-nhe","value":"Làm sạch dịu nhẹ"},{"id":23,"slug":"cap-am-tuc-thi","value":"Cấp ẩm tức thì"},{"id":24,"slug":"duong-am-sau","value":"Dưỡng ẩm sâu"},{"id":25,"slug":"phuc-hoi-da","value":"Phục hồi da (rất quan trọng)"},{"id":26,"slug":"tang-cuong-hang-rao-bao-ve-da","value":"Tăng cường hàng rào bảo vệ da"},{"id":27,"slug":"giam-bong-troc-kho-cang","value":"Giảm bong tróc khô căng"},{"id":28,"slug":"tri-mun-viem","value":"Trị mụn viêm"},{"id":29,"slug":"tri-mun-an","value":"Trị mụn ẩn"},{"id":30,"slug":"giam-mun-dau-den","value":"Giảm mụn đầu đen"},{"id":31,"slug":"ngua-mun","value":"Ngừa mụn"},{"id":32,"slug":"lam-diu-mun-sung-do","value":"Làm dịu mụn sưng đỏ"},{"id":33,"slug":"kiem-soat-dau","value":"Kiểm soát dầu"},{"id":34,"slug":"thu-nho-lo-chan-long","value":"Thu nhỏ lỗ chân lông"},{"id":35,"slug":"giam-bong-nhon","value":"Giảm bóng nhờn"},{"id":36,"slug":"lam-sang-da","value":"Làm sáng da"},{"id":37,"slug":"mo-tham-mun","value":"Mờ thâm mụn (cực kỳ quan trọng)"},{"id":38,"slug":"giam-nam-tan-nhang","value":"Giảm nám / tàn nhang"},{"id":39,"slug":"lam-deu-mau-da","value":"Làm đều màu da"},{"id":40,"slug":"chong-lao-hoa","value":"Chống lão hóa"},{"id":41,"slug":"giam-nep-nhan","value":"Giảm nếp nhăn"},{"id":42,"slug":"tang-dan-hoi-da","value":"Tăng đàn hồi da"},{"id":43,"slug":"san-chac-da","value":"Săn chắc da"},{"id":44,"slug":"tay-te-bao-chet-vat-ly","value":"Tẩy tế bào chết vật lý"},{"id":45,"slug":"tay-te-bao-chet-hoa-hoc","value":"Tẩy tế bào chết hóa học (AHA/BHA/PHA)"},{"id":46,"slug":"tai-tao-da","value":"Tái tạo da"},{"id":47,"slug":"lam-diu-da","value":"Làm dịu da"},{"id":48,"slug":"giam-kich-ung","value":"Giảm kích ứng"},{"id":49,"slug":"giam-do","value":"Giảm đỏ"},{"id":50,"slug":"phu-hop-da-nhay-cam","value":"Phù hợp da nhạy cảm"},{"id":51,"slug":"chong-nang","value":"Chống nắng"},{"id":52,"slug":"bao-ve-da-khoi-tia-uv","value":"Bảo vệ da khỏi tia UV"},{"id":53,"slug":"chong-anh-sang-xanh","value":"Chống ánh sáng xanh"}]},{"id":3,"slug":"makeup","name":"Makeup","value":[{"id":54,"slug":"che-phu-cao","value":"Che phủ cao"},{"id":55,"slug":"che-phu-nhe-tu-nhien","value":"Che phủ nhẹ tự nhiên"},{"id":56,"slug":"nang-tone-da","value":"Nâng tone da"},{"id":57,"slug":"lam-deu-mau-da","value":"Làm đều màu da"},{"id":58,"slug":"hieu-ung-li-matte","value":"Hiệu ứng lì (matte)"},{"id":59,"slug":"hieu-ung-cang-bong-glow-dewy","value":"Hiệu ứng căng bóng (glow/dewy)"},{"id":60,"slug":"bat-sang-highlight","value":"Bắt sáng (highlight)"},{"id":61,"slug":"tao-khoi-contour","value":"Tạo khối (contour)"},{"id":62,"slug":"lau-troi","value":"Lâu trôi"},{"id":63,"slug":"chong-nuoc","value":"Chống nước"},{"id":64,"slug":"chong-mo-hoi","value":"Chống mồ hôi"},{"id":65,"slug":"khong-xuong-tone","value":"Không xuống tone"},{"id":66,"slug":"khong-lem-khong-troi","value":"Không lem / không trôi"},{"id":67,"slug":"mong-nhe","value":"Mỏng nhẹ"},{"id":68,"slug":"khong-bet-dinh","value":"Không bết dính"},{"id":69,"slug":"khong-cakey-khong-moc-nen","value":"Không cakey / không mốc nền"},{"id":70,"slug":"thoang-da","value":"Thoáng da"},{"id":71,"slug":"de-tan","value":"Dễ tán"},{"id":72,"slug":"phu-hop-da-dau","value":"Phù hợp da dầu"},{"id":73,"slug":"phu-hop-da-kho","value":"Phù hợp da khô"},{"id":74,"slug":"phu-hop-da-nhay-cam","value":"Phù hợp da nhạy cảm"},{"id":75,"slug":"khong-gay-bit-tac-non-comedogenic","value":"Không gây bít tắc (non-comedogenic)"},{"id":76,"slug":"co-duong-am","value":"Có dưỡng ẩm"},{"id":77,"slug":"co-chong-nang-spf","value":"Có chống nắng (SPF)"},{"id":78,"slug":"kiem-dau","value":"Kiềm dầu"},{"id":79,"slug":"lam-diu-da","value":"Làm dịu da"}]}
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
    category_id :0,
    hook:"",
    cta:"",
    reviews: [],
    tags: [],
    productfilter: [],

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
        <div>
          <label className="block font-semibold mb-1">Hook</label>
          <input
            placeholder="Hook"
            value={product.hook}
            onChange={(e) => updateField("hook", e.target.value)}
            className="border w-full p-2 rounded mb-3"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">CTA</label>
          <input
            placeholder="CTA"
            value={product.cta}
            onChange={(e) => updateField("cta", e.target.value)}
            className="border w-full p-2 rounded mb-3"
          />
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