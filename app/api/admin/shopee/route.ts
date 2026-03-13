export async function POST(req: Request) {

  const { link, affiliate } = await req.json()

  let shop_id = ""
  let item_id = ""

  // dạng /product/shop/item
  let match = link.match(/product\/(\d+)\/(\d+)/)

  // dạng -i.shop.item
  if (!match) {
    match = link.match(/-i\.(\d+)\.(\d+)/)
  }

  if (!match) {
    return Response.json({ error: "Invalid Shopee link" })
  }

  shop_id = match[1]
  item_id = match[2]

  const url =
    `https://shopee.vn/api/v4/pdp/get_pc?item_id=${item_id}&shop_id=${shop_id}&tz_offset_in_minutes=420`

  const res = await fetch(url, {
    headers: {
      "accept": "application/json",
      "x-api-source": "pc",
      "x-requested-with": "XMLHttpRequest",
      "x-shopee-language": "vi",
      "referer": `https://shopee.vn/product/${shop_id}/${item_id}`,
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/145.0.0.0 Safari/537.36",

      // cookie copy từ browser
      "cookie": "REC7iLP4Q=b0b4402c-c0ef-4cd9-b89a-a816f66d3112; _hjSessionUser_868286=eyJpZCI6IjM3NzMyZDg5LTAyMjQtNWUxNy05NGQxLTYxZGYzOGZjNTQwMyIsImNyZWF0ZWQiOjE3MzQ2MTc5OTQxMDAsImV4aXN0aW5nIjp0cnVlfQ==; _gcl_au=1.1.915547473.1766074219; _fbp=fb.1.1766074222793.432881533357438744; SPC_CLIENTID=WHJDRzVDVmVNa0VVnlrfvwawtplokldc; _QPWSDCXHZQA=ee54944b-be91-4780-800a-74ae3bb2c609; language=vi; SPC_F=jOeeFpCVDOBiXcIGBPpTpfBbiRyG2VjN; REC_T_ID=5e1a9442-13d6-11f1-9a55-427530a55a4b; _gid=GA1.2.1477078755.1772556718; SPC_SI=QsufaQAAAAA2b3dvZUVacAmVMgEAAAAARkJWcXJ4RXE=; SC_DFP=KoLzeEYoSHdYAOfHEuXeddzzLpLFqhSj; _ga_FV78QC1144=GS2.1.s1772740544$o2$g1$t1772740620$j60$l0$h0; _ga_3XVGTY3603=GS2.1.s1772740625$o2$g1$t1772740668$j17$l0$h0; _gcl_gs=2.1.k1$i1773135462$u106657619; SPC_U=96197598; SPC_ST=ekFnNmdFaG5tNE9OdmNvdMoDYE3lS2H1Q6fT7RcRJUDBlUwP8FdqqrisUoK62ER0Gy2JtZNdoU1V+I8o5SoFTfA8I0ETu9Wb+88SBUJbQyDk3fw9wSJoKQHbvsP1DzesAK3fpb5Zovlyv3X7kVJDID1t7e7fUwrQxyyx1oxzDd0aw5nWwUMD4uNOWhUhNwN2mPGX2tF6qUIRAGupzVakC8PJKxfS4XZJMr1q02y3Ym17cADpJGNvYu83TPvVJ/P9.AEeXETjYZl5bm1Q5btjpUcnhS0CzOdDagRgqNqtvg3FP; SPC_T_ID=20DC5Q8z0JsPCaPoobJc0G46n+br/HMAWx3kASc9g5KzKYsV5XP8vyetFo9FpXGQWSoytygE3LSKDZ8uprBfsIXEeOKOmZ3qksvmtxe95FcXKkRt4132ZOkRgBr0xVJr9dDsFqy3WEhsGb06HaPsY0mwcoKl9e4kFQwoOcYUSLI=; SPC_T_IV=MkVqRDBVM0x0RXpGdFlJSQ==; SPC_R_T_ID=20DC5Q8z0JsPCaPoobJc0G46n+br/HMAWx3kASc9g5KzKYsV5XP8vyetFo9FpXGQWSoytygE3LSKDZ8uprBfsIXEeOKOmZ3qksvmtxe95FcXKkRt4132ZOkRgBr0xVJr9dDsFqy3WEhsGb06HaPsY0mwcoKl9e4kFQwoOcYUSLI=; SPC_R_T_IV=MkVqRDBVM0x0RXpGdFlJSQ==; csrftoken=MO6g4gYQSFhFiSmJYia9tiKyGrSTM8ZL; _sapid=37c36af820e80e9f329ea6fab39c90d519b220dab1038f073911d4e7; _med=cpc; SPC_CDS_CHAT=c4ef054d-4a08-41c6-9637-2e25d41c204d; SPC_IA=1; SPC_SEC_SI=v1-bFF0eDgwd25iTmxvZWN0dP/20WDdMVyLFxrUXeIlPncobUqTqhK96ae/EeFro+lZ9RiTVUN3kNvmqD3VkFfYklFoic1wFwVdSt2lJMNECaw=; AMP_TOKEN=%24NOT_FOUND; _hjSession_868286=eyJpZCI6ImMxYjI1OGUyLWJmY2MtNGIwZS1hODgxLWQ1ZDBlZjE2OWViYSIsImMiOjE3NzMzNTM1OTI2MDEsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MH0=; shopee_webUnique_ccd=ddlBxbkta5gsa33uZz8DPA%3D%3D%7C%2BurQ0QCM6TpuDBrxR%2BBvbL73GCzZVBVrlWtTt1bbZNncp%2BrX%2BNi0m6w%2FVwWdMI%2FkxT9QksRknHtSnQ%3D%3D%7CNz0rBagShE3VSvqj%7C08%7C3; ds=d1052208eb6382aebf4c76ae67574e4c; _ga_4GPP1ZXG63=GS2.1.s1773353559$o62$g1$t1773355092$j32$l1$h133767063; _ga=GA1.2.1408716791.1734617882; _dc_gtm_UA-61914164-6=1; SPC_EC=VHlpdTRHQ282Z3BjQzJYREr7pBoWQkvc8t+WrAlSn+jFdW0Z9Er/Q2/NxMjG5DgBs3bOKa3aa6L1wudYI7U0JTBNNgjGGI3jKmSuvur1qGwXDnG1Nm2B5EA2fRDrYMs3tB7X508AA+vCgnZv85OwJuHEfHRwBQlhOXYIthdLrYavAMhgmgPeXQxf7CuJIxC22b4PcskYrxrHLoP/Tf7m04NvOyIzDqVKNGxZt4xxRCZVRQ6ViPfkCFmCoX/2cJXf.AC/vzgFcwK97lbeeDOYbiQYWRpmNRrGmGMeK1+7CH2dS"

    }
  })

  const json = await res.json()

  const item = json?.data?.item

  if (!item) {
    return Response.json({ error: "Shopee blocked request" })
  }

  console.log(item);

  return Response.json({
    title: item.name,
    image: `https://down-vn.img.susercontent.com/file/${item.image}`,
    price: item.price / 100000,
    price_before_discount: item.price_before_discount / 100000,
    discount: item.raw_discount,
    shop_id,
    item_id,
    affiliate
  })
}