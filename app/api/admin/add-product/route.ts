// app/api/products/insert/route.ts
import { NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { Product } from "@/types/product"

export async function POST(req: NextRequest) {
  try {
    const body: Product = await req.json()

    // 1️⃣ Insert product (id tự tăng)
    const result = await sql`
      INSERT INTO products
      (name, image, affiliate_link, product_link, short_description, benefits, ingredients, usage,
       best_price, original_price, rating, review_count, sold, flash_sale_start, flash_sale_end, category_id)
      VALUES
      (${body.name}, ${body.image}, ${body.affiliate_link}, ${body.product_link}, ${body.short_description}, 
       ${body.benefits}, ${body.ingredients}, ${body.usage}, ${body.best_price}, ${body.original_price},
       ${body.rating}, ${body.review_count}, ${body.sold}, ${body.flash_sale_start || null}, ${body.flash_sale_end || null}, ${body.category_id || null})
      RETURNING id
    `
    const product_id = result[0].id

    // 2️⃣ Insert tags liên quan
    if (body.tags?.length) {
      for (const tag of body.tags) {
        await sql`
          INSERT INTO product_tag_map (product_id, tag_id)
          VALUES (${product_id}, ${tag.id})
        `
      }
    }

    // 3️⃣ Insert filters liên quan
    if (body.productfilter?.length) {
      for (const group of body.productfilter) {
        for (const value of group.value) {
          await sql`
            INSERT INTO product_filter_map (product_id, product_filter_value_id)
            VALUES (${product_id}, ${value.id})
          `
        }
      }
    }

    // 4️⃣ Insert reviews
    if (body.reviews?.length) {
      for (const r of body.reviews) {
        await sql`
          INSERT INTO product_reviews (product_id, media_type, media_url, display_order)
          VALUES (${product_id}, ${r.media_type}, ${r.media_url}, ${r.display_order})
        `
      }
    }

    return NextResponse.json({ success: true, product_id })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ success: false, error: (err as Error).message }, { status: 500 })
  }
}