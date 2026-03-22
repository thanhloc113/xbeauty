import { sql } from "@/lib/db"

export async function GET() {

  const result = await sql`
    SELECT id, name, slug
    FROM product_categories
    ORDER BY id ASC
  `
  
  return Response.json(result)

}