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
      p.*,
      c.name as category_name,
      c.slug as category_slug
    FROM products p
    LEFT JOIN product_categories c
    ON p.category_id = c.id
    WHERE
      p.is_active = true
      AND (${category}::text IS NULL OR c.slug = ${category})
      AND (${search}::text IS NULL OR p.name ILIKE '%' || ${search} || '%')
    ORDER BY p.id ASC
    LIMIT ${limit}
    OFFSET ${offset}
  `

  return Response.json({
    products,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  })

}