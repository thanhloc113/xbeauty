"use client"

import { useState } from "react"
import Link from "next/link"

type Item = {
  id: string
  label: string
}

export default function SectionNavigator({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">

      {/* menu */}
      {open && (
        <div className="
          mb-3
          flex flex-col gap-2
          bg-black/80 backdrop-blur-md
          border border-white/10
          rounded-xl
          p-4
          shadow-xl
          min-w-[160px]
        ">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              className="text-pink-200 hover:text-[#ff6adf] transition"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}

      {/* toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="
          w-12 h-12
          rounded-full
          bg-gradient-to-r from-pink-500 to-purple-500
          text-white
          text-xl
          flex items-center justify-center
          shadow-lg
          hover:scale-110
          transition
        "
      >
        ☰
      </button>

    </div>
  )
}