import { sql } from "@/lib/db"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const topicSlug = searchParams.get("topic")


  if (!topicSlug) {

      const result = await sql`
          SELECT 
            id,
            name,
            intro,
            slug,
            display_order
          FROM product_categories 
          ORDER BY display_order ASC
        `
        return Response.json(result)
  }

  const result = await sql`
    SELECT DISTINCT
      c.id,
      c.name,
      c.intro,
      c.slug,
      c.display_order
    FROM product_categories c
    INNER JOIN topic_categories tc
      ON tc.category_id = c.id
    INNER JOIN topics t
      ON t.id = tc.topic_id
    WHERE t.slug = ${topicSlug}
    ORDER BY c.display_order ASC
  `
  return Response.json(result)
}