"use client"

import { useState, useEffect } from "react"
import { Product, Tag , ProductFilter, ProductReview, ProductIngredient} from "@/types/product"
import ProductReviewSlider from "./ProductReviewSlider"

type Props = {
  product: Product
  onClose: () => void
  onSave: (product: Product) => void
  tagOptions?: Tag[] // list tags mặc định từ database
  FilterItem?: ProductFilter[] // list tags mặc định từ database
  ingredientOptions?: ProductIngredient[]
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


const defaultFilter = [
  {
    id: 1,
    slug: "loai-da",
    name: "Loại da",
    filterValues: [
      { id: 1, slug: "da-thuong", value: "Da thường", score: 0 },
      { id: 2, slug: "da-dau", value: "Da dầu", score: 0 },
      { id: 3, slug: "da-kho", value: "Da khô", score: 0 },
      { id: 4, slug: "da-hon-hop", value: "Da hỗn hợp", score: 0 },
      { id: 5, slug: "da-nhay-cam", value: "Da nhạy cảm", score: 0 },
      { id: 81, slug: "moi-loai-da", value: "Mọi loại da", score: 0 },
    ],
  },

  {
    id: 2,
    slug: "skin-care",
    name: "Skin Care",
    filterValues: [
      { id: 19, slug: "lam-sach-sau", value: "Làm sạch sâu", score: 0 },
      { id: 20, slug: "lam-min-da", value: "lam-min-da", score: 0 },
      { id: 21, slug: "loai-bo-ba-nhon", value: "Loại bỏ bã nhờn", score: 0 },
      { id: 22, slug: "lam-sach-diu-nhe", value: "Làm sạch dịu nhẹ", score: 0 },
      { id: 23, slug: "cap-am-tuc-thi", value: "Cấp ẩm tức thì", score: 0 },
      { id: 24, slug: "duong-am-sau", value: "Dưỡng ẩm sâu", score: 0 },
      { id: 25, slug: "phuc-hoi-da", value: "Phục hồi da (rất quan trọng)", score: 0 },
      { id: 26, slug: "tang-cuong-hang-rao-bao-ve-da", value: "Tăng cường hàng rào bảo vệ da", score: 0 },
      { id: 27, slug: "giam-bong-troc-kho-cang", value: "Giảm bong tróc khô căng", score: 0 },
      { id: 28, slug: "tri-mun-viem", value: "Trị mụn viêm", score: 0 },
      { id: 29, slug: "tri-mun-an", value: "Trị mụn ẩn", score: 0 },
      { id: 30, slug: "giam-mun-dau-den", value: "Giảm mụn đầu đen", score: 0 },
      { id: 31, slug: "ngua-mun", value: "Ngừa mụn", score: 0 },
      { id: 32, slug: "lam-diu-mun-sung-do", value: "Làm dịu mụn sưng đỏ", score: 0 },
      { id: 33, slug: "kiem-soat-dau", value: "Kiểm soát dầu", score: 0 },
      { id: 34, slug: "thu-nho-lo-chan-long", value: "Thu nhỏ lỗ chân lông", score: 0 },
      { id: 35, slug: "giam-bong-nhon", value: "Giảm bóng nhờn", score: 0 },
      { id: 36, slug: "lam-sang-da", value: "Làm sáng da", score: 0 },
      { id: 37, slug: "mo-tham-mun", value: "Mờ thâm mụn (cực kỳ quan trọng)", score: 0 },
      { id: 38, slug: "giam-nam-tan-nhang", value: "Giảm nám / tàn nhang", score: 0 },
      { id: 39, slug: "lam-deu-mau-da", value: "Làm đều màu da", score: 0 },
      { id: 40, slug: "chong-lao-hoa", value: "Chống lão hóa", score: 0 },
      { id: 41, slug: "giam-nep-nhan", value: "Giảm nếp nhăn", score: 0 },
      { id: 42, slug: "tang-dan-hoi-da", value: "Tăng đàn hồi da", score: 0 },
      { id: 43, slug: "san-chac-da", value: "Săn chắc da", score: 0 },
      { id: 44, slug: "tay-te-bao-chet-vat-ly", value: "Tẩy tế bào chết vật lý", score: 0 },
      { id: 45, slug: "tay-te-bao-chet-hoa-hoc", value: "Tẩy tế bào chết hóa học (AHA/BHA/PHA)", score: 0 },
      { id: 46, slug: "tai-tao-da", value: "Tái tạo da", score: 0 },
      { id: 47, slug: "lam-diu-da", value: "Làm dịu da", score: 0 },
      { id: 48, slug: "giam-kich-ung", value: "Giảm kích ứng", score: 0 },
      { id: 49, slug: "giam-do", value: "Giảm đỏ", score: 0 },
      { id: 50, slug: "phu-hop-da-nhay-cam", value: "Phù hợp da nhạy cảm", score: 0 },
      { id: 51, slug: "chong-nang", value: "Chống nắng", score: 0 },
      { id: 52, slug: "bao-ve-da-khoi-tia-uv", value: "Bảo vệ da khỏi tia UV", score: 0 },
      { id: 53, slug: "chong-anh-sang-xanh", value: "Chống ánh sáng xanh", score: 0 },
      { id: 80, slug: "nang-tone", value: "Nâng Tone", score: 0 },
    ],
  },

  {
    id: 3,
    slug: "makeup",
    name: "Makeup",
    filterValues: [
      { id: 54, slug: "che-phu-cao", value: "Che phủ cao", score: 0 },
      { id: 55, slug: "che-phu-nhe-tu-nhien", value: "Che phủ nhẹ tự nhiên", score: 0 },
      { id: 56, slug: "nang-tone-da", value: "Nâng tone da", score: 0 },
      { id: 57, slug: "lam-deu-mau-da", value: "Làm đều màu da", score: 0 },
      { id: 58, slug: "hieu-ung-li-matte", value: "Hiệu ứng lì (matte)", score: 0 },
      { id: 59, slug: "hieu-ung-cang-bong-glow-dewy", value: "Hiệu ứng căng bóng (glow/dewy)", score: 0 },
      { id: 60, slug: "bat-sang-highlight", value: "Bắt sáng (highlight)", score: 0 },
      { id: 61, slug: "tao-khoi-contour", value: "Tạo khối (contour)", score: 0 },
      { id: 62, slug: "lau-troi", value: "Lâu trôi", score: 0 },
      { id: 63, slug: "chong-nuoc", value: "Chống nước", score: 0 },
      { id: 64, slug: "chong-mo-hoi", value: "Chống mồ hôi", score: 0 },
      { id: 65, slug: "khong-xuong-tone", value: "Không xuống tone", score: 0 },
      { id: 66, slug: "khong-lem-khong-troi", value: "Không lem / không trôi", score: 0 },
      { id: 67, slug: "mong-nhe", value: "Mỏng nhẹ", score: 0 },
      { id: 68, slug: "khong-bet-dinh", value: "Không bết dính", score: 0 },
      { id: 69, slug: "khong-cakey-khong-moc-nen", value: "Không cakey / không mốc nền", score: 0 },
      { id: 70, slug: "thoang-da", value: "Thoáng da", score: 0 },
      { id: 71, slug: "de-tan", value: "Dễ tán", score: 0 },
      { id: 72, slug: "phu-hop-da-dau", value: "Phù hợp da dầu", score: 0 },
      { id: 73, slug: "phu-hop-da-kho", value: "Phù hợp da khô", score: 0 },
      { id: 74, slug: "phu-hop-da-nhay-cam", value: "Phù hợp da nhạy cảm", score: 0 },
      { id: 75, slug: "khong-gay-bit-tac-non-comedogenic", value: "Không gây bít tắc (non-comedogenic)", score: 0 },
      { id: 76, slug: "co-duong-am", value: "Có dưỡng ẩm", score: 0 },
      { id: 77, slug: "co-chong-nang-spf", value: "Có chống nắng (SPF)", score: 0 },
      { id: 78, slug: "kiem-dau", value: "Kiềm dầu", score: 0 },
      { id: 79, slug: "lam-diu-da", value: "Làm dịu da", score: 0 },
    ],
  },
]

const defaultTag = [{
  "id": 1,
  "name": "Lành Tính",
  "slug": "lanh-tinh"
}, {
  "id": 2,
  "name": "Sản phâm được đánh giá cao",
  "slug": "san-pham-duoc-danh-gia-cao"
}, {
  "id": 3,
  "name": "Giá tốt",
  "slug": "gia-tot"
}, {
  "id": 4,
  "name": "Nhiêu ngươi tin dùng",
  "slug": "duoc-nhieu-nguoi-tin-dung"
}, {
  "id": 5,
  "name": "Hàng hiệu",
  "slug": "hang-hieu"
}, {
  "id": 6,
  "name": "Thương hiệu được yêu thích",
  "slug": "thuong-hieu-duoc-yeu-thich"
}, {
  "id": 7,
  "name": "Hot Trend",
  "slug": "hot-trend"
}, {
  "id": 8,
  "name": "Sản phẩm signature",
  "slug": "san-pham-signature"
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
  ingredientOptions = [],

}: Props) {

const [localProductState, setLocalProductState] = useState<Product>({
  ...product,
  short_description: product.short_description || "",
  benefits: product.benefits || "",
  ingredients: product.ingredients || [],
  usage: product.usage || "",
  tags: product.tags || []
})

const [ingredientSearch, setIngredientSearch] = useState("")
const [ingredientResults, setIngredientResults] = useState<ProductIngredient[]>([])
const [ingredientLoading, setIngredientLoading] = useState(false)
const [showCreateIngredient, setShowCreateIngredient] = useState(false)
const [newIngredientInci, setNewIngredientInci] = useState("")
const [creatingIngredient, setCreatingIngredient] = useState(false)

useEffect(() => {
  setLocalProductState(product)
}, [product])

async function searchIngredients(search: string) {
  const keyword = search.trim()

  if (keyword.length < 2) {
    setIngredientResults([])
    return
  }

  try {
    setIngredientLoading(true)

    const res = await fetch(
      `/api/ingredients?search=${encodeURIComponent(keyword)}`
    )

    if (!res.ok) {
      throw new Error("Failed to search ingredients")
    }

    const data = await res.json()

    setIngredientResults(data.ingredients ?? [])

  } catch (error) {
    console.error(error)
    setIngredientResults([])

  } finally {
    setIngredientLoading(false)
  }
}

useEffect(() => {
  const timeout = setTimeout(() => {
    searchIngredients(ingredientSearch)
  }, 300)

  return () => clearTimeout(timeout)
}, [ingredientSearch])

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

function addFilterGroup(slug: string) {
  if (!slug) return

  const exist = localProductState.productfilter.find(g => g.slug === slug)
  if (exist) return

  const def = defaultFilter.find(f => f.slug === slug)
  if (!def) return

  handleChange("productfilter", [
    ...localProductState.productfilter,
    {
      id: def.id,
      slug: def.slug,
      name: def.name,
      filterValues: []
    }
  ])
}

function updateFilterValue(
  groupSlug: string,
  valueSlug: string,
  score: number = 0
) {
  const def = defaultFilter.find(
    f => f.slug === groupSlug
  )

  if (!def) return

  const valDef = def.filterValues.find(
    v => v.slug === valueSlug
  )

  if (!valDef) return

  const newFilter = localProductState.productfilter.map(group => {
    if (group.slug !== groupSlug) return group

    const existingValue = group.filterValues.find(
      v => v.slug === valueSlug
    )

    // Nếu đã có → chỉ update score
    if (existingValue) {
      return {
        ...group,
        filterValues: group.filterValues.map(v =>
          v.slug === valueSlug
            ? {
                ...v,
                score,
              }
            : v
        ),
      }
    }

    const valueWithScore = {
      ...valDef,
      score,
    }

    // Logic riêng cho loại da
    if (groupSlug === "loai-da") {
      const isAllOption = valueSlug === "moi-loai-da"

      if (isAllOption) {
        return {
          ...group,
          filterValues: [valueWithScore],
        }
      }

      return {
        ...group,
        filterValues: [
          ...group.filterValues.filter(
            v => v.slug !== "moi-loai-da"
          ),
          valueWithScore,
        ],
      }
    }

    // Group khác
    return {
      ...group,
      filterValues: [
        ...group.filterValues,
        valueWithScore,
      ],
    }
  })

  handleChange("productfilter", newFilter)
}

function removeFilterValue(groupSlug: string, valueSlug: string) {
  const newFilter = localProductState.productfilter.map(group => {
    if (group.slug !== groupSlug) return group

    return {
      ...group,
      filterValues: group.filterValues.filter(v => v.slug !== valueSlug)
    }
  })

  handleChange("productfilter", newFilter)
}


function addIngredient(ingredient: ProductIngredient) {
  const currentIngredients =
    localProductState.ingredients ?? []

  const exists = currentIngredients.some(
    item => Number(item.id) === Number(ingredient.id)
  )

  if (exists) return

  const newIngredients = [
    ...currentIngredients,
    {
      ...ingredient,
      position: currentIngredients.length + 1,
      concentration: null,
      notes: null,
    },
  ]

  handleChange("ingredients", newIngredients)

  // Reset search
  setIngredientSearch("")
  setIngredientResults([])
}

async function createIngredient() {
  const name = ingredientSearch.trim()

  if (!name) return

  try {
    setCreatingIngredient(true)

    const res = await fetch("/api/ingredients", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "device-id": localStorage.getItem("device-id") || ""
      },

      body: JSON.stringify({
        name,
        inci_name: newIngredientInci.trim() || null,
      }),
    })

    const data = await res.json()

    console.log(res)

    if (!res.ok) {
      throw new Error(
        data.error || "Failed to create ingredient"
      )
    }

    // Tạo xong hoặc đã tồn tại
    addIngredient(data.ingredient)

    setNewIngredientInci("")
    setShowCreateIngredient(false)

  } catch (error) {
    console.error(error)

  } finally {
    setCreatingIngredient(false)
  }
}

function removeIngredient(index: number) {
  const newIngredients = localProductState.ingredients
    .filter((_, i) => i !== index)
    .map((ingredient, i) => ({
      ...ingredient,
      position: i + 1,
    }))

  handleChange("ingredients", newIngredients)
}

function updateIngredient(
  index: number,
  field: "concentration" | "notes",
  value: string
) {
  const newIngredients = [...localProductState.ingredients]

  newIngredients[index] = {
    ...newIngredients[index],
    [field]: value || null,
  }

  handleChange("ingredients", newIngredients)
}

function handleSubmit() {
  const updatedProduct: Product = {
    ...localProductState
  }
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

          {/* BRAND */}
          <div>
            <label className="block font-semibold mb-1">Brand</label>
            <input
              value={localProductState.brand ?? ""}
              onChange={(e) => handleChange("brand", e.target.value)}
              className="border w-full p-2 rounded"
            />
          </div>

          {/* IMAGE */}
          <div>
            <label className="block font-semibold mb-1">Image URL</label>
            <input
              value={localProductState.image ?? ""}
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
            <label className="block font-semibold mb-1">Tiktok Link</label>
            <input
              value={localProductState.tiktok_shop_link ?? ""}
              onChange={(e) => handleChange("tiktok_shop_link", e.target.value)}
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
          <div>
            <label className="block font-semibold mb-1">Hook</label>
            <textarea
              value={localProductState.hook || ""}
              onChange={(e) => handleChange("hook", e.target.value)}
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
            <label className="block font-semibold mb-1">Tổng quan tác dụng của thành phần</label>
            <textarea
              value={localProductState.ingredients_summary || ""}
              onChange={(e) => handleChange("ingredients_summary", e.target.value)}
              className="border w-full p-2 rounded"
            />
          </div>
      {/* INGREDIENTS */}

<div className="mt-4">
  <label className="mb-2 block font-semibold">
    Ingredients
  </label>

  {/* =========================
      CURRENT INGREDIENTS
  ========================== */}

  {(localProductState.ingredients?.length ?? 0) > 0 && (
    <div className="mb-4 space-y-3">
      {localProductState.ingredients?.map(
        (ingredient, index) => (
          <div
            key={ingredient.id}
            className="rounded-lg border bg-white p-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="font-medium">
                  {index + 1}. {ingredient.name}
                </div>

                {ingredient.inci_name && (
                  <div className="mt-1 text-sm text-gray-500">
                    INCI: {ingredient.inci_name}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="shrink-0 text-sm text-red-500 hover:underline"
              >
                Xóa
              </button>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm">
                  Nồng độ
                </label>

                <input
                  type="text"
                  value={ingredient.concentration ?? ""}
                  onChange={(e) =>
                    updateIngredient(
                      index,
                      "concentration",
                      e.target.value
                    )
                  }
                  placeholder="Ví dụ: 5%"
                  className="w-full rounded border p-2"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm">
                  Ghi chú
                </label>

                <input
                  type="text"
                  value={ingredient.notes ?? ""}
                  onChange={(e) =>
                    updateIngredient(
                      index,
                      "notes",
                      e.target.value
                    )
                  }
                  placeholder="Ghi chú về thành phần"
                  className="w-full rounded border p-2"
                />
              </div>
            </div>
          </div>
        )
      )}
    </div>
  )}

  {/* EMPTY STATE */}

  {(localProductState.ingredients?.length ?? 0) === 0 && (
    <div className="mb-4 rounded-lg border border-dashed p-4 text-center text-sm text-gray-500">
      Chưa có thành phần nào.
    </div>
  )}

  {/* =========================
      SEARCH INGREDIENT
  ========================== */}

  <div className="relative">
    <input
      type="text"
      value={ingredientSearch}
      onChange={(e) => {
        setIngredientSearch(e.target.value)
        setShowCreateIngredient(false)
      }}
      placeholder="Tìm thành phần để thêm..."
      className="w-full rounded border p-2"
    />

    {ingredientSearch.trim().length >= 2 &&
      !showCreateIngredient && (
        <div
          className="
            absolute
            z-20
            mt-1
            max-h-60
            w-full
            overflow-y-auto
            rounded
            border
            bg-white
            shadow-lg
          "
        >
          {ingredientLoading && (
            <div className="p-3 text-sm text-gray-500">
              Đang tìm...
            </div>
          )}

          {!ingredientLoading &&
            ingredientResults
              .filter(
                (result) =>
                  !(
                    localProductState.ingredients ?? []
                  ).some(
                    (ingredient) =>
                      Number(ingredient.id) ===
                      Number(result.id)
                  )
              )
              .map((ingredient) => (
                <button
                  key={ingredient.id}
                  type="button"
                  onClick={() => {
                    addIngredient(ingredient)

                    setIngredientSearch("")
                  }}
                  className="
                    block
                    w-full
                    border-b
                    p-3
                    text-left
                    last:border-b-0
                    hover:bg-gray-50
                  "
                >
                  <div className="font-medium">
                    {ingredient.name}
                  </div>

                  {ingredient.inci_name && (
                    <div className="mt-1 text-sm text-gray-500">
                      INCI: {ingredient.inci_name}
                    </div>
                  )}
                </button>
              ))}

          {/* CREATE NEW */}

          {!ingredientLoading &&
            ingredientResults.filter(
              (result) =>
                !(
                  localProductState.ingredients ?? []
                ).some(
                  (ingredient) =>
                    Number(ingredient.id) ===
                    Number(result.id)
                )
            ).length === 0 && (
              <button
                type="button"
                onClick={() =>
                  setShowCreateIngredient(true)
                }
                className="
                  block
                  w-full
                  p-3
                  text-left
                  text-sm
                  hover:bg-gray-50
                "
              >
                + Thêm &quot;
                {ingredientSearch.trim()} &quot;
                 làm thành phần mới
              </button>
            )}
        </div>
      )}
  </div>

  {/* =========================
      CREATE NEW INGREDIENT
  ========================== */}

  {showCreateIngredient && (
    <div className="mt-3 space-y-3 rounded-lg border bg-gray-50 p-4">
      <div className="font-semibold">
        Thêm thành phần mới
      </div>

      <div>
        <label className="mb-1 block text-sm">
          Tên thành phần
        </label>

        <input
          value={ingredientSearch}
          disabled
          className="
            w-full
            rounded
            border
            bg-gray-100
            p-2
          "
        />
      </div>

      <div>
        <label className="mb-1 block text-sm">
          INCI Name
        </label>

        <input
          value={newIngredientInci}
          onChange={(e) =>
            setNewIngredientInci(e.target.value)
          }
          placeholder="Ví dụ: Niacinamide"
          className="w-full rounded border p-2"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            setShowCreateIngredient(false)
            setNewIngredientInci("")
          }}
          className="rounded border px-3 py-2"
        >
          Hủy
        </button>

        <button
          type="button"
          onClick={createIngredient}
          disabled={creatingIngredient}
          className="
            rounded
            bg-black
            px-3
            py-2
            text-white
            disabled:opacity-50
          "
        >
          {creatingIngredient
            ? "Đang tạo..."
            : "Tạo và thêm"}
        </button>
      </div>
    </div>
  )}
</div>

          <div>
            <label className="block font-semibold mb-1">Usage</label>
            <textarea
              value={localProductState.usage || ""}
              onChange={(e) => handleChange("usage", e.target.value)}
              className="border w-full p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Cta</label>
            <textarea
              value={localProductState.cta || ""}
              onChange={(e) => handleChange("cta", e.target.value)}
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



  <div>
  <label className="block font-semibold mb-2">Filters</label>

  {/* ADD GROUP */}
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
        f => !localProductState.productfilter.some(g => g.slug === f.slug)
      )
      .map(f => (
        <option key={f.id} value={f.slug}>
          {f.name}
        </option>
      ))}
  </select>

  {/* GROUP LIST */}
  {localProductState.productfilter.map(group => {
    const def = defaultFilter.find(f => f.slug === group.slug)
    if (!def) return null

    return (
      <div key={group.slug} className="mb-3 border p-3 rounded">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-2">
          <p className="font-semibold">{group.name}</p>

          <button
            onClick={() =>
              handleChange(
                "productfilter",
                localProductState.productfilter.filter(g => g.slug !== group.slug)
              )
            }
            className="text-red-500 text-sm"
          >
            X
          </button>
        </div>

        {/* VALUE */}
        <div className="flex flex-wrap gap-2">
          {def.filterValues.map(v => {
            const selected = group.filterValues.find(val => val.slug === v.slug)

            return (
                <div  key={v.id}>
                  <button
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
                    {selected && 
                        <input 
                            value={selected.score || ""} 
                            type="number" 
                            size={5}
                            maxLength={4}
                            className="border"
                            onChange={(e)=>updateFilterValue(group.slug, v.slug, Number(e.target.value))}
                            ></input>}
              </div>
                

            )
          })}
        </div>
      </div>
    )
  })}


  </div>

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
            <div className="grid grid-cols-2 gap-3">
              {/* <div>
                <label className="block font-semibold mb-1">original_price</label>
                <input
                  type="number"
                  value={localProductState.original_price}
                  onChange={(e) => handleChange("original_price", Number(e.target.value))}
                  placeholder="Original price"
                  className="border p-2 rounded"
                />
              </div> */}
              <div>
                  <label className="block font-semibold mb-1">best_price</label>
                  <input
                  type="number"
                  value={localProductState.best_price}
                  onChange={(e) => handleChange("best_price", Number(e.target.value))}
                  placeholder="Best price"
                  className="border p-2 rounded"
                  />
              </div>
              <div>
                <label className="block font-semibold mb-1">Khối lượng</label>
                <input
                  value={localProductState.net_weight ?? ""}
                  onChange={(e) => handleChange("net_weight", e.target.value)}
                  className="border w-full p-2 rounded"
                />
              </div>
            </div>
          </div>

          {/* STATS */}
          <div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                <label className="block font-semibold mb-1">Nhà cung cấp</label>
                <input
                  value={localProductState.seller_name ?? ""}
                  onChange={(e) => handleChange("seller_name", e.target.value)}
                  className="border w-full p-2 rounded"
                />
                </div>
                <div>
                <label className="block font-semibold mb-1">Thương hiệu đến từ</label>
                <input
                  value={localProductState.seller_type ?? ""}
                  onChange={(e) => handleChange("seller_type", e.target.value)}
                  className="border w-full p-2 rounded"
                />
                </div>
              </div>
            <div className="grid grid-cols-3 gap-3">

              <div>
                <label className="block font-semibold mb-1">rating</label>
                <input
                  type="number"
                  value={localProductState.rating}
                  onChange={(e) => handleChange("rating", Number(e.target.value))}
                  placeholder="Rating"
                  className="border p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">review_count</label>
                <input
                  type="number"
                  value={localProductState.review_count}
                  onChange={(e) => handleChange("review_count", Number(e.target.value))}
                  placeholder="Review count"
                  className="border p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">sold</label>
                <input
                  type="number"
                  value={localProductState.sold}
                  onChange={(e) => handleChange("sold", Number(e.target.value))}
                  placeholder="Sold"
                  className="border p-2 rounded"
                />
                </div>
            </div>
          </div>

          {/* Promotion program name */}
          <div>
            <label className="block font-semibold mb-1">Chương trình ưu đãi</label>
            <input
              value={localProductState.promotion_program ?? ""}
              onChange={(e) => handleChange("promotion_program", e.target.value)}
              className="border w-full p-2 rounded"
            />
          </div>

          {/* Promotion program Time */}
          <div>
            <label className="block font-semibold mb-1">Thời gian</label>
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
            short_description={localProductState.short_description || ""}
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