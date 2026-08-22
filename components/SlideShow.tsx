"use client"

import { useEffect, useState } from "react"
import UserProductItem from "./UserProductItem"
import Intro from "./Intro"
import { Product } from "@/types/product"

export default function SlideShow({
  title,
  intro = "",
  category,
  type
}: {
  title: string
  intro?: string
  category: string
  type: "skincare" | "makeup"
}) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const isSkincare = type === "skincare"

  const theme = isSkincare
    ? {
        border: "border-teal-300",
        borderSoft: "border-teal-300/30",
        text: "text-teal-400",
        textStrong: "text-teal-400",
        textLight: "text-teal-300",
        accent: "text-cyan-400",
        gradient: "from-emerald-500 via-teal-500 to-cyan-500",
        glow: "shadow-[0_0_25px_rgba(20,184,166,0.2)]",
      }
    : {
        border: "border-fuchsia-500",
        borderSoft: "border-fuchsia-500/30",
        text: "text-fuchsia-500",
        textStrong: "text-fuchsia-500",
        textLight: "text-fuchsia-300",
        accent: "text-pink-400",
        gradient: "from-purple-600 via-fuchsia-500 to-pink-500",
        glow: "shadow-[0_0_25px_rgba(236,72,153,0.2)]",
      }

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
      <section
        className={`
          relative
          w-full
          overflow-hidden
          rounded-2xl
          border
          ${theme.border}
          py-6
          ${theme.glow}
          md:py-10
        `}
      >
      <Intro
        title={title}
        intro={intro}
        titleClassName={theme.textStrong}
        introClassName={theme.text}
      />

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