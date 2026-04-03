"use client";

import { useEffect, useState } from "react";



const product = {
  name: "Sữa rửa mặt cho da dầu ABC",
  hook: "Da dầu, rửa xong 30p lại bóng nhờn?",
  price: 149000,
  original_price: 299000,
  rating: 4.8,
  review_count: 1200,
  sold: 5000,
  image: "https://via.placeholder.com/400",
  pain_points: [
    "Rửa mặt xong vẫn đổ dầu",
    "Dễ nổi mụn ẩn",
    "Da bóng giữa ngày",
  ],
  benefits: ["Kiềm dầu", "Giảm mụn", "Không khô da"],
  expected_results: [
    "3 ngày: giảm nhờn",
    "7 ngày: giảm mụn",
    "14 ngày: da ổn định",
  ],
  stock: 37,
};

export default function TestUI() {
  const [timeLeft, setTimeLeft] = useState(3600);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (sec : number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="p-4 flex justify-center">
      <div className="w-full max-w-sm rounded-2xl shadow-xl overflow-hidden">
        {/* HERO */}
        <div className="relative">
          <img src={product.image} className="w-full h-64 object-cover" />
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Flash Sale
          </div>
        </div>

        <div className="space-y-3">
          {/* HOOK */}
          <h2 className="text-lg font-semibold">{product.hook}</h2>

          {/* PRICE */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">
              {product.price.toLocaleString()}đ
            </span>
            <span className="line-through text-sm text-gray-400">
              {product.original_price.toLocaleString()}đ
            </span>
          </div>

          {/* SOCIAL PROOF */}
          <div className="text-sm text-gray-500">
            ⭐ {product.rating} ({product.review_count}) · 🛒 {product.sold}
          </div>

          {/* PAIN POINT */}
          <div>
            <p className="font-medium text-sm">Vấn đề thường gặp:</p>
            <ul className="text-sm list-disc ml-4">
              {product.pain_points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>

          {/* BENEFITS */}
          <div>
            <p className="font-medium text-sm">Giải pháp:</p>
            <div className="flex flex-wrap gap-2">
              {product.benefits.map((b, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 bg-gray-100 text-black rounded-full"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* RESULT */}
          <div>
            <p className="font-medium text-sm">Kết quả:</p>
            <ul className="text-sm list-disc ml-4">
              {product.expected_results.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>

          {/* URGENCY */}
          <div className="text-sm text-red-500">
            ⏳ Còn {product.stock} sản phẩm · Kết thúc sau {formatTime(timeLeft)}
          </div>

          {/* CTA */}

            <button className="w-full text-base py-6">Mua ngay</button>
   
        </div>
      </div>
    </div>
  );
}
