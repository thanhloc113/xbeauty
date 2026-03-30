export type Product = {
  id: number

  name: string | ""
  slug: string | ""

  image: string | ""
  affiliate_link: string | ""

  item_id: string | ""
  shop_id: string | ""

  skin_type: string | ""
  main_problem: string | ""
  highlight_tag: string | ""

  short_description: string | ""
  benefits: string | ""
  ingredients: string | ""
  usage: string | ""

  rating: number // default 0 → không cần ""
  review_count: number // default 0
  sold: number // default 0

  created_at: string // timestamp → frontend nên dùng string

  is_active: boolean

  best_price: number
  original_price: number

  flash_sale_start: string | ""
  flash_sale_end: string | ""

  category_id: number 

  product_link: string | ""
}