"use client";

import { useState } from "react";
type Product = {
  title: string
  image: string
  price: number
  item_id: string
  shop_id: string
  affiliate: string
}
export default function ProductFetcher(){

  const [link,setLink] = useState("")
  const [affiliate,setAffiliate] = useState("")
  const [data,setData] = useState<Product | null>(null)

  async function fetchProduct(){

    const res = await fetch("/api/admin/shopee",{
      method:"POST",
      headers:{ "Content-Type":"application/json"},
      body:JSON.stringify({link,affiliate})
    })

    const result = await res.json() as Product
    console.log(result);
    setData(result)
  }
  
  return (

    <div className="max-w-xl mx-auto">

      <h2 className="text-xl mb-6 text-pink-400">
        Add Shopee Product
      </h2>

      <input
        placeholder="Shopee product link"
        className="w-full p-3 mb-4 rounded"
        value={link}
        onChange={e=>setLink(e.target.value)}
      />

      <input
        placeholder="Affiliate link"
        className="w-full p-3 mb-4 rounded"
        value={affiliate}
        onChange={e=>setAffiliate(e.target.value)}
      />

      <button
        onClick={fetchProduct}
        className="bg-purple-500 px-6 py-3 rounded"
      >
        Fetch Product
      </button>

      {data && (

        <div className="mt-8 bg-white/10 p-4 rounded">

          <img src={data.image} className="w-40 mb-4"/>

          <p>{data.title}</p>
          <p>Price: {data.price}</p>

        </div>

      )}

    </div>
  )
}