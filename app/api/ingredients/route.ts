import { sql } from "@/lib/db"
import { cookies, headers } from "next/headers"

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

/* =========================
   GET - SEARCH INGREDIENTS
========================= */

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)

    const search =
      searchParams.get("search")?.trim() || ""

    const limit = Math.min(
      Math.max(
        Number(searchParams.get("limit") ?? 20),
        1
      ),
      50
    )

    // Không search khi chưa nhập ít nhất 2 ký tự
    if (search.length < 2) {
      return Response.json({
        ingredients: []
      })
    }

    const ingredients = await sql`
      SELECT
        id,
        slug,
        name,
        inci_name
      FROM ingredients
      WHERE
        name ILIKE '%' || ${search} || '%'
        OR inci_name ILIKE '%' || ${search} || '%'
        OR slug ILIKE '%' || ${search} || '%'
      ORDER BY
        CASE
          WHEN LOWER(name) = LOWER(${search}) THEN 0
          WHEN LOWER(name) LIKE LOWER(${search}) || '%' THEN 1
          ELSE 2
        END,
        name ASC
      LIMIT ${limit}
    `

    return Response.json({
      ingredients
    })

  } catch (error) {
    console.error("SEARCH_INGREDIENT_ERROR:", error)

    return Response.json(
      {
        error: "Failed to search ingredients"
      },
      {
        status: 500
      }
    )
  }
}


/* =========================
   POST - CREATE INGREDIENT
========================= */

export async function POST(req: Request) {
  try {
    /* ===== AUTH ===== */

    const [cookieStore, headerList] = await Promise.all([cookies(), headers()])
    const sessionToken = cookieStore.get("admin_session")?.value
    const deviceId = headerList.get("device-id")

    if (!sessionToken || !deviceId) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const session = await sql`
      SELECT admin_username
      FROM admin_sessions
      WHERE
        session_token = ${sessionToken}
        AND device_id = ${deviceId}
        AND expires_at > NOW()
      LIMIT 1
    `

    if (session.length === 0) {
      return Response.json(
        { error: "Invalid session" },
        { status: 403 }
      )
    }

    const admin = await sql`
      SELECT username
      FROM admin_users
      WHERE username = ${session[0].admin_username}
      LIMIT 1
    `

    if (admin.length === 0) {
      return Response.json(
        { error: "Not admin" },
        { status: 403 }
      )
    }


    /* ===== BODY ===== */

    const body = await req.json()

    const name =
      typeof body.name === "string"
        ? body.name.trim()
        : ""

    const inciName =
      typeof body.inci_name === "string"
        ? body.inci_name.trim()
        : null

    if (!name) {
      return Response.json(
        {
          error: "Ingredient name is required"
        },
        {
          status: 400
        }
      )
    }


    /* ===== CHECK DUPLICATE ===== */

    const existing = await sql`
      SELECT
        id,
        slug,
        name,
        inci_name
      FROM ingredients
      WHERE LOWER(name) = LOWER(${name})
      LIMIT 1
    `

    // Nếu đã tồn tại thì trả luôn ingredient cũ
    if (existing.length > 0) {
      return Response.json({
        ingredient: existing[0],
        existed: true
      })
    }


    /* ===== CREATE ===== */

    const baseSlug = createSlug(name)

    // Nếu slug bị rỗng thì không cho tạo
    if (!baseSlug) {
      return Response.json(
        {
          error: "Invalid ingredient name"
        },
        {
          status: 400
        }
      )
    }

    const result = await sql`
      INSERT INTO ingredients (
        slug,
        name,
        inci_name
      )
      VALUES (
        ${baseSlug},
        ${name},
        ${inciName}
      )
      RETURNING
        id,
        slug,
        name,
        inci_name
    `

    return Response.json(
      {
        ingredient: result[0],
        existed: false
      },
      {
        status: 201
      }
    )

  } catch (error) {

    console.error("CREATE_INGREDIENT_ERROR:", error)

    return Response.json(
      {
        error: "Failed to create ingredient"
      },
      {
        status: 500
      }
    )
  }
}