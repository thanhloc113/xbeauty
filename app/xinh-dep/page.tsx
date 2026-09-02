
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import BeautyFilter from "@/components/beautypage/BeautyFilter";
import {useState } from "react";
import { Category } from "@/types/product";
import SlideShow from "@/components/SlideShow";
import CategoryMenu from "@/components/beautypage/CategoryMenu";
import VideoSlide from "@/components/VideoSlider";
import {Videos} from "@/data/products" 
import Intro from "@/components/Intro";
import Hero from "@/components/Hero";


const skincareNeeds = [
  {
    name: "Làm sạch",
    slug: "lam-sach",
  },
  {
    name: "Kiểm soát mụn",
    slug: "kiem-soat-mun",
  },
    {
    name: "Bảo vệ & Chống nắng",
    slug: "bao-ve-chong-nang",
  },
  {
    name: "Làm sáng & Giảm thâm",
    slug: "lam-sang-giam-tham",
  },
  {
    name: "Dưỡng ẩm & Phục hồi",
    slug: "duong-am-phuc-hoi",
  },

  {
    name: "Chống lão hóa",
    slug: "chong-lao-hoa",
  },
  {
    name: "Chăm sóc cơ thể",
    slug: "cham-soc-co-the",
  },
]

const makeupNeeds = [
  {
    name: "Nền Hoàn Hảo",
    slug: "nen-hoan-hao",
  },
  {
    name: "Tạo Khối & Bắt Sáng",
    slug: "tao-khoi-bat-sang",
  },
  {
    name: "Mắt Đẹp",
    slug: "mat-dep",
  },
  {
    name: "Má Hồng",
    slug: "ma-hong",
  },
  {
    name: "Môi Xinh",
    slug: "moi-xinh",
  },
]

export default function XinhDep() {
  // =========================
  // STATE
  // =========================

const [selected, setSelected] =
  useState<"skincare" | "makeup">("skincare");

const [selectedNeeds, setSelectedNeeds] =
  useState<string[]>([]);

const [exploring, setExploring] =
  useState(false);

const [switching, setSwitching] =
  useState(false);

  const [categories, setCategories] = useState<Category[]>([])
  const [currentCategory, setCurrentCategory] = useState<Category>();
  const [loading, setLoading] = useState(true)

  // =========================
  // chuyển layout
  // =========================
const handleSwitchType = () => {
  if (switching || exploring) return;

  setSwitching(true);

  setTimeout(() => {
    setSelected((prev) =>
      prev === "skincare"
        ? "makeup"
        : "skincare"
    );

    setSelectedNeeds([]);
    setCategories([]);
    setCurrentCategory(undefined)
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

  // useEffect(() => {
  //     const load = async () => {
  //       setLoading(true)
  
  //       const res = await fetch("/api/product-categories")
  
  //       const data = await res.json()
  
  //       setCategories(data || [])
  //       setLoading(false)
  //     }
  
  //     load()
  //   }, [])

    const handleLoadListProductExplore = async (topic: string) => {
      try {
        setExploring(true)
        setLoading(true)

        const res = await fetch(
          `/api/product-categories?topic=${topic}`
        )

        if (!res.ok) {
          throw new Error("Không thể tải sản phẩm")
        }

        const data = await res.json()
        setCategories(data || [])
        setCurrentCategory(data[0])
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
        setExploring(false)
      }
    }

  return (
  <main className="min-h-screen">
    <Navbar />
      <Hero
          as="h2"
          title="Bắt đầu hành trình xinh đẹp của riêng em nào !"
          subtitle={``}
          colors = {["#ff37e4", "#15adf3", "#40ff3a", "#ebff3a", "#ff3a85"]}
        />

     <VideoSlide videos={Videos} />

    <section className="relative w-full px-4 py-8">
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
          loadListProduct={handleLoadListProductExplore}
          exploring={exploring}
        />
      </div>

      {/* Load Categories Menu */}
        {categories.length > 0 && (
          <CategoryMenu
            categories={categories}
            type={selected}
            switching={switching}
            activeCategory={currentCategory}
            onChange={(category) => {
              setCurrentCategory(category)
            }}
          />
        )}

      {/* CATEGORY SECTIONS */}
            {!loading &&
            currentCategory && (
            <SlideShow
              title={currentCategory.name}
              intro={currentCategory.intro}
              category={currentCategory.slug}
              type={selected}
            />
  
              )}

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

