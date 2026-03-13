"use client"

import { useEffect, useState } from "react"
import ProductItem from "./ProductItem"
import { Product } from "@/types/product"
import EditProductModal from "./EditProductModal"

export default function ProductList() {

  const [products,setProducts] = useState<Product[]>([])

  // state dùng để gọi API
  const [category,setCategory] = useState("")
  const [limit,setLimit] = useState(50)

  // state UI
  const [categoryInput,setCategoryInput] = useState("")
  const [limitInput,setLimitInput] = useState(50)
  //show popup and update product on UI
  const [editingProduct,setEditingProduct] = useState<Product | null>(null)
  const [draftProducts,setDraftProducts] = useState<Record<number,Product>>({})
  //load data
  const fetchProducts = async () => {

    const params = new URLSearchParams()

    if (category) params.append("category", category)
    if (limit) params.append("limit", limit.toString())

    const res = await fetch(`/api/list-products?${params.toString()}`)
    const data = await res.json()

    setProducts(data)
  }
  useEffect(()=>{
  fetchProducts()
},[category,limit])


  function handleSubmit(){
    setCategory(categoryInput)
    setLimit(limitInput)
  }

  //luu bản nháp
function handleSave(product: Product) {

  setDraftProducts(prev => ({
    ...prev,
    [product.id]: product
  }))

  setEditingProduct(null)
}

//lu database
async function handleSaveToDB(id:number){

  const product = draftProducts[id]
  if(!product) return

  try{

    const res = await fetch(`/api/list-products/${id}`,{
      method:"PUT",
      credentials:"include",
      headers:{
        "Content-Type":"application/json",
        "device-id": localStorage.getItem("device-id") || ""
      },
      body:JSON.stringify(product)
          })

          if(!res.ok){
            throw new Error("Update failed")
          }

          // reload lại data từ DB
          await fetchProducts()

          // xóa draft
          setDraftProducts(prev=>{
            const copy = {...prev}
            delete copy[id]
            return copy
          })

        }catch(error){

          alert("Lưu thất bại")

          // xóa draft → UI quay về product gốc
          setDraftProducts(prev=>{
            const copy = {...prev}
            delete copy[id]
            return copy
          })

        }
      }
  return (
    <div className="space-y-6">

      {/* FILTER */}

      <div className="flex gap-4 items-center">

        <select
          value={categoryInput}
          onChange={(e)=>setCategoryInput(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All category</option>
          <option value="cleanser">Cleanser</option>
          <option value="serum">Serum</option>
          <option value="toner">Toner</option>
        </select>

        <input
          type="number"
          value={limitInput}
          onChange={(e)=>setLimitInput(Number(e.target.value))}
          className="border px-3 py-2 rounded w-24"
        />

        <button
          onClick={handleSubmit}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Submit
        </button>

      </div>


      {/* PRODUCT GRID */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {products.map((product) => {

          const displayProduct = draftProducts[product.id] || product

          return (

            <div key={product.id}>

              <ProductItem product={displayProduct} />

              <div className="flex gap-2 mt-2">

                <button
                  onClick={()=>setEditingProduct(displayProduct)}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                >
                  Update
                </button>

                {draftProducts[product.id] && (

                  <button
                    onClick={()=>handleSaveToDB(product.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Save
                  </button>

                )}

              </div>

            </div>

          )

        })}

      </div>

      {editingProduct && (

        <EditProductModal
          product={editingProduct}
          onClose={()=>setEditingProduct(null)}
          onSave={handleSave}
        />

      )}

    </div>
  )
}