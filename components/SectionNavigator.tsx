"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

type Item = {
  id: string
  label: string
}

export default function SectionNavigator({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">

      {/* menu */}
      <div
        className={`
          absolute bottom-6 right-15
          flex flex-col gap-2
          bg-black/80 backdrop-blur-md
          border border-white/10
          rounded-xl
          p-4
          shadow-xl
          min-w-[160px]
          transition-all duration-300
          ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}
        `}
      >
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

      {/* toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="
          relative
          w-12 h-12
          rounded-full
          bg-gradient-to-r from-blue-500 to-purple-500
          text-white
          text-xl
          flex items-center justify-center
          shadow-lg
          hover:scale-110
          transition
        "
      >
        <Image
        src="/image/logo.png"
        width={40}
        height={40}
        alt=""
        className="animate-[spin_6s_linear_infinite]"
        />
      </button>

    </div>
  )
}