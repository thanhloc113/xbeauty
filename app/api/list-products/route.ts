import { sql } from "@/lib/db"

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url)

  const category = searchParams.get("category")
  const search = searchParams.get("search")

  const page = Number(searchParams.get("page") ?? 1)
  const limit = Number(searchParams.get("limit") ?? 20)

  const offset = (page - 1) * limit

  /* COUNT */

  const countResult = await sql`
    SELECT COUNT(*) as total
    FROM products p
    LEFT JOIN product_categories c
    ON p.category_id = c.id
    WHERE
      p.is_active = true
      AND (${category}::text IS NULL OR c.slug = ${category})
      AND (${search}::text IS NULL OR p.name ILIKE '%' || ${search} || '%')
  `

  const total = Number(countResult[0].total)

  /* PRODUCTS */

  const products = await sql`
    SELECT 
        p.id,
        p.name,
        p.image,
        p.original_price,
        p.benefits,
        p.ingredients,
        p.usage,
        p.best_price,
        p.sold,
        p.rating,
        p.review_count,
        p.short_description,
        p.affiliate_link,
        p.product_link,

        -- FIX TIMEZONE
        (p.flash_sale_start AT TIME ZONE 'Asia/Ho_Chi_Minh') as flash_sale_start,
        (p.flash_sale_end AT TIME ZONE 'Asia/Ho_Chi_Minh') as flash_sale_end,

        c.name as category_name,
        c.slug as category_slug,

        /* REVIEWS */
        COALESCE(
          (
            SELECT json_agg(
              jsonb_build_object(
                'id', pr.id,
                'media_type', pr.media_type,
                'media_url', pr.media_url,
                'display_order', pr.display_order,
                'created_at', pr.created_at
              )
              ORDER BY pr.display_order ASC
            )
            FROM product_reviews pr
            WHERE pr.product_id = p.id
          ),
          '[]'
        ) AS reviews,

        /* TAGS */
        COALESCE(
          (
            SELECT json_agg(
              jsonb_build_object(
                'id', t.id,
                'name', t.name,
                'slug', t.slug
              )
            )
            FROM product_tag_map ptm
            JOIN tags t ON t.id = ptm.tag_id
            WHERE ptm.product_id = p.id
          ),
          '[]'
        ) AS tags,

        /* FILTERS (GROUPED FULL OBJECT) */
        COALESCE(
          (
            SELECT json_agg(
              jsonb_build_object(
                'id', sub.id,
                'slug', sub.slug,
                'name', sub.name,
                'value', sub.values
              )
            )
            FROM (
              SELECT 
                pf.id,
                pf.slug,
                pf.name,
                json_agg(
                  jsonb_build_object(
                    'id', pfv.id,
                    'slug', pfv.slug,
                    'value', pfv.value
                  )
                  ORDER BY pfv.id
                ) AS values
              FROM product_filter_map pfm
              JOIN product_filter_value pfv 
                ON pfv.id = pfm.product_filter_value_id
              JOIN product_filter pf 
                ON pf.id = pfv.product_filter_id
              WHERE pfm.product_id = p.id
              GROUP BY pf.id, pf.slug, pf.name
            ) sub
          ),
          '[]'
        ) AS productFilter

    FROM products p
    LEFT JOIN product_categories c
      ON p.category_id = c.id
    WHERE
      p.is_active = true
      AND (${category}::text IS NULL OR c.slug = ${category})
      AND (${search}::text IS NULL OR p.name ILIKE '%' || ${search} || '%')
    ORDER BY c.display_order ASC
    LIMIT ${limit}
    OFFSET ${offset};
    `

  return Response.json({
    products,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  })

}