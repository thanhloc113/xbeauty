import { sql } from "@/lib/db"
import { cookies, headers } from "next/headers"

export async function PUT(
 req: Request,
  context: { params: Promise<{ id: string }> }
) {

  try {
    const { id } = await context.params
     
    const [cookieStore, headerList] = await Promise.all([
      cookies(),
      headers()
    ])


    const sessionToken = cookieStore.get("admin_session")?.value
    const deviceId = headerList.get("device-id")

    // const userAgent = headerList.get("user-agent")
    if (!sessionToken || !deviceId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    // check session
    const session = await sql`
      SELECT admin_username FROM admin_sessions
      WHERE session_token = ${sessionToken}
      AND device_id = ${deviceId}
      AND expires_at > NOW()
      LIMIT 1
    `

 
    if (session.length === 0) {
      console.log("Invalid session");
      return Response.json({ error: "Invalid session" }, { status: 403 })
    }


    // check admin
    const admin = await sql`
      SELECT username FROM admin_users
      WHERE username = ${session[0].admin_username}
      LIMIT 1
    `

    if (admin.length === 0) {
      console.log("Not admin");
      return Response.json({ error: "Not admin" }, { status: 403 })
    }

    const body = await req.json()
    if (!body) {
      return Response.json({ error: "Invalid body" }, { status: 400 })
    }
    const {
      name,
      slug,
      image,
      affiliate_link,
      skin_type,
      main_problem,
      highlight_tag,
      short_description,
      benefits,
      ingredients,
      usage,
      rating,
      review_count,
      sold,
      original_price,
      best_price,
      flash_sale_start,
      flash_sale_end
    
    } = body
    


   const update = await sql`
      UPDATE products
      SET
      name = ${name},
      slug = ${slug},
      image = ${image},
      affiliate_link = ${affiliate_link},
      skin_type = ${skin_type},
      main_problem = ${main_problem},
      highlight_tag = ${highlight_tag},
      short_description = ${short_description},
      benefits = ${benefits},
      ingredients = ${ingredients},
      usage = ${usage},
      rating = ${rating},
      review_count = ${review_count},
      sold = ${sold},
      original_price = ${original_price},
      best_price=${best_price},
      flash_sale_start = ${flash_sale_start},
      flash_sale_end = ${flash_sale_end}
        WHERE id = ${id}
        RETURNING id
      `

  // không có sản phẩm nào được update
  if (update.length === 0) {
    return Response.json({
      success: false,
      code: "PRODUCT_NOT_FOUND",
      message: "Product không tồn tại"
    }, { status: 404 })
  }

  return Response.json({ success: true })

  } catch (error) {

    console.error(error)

    return Response.json(
      { error: "Server error" },
      { status: 500 }
    )

  }

}