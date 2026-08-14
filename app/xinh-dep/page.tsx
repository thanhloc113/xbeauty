
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import BeautyFilter from "@/components/beautypage/BeautyFilter";
import { useEffect, useMemo, useState } from "react";
import { Category } from "@/types/product";
import Section from "@/components/Section";
import SlideShow from "@/components/SlideShow";
import ProductItem from "@/components/ProductItem";
import UserProductItem from "@/components/UserProductItem";


const skincareNeeds = [
  "Bảo vệ & Chống Nắng",
  "Làm sạch & Giảm mụn",
  "Làm sáng mịn & đều màu da",
  "Phục hồi & Cấp ẩm",
  "Chống lão hóa",
  "Chăm sóc cơ thể",
];

const makeupNeeds = [
  "Kem nền",
  "Cushion",
  "Che khuyết điểm",
  "Phấn phủ",
  "Má hồng",
  "Son",
  "Mascara",
  "Kẻ mắt",
  "Kẻ mày",
  "Highlight",
  "Tạo khối",
  "Kem lót",
];

export default function XinhDep() {
  // =========================
  // STATE
  // =========================

const [selected, setSelected] =
  useState<"skincare" | "makeup">("skincare");

const [selectedNeeds, setSelectedNeeds] =
  useState<string[]>([]);

const [showSlideShow, setShowSlideShow] =
  useState(false);

const [exploring, setExploring] =
  useState(false);

const [switching, setSwitching] =
  useState(false);

  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
// ========================= // GET PRODUCTS // =========================

const handleViewProducts = () => {
  if (selectedNeeds.length === 0 || exploring) return;

  setExploring(true);

  // Bắt đầu hiệu ứng phép thuật
  setTimeout(() => {
    setShowSlideShow(true);
  }, 1100);

  // Kết thúc hiệu ứng
  setTimeout(() => {
    setExploring(false);
  }, 1700);
};

  // =========================
  // chuyển layout
  // =========================

const handleSwitchType = () => {
  if (switching || exploring) return;

  setSwitching(true);
  setShowSlideShow(false);

  setTimeout(() => {
    setSelected((prev) =>
      prev === "skincare"
        ? "makeup"
        : "skincare"
    );

    setSelectedNeeds([]);
    setSwitching(false);
  }, 400);
};




  // =========================
  // CURRENT NEEDS
  // =========================

  const currentNeeds =
    selected === "skincare"
      ? skincareNeeds
      : makeupNeeds;

  // =========================
  // RENDER
  // =========================

  useEffect(() => {
      const load = async () => {
        setLoading(true)
  
        const res = await fetch("/api/product-categories")
  
        const data = await res.json()
  
        setCategories(data || [])
        setLoading(false)
      }
  
      load()
    }, [])
  return (
  <main className="min-h-screen">
    <Navbar />

    <section className="relative w-full px-4 py-12 sm:py-16">
      
      {/* =========================
          BEAUTY FILTER
      ========================= */}

      <div className="mx-auto w-full max-w-xl">
        <BeautyFilter
          type={selected}
          needs={currentNeeds}
          selectedNeeds={selectedNeeds}
          setSelectedNeeds={setSelectedNeeds}
          onSwitch={handleSwitchType}
          switching={switching}
          onExplore={handleViewProducts}
          exploring={exploring}
        />
      </div>
      {/* CATEGORY SECTIONS */}
            {!loading &&
              categories.map((cat) => (
                <Section key={cat.id} id={cat.slug}>
                  <SlideShow
                    title={cat.name}
                    intro={cat.intro}
                    category={cat.slug}
                  />
                </Section>
              ))}

      {/* =========================
          SLIDESHOW
      ========================= */}

{/* {showSlideShow && !loading && (
  <div className="mx-auto mt-10 w-full max-w-7xl magic-reveal">
    {categories.map((cat) => (
      <Section key={cat.id} id={cat.slug}>
        <SlideShow
          title={cat.name}
          intro={cat.intro}
          category={cat.slug}
        />
      </Section>
    ))}
  </div>
)} */}

    </section>

    <Footer />
  </main>
  );
}

