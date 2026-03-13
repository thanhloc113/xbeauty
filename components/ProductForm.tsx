"use client"

import { useState } from "react"
type ProductFormProps = {
  refresh: () => void
}
export default function ProductForm({ refresh }: ProductFormProps) {

  const [form, setForm] = useState({
    name: "",
    slug: "",
    image: "",
    category: "",
    original_price: "",
    best_price: ""
  })

  async function submit() {

    await fetch("/api/admin/products", {
      method: "POST",
      body: JSON.stringify(form)
    })

    setForm({
      name: "",
      slug: "",
      image: "",
      category: "",
      original_price: "",
      best_price: ""
    })

    refresh()
  }

  return (

    <div className="border p-4 rounded-lg">

      <h2 className="font-bold mb-3">Thêm sản phẩm</h2>

      <input
        placeholder="Tên sản phẩm"
        value={form.name}
        onChange={e => setForm({...form, name:e.target.value})}
      />

      <input
        placeholder="Slug"
        value={form.slug}
        onChange={e => setForm({...form, slug:e.target.value})}
      />

      <input
        placeholder="Image"
        value={form.image}
        onChange={e => setForm({...form, image:e.target.value})}
      />

      <input
        placeholder="Category"
        value={form.category}
        onChange={e => setForm({...form, category:e.target.value})}
      />

      <input
        placeholder="Giá gốc"
        value={form.original_price}
        onChange={e => setForm({...form, original_price:e.target.value})}
      />

      <input
        placeholder="Giá tốt"
        value={form.best_price}
        onChange={e => setForm({...form, best_price:e.target.value})}
      />

      <button onClick={submit}>
        Thêm sản phẩm
      </button>

    </div>
  )
}