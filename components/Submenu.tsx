"use client";

import { useState } from "react";

const menus = [
  "Làm sạch da & Trị Mụn",
  "Làm sáng & Đều màu da",
  "Cấp ẩm & Phục hồi",
  "Da căng mịn & Chống lão hóa",
  "Bảo vệ da & Chống nắng",
];

export default function SubMenu() {
  const [active, setActive] = useState(0);

  return (
    <div className="border-b bg-white">
      <div
        className="
          flex
          overflow-x-auto
          whitespace-nowrap
          gap-3
          px-4
          py-3
          scrollbar-hide
          touch-pan-x
        "
      >
        {menus.map((item, index) => (
          <button
            key={item}
            onClick={() => setActive(index)}
            className={`
              flex-shrink-0
              rounded-full
              px-4
              py-2
              text-sm
              font-medium
              transition-all
              duration-200
              ${
                active === index
                  ? "bg-pink-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }
            `}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}