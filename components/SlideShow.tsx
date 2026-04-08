"use client"

import { useEffect, useState } from "react"
import UserProductItem from "./UserProductItem"
import Intro from "./Intro"
import { Product } from "@/types/product"

export default function SlideShow({
  title,
  intro = "",
  category,
}: {
  title:string
  intro?: string
  category: string
}) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)

      const params = new URLSearchParams()

      if (category) params.append("category", category)
      params.append("limit", "20")
      params.append("page", "1")
      params.append("sort", "rating")

      const res = await fetch(`/api/list-products?${params}`)
      const data = await res.json()

      setProducts(data.products || [])
      setLoading(false)
    }

    load()
  }, [category])

  return (
    <section className="w-full py-12 rounded-2xl border shadow">
      <Intro title={title} intro={intro}/>

      {loading && (
        <p className="text-center mt-6">Đang tải sản phẩm...</p>
      )}

      {/* ✅ Mobile: scroll ngang | Desktop: grid */}
      <div className="mt-8 px-6">
        {/* Mobile */}
        <div className="flex gap-4 overflow-x-auto md:hidden scrollbar-hide">
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-[160px] flex-shrink-0"
            >
              <UserProductItem product={product} />
            </div>
          ))}
        </div>

        {/* Desktop */}
        <div className="hidden md:grid md:grid-cols-5 gap-4">
          {products.map((product) => (
            <UserProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}