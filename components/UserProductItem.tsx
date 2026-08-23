"use client"

import { Product } from "@/types/product"
import { useEffect, useState } from "react"
import ProductReviewSlider from "./ProductReviewSlider"
import { formatPriceDisplay, formatNumber } from "@/utils/formatPrice"
import { FaShop } from "react-icons/fa6";



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

export default function UserProductItem({ 
  product
}: { 
  product: Product }) {

  const [status, setStatus] = useState<
    "none" | "coming" | "active" | "ended"
  >("none")
  const [timeLeft, setTimeLeft] = useState("")
  const [openReview, setOpenReview] = useState(false)

  function getFilterValues(product: Product, slug: string) {
    const group = product.productfilter?.find((g) => g.slug === slug)
    return group?.filterValues.map((v) => v.value) || []
  }

  const skinTypeList = getFilterValues(product, "loai-da")
  const skinCareList = getFilterValues(product, "skin-care")
  const makeupList = getFilterValues(product, "makeup")
  const benefitList = [...skinCareList, ...makeupList]


  const highlightList = benefitList.slice(0, 3)

  useEffect(() => {
  if (!openReview) return

  const originalOverflow = document.body.style.overflow

  document.body.style.overflow = "hidden"

  return () => {
    document.body.style.overflow = originalOverflow
  }
}, [openReview])

  useEffect(() => {
    if(product.id === 33 || product.id === 32){
      console.log(product)
    }
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

return (
  <>
    {/* QUICK SCAN */}
    <article
      className="
          group
          flex
          h-full
          w-full
          max-w-[250px]
          min-w-0
          flex-col
          overflow-hidden
          rounded-[clamp(10px,1.5vw,16px)]
          border
          border-pink-400/50
          bg-[#1b0625]
          shadow-lg
          transition
          hover:-translate-y-1
      "
    >
      {/* 01. IMAGE */}
      <div className="relative aspect-square overflow-hidden bg-white">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />

        {/* SKIN TYPE */}
        {product.tags.length > 0 && (
                  <span
          className="
            absolute
            left-[4%]
            top-[4%]
            inline-flex
            max-w-[88%]
            items-center
            overflow-hidden
            rounded-full
            border
            border-rose-400/80
            bg-black/65
            px-[clamp(5px,2vw,12px)]
            py-[clamp(2px,0.8vw,6px)]
            text-[clamp(6px,2vw,10px)]
            font-bold
            leading-tight
            text-[#FFD6C2]
            shadow-[0_0_10px_rgba(251,113,133,0.35)]
            backdrop-blur-md
          "
        >
          <span className={`truncate text-rose-200`}>
            {product.tags[0].name}
          </span>
        </span>
        )}

      </div>

      <div
        className="
          flex
          min-w-0
          flex-1
          flex-col
          p-[clamp(6px,2vw,10px)]
        "
      >
        {/* 02. PRODUCT NAME */}

          <div className="mb-[clamp(3px,1vw,6px)]">
            <h2
              className={`
                line-clamp-2
                text-[clamp(9px,2.6vw,13px)]
                font-bold
                leading-[1.25]
                text-pink-500
                md:text-sm

              `}
            >
              {product.name}
            </h2>
          </div>

        {/* 08. DÒNG SẢN PHẨM */}
        {skinTypeList.length > 0 && (
          <div
            className="
              mt-[2px]
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
              text-[clamp(6px,1.8vw,9px)]
              font-bold
              leading-[1.25]
              text-transparent
              drop-shadow-[0_0_4px_rgba(255,220,100,0.9)]
              md:text-[10px]
            "
          >
            {skinTypeList.join(" • ")}
          </div>
        )}
        {/* 05. PHÂN TÍCH */}
        {product.reviews.length > 0 && (
          <button
            type="button"
            onClick={() => setOpenReview(true)}
            className="
              mt-[clamp(4px,1.5vw,8px)]
              inline-flex
              max-w-full
              items-center
              gap-[clamp(2px,0.8vw,4px)]
              text-[clamp(7px,2vw,10px)]
              font-semibold
              leading-tight
              text-cyan-300
              underline
              decoration-cyan-300/70
              underline-offset-2
              transition
              hover:text-cyan-200
              md:text-[11px]
            "
          >
            <span className="truncate">
              Xem phân tích sản phẩm
            </span>

            <span className="shrink-0">
              →
            </span>
          </button>
        )}

        {/* 06. GIÁ / KHỐI LƯỢNG */}
        <div
          className="
            mt-[clamp(4px,1.5vw,8px)]
            flex
            min-w-0
            items-baseline
            gap-[clamp(2px,0.8vw,6px)]
          "
        >
          <span
            className="
              min-w-0
              truncate
              whitespace-nowrap
              text-[clamp(10px,3.2vw,15px)]
              font-bold
              leading-tight
              text-red-500
              md:text-base
            "
          >


            {formatPriceDisplay(
              product.best_price,
              status
            )?.toLocaleString()}
          </span>

          {product.net_weight && (
            <>
              <span className="shrink-0 text-[clamp(8px,2vw,12px)] text-white">
                /
              </span>

              <span
                className="
                  min-w-0
                  truncate
                  whitespace-nowrap
                  text-[clamp(7px,2vw,10px)]
                  font-medium
                  text-red-300
                  md:text-[11px]
                "
              >
                {product.net_weight}
              </span>
            </>
          )}
        </div>
         {/* 07. FLASH SALE */}
        {(status === "active" || status === "coming") && (
          <>
            <div
            className={`

              my-[10px]
              min-w-0
              truncate
              text-[clamp(10px,1.8vw,11px)]
              leading-tight
              text-wrap
              
              ${status === "coming" ? "text-gray-400 opacity-80" : "text-green-300"  }

            `}
          >
            🎁 {product.promotion_program}
            {status === "active" ? (
              <span className=" block mt-[6px]">
              Đang diễn ra {timeLeft}s
              </span>
            ) : (
              <span className=" block mt-[6px]">
              Bắt đầu sau {timeLeft}
              </span>
            )}
          </div>

          </>

        )}


        {/* 09. NHÀ BÁN HÀNG UY TÍN */}
        
        { product.seller_name && (
        <div
          className="
            mt-[clamp(6px,2vw,10px)]
            border-t
            border-white/10
            pt-[clamp(5px,1.8vw,8px)]
          "
        >
          <div
            className="
              flex
              min-w-0
              items-center
              gap-[clamp(2px,0.8vw,6px)]
              text-[clamp(6px,1.8vw,11px)]
              leading-tight
              md:text-[11px]
            "
          >
            <span className="truncate font-semibold text-white">
              {product.seller_type}
            </span>
          </div>

          <div
            className="
              mt-[clamp(2px,0.8vw,4px)]
              truncate
              text-[clamp(7px,2vw,11px)]
              font-semibold
              text-yellow-300
              md:text-[11px]
            "
          >
            <span className="flex items-center gap-1">
              <FaShop />
              {product.seller_name}
            </span>
          
          </div>

          <div
            className="
              mt-[clamp(2px,0.8vw,4px)]
              flex
              min-w-0
              items-center
              gap-[clamp(2px,0.7vw,4px)]
              overflow-hidden
              whitespace-nowrap
              text-[clamp(6px,1.7vw,11px)]
              text-gray-400
              md:text-[11px]
            "
          >
            <span className="shrink-0 text-yellow-300">
              ★ {product.rating}
            </span>

            <span className="shrink-0">·</span>

            <span className="min-w-0 truncate">
              {formatNumber(product.review_count)}+ đánh giá
            </span>

            <span className="shrink-0">·</span>

            <span className="min-w-0 truncate">
              {formatNumber(product.sold)}+ đã bán
            </span>
          </div>
        </div>
        )}


        {/* 10. MARKETPLACES */}
        <div
          className="
          mt-auto
          flex
          gap-[clamp(3px,1.2vw,6px)]
          pt-[clamp(7px,2.5vw,10px)]
          "
        >
          {product.tiktok_shop_link ? (
            <a
              href={product.tiktok_shop_link}
              target="_blank"
              rel="noopener noreferrer"
              className="
                relative
                flex
                h-[clamp(24px,8vw,32px)]
                min-w-0
                flex-1
                items-center
                justify-center
                overflow-hidden
                rounded-[clamp(6px,1.5vw,8px)]
                bg-[linear-gradient(135deg,#3b82f6,#8b5cf6)]
                px-1
                text-[clamp(7px,2vw,10px)]
                font-semibold
                text-white
                ring-1
                ring-white/15
                transition
                active:scale-95
                md:h-9
                md:text-[11px]
              "
            >
              <span className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.18),transparent)] animate-[shine_4s_linear_infinite]" />

              <span className="relative z-10 truncate">
                TikTok
              </span>
            </a>
          ) : (
            <span
              className="
                flex
                h-[clamp(24px,8vw,32px)]
                min-w-0
                flex-1
                items-center
                justify-center
                rounded-[clamp(6px,1.5vw,8px)]
                bg-[linear-gradient(135deg,#3b82f6,#8b5cf6)]
                px-1
                text-[clamp(7px,2vw,10px)]
                font-semibold
                text-gray-300
                ring-1
                ring-white/10
                opacity-50
              "
            >
              TikTok
            </span>
          )}

          {product.affiliate_link ? (
            <a
              href={product.affiliate_link}
              target="_blank"
              rel="noopener noreferrer"
              className="
                relative
                flex
                h-[clamp(24px,8vw,32px)]
                min-w-0
                flex-1
                items-center
                justify-center
                overflow-hidden
                rounded-[clamp(6px,1.5vw,8px)]
                bg-[linear-gradient(135deg,#f50fb0,#dd034c)]
                px-1
                text-[clamp(7px,2vw,10px)]
                font-semibold
                text-white
                transition
                active:scale-95
                md:h-9
                md:text-[11px]
              "
            >
              <span className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.45),transparent)] animate-[shine_4s_linear_infinite]" />

              <span className="relative z-10 truncate">
                Shopee
              </span>
            </a>
          ) : (
            <span
              className="
                flex
                h-[clamp(24px,8vw,32px)]
                min-w-0
                flex-1
                items-center
                justify-center
                rounded-[clamp(6px,1.5vw,8px)]
                bg-white/5
                px-1
                text-[clamp(7px,2vw,10px)]
                font-semibold
                text-gray-500
                ring-1
                ring-white/10
              "
            >
              Shopee
            </span>
          )}
        </div>
      </div>
    </article>

    {/* DETAIL REVIEW */}
{openReview && (
  <div
    className="
      fixed
      inset-0
      z-[999]
      overflow-y-auto
      bg-black/70
      backdrop-blur-sm
    "
  >
    <div
      className="
        relative
        mx-auto
        min-h-full
        w-full
        max-w-[95vw]
        bg-[#0f172a]
        p-3
        md:max-w-[70vw]
        md:p-4

      "
    >
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
              // <ProductReviewSlider
              //   short_description={product.short_description || ""}
              //   productName={product.name}
              //   affiliateLink={product.affiliate_link}
              //   reviews={product.reviews}
              //   benefit={product.benefits}
              //   usage={product.usage}
              //   ingredient={product.ingredients}
              //   cta={product.cta}
              // />
              <ProductReviewSlider
                reviews={product.reviews}
                short_description={product.short_description}
                productName={product.name}
                affiliateLink={product.affiliate_link}
                cta={product.cta}
                reviewData={{
                  effectiveness: {
                    summary: product.hook,

                    scores: product.productfilter
                            ?.find((filter) => filter.slug === "skin-care")
                            ?.filterValues.map((item) => ({
                              label: item.value,
                              score: item.score,
                            })) ?? [],

                    strengths: product.benefits.split(".") ?? [],

                    limitations: product.limitations?.split(".") ?? [],
                  },

                  ingredients: {
                    summary:
                      "Công thức tập trung vào các thành phần hỗ trợ dưỡng ẩm và làm dịu.",

                    highlights: [
                      {
                        title: "Beta-Glucan",
                        description:
                          "Hỗ trợ dưỡng ẩm và làm dịu, giúp cải thiện cảm giác khô căng trên da.",
                      },
                      {
                        title: "Hyaluronic Acid",
                        description:
                          "Hỗ trợ giữ nước và duy trì cảm giác ẩm mượt cho bề mặt da.",
                      },
                    ],

                    safety: {
                      score: 8.2,

                      summary:
                        "Độ an toàn và mức độ phù hợp phụ thuộc vào toàn bộ công thức cũng như khả năng dung nạp của từng người.",

                      cautions: [
                        "Da rất nhạy cảm nên kiểm tra kỹ bảng thành phần trước khi sử dụng.",
                      ],
                    },
                  },

                  suitability: {
                    summary:
                      "Phù hợp nhất với người ưu tiên dưỡng ẩm và cải thiện tình trạng da thiếu nước.",

                    skinTypes: [
                      {
                        label: "Da khô",
                        score: 9.5,
                      },
                      {
                        label: "Da thiếu nước",
                        score: 9.3,
                      },
                      {
                        label: "Da thường",
                        score: 8.8,
                      },
                      {
                        label: "Da hỗn hợp",
                        score: 7.5,
                      },
                      {
                        label: "Da dầu",
                        score: 6.5,
                      },
                    ],

                    concerns: [
                      {
                        label: "Thiếu nước",
                        score: 9.3,
                      },
                      {
                        label: "Khô căng",
                        score: 9,
                      },
                      {
                        label: "Cần làm dịu",
                        score: 8.2,
                      },
                      {
                        label: "Mụn",
                        score: 4,
                      },
                    ],

                    bestFor: [
                      "Da đang thiếu nước hoặc thường xuyên khô căng.",
                      "Người cần một toner dưỡng ẩm sử dụng hằng ngày.",
                    ],

                    avoidOrConsider: [
                      "Người đang tìm một sản phẩm treatment trị mụn.",
                      "Da có tiền sử nhạy cảm với thành phần cần lưu ý.",
                    ],
                  },

                  experience: {
                    texture: "Lỏng nhẹ",
                    absorption: "Khá nhanh",
                    finish: "Ẩm mượt",

                    timeline: [
                      {
                        label: "Ngay sau khi dùng",
                        description:
                          "Da có thể cảm nhận mềm và ẩm hơn.",
                      },
                      {
                        label: "Sau 1–2 tuần",
                        description:
                          "Có thể bắt đầu đánh giá mức độ cải thiện cảm giác khô căng nếu sản phẩm phù hợp.",
                      },
                      {
                        label: "Sau 4–8 tuần",
                        description:
                          "Đánh giá hiệu quả duy trì và mức độ phù hợp trong toàn bộ routine.",
                      },
                    ],

                    feedback: {
                      positive: [
                        "Khả năng cấp ẩm tốt.",
                        "Dễ kết hợp với các bước skincare khác.",
                      ],

                      negative: [
                        "Không phù hợp nếu kỳ vọng treatment chuyên sâu.",
                      ],
                    },
                  },

                  reliability: {
                    brandScore: 8.8,
                    sourceScore: 9,
                    distributorScore: 8.5,

                    brand:
                      "Đánh giá dựa trên mức độ minh bạch thông tin và sự nhất quán của thương hiệu.",

                    manufacturer:
                      "Thông tin về nguồn gốc và nhà sản xuất nên có khả năng kiểm tra và xác minh.",

                    distributor:
                      "Ưu tiên nguồn bán có thông tin rõ ràng, chính sách hỗ trợ và khả năng xác minh hàng hóa.",

                    strengths: [
                      "Thông tin sản phẩm có thể kiểm tra.",
                      "Có tiêu chí riêng để đánh giá nguồn bán.",
                    ],

                    cautions: [
                      "Độ tin cậy của nơi bán cần được đánh giá riêng theo từng nhà phân phối.",
                    ],
                  },
                }}
/>
            )}
          </div>
        </div>
      </div>
    )}
  </>
)
}
