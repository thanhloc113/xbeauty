import { Product } from "@/types/product"

export default function ProductItem({ product }: { product: Product }) {

  const discount =
    product.original_price && product.best_price
      ? Math.round(
          (1 - product.best_price / product.original_price) * 100
        )
      : 0

  return (
    <div className="border rounded-xl p-4 hover:shadow-md transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg"
      />

      <h2 className="font-semibold mt-3">{product.name}</h2>

      {product.highlight_tag && (
        <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
          {product.highlight_tag}
        </span>
      )}

      <p className="text-sm text-gray-500 mt-1">
        {product.short_description}
      </p>

      <div className="mt-2 text-sm">
        ⭐ {product.rating} ({product.review_count} reviews)
      </div>

      <div className="text-sm text-gray-500">
        Đã bán {product.sold}
      </div>

      <div className="mt-2">
        <span className="text-gray-400 line-through mr-2">
          {product.original_price?.toLocaleString()}đ
        </span>

        <span className="text-red-600 font-bold">
          {product.best_price?.toLocaleString()}đ
        </span>

        {discount > 0 && (
          <span className="ml-2 text-xs text-white bg-red-500 px-2 py-1 rounded">
            -{discount}%
          </span>
        )}
      </div>

      {product.flash_sale && (
        <div className="text-xs text-red-600 mt-1">
          🔥 Flash Sale
        </div>
      )}

      <a
        href={product.affiliate_link}
        target="_blank"
        className="block mt-3 text-center bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
      >
        Xem trên Shopee
      </a>
    </div>
  )
}