export type ProductReview = {
  id: number
  product_id: number
  media_type: "image" | "video"
  media_url: string
  caption: string
  display_order: number
}