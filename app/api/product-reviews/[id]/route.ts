import { NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"


// ✅ GET single review (kèm caption)
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const rows = await sql`
    SELECT 
      pr.id,
      pr.product_id,
      pr.media_type,
      pr.media_url,
      pr.display_order,
      prm.caption
    FROM product_reviews pr
    LEFT JOIN product_review_meta prm
      ON pr.product_id = prm.product_id
    WHERE pr.id = ${Number(id)}
  `

  if (!rows[0]) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  return NextResponse.json(rows[0])
}


// ✅ UPDATE review (media + caption nếu có)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

  const body = await req.json()
  const { media_url, media_type, caption } = body
  if (!media_url || !media_type) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }
  const { id } = await params
  // 1. update media
  const updated = await sql`
    UPDATE product_reviews
    SET 
      media_url = ${media_url},
      media_type = ${media_type}
    WHERE id = ${Number(id)}
    RETURNING *
  `

  const review = updated[0]

  // 2. nếu có caption → update bảng meta
  if (caption !== undefined && review) {
    await sql`
      INSERT INTO product_review_meta (product_id, caption)
      VALUES (${review.product_id}, ${caption})
      ON CONFLICT (product_id)
      DO UPDATE SET caption = EXCLUDED.caption
    `
  }

  return NextResponse.json({
    ...review,
    caption: caption ?? null
  })
}



// ✅ DELETE review
export async function DELETE(
  req: NextRequest,
   { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  // lấy product_id trước khi xoá
  const existing = await sql`
    SELECT product_id FROM product_reviews
    WHERE id = ${id}
  `

  const product_id = existing[0]?.product_id

  // xoá review
  await sql`
    DELETE FROM product_reviews
    WHERE id = ${id}
  `

  // nếu product không còn review nào → xoá luôn meta (optional)
  const remain = await sql`
    SELECT 1 FROM product_reviews
    WHERE product_id = ${product_id}
    LIMIT 1
  `

  if (remain.length === 0 && product_id) {
    await sql`
      DELETE FROM product_review_meta
      WHERE product_id = ${product_id}
    `
  }

  return NextResponse.json({ success: true })
}