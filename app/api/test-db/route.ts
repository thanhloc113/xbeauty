import { sql } from "@/lib/db"

export async function GET() {

  const result = await sql`
    SELECT * FROM products
  `
  return Response.json(result)
}