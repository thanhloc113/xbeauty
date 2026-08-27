import { sql } from "@/lib/db"
import { cookies, headers } from "next/headers"
import { Product, Tag, ProductFilter, ProductReview, ProductIngredient  } from "@/types/product"

// --- Update product ---
const updateProduct = async (id: number, body: Product) => {
  const {
    name,
    image,
    affiliate_link,
    tiktok_shop_link,
    short_description,
    benefits,
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
    promotion_program,
    net_weight,
    seller_type,
    seller_name,
    ingredients_summary,
    brand,
    market_count,
    founded_year,
    country,
    standand,
    trust
  } = body

  const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "")


  const result = await sql`
    UPDATE products
    SET
      name = ${name},
      slug = ${slug},
      image = ${image},
      affiliate_link = ${affiliate_link},
      tiktok_shop_link = ${tiktok_shop_link},
      short_description = ${short_description},
      benefits = ${benefits},
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
      hook = ${hook},
      promotion_program = ${promotion_program},
      net_weight = ${net_weight},
      seller_type = ${seller_type},
      seller_name = ${seller_name},
      ingredients_summary = ${ingredients_summary},
      brand = ${brand},
      market_count = ${market_count},
      founded_year = ${founded_year},
      country = ${country},
      standand = ${standand},
      trust = ${trust}
    WHERE id = ${id}
    RETURNING id
  `

  if (result.length === 0) throw new Error("PRODUCT_NOT_FOUND")
  return result[0].id
}
const updateProductIngredients = async (
  productId: number,
  ingredients: ProductIngredient[]
) => {

  if (!ingredients) return

  const existing = await sql`
    SELECT
      ingredient_id,
      position,
      concentration,
      notes
    FROM product_ingredients_map
    WHERE product_id = ${productId}
  `

  const existingIds = existing.map(
    item => Number(item.ingredient_id)
  )

  const incomingIngredients = ingredients.map(
    (ingredient, index) => ({
      ingredient_id: Number(ingredient.id),

      position: index + 1,

      concentration:
        ingredient.concentration ?? null,

      notes:
        ingredient.notes ?? null
    })
  )

  const incomingIds = incomingIngredients.map(
    item => item.ingredient_id
  )

  /* DELETE */

  const idsToDelete = existingIds.filter(
    id => !incomingIds.includes(id)
  )

  for (const ingredientId of idsToDelete) {

    await sql`
      DELETE FROM product_ingredients_map
      WHERE
        product_id = ${productId}
        AND ingredient_id = ${ingredientId}
    `
  }

  /*
    Tạm thời đổi toàn bộ position
    để tránh UNIQUE conflict khi reorder
  */

  await sql`
    UPDATE product_ingredients_map
    SET position = -position
    WHERE product_id = ${productId}
  `

  /* UPDATE EXISTING */

  for (const ingredient of incomingIngredients) {

    if (!existingIds.includes(ingredient.ingredient_id)) {
      continue
    }

    await sql`
      UPDATE product_ingredients_map
      SET
        position = ${ingredient.position},

        concentration = ${ingredient.concentration},

        notes = ${ingredient.notes}

      WHERE
        product_id = ${productId}

        AND ingredient_id = ${ingredient.ingredient_id}
    `
  }

  /* INSERT NEW */

  for (const ingredient of incomingIngredients) {

    if (existingIds.includes(ingredient.ingredient_id)) {
      continue
    }

    await sql`
      INSERT INTO product_ingredients_map (
        product_id,
        ingredient_id,
        position,
        concentration,
        notes
      )
      VALUES (
        ${productId},
        ${ingredient.ingredient_id},
        ${ingredient.position},
        ${ingredient.concentration},
        ${ingredient.notes}
      )
    `
  }
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

    await sql`DELETE FROM product_tag_map WHERE product_id = ${productId} AND tag_id = ${id}`
  }

  for (const id of idsToInsert) {

    await sql`INSERT INTO product_tag_map (product_id, tag_id) VALUES (${productId}, ${id})`
  }
}

const updateProductFilter = async (
  productId: number,
  productfilter: ProductFilter
) => {
  if (!productfilter) return

  // Lấy filter hiện tại trong DB
  const existing = await sql`
    SELECT
      product_filter_value_id,
      score
    FROM product_filter_map
    WHERE product_id = ${productId}
  `

  // Lấy toàn bộ filter mới từ frontend
  const incomingValues = productfilter.flatMap(group =>
    group.filterValues.map(value => ({
      id: Number(value.id),
      score: Number(value.score),
    }))
  )

  const existingIds = existing.map(item =>
    Number(item.product_filter_value_id)
  )

  const incomingIds = incomingValues.map(
    item => item.id
  )

  // DELETE: có trong DB nhưng không còn ở frontend
  const idsToDelete = existingIds.filter(
    id => !incomingIds.includes(id)
  )

  // INSERT: có ở frontend nhưng chưa có trong DB
  const valuesToInsert = incomingValues.filter(
    value => !existingIds.includes(value.id)
  )

  // UPDATE: đã tồn tại nhưng score thay đổi
  const valuesToUpdate = incomingValues.filter(value => {
    const existingValue = existing.find(
      item =>
        Number(item.product_filter_value_id) === value.id
    )

    return (
      existingValue &&
      Number(existingValue.score) !== value.score
    )
  })

  // DELETE
  for (const id of idsToDelete) {
    await sql`
      DELETE FROM product_filter_map
      WHERE product_id = ${productId}
        AND product_filter_value_id = ${id}
    `
  }

  // INSERT
  for (const value of valuesToInsert) {
    await sql`
      INSERT INTO product_filter_map (
        product_id,
        product_filter_value_id,
        score
      )
      VALUES (
        ${productId},
        ${value.id},
        ${value.score}
      )
    `
  }

  // UPDATE SCORE
  for (const value of valuesToUpdate) {
    await sql`
      UPDATE product_filter_map
      SET score = ${value.score}
      WHERE product_id = ${productId}
        AND product_filter_value_id = ${value.id}
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


    await updateProduct(productId, body)
    if (body.ingredients) {
    await updateProductIngredients(
      productId,
      body.ingredients
    )
    if (body.tags) await updateProductTags(productId, body.tags)
    if (body.productfilter) await updateProductFilter(productId, body.productfilter)
    if (body.reviews)  await updateProductReviews(productId, body.reviews || [])

}
    return Response.json({ success: true })
  } catch (error) {
    console.error(error)
    return Response.json({ error: "Server error" }, { status: 500 })
  }
}