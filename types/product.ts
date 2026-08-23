
export type Category = {
  id: number
  name: string
  intro:string
  slug: string
}

export type Industry = {
  id: number
  name: string
  slug: string
}
export type ProductReview = {
  id: number
  media_type: "image" | "video"
  media_url: string
  display_order: number
}

export type Tag = {
  id: number
  name: string
  slug: string
}

// filter value (option)
export type FilterValue = {
  id: number
  slug: string
  value: string
  score:number
}

// filter group
export type ProductFilterGroup = {
  id: number
  slug: string
  name: string
  filterValues: FilterValue[]
}

// new product filter structure
export type ProductFilter = ProductFilterGroup[]

export type Product = {
  id: number
  name: string
  image: string
  affiliate_link: string
  tiktok_shop_link: string
  short_description: string
  benefits: string
  ingredients: string
  usage: string
  best_price: number
  original_price: number
  rating: number
  review_count: number
  sold: number
  flash_sale_start: string
  flash_sale_end: string
  product_link: string
  category_id: number
  hook:string
  cta:string
  reviews: ProductReview[]
  tags: Tag[]
  productfilter: ProductFilter
  promotion_program: string
  net_weight: string
  seller_type: string
  seller_name: string
  limitations:string
}