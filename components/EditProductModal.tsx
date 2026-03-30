"use client"

import { useState, useEffect } from "react"
import { Product } from "@/types/product"
type Props = {
  product: Product
  onClose: () => void
  onSave: (product: Product) => void
}

function formatDatetimeLocal(time: string | null) {
  if (!time) return ""

  const date = new Date(time)

  const offset = date.getTimezoneOffset() * 60000
  const localDate = new Date(date.getTime() - offset)

  return localDate.toISOString().slice(0, 16)
}

export default function EditProductModal({ product, onClose, onSave }: Props) {

  const [localProductState,setlocalProductState] = useState<Product>(product)

  useEffect(()=>{
    setlocalProductState(product)
  },[product])

if (!localProductState) return null

  function handleChange(field:keyof Product,value: Product[keyof Product]){
    setlocalProductState(prev => ({
      ...prev!,
      [field]: value
    }))
  }

  function handleSubmit(){
    onSave(localProductState)
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white p-6 rounded-xl w-[600px] max-h-[80vh] overflow-y-auto">

        <p className="text-xl font-bold mb-4">
          Update Product
        </p>

        <div className="space-y-3">

          <div>
            <label className="text-sm">Name</label>
            <input
              value={localProductState.name}
              onChange={(e)=>handleChange("name",e.target.value)}
              className="border w-full p-2 rounded"
            />
          </div>

          <div>
            <label className="text-sm">Image</label>
            <input
              value={localProductState.image}
              onChange={(e)=>handleChange("image",e.target.value)}
              className="border w-full p-2 rounded"
            />
          </div>

          <div>
            <label className="text-sm">Affiliate link</label>
            <input
              value={localProductState.affiliate_link}
              onChange={(e)=>handleChange("affiliate_link",e.target.value)}
              className="border w-full p-2 rounded"
            />
          </div>
          <div>
            <label className="text-sm">product link</label>
            <input
              value={localProductState.product_link ?? ""}
              onChange={(e)=>handleChange("product_link",e.target.value)}
              className="border w-full p-2 rounded"
            />
          </div>

          <div>
            <label className="text-sm">Short description</label>
            <textarea
              value={localProductState.short_description}
              onChange={(e)=>handleChange("short_description",e.target.value)}
              className="border w-full p-2 rounded"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">

            <div>
              <label className="text-sm">Rating</label>
              <input
                type="number"
                step="0.1"
                value={localProductState.rating}
                onChange={(e)=>handleChange("rating",Number(e.target.value))}
                className="border w-full p-2 rounded"
              />
            </div>

            <div>
              <label className="text-sm">Review count</label>
              <input
                type="number"
                value={localProductState.review_count}
                onChange={(e)=>handleChange("review_count",Number(e.target.value))}
                className="border w-full p-2 rounded"
              />
            </div>

            <div>
              <label className="text-sm">Sold</label>
              <input
                type="number"
                value={localProductState.sold}
                onChange={(e)=>handleChange("sold",Number(e.target.value))}
                className="border w-full p-2 rounded"
              />
            </div>

          </div>
          <div className="grid grid-cols-2 gap-3">

            <div>
              <label className="text-sm">Original price</label>
              <input
                type="number"
                value={localProductState.original_price}
                onChange={(e)=>handleChange("original_price",Number(e.target.value))}
                className="border w-full p-2 rounded"
              />
            </div>

            <div>
              <label className="text-sm">Best price</label>
              <input
                type="number"
                value={localProductState.best_price}
                onChange={(e)=>handleChange("best_price",Number(e.target.value))}
                className="border w-full p-2 rounded"
              />
            </div>

          </div>

          <div className="grid grid-cols-2 gap-3">

            <div>
              <label className="text-sm">Flash Sale Start</label>
              <input
                type="datetime-local"
                value={formatDatetimeLocal(localProductState.flash_sale_start || "")}
                onChange={(e)=>handleChange("flash_sale_start",e.target.value)}
                className="border w-full p-2 rounded"
              />
            </div>

            <div>
              <label className="text-sm">Flash Sale End</label>
              <input
                type="datetime-local"
                value={formatDatetimeLocal(localProductState.flash_sale_end || "")}
                onChange={(e)=>handleChange("flash_sale_end",e.target.value)}
                className="border w-full p-2 rounded"
              />
            </div>

          </div>

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Preview
          </button>

        </div>

      </div>

    </div>
  )
}