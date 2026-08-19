"use client"

import { Category } from "@/types/product"
import {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"

interface CategoryMenuProps {
  categories: Category[]
  type: "skincare" | "makeup"
  switching: boolean
  onChange?: (category: Category) => void
}

export default function CategoryMenu({
  categories,
  type,
  switching,
  onChange,
}: CategoryMenuProps) {
  const [activeId, setActiveId] = useState<number | null>(
    categories[0]?.id ?? null
  )

  const [translateX, setTranslateX] = useState(0)
  const [mounted, setMounted] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  const itemRefs = useRef<
    Record<number, HTMLButtonElement | null>
  >({})

  /*
   * Xoay mảng để active luôn ở vị trí giữa
   *
   * 1 2 3 4 5
   * chọn 5
   *
   * => 3 4 [5] 1 2
   */
  const displayCategories = useMemo(() => {
    if (!categories.length) return []

    const activeIndex = categories.findIndex(
      (category) => category.id === activeId
    )

    const currentIndex =
      activeIndex >= 0 ? activeIndex : 0

    const middleIndex = Math.floor(
      categories.length / 2
    )

    const startIndex =
      (
        currentIndex -
        middleIndex +
        categories.length
      ) % categories.length

    return [
      ...categories.slice(startIndex),
      ...categories.slice(0, startIndex),
    ]
  }, [categories, activeId])

  /*
   * Căn CHÍNH GIỮA của item active
   * vào CHÍNH GIỮA của container
   */
const centerActiveItem = () => {
  const container = containerRef.current

  if (!container || activeId === null) return

  const activeItem =
    itemRefs.current[activeId]

  if (!activeItem) return

  const containerRect =
    container.getBoundingClientRect()

  const itemRect =
    activeItem.getBoundingClientRect()

  const containerCenter =
    containerRect.left +
    containerRect.width / 2

  const itemCenter =
    itemRect.left +
    itemRect.width / 2

  const difference =
    containerCenter - itemCenter

  setTranslateX((current) =>
    current + difference
  )
}

  const handleSelect = (category: Category) => {
    if (category.id === activeId) return

    setActiveId(category.id)

    onChange?.(category)
  }

  /*
   * Sau khi DOM đã render theo thứ tự mới,
   * lấy đúng vị trí giữa của item active
   */
  useLayoutEffect(() => {
    const frame = requestAnimationFrame(() => {
      centerActiveItem()
      setMounted(true)
    })

    return () => cancelAnimationFrame(frame)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, displayCategories])

  /*
   * Resize vẫn giữ chính giữa
   */
  useLayoutEffect(() => {
    const handleResize = () => {
      centerActiveItem()
    }

    window.addEventListener(
      "resize",
      handleResize
    )

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId])

  if (!categories.length) return null


  // switch theme
  const isSkincare = type === "skincare"

  /*
   * Theme giống BeautyFilter
   */
  // =====================================================
  // THEME
  // =====================================================

  const theme = isSkincare
    ? {
        gradient:
          "from-emerald-500 via-teal-500 to-cyan-500",

        gradientHover:
          "hover:from-emerald-400 hover:via-teal-400 hover:to-cyan-400",

        dropdown:
          "bg-[#071c1c]",

        dropdownGlow:
          "shadow-[0_18px_50px_rgba(20,184,166,0.25)]",

        border:
          "border-teal-400",

        borderSoft:
          "border-teal-400/30",

        text:
          "text-teal-400",

        textStrong:
          "text-teal-600",

        textLight:
          "text-teal-300",

        bgSoft:
          "bg-teal-50",

        bgSoftHover:
          "hover:bg-teal-100",

        iconBg:
          "bg-gradient-to-br from-emerald-400/20 to-cyan-400/20",

        selectedBg:
          "bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20",

        shadow:
          "shadow-[0_8px_30px_rgba(20,184,166,0.35)]",

        glow:
          "shadow-[0_0_25px_rgba(20,184,166,0.2)]",

        checkbox:
          "border-teal-400 bg-gradient-to-br from-emerald-500 to-cyan-500",

        accent:
          "text-cyan-300",

      }
    : {
        gradient:
          "from-purple-600 via-fuchsia-500 to-pink-500",

        gradientHover:
          "hover:from-purple-500 hover:via-fuchsia-400 hover:to-pink-400",

        dropdown:
          "bg-[#17121f]",

        dropdownGlow:
          "shadow-[0_18px_50px_rgba(168,85,247,0.28)]",

        border:
          "border-fuchsia-400",

        borderSoft:
          "border-fuchsia-400/30",

        text:
          "text-fuchsia-400",

        textStrong:
          "text-fuchsia-600",

        textLight:
          "text-fuchsia-300",

        bgSoft:
          "bg-fuchsia-50",

        bgSoftHover:
          "hover:bg-fuchsia-100",

        iconBg:
          "bg-gradient-to-br from-purple-500/20 to-pink-500/20",

        selectedBg:
          "bg-gradient-to-r from-purple-600/30 via-fuchsia-500/25 to-pink-500/25",

        shadow:
          "shadow-[0_8px_30px_rgba(168,85,247,0.35)]",

        glow:
          "shadow-[0_0_25px_rgba(236,72,153,0.2)]",

        checkbox:
          "border-fuchsia-400 bg-gradient-to-br from-purple-600 via-fuchsia-500 to-pink-500",

        accent:
          "text-pink-300",

      };


return (
  <div
    ref={containerRef}
    className="
      relative
      w-full
      overflow-hidden

      py-[clamp(10px,2vw,20px)]
    "
  >

    {/* Track */}
    <div
      className={`
        flex
        w-max
        items-center

        gap-[clamp(6px,1.2vw,12px)]

        will-change-transform

        ${
          mounted
            ? `
              transition-transform
              duration-500
              ease-[cubic-bezier(0.22,1,0.36,1)]
            `
            : ""
        }
      `}
      style={{
        transform: `translateX(${translateX}px)`,
      }}
    >

      {displayCategories.map((category) => {

        const isActive =
          category.id === activeId

        return (

          <button
            key={category.id}

            ref={(el) => {
              itemRefs.current[category.id] = el
            }}

            onClick={() =>
              handleSelect(category)
            }

            className={`
              relative
              shrink-0
              whitespace-nowrap

              rounded-full

              font-semibold

              transition-all
              duration-500
              ease-[cubic-bezier(0.22,1,0.36,1)]

              ${
                isActive
                  ? `
                      z-20

                      px-[clamp(14px,2.8vw,28px)]
                      py-[clamp(7px,1.1vw,12px)]

                      text-[clamp(11px,1.44vw,16px)]

                      bg-gradient-to-r
                      from-amber-200
                      via-yellow-100
                      to-amber-300

                      text-amber-900

                      shadow-[0_0_clamp(12px,2.4vw,24px)_rgba(251,191,36,0.45)]
                    `
                  : `
                      z-10

                      px-[clamp(10px,2vw,20px)]
                      py-[clamp(5px,0.9vw,8px)]

                      text-[clamp(10px,1.2vw,14px)]

                      bg-gradient-to-r
                      ${theme.gradient}
                      ${theme.gradientHover}

                      text-white
                      opacity-90

                      hover:scale-105
                      hover:opacity-100
                    `
              }
            `}
          >
            {category.name}
          </button>

        )
      })}

    </div>

  </div>
)
}