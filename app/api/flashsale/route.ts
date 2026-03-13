import { sql } from "@/lib/db"

export async function GET() {

  const products = await sql`
    SELECT *
    FROM products
    WHERE flash_sale = true
    ORDER BY discount DESC
    LIMIT 50
  `

  return Response.json(products)
}