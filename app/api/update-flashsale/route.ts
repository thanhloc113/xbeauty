import { sql } from "@/lib/db"

export async function GET() {

  const res = await fetch(
    "https://shopee.vn/api/v4/flash_sale/get_all_sessions"
  )

  const data = await res.json()

  const sessions = data?.data?.sessions || []

  for (const session of sessions) {

    const items = session.items || []

    for (const item of items) {

      await sql`
        INSERT INTO products (
          item_id,
          shop_id,
          image,
          price,
          price_before_discount,
          discount,
          flash_sale
        )
        VALUES (
          ${item.itemid},
          ${item.shopid},
          ${item.image},
          ${item.price},
          ${item.price_before_discount},
          ${item.discount},
          true
        )
        ON CONFLICT (item_id)
        DO UPDATE SET
          price = EXCLUDED.price,
          price_before_discount = EXCLUDED.price_before_discount,
          discount = EXCLUDED.discount,
          flash_sale = true,
          updated_at = now()
      `
    }

  }

  return Response.json({ success: true })
}