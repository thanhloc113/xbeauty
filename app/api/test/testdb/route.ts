import { sql } from "@/lib/db"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const limit = Number(searchParams.get("limit") ?? 20)

  const data = await sql`
SELECT 
  p.id,
  p.name,
  p.image,
  p.short_description,
  p.benefits,
  p.ingredients,
  p.usage,
  p.best_price,
  p.original_price,
  p.rating,
  p.review_count,
  p.sold,
  p.flash_sale_start,
  p.flash_sale_end,
  p.affiliate_link,
  p.product_link,

  -- 👉 dùng field của product làm preview
  p.usage AS preview,   -- hoặc p.benefit

  -- TAGS
  COALESCE(
    (
      SELECT jsonb_agg(DISTINCT t.slug)
      FROM product_tag_map ptm
      JOIN tags t ON t.id = ptm.tag_id
      WHERE ptm.product_id = p.id
    ),
    '[]'
  ) AS tags,

  -- ATTRIBUTES (key-value chuẩn)
  COALESCE(
    (
      SELECT jsonb_object_agg(attr.slug, attr.values)
      FROM (
        SELECT 
          a.slug,
          jsonb_agg(av.slug) AS values
        FROM product_attribute_values pav
        JOIN attribute_values av ON av.id = pav.attribute_value_id
        JOIN attributes a ON a.id = av.attribute_id
        WHERE pav.product_id = p.id
        GROUP BY a.slug
      ) attr
    ),
    '{}'
  ) AS attributes,

  -- REVIEWS (media list)
  COALESCE(
    (
      SELECT jsonb_agg(
        jsonb_build_object(
          'media_type', pr.media_type,
          'media_url', pr.media_url,
          'display_order', pr.display_order
        )
        ORDER BY pr.display_order
      )
      FROM product_reviews pr
      WHERE pr.product_id = p.id
    ),
    '[]'
  ) AS reviews

FROM products p

WHERE p.id = 103

ORDER BY p.sold DESC
LIMIT 20;
  `

  return Response.json(data)
}