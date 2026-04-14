import { sql } from "@/lib/db"
import { cookies, headers } from "next/headers"
import { Product, Tag, ProductFilter, ProductReview } from "@/types/product"

// --- Update product ---
const updateProduct = async (id: number, body: Product) => {
  const {
    name,
    image,
    affiliate_link,
    short_description,
    benefits,
    ingredients,
    usage,
    rating = 0,
    review_count = 0,
    sold = 0,
    original_price,
    best_price,
    flash_sale_start,
    flash_sale_end,
    product_link,
    cta,
    hook,
  } = body

  const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "")


  const result = await sql`
    UPDATE products
    SET
      name = ${name},
      slug = ${slug},
      image = ${image},
      affiliate_link = ${affiliate_link},
      short_description = ${short_description},
      benefits = ${benefits},
      ingredients = ${ingredients},
      usage = ${usage},
      rating = ${rating},
      review_count = ${review_count},
      sold = ${sold},
      original_price = ${original_price},
      best_price = ${best_price},
      flash_sale_start = ${flash_sale_start ?? null},
      flash_sale_end = ${flash_sale_end ?? null},
      product_link = ${product_link},
      cta = ${cta},
      hook = ${hook}
    WHERE id = ${id}
    RETURNING id
  `

  if (result.length === 0) throw new Error("PRODUCT_NOT_FOUND")
  return result[0].id
}

const updateProductTags = async (productId: number, tags: Tag[]) => {
  const existing = await sql`
    SELECT tag_id FROM product_tag_map
    WHERE product_id = ${productId}
  `
  const existingIds: number[] = existing.map(e => Number(e.tag_id))
  const incomingIds: number[] = tags.map(t => Number(t.id))


  const idsToDelete = existingIds.filter(id => !incomingIds.includes(id))
  const idsToInsert = incomingIds.filter(id => !existingIds.includes(id))
  for (const id of idsToDelete) {
    const queryStr = `DELETE FROM product_tag_map WHERE product_id = ${productId} AND tag_id = ${id};`
    console.log("Executing DELETE tag:", queryStr)
    await sql`DELETE FROM product_tag_map WHERE product_id = ${productId} AND tag_id = ${id}`
  }

  for (const id of idsToInsert) {
    const queryStr = `INSERT INTO product_tag_map (product_id, tag_id) VALUES (${productId}, ${id});`
    console.log("Executing INSERT tag:", queryStr)
    await sql`INSERT INTO product_tag_map (product_id, tag_id) VALUES (${productId}, ${id})`
  }
}

const updateProductFilter = async (
  productId: number,
  productfilter: ProductFilter
) => {
  if (!productfilter) return

  // Lấy tất cả filter hiện tại của product
  const existing = await sql`
    SELECT product_filter_value_id
    FROM product_filter_map
    WHERE product_id = ${productId}
  `

  const existingIds: number[] = existing.map(e =>
    Number(e.product_filter_value_id)
  )

  // 🔥 Lấy ID trực tiếp từ JSON mới
  const incomingIds: number[] = productfilter.flatMap(group =>
    group.value.map(v => Number(v.id))
  )

  console.log("Incoming filter IDs:", incomingIds)

  const idsToDelete = existingIds.filter(id => !incomingIds.includes(id))
  const idsToInsert = incomingIds.filter(id => !existingIds.includes(id))

  console.log("Delete IDs:", idsToDelete)
  console.log("Insert IDs:", idsToInsert)

  // DELETE
  for (const id of idsToDelete) {
    const queryStr = `DELETE FROM product_filter_map WHERE product_id = ${productId} AND product_filter_value_id = ${id};`
    console.log("Executing DELETE filter:", queryStr)

    await sql`
      DELETE FROM product_filter_map
      WHERE product_id = ${productId}
        AND product_filter_value_id = ${id}
    `
  }

  // INSERT
  for (const id of idsToInsert) {
    const queryStr = `INSERT INTO product_filter_map (product_id, product_filter_value_id) VALUES (${productId}, ${id});`
    console.log("Executing INSERT filter:", queryStr)

    await sql`
      INSERT INTO product_filter_map (product_id, product_filter_value_id)
      VALUES (${productId}, ${id})
    `
  }
}
//update reviews
const updateProductReviews = async (
  productId: number,
  reviews: ProductReview[]
) => {
  if (!reviews) return

  const existing = await sql`
    SELECT id, media_type, media_url, display_order
    FROM product_reviews
    WHERE product_id = ${productId}
  ` as ProductReview[]

  // Map existing
  const existingMap = new Map<number, ProductReview>()
  existing.forEach((r) => {
    existingMap.set(Number(r.id), r)
  })

  const existingIds = existing.map(r => Number(r.id))

  // ép toàn bộ incoming id về number (nếu có)
  const incomingIds = reviews
    .filter(r => r.id && Number(r.id) > 0)
    .map(r => Number(r.id))

  // ===== DELETE =====
  const idsToDelete = existingIds.filter(id => !incomingIds.includes(id))

  for (const id of idsToDelete) {
    console.log(`DELETE review id=${id}`)

    await sql`
      DELETE FROM product_reviews
      WHERE id = ${id}
    `
  }

  // ===== UPDATE =====
  for (const r of reviews) {
    const id = Number(r.id)

    if (!id || !existingMap.has(id)) continue

    const old = existingMap.get(id)!

    if (
      old.media_type !== r.media_type ||
      old.media_url !== r.media_url ||
      old.display_order !== r.display_order
    ) {
      console.log(`UPDATE review id=${id}`)

      await sql`
        UPDATE product_reviews
        SET
          media_type = ${r.media_type},
          media_url = ${r.media_url},
          display_order = ${r.display_order}
        WHERE id = ${id}
      `
    }
  }

  // ===== INSERT =====
  const newReviews = reviews.filter(r => {
    const id = Number(r.id)
    return !id || !existingMap.has(id)
  })

  for (const r of newReviews) {
    console.log("INSERT review:", r)

    await sql`
      INSERT INTO product_reviews (
        product_id,
        media_type,
        media_url,
        display_order
      )
      VALUES (
        ${productId},
        ${r.media_type},
        ${r.media_url},
        ${r.display_order}
      )
    `
  }
}
// --- API Handler ---
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const productId = Number(id)

    const [cookieStore, headerList] = await Promise.all([cookies(), headers()])
    const sessionToken = cookieStore.get("admin_session")?.value
    const deviceId = headerList.get("device-id")

    if (!sessionToken || !deviceId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const session = await sql`
      SELECT admin_username FROM admin_sessions
      WHERE session_token = ${sessionToken}
        AND device_id = ${deviceId}
        AND expires_at > NOW()
      LIMIT 1
    `
    if (session.length === 0) return Response.json({ error: "Invalid session" }, { status: 403 })

    const admin = await sql`
      SELECT username FROM admin_users
      WHERE username = ${session[0].admin_username}
      LIMIT 1
    `
    if (admin.length === 0) return Response.json({ error: "Not admin" }, { status: 403 })

    const body: Product = await req.json()
    if (!body) return Response.json({ error: "Invalid body" }, { status: 400 })

    console.log("Updating product ID:", productId)
    await updateProduct(productId, body)

    if (body.tags?.length) await updateProductTags(productId, body.tags)
    if (body.productfilter) await updateProductFilter(productId, body.productfilter)
    if (body.reviews)  await updateProductReviews(productId, body.reviews || [])
    return Response.json({ success: true })
  } catch (error) {
    console.error(error)
    return Response.json({ error: "Server error" }, { status: 500 })
  }
}