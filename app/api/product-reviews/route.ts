import { NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"


// ✅ GET: lấy full data (caption + list media)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const product_id = searchParams.get("product_id")

  if (!product_id) {
    return NextResponse.json({ error: "Missing product_id" }, { status: 400 })
  }

  const rows = await sql`
    SELECT 
      prm.product_id,
      prm.caption,
      pr.id,
      pr.media_type,
      pr.media_url,
      pr.display_order
    FROM product_review_meta prm
    LEFT JOIN product_reviews pr
      ON prm.product_id = pr.product_id
    WHERE prm.product_id = ${product_id}
    ORDER BY pr.display_order ASC
  `

  return NextResponse.json({
    product_id: Number(product_id),
    caption: rows[0]?.caption || "",
    reviews: rows.map(r => ({
      id: r.id,
      media_type: r.media_type,
      media_url: r.media_url,
      display_order: r.display_order
    }))
  })
}



// ✅ POST: update full (caption + list media)
export async function POST(req: NextRequest) {
  const body = await req.json()

  const { product_id, caption, reviews } = body

  if (!product_id) {
    return NextResponse.json({ error: "Missing product_id" }, { status: 400 })
  }

  // 1. upsert caption
  await sql`
    INSERT INTO product_review_meta (product_id, caption)
    VALUES (${product_id}, ${caption || ""})
    ON CONFLICT (product_id)
    DO UPDATE SET caption = EXCLUDED.caption
  `

  // 2. delete old media
  await sql`
    DELETE FROM product_reviews
    WHERE product_id = ${product_id}
  `

  // 3. insert new media
  if (reviews && reviews.length > 0) {
    for (let i = 0; i < reviews.length; i++) {
      const r = reviews[i]

      await sql`
        INSERT INTO product_reviews
        (product_id, media_type, media_url, display_order)
        VALUES (
          ${product_id},
          ${r.media_type},
          ${r.media_url},
          ${i}
        )
      `
    }
  }

  return NextResponse.json({ success: true })
}