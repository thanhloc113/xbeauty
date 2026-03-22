"use client"

import { useEffect, useState } from "react"
import ProductItem from "./ProductItem"
import { Product } from "@/types/product"
import { Category } from "@/types/category"
import EditProductModal from "./EditProductModal"

export default function ProductList() {

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)

  /* FILTER */

  const [category, setCategory] = useState("")
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("new")

  /* PAGINATION */

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const limit = 20

  /* EDIT */

  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [draftProducts, setDraftProducts] = useState<Record<number, Product>>({})

  /* LOAD CATEGORY */

  useEffect(() => {
    fetch("/api/product-categories")
      .then(res => res.json())
      .then(data => setCategories(data))
  }, [])

  /* LOAD PRODUCTS */

  useEffect(() => {
    fetchProducts()
  }, [category, search, page, sort])

  const fetchProducts = async () => {

    setLoading(true)

    const params = new URLSearchParams()

    if (category) params.append("category", category)
    if (search) params.append("search", search)

    params.append("limit", String(limit))
    params.append("page", String(page))
    params.append("sort", sort)

    const res = await fetch(`/api/list-products?${params}`)
    const data = await res.json()

    setProducts(data.products || [])
    setTotalPages(data.totalPages || 1)

    setLoading(false)
  }

  /* SAVE LOCAL DRAFT */

  function handleSave(product: Product) {

    setDraftProducts(prev => ({
      ...prev,
      [product.id]: product
    }))

    setEditingProduct(null)
  }

  /* SAVE DATABASE */

  async function handleSaveToDB(id: number) {

    const product = draftProducts[id]
    if (!product) return

    try {

      const res = await fetch(`/api/list-products/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "device-id": localStorage.getItem("device-id") || ""
        },
        body: JSON.stringify(product)
      })

      if (!res.ok) throw new Error()

      await fetchProducts()

      setDraftProducts(prev => {
        const copy = { ...prev }
        delete copy[id]
        return copy
      })

    } catch {
      alert("Lưu thất bại")
    }
  }

  return (

    <div className="space-y-6">

      {/* FILTER BAR */}

      <div className="flex gap-4 flex-wrap items-center">

        {/* CATEGORY */}

        <select
          value={category}
          onChange={(e) => {
            setPage(1)
            setCategory(e.target.value)
          }}
          className="border border-gray-300 px-3 py-2 rounded bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black hover:border-gray-400 transition"
        >
          <option value="">All category</option>

          {categories.map(cat => (
            <option key={cat.id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* SORT */}

        <select
          value={sort}
          onChange={(e) => {
            setPage(1)
            setSort(e.target.value)
          }}
          className="border border-gray-300 px-3 py-2 rounded bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black hover:border-gray-400 transition"
        >
          <option value="new">Newest</option>
          <option value="rating">Best rating</option>
          <option value="price">Best price</option>
          <option value="flashsale">Flash sale</option>
        </select>

        {/* SEARCH */}

        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => {
            setPage(1)
            setSearch(e.target.value)
          }}
          className="border border-gray-300 px-3 py-2 rounded w-64 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />

      </div>

      {/* PRODUCT GRID */}

      {loading ? (

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {Array.from({ length: 8 }).map((_, i) => (

            <div
              key={i}
              className="h-60 bg-gray-200 animate-pulse rounded"
            />

          ))}

        </div>

      ) : (

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {products.map(product => {

            const displayProduct = draftProducts[product.id] ?? product

            return (

              <div key={product.id}>

                <ProductItem product={displayProduct} />

                <div className="flex gap-2 mt-2">

                  <button
                    onClick={() => setEditingProduct(displayProduct)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition"
                  >
                    cap nhat san pham
                  </button>

                  {draftProducts[product.id] && (

                    <button
                      onClick={() => handleSaveToDB(product.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition"
                    >
                      Save
                    </button>

                  )}

                </div>

              </div>

            )

          })}

        </div>

      )}

      {/* PAGINATION */}

      <div className="flex gap-4 justify-center pt-6">

        <button
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
          className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-40"
        >
          Prev
        </button>

        <span className="px-3 py-2 border rounded">
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => setPage(p => p + 1)}
          className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-40"
        >
          Next
        </button>

      </div>

      {/* EDIT MODAL */}

       {editingProduct && (

        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={handleSave}
        />

      )}

    </div>

  )
}