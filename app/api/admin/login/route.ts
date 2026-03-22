export const runtime = "nodejs";

import { Pool } from "pg";
import { cookies, headers } from "next/headers";
import crypto from "crypto";
import { console } from "inspector";

const db = new Pool({
  connectionString: process.env.DATABASE_URL
});

export async function POST(req: Request){
    try{ 
      const {username,password,deviceId} = await req.json()
      const result = await db.query(
        "SELECT * FROM admin_users WHERE username=$1",
        [username]
      )

      if(!result.rows.length){
        return Response.json({error:"User not found"})
      }

    
      const user = result.rows[0]

      const valid = password == user.password_hash

      if(!valid){
        return Response.json({error:"Wrong Password"})
      }

      const sessionToken = crypto.randomUUID()

      const headerList = await headers()

      const userAgent = headerList.get("user-agent") || "unknown"
      const ip = headerList.get("x-forwarded-for") || "unknown"

      const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)

      // kiểm tra session cũ của thiết bị
      const oldSession = await db.query(
        `SELECT id FROM admin_sessions
        WHERE id=$1 AND device_id=$2`,
        [user.id, deviceId]
      )
      if(oldSession.rows.length){

        // update session cũ
        await db.query(
          `UPDATE admin_sessions
          SET session_token=$1,
              user_agent=$2,
              ip_address=$3,
              expires_at=$4
          WHERE id=$5 AND device_id=$6`,
          [sessionToken,userAgent,ip,expires,user.id,deviceId]
        )

      }else{

        // insert session mới
        await db.query(
          `INSERT INTO admin_sessions
          (id, admin_username, session_token, device_id, user_agent, ip_address, expires_at)
          VALUES ($1,$2,$3,$4,$5,$6,$7)`,
          [user.id, username, sessionToken, deviceId, userAgent, ip, expires]
        )

      }

      const cookieStore = await cookies()

      cookieStore.set("admin_session",sessionToken,{
        httpOnly:true,
        secure:true,
        path:"/",
        expires
      })

      return Response.json({success:true})
      }catch(err){

        console.error(err)

        return Response.json({
          success:false,
          error:"Server error"
        })
      }
}