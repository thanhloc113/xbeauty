"use client"

import { useEffect, useState } from "react"
import UserProductItem from "./UserProductItem"
import Intro from "./Intro"
import { Product } from "@/types/product"
export default function SlideShow({
  introTitle,
  category,
}: {
  introTitle: string
  category: string
}) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)

      const params = new URLSearchParams()

      // ✅ giống admin
      if (category) params.append("category", category)

      params.append("limit", "20")
      params.append("page", "1")

      // 🔥 optional (có thể bỏ nếu không cần)
      params.append("sort", "rating") // hoặc "new"

      const res = await fetch(`/api/list-products?${params}`)
            console.log(res);
      const data = await res.json()


      setProducts(data.products || [])
      setLoading(false)
    }

    load()
  }, [category])

  return (
    <section className="w-full py-12 rounded-2xl border shadow">
      <Intro title={introTitle} />

      {loading && (
        <p className="text-center mt-6">Đang tải sản phẩm...</p>
      )}

      <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4 px-6">
        {products.map((product) => (
          <UserProductItem key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}