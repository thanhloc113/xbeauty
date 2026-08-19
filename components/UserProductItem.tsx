"use client"

import { Product } from "@/types/product"
import { useEffect, useState } from "react"
import ProductReviewSlider from "./ProductReviewSlider"
import { formatPriceDisplay, formatNumber } from "@/utils/formatPrice"

function getFlashSaleStatus(start: string | null, end: string | null) {
  const now = Date.now()
  if (!start || !end) return "none"

  const startTime = new Date(start).getTime()
  const endTime = new Date(end).getTime()

  if (now < startTime) return "coming"
  if (now >= startTime && now <= endTime) return "active"
  return "ended"
}

function countdown(time: string) {
  const end = new Date(time).getTime()
  const now = Date.now()
  const diff = end - now

  if (diff <= 0) return "00:00:00"

  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`
}

export default function UserProductItem({ product }: { product: Product }) {
  const [status, setStatus] = useState<
    "none" | "coming" | "active" | "ended"
  >("none")
  const [timeLeft, setTimeLeft] = useState("")
  const [openReview, setOpenReview] = useState(false)

  function getFilterValues(product: Product, slug: string) {
    const group = product.productfilter?.find((g) => g.slug === slug)
    return group?.value.map((v) => v.value) || []
  }

  const skinTypeList = getFilterValues(product, "loai-da")
  const skinCareList = getFilterValues(product, "skin-care")
  const makeupList = getFilterValues(product, "makeup")
  const benefitList = [...skinCareList, ...makeupList]

  // Quick Scan: chỉ lấy thông tin quan trọng nhất.
  const solutionList =
    benefitList.length > 0
      ? benefitList.slice(0, 2)
      : skinTypeList.slice(0, 2)

  const highlightList = benefitList.slice(0, 3)

  useEffect(() => {
    function updateFlashSale() {
      const newStatus = getFlashSaleStatus(
        product.flash_sale_start,
        product.flash_sale_end
      )

      setStatus(newStatus)

      if (newStatus === "active" && product.flash_sale_end) {
        setTimeLeft(countdown(product.flash_sale_end))
      }

      if (newStatus === "coming" && product.flash_sale_start) {
        setTimeLeft(countdown(product.flash_sale_start))
      }

      if (newStatus === "ended") {
        setTimeLeft("00:00:00")
      }
    }

    updateFlashSale()
    const timer = setInterval(updateFlashSale, 1000)
    return () => clearInterval(timer)
  }, [product.flash_sale_start, product.flash_sale_end])

  // Hỗ trợ các field khối lượng/thể tích/số lượng nếu Product đã có.
  // Nếu chưa có thì chỉ hiển thị giá, không tự đoán dữ liệu.
  function getProductAmount(product: Product) {
    const data = product as Product & {
      weight?: number | string
      volume?: number | string
      quantity?: number | string
      unit?: string
      weight_unit?: string
      volume_unit?: string
    }

    if (data.weight) return `${data.weight}${data.weight_unit || "g"}`
    if (data.volume) return `${data.volume}${data.volume_unit || "ml"}`
    if (data.quantity) return `${data.quantity} ${data.unit || "sản phẩm"}`

    return ""
  }

  const productAmount = "500 ml"

  // Các field này có thể khác nhau tùy Product type/API.
  // Không có dữ liệu thì nút/link sẽ được ẩn hoặc disabled.
  const productData = product as Product & {
    seller_name?: string
    seller?: { name?: string }
    shop_name?: string
    tiktok_link?: string
    shopee_link?: string
    tiktok_url?: string
    shopee_url?: string
  }

  const sellerName =
    productData.seller_name ||
    productData.seller?.name ||
    productData.shop_name ||
    "Nhà bán hàng chính hãng"

  const tiktokLink = productData.tiktok_link || productData.tiktok_url || "https://www.tiktok.com/@dai.ca.xinh/photo/7665978536506690823"
  const shopeeLink =
    productData.shopee_link ||
    productData.shopee_url ||
    product.affiliate_link ||
    ""

  return (
    <>
      {/* QUICK SCAN */}
      <article className="w-full max-w-[250px] overflow-hidden rounded-2xl border border-white/10 bg-[#1b0625] shadow-lg transition hover:-translate-y-0.5 hover:border-pink-400/50">

        {/* 01. IMAGE */}
        <div className="relative aspect-square overflow-hidden bg-white">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
              {/* SKIN TYPE */}
          <span className="absolute left-2 top-2 inline-flex max-w-[80%] items-center overflow-hidden rounded-full border border-rose-400/80 bg-black/65 px-3 py-1.5 text-[10px] font-bold text-[#FFD6C2] shadow-[0_0_10px_rgba(251,113,133,0.35)] backdrop-blur-md">
            <span className=" text-rose-200">
              {skinTypeList.join(" • ")}
            </span>
          </span>
        </div>

        <div className="p-2.5">
                    {/* 02. Name */}
          {solutionList.length > 0 && (
            <div className="mb-1.5">
              <h2 className="mt-0.5 line-clamp-2 text-[13px] font-bold leading-tight text-pink-500 md:text-sm">
                {product.name}
              </h2>
            </div>
          )}

          {/* 02. GIẢI PHÁP */}
          {/* {solutionList.length > 0 && (
            <div className="mb-1.5">
              <div className="mt-0.5 line-clamp-2 text-[13px] font-bold leading-tight text-pink-300 md:text-sm">
                {solutionList.join(" + ")}
              </div>
            </div>
          )} */}

          {/* 03. PRODUCT NAME */}
          {/* <h2 className="line-clamp-2 text-[10px] font-medium leading-snug text-white md:text-[11px]">
            {product.name}
          </h2> */}

          {/* 04. ĐIỂM NỔI BẬT */}
          {/* {highlightList.length > 0 && (
            <div className="mt-2 space-y-1">
              {highlightList.map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="flex items-start gap-1.5 text-[9px] leading-tight text-emerald-300 md:text-[10px]"
                >
                  <span className="mt-[1px] shrink-0 text-emerald-400">✓</span>
                  <span className="line-clamp-1">{item}</span>
                </div>
              ))}
            </div>
          )} */}

          {/* 05. PHÂN TÍCH */}
          {highlightList.length > 0 && (
            <button
              type="button"
              onClick={() => setOpenReview(true)}
              className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-cyan-300 underline decoration-cyan-300/70 underline-offset-2 transition hover:text-cyan-200 md:text-[11px]"
            >
              Xem phân tích sản phẩm
              <span className="text-[11px]">→</span>
            </button>
          )}

          {/* 06. GIÁ / KHỐI LƯỢNG */}
          <div className="mt-1.5 flex items-baseline gap-1.5">
            <span className="whitespace-nowrap text-[15px] font-bold text-red-500 md:text-base">
              {formatPriceDisplay(
                product.best_price,
                status
              )?.toLocaleString()}
            </span>

            {productAmount && (
              <>
                <span className="text-[12px] text-white">/</span>
                <span className="whitespace-nowrap text-[10px] font-medium text-gray-300 md:text-[11px]">
                  {productAmount}
                </span>
              </>
            )}
          </div>

          {/* 07. FLASH SALE */}
          {(status === "active" || status === "coming") && (
            <div className="mt-0.5 text-[8px] leading-tight md:text-[9px]">
              {status === "active" ? (
                <span className="text-red-300">🔥 Còn {timeLeft}</span>
              ) : (
                <span className="text-orange-300">
                  ⏳ Bắt đầu sau {timeLeft}
                </span>
              )}
            </div>
          )}

          {/* 08. Dòng sản phẩm */}
{product.tags?.length > 0 && (
  <div
    className="
      mt-0.5
      line-clamp-2
      bg-gradient-to-r
      from-[#FFD76A]
      via-[#FFF3B0]
      via-[#FFFFFF]
      via-[#FFE08A]
      to-[#F6C64E]
      bg-[length:250%_100%]
      animate-[metalShine_3s_linear_infinite]
      bg-clip-text
      text-[9px]
      font-bold
      leading-tight
      text-transparent
      drop-shadow-[0_0_4px_rgba(255,220,100,0.9)]
      md:text-[10px]
    "
  >
    {product.tags[0].name}
  </div>
)}

          {/* 09. NHÀ BÁN HÀNG UY TÍN */}
          <div className="mt-2 border-t border-white/10 pt-2">
            <div className="flex items-center gap-1.5 text-[9px] leading-tight md:text-[10px]">
              <span className="shrink-0 text-emerald-400">🛡️</span>
              <span className="font-semibold text-white">
                Nhà bán hàng uy tín
              </span>
            </div>

            <div className="mt-1 truncate text-[10px] font-semibold text-yellow-300 md:text-[11px]">
              {sellerName}
            </div>

            <div className="mt-1 flex items-center gap-1 overflow-hidden whitespace-nowrap text-[8px] text-gray-400 md:text-[9px]">
              <span className="text-yellow-300">★ {product.rating}</span>
              <span>·</span>
              <span>{formatNumber(product.review_count)}+ đánh giá</span>
              <span>·</span>
              <span>{formatNumber(product.sold)}+ đã bán</span>
            </div>
          </div>

          {/* 10. MARKETPLACES */}
          <div className="mt-2.5 flex gap-1.5">
            {tiktokLink ? (
              <a
                href={tiktokLink}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex h-8 flex-1 items-center justify-center overflow-hidden rounded-lg bg-[linear-gradient(135deg,#3b82f6,#8b5cf6)] text-[10px] font-semibold text-white ring-1 ring-white/15 transition active:scale-95 md:h-9 md:text-[11px]"
              >
                <span className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.18),transparent)] animate-[shine_4s_linear_infinite]" />
                <span className="relative z-10">TikTok</span>
              </a>
            ) : (
              <span className="flex h-8 flex-1 items-center justify-center rounded-lg bg-[linear-gradient(135deg,#3b82f6,#8b5cf6)] text-[10px] font-semibold text-gray-300 ring-1 ring-white/10 md:h-9 md:text-[11px]">
                TikTok
              </span>
            )}

            {shopeeLink ? (
              <a
                href={shopeeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex h-8 flex-1 items-center justify-center overflow-hidden rounded-lg bg-[linear-gradient(135deg,#f50fb0,#dd034c)] text-[10px] font-semibold text-white transition active:scale-95 md:h-9 md:text-[11px]"
              >
                <span className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.45),transparent)] animate-[shine_4s_linear_infinite]" />
                <span className="relative z-10">Shopee</span>
              </a>
            ) : (
              <span className="flex h-8 flex-1 items-center justify-center rounded-lg bg-white/5 text-[10px] font-semibold text-gray-500 ring-1 ring-white/10 md:h-9 md:text-[11px]">
                Shopee
              </span>
            )}
          </div>
        </div>
      </article>

      {/* DETAIL REVIEW */}
      {openReview && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 p-2 backdrop-blur-sm">
          <div className="relative flex h-[88vh] w-[95vw] flex-col overflow-hidden rounded-xl bg-[#0f172a] p-3 md:w-[70vw] md:p-4">
            <button
              onClick={() => setOpenReview(false)}
              className="absolute right-3 top-3 z-[1000] flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 text-sm text-white shadow-xl transition active:scale-95 md:h-11 md:w-11 md:text-lg"
              aria-label="Đóng"
            >
              ✕
            </button>

            <div className="h-full w-full">
              {product.reviews.length === 0 ? (
                <p className="text-center text-sm text-gray-400">
                  Reviews đang được cập nhật...
                </p>
              ) : (
                <ProductReviewSlider
                  short_description={product.short_description || ""}
                  productName={product.name}
                  affiliateLink={product.affiliate_link}
                  reviews={product.reviews}
                  benefit={product.benefits}
                  usage={product.usage}
                  ingredient={product.ingredients}
                  cta={product.cta}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
