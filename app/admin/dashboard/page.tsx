import ProductList from "@/components/ProductList"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { sql } from "@/lib/db"

export default async function Page() {
  const cookieStore = await cookies()
  const token = cookieStore.get("admin_session")?.value

  // chưa login
  if (!token) {
    redirect("/admin")
  }

  const result = await sql`
    SELECT *
    FROM admin_sessions
    WHERE session_token = ${token}
      AND expires_at > NOW()
  `

  // session không hợp lệ
  if (!result || result.length === 0) {
    redirect("/admin")
  }

  return (
    <main className="max-w-6xl mx-auto p-6">
      <ProductList />
    </main>
  )
}