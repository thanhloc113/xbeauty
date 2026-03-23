export const runtime = "nodejs";

import { sql } from "@/lib/db";
import { cookies, headers } from "next/headers";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { username, password, deviceId } = await req.json();

    // Lấy user
    const users = await sql`
      SELECT * FROM admin_users WHERE username = ${username}
    `;

    if (!users.length) {
      return Response.json({ error: "User not found" });
    }

    const user = users[0];

    const valid = password === user.password_hash;
    if (!valid) {
      return Response.json({ error: "Wrong Password" });
    }

    const sessionToken = crypto.randomUUID();

    const headerList = await headers();
    const userAgent = headerList.get("user-agent") || "unknown";
    const ip = headerList.get("x-forwarded-for") || "unknown";
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 ngày

    // Kiểm tra session cũ
    const oldSessions = await sql`
      SELECT id FROM admin_sessions
      WHERE id = ${user.id} AND device_id = ${deviceId}
    `;

    if (oldSessions.length) {
      // Update session cũ
      await sql`
        UPDATE admin_sessions
        SET session_token = ${sessionToken},
            user_agent = ${userAgent},
            ip_address = ${ip},
            expires_at = ${expires}
        WHERE id = ${user.id} AND device_id = ${deviceId}
      `;
    } else {
      // Insert session mới
      await sql`
        INSERT INTO admin_sessions
        (admin_username, session_token, device_id, user_agent, ip_address, expires_at)
        VALUES
        (${username}, ${sessionToken}, ${deviceId}, ${userAgent}, ${ip}, ${expires})
      `;
    }

    const cookieStore = await cookies();
    cookieStore.set("admin_session", sessionToken, {
      httpOnly: true,
      secure: true,
      path: "/",
      expires,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json({
      success: false,
      error: "Server error",
    });
  }
}