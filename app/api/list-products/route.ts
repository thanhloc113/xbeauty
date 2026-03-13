import { sql } from "@/lib/db"

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url)

  const category = searchParams.get("category")
  const limit = Number(searchParams.get("limit") ?? 50)

  let result

  if (category) {
    result = await sql`
      SELECT * FROM products
      WHERE is_active = true
      AND category = ${category}
      ORDER BY id DESC
      LIMIT ${limit}
    `
  } else {
    result = await sql`
      SELECT * FROM products
      WHERE is_active = true
      ORDER BY id DESC
      LIMIT ${limit}
    `
  }

  return Response.json(result)
}

export async function POST(req: Request) {

  const body = await req.json()

  const product = await sql`
    INSERT INTO products (
      name,
      slug,
      image,
      category,
      original_price,
      best_price,
      is_active
    )
    VALUES (
      ${body.name},
      ${body.slug},
      ${body.image},
      ${body.category},
      ${body.original_price},
      ${body.best_price},
      true
    )
    RETURNING *
  `

  return Response.json(product)
}

export async function PUT(req: Request) {

  const body = await req.json()

  const product = await sql`
    UPDATE products
    SET
      name = ${body.name},
      image = ${body.image},
      category = ${body.category},
      best_price = ${body.best_price},
      is_active = ${body.is_active}
    WHERE id = ${body.id}
    RETURNING *
  `

  return Response.json(product)
}