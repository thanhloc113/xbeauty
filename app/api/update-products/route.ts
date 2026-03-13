import { sql } from "@/lib/db"

export async function GET() {

 const products = await sql`
  SELECT * FROM products
 `

 for (const p of products) {

  const res = await fetch(
   `https://shopee.vn/api/v4/item/get?itemid=${p.item_id}&shopid=${p.shop_id}`
  )

  const data = await res.json()

  const item = data.data.item

  const price = item.price / 100000
  const before = item.price_before_discount / 100000

  const discount = Math.round(
   ((before - price) / before) * 100
  )

  await sql`
   UPDATE products
   SET
    price=${price},
    price_before_discount=${before},
    discount=${discount},
    flash_sale=${discount > 20}
   WHERE id=${p.id}
  `
 }

 return Response.json({ ok:true })

}