import { sql } from "@/lib/db"

export async function GET() {

  const result = await sql`
    SELECT id, name, slug, display_order
    FROM product_categories
    ORDER BY display_order ASC
  `
  
  return Response.json(result)

}