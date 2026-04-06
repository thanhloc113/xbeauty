
import TestCP from "@/components/TestCP"
import TestUI from "@/components/TestUI"
import UserProductItem from "@/components/UserProductItem"
// import { useEffect } from "react"


export default function TestPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white p-4">
      
      {/* TITLE */}
      <h1 className="text-xl font-bold mb-4">
        🛍️ Test Product UI
      </h1>
      <div className="flex gap-4 scrollbar-hide">
      {/* UI1 */}
      <TestCP />

            {/* UI1 */}
      {/* <TestUI /> */}

      {/* <UserProductItem product={Product} /> */}
    </div>

    </main>
  )
}