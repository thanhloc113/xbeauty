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
  title: string
  intro?: string
  category: string
}) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)

        const params = new URLSearchParams()

        if (category) {
          params.append("category", category)
        }

        params.append("limit", "20")
        params.append("page", "1")
        params.append("sort", "rating")

        const res = await fetch(`/api/list-products?${params}`)

        if (!res.ok) {
          throw new Error("Không thể tải sản phẩm")
        }

        const data = await res.json()

        setProducts(data.products || [])
      } catch (error) {
        console.error(error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [category])

  return (
    <section className="w-full rounded-2xl border py-6 shadow md:py-12">
      <Intro title={title} intro={intro} />

      {loading && (
        <p className="mt-5 text-center text-sm text-gray-500">
          Đang tải sản phẩm...
        </p>
      )}

      {!loading && products.length > 0 && (
        <div className="mt-5 px-2 md:mt-8 md:px-6">
          <div
            className="
              grid
              grid-cols-2
              gap-2
              sm:gap-3
              md:grid-cols-5
              md:gap-4
            "
          >
            {products.map((product) => (
              <UserProductItem
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>
      )}

      {!loading && products.length === 0 && (
        <p className="mt-5 text-center text-sm text-gray-500">
          Chưa có sản phẩm phù hợp
        </p>
      )}
    </section>
  )
}