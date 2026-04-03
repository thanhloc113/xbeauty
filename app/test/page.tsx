
import TestCP from "@/components/TestCP"
import TestUI from "@/components/TestUI"
import UserProductItem from "@/components/UserProductItem"
const Product = {
    id: 1000,

  name: "Sữa rửa mặt làm dịu da",
  slug: "sua_rua_mat",

  image: "https://i.pinimg.com/736x/29/ae/80/29ae8052a638329550cafb92918a0206.jpg",
  affiliate_link:  "",

  item_id:  "",
  shop_id:  "",

  skin_type:  "da dầu",
  main_problem:  "Rửa mặt xong vẫn đổ dầu ,Dễ nổi mụn",
  highlight_tag: "bán chạy",

  short_description:  "Dành cho da dầu mụn đặc biết hiệu quả sau 7 ngày",
  benefits:   "Kiềm dầu tốt , Che Khuyết Điểm",
  ingredients:  "thảo môc",
  usage:  "2 lần sáng tối",

  rating: 5 ,// default 0 → không cần ""
  review_count: 1000 ,// default 0
  sold: 100000 ,// default 0

  created_at: "" ,// timestamp → frontend nên dùng string
  is_active: true,

  best_price: 10000,
  original_price: 100000,

  flash_sale_start:  "",
  flash_sale_end:  "",

  category_id: 1 ,

  product_link:  "",
}

export default function TestPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white p-4">
      
      {/* TITLE */}
      <h1 className="text-xl font-bold mb-4">
        🛍️ Test Product UI
      </h1>
      <div className="flex gap-4 scrollbar-hide">
      {/* UI1 */}
      <TestCP />

            {/* UI1 */}
      {/* <TestUI /> */}

      <UserProductItem product={Product} />
    </div>

    </main>
  )
}