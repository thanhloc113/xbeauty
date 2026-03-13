import ProductList from "@/components/ProductList"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Pool } from "pg"

const db = new Pool({
  connectionString: process.env.DATABASE_URL
})

export default async function Page() {

  const cookieStore = await cookies()
  const token = cookieStore.get("admin_session")?.value

  // chưa login
  if(!token){
    redirect("/admin")
  }

  const result = await db.query(
    `SELECT * FROM admin_sessions
     WHERE session_token=$1
     AND expires_at > NOW()`,
    [token]
  )

  // session không hợp lệ
  if(!result.rows.length){
    redirect("/admin")
  }

  return (
    <main className="max-w-6xl mx-auto p-6">
      <ProductList />
    </main>
  )
}