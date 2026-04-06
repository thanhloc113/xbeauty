"use client"

import { useEffect, useState } from "react"
import ProductItem from "./ProductItem"
import { Product } from "@/types/product"
import { Category } from "@/types/product"
import AddProductModal from "./AddProductModal"

export default function ProductList() {

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  //add prooduct 
    const [addProduct, setAddProduct] = useState(false)

  /* FILTER */
  const [category, setCategory] = useState("")
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("new")

  /* PAGINATION */
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const limit = 20

  useEffect(() => {
    fetch("/api/product-categories")
      .then(res => res.json())
      .then(data => setCategories(data))
  }, [])

const reloadProducts = async () => {

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
}

useEffect(() => {

  async function load() {
    setLoading(true)
    await reloadProducts()
    setLoading(false)
  }

  load()

}, [category, search, page, sort])



  return (

    <div className="space-y-6">
      <button className="border px-4 py-2 rounded" onClick={() => setAddProduct(true)}>
        Thêm sản phẩm
      </button>
      
      {/* FILTER BAR */}
      <div className="flex gap-4 flex-wrap items-center">

        <select
          value={category}
          onChange={(e) => {
            setPage(1)
            setCategory(e.target.value)
          }}
          className="border px-3 py-2 rounded text-sm"
        >
          <option value="">All category</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => {
            setPage(1)
            setSort(e.target.value)
          }}
          className="border px-3 py-2 rounded text-sm"
        >
          <option value="new">Newest</option>
          <option value="rating">Best rating</option>
          <option value="price">Best price</option>
          <option value="flashsale">Flash sale</option>
        </select>

        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => {
            setPage(1)
            setSearch(e.target.value)
          }}
          className="border px-3 py-2 rounded w-64 text-sm"
        />

      </div>

      {/* GRID */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-60 bg-gray-200 animate-pulse rounded" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductItem
              key={product.id}
              product={product}
              onUpdated={reloadProducts}
            />
          ))}
        </div>
      )}

      {/* PAGINATION */}
      <div className="flex gap-4 justify-center pt-6">

        <button
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Prev
        </button>

        <span className="px-3 py-2 border rounded">
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => setPage(p => p + 1)}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Next
        </button>

      </div>
      {addProduct && (
        <AddProductModal 
          onClose={() => setAddProduct(false)}
         
        />
      )}

    </div>
  )
}