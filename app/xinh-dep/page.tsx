"use client"
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Footer from "@/components/Footer";
import SlideShow from "@/components/SlideShow";
import SectionNavigator from "@/components/SectionNavigator"
import VideoSlide from "@/components/VideoSlider";
import ScrollAlias from "@/components/ScrollAlias";
import { Category } from "@/types/category";
import { useState , useEffect} from "react";

  const videos = [
      {
     url:"https://ik.imagekit.io/7a7njhuhn/snaptik.vn_ZrXbv.mp4",
     title:"Xinh đẹp mình đi học",
     poster:"https://i.pinimg.com/736x/3f/fa/37/3ffa37e25d53ee2d74ab543666786e97.jpg"
    },
    {
     url:"https://ik.imagekit.io/7a7njhuhn/snaptik.vn_Ie89D.mp4",
     title:"Xinh đẹp mình đi làm",
     poster:"https://i.pinimg.com/736x/8a/ef/70/8aef707f9995a1b1e1d5142fe92bd571.jpg"
    },
    {
     url:"https://ik.imagekit.io/7a7njhuhn/snaptik.vn_aE5jM.mp4",
     title:"Xinh đẹp mình đi chơi",
     poster:"https://i.pinimg.com/736x/f5/94/45/f59445db898d030a42b44a0eed74781f.jpg"
    },
    {
     url:"https://ik.imagekit.io/7a7njhuhn/snaptik.vn_GXsPq.mp4",
     title:"Xinh đẹp mình đi lung tung",
     poster:"https://i.pinimg.com/736x/63/34/39/63343907bd30b92c4205cf8be7f52427.jpg"
    },
    {
     url:"https://archive.org/download/0312_20260312/0312.mp4",
     title:"Xinh đẹp mình yêu đời",
     poster:"https://i.pinimg.com/736x/e9/48/c3/e948c34d7cd1c583fc4bb503abd289ee.jpg"
    },
    {
     url:"https://ik.imagekit.io/7a7njhuhn/snaptik.vn_0uJQs.mp4",
     title:"Xinh đẹp mình yêu thương",
     poster:"https://i.pinimg.com/1200x/11/73/d8/1173d83e710591f88ac8c97e736d2537.jpg"
    },
    {
     url:"https://archive.org/download/lv_0_20260312024947/lv_0_20260312024947.ia.mp4",
     title:"Xinh đẹp mình có những kỉ niệm đẹp",
     poster:"https://i.pinimg.com/736x/b4/c2/a5/b4c2a5984623bfb6634e393ca29466f8.jpg"
    },
  ];

export default function XinhDep() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

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
    <main>
    <ScrollAlias
        ids={[
    "sua_rua_mat", 
    "nuoc_tay_trang",
    "serum", 
    "kem_chong_nang",
    "kem_duong_am",
    "toner", 
    "body_Care", 
    "son", 
    "kem_lot", 
    "xit_khoa_nen", 
    "cushion", 
    "che_khuyet_diem", 
    "phan_mat", 
    "phan_tao_khoi",
    "phan_phu",
    "mascara", 
        ]}
      />
      <Navbar />
        <Hero
          as="h2"
          title=" Nhan sắc của em dính ở trên mặt kìa "
          subtitle={`Dạo gần đây bộ y tế đã tiến hành thu hồi 291 sản phẩm mỹ phẩm không an toàn, nên anh đã tìm và chọn lọc ra đây các dòng sản phẩm có review tốt, được nhiều nàng thơ tin dùng, cung cấp bởi các nhà bán hàng uy tín và không nằm trong danh sách cấm. Có rất nhiều thứ tốt đẹp dành cho em đấy!`}
          colors = {["#ff37e4", "#15adf3", "#40ff3a", "#ebff3a", "#ff3a85"]}
        />
    <SectionNavigator
      items={[
        { id: "sua_rua_mat", label: "Sửa Rửa Mặt" },
        { id: "nuoc_tay_trang", label: "Nước Tẩy Trang" },
        { id: "serum", label: "Serum" },
        { id: "kem_chong_nang", label: "Kem chống nắng" },
        { id: "kem_duong_am", label: "Kem Dưỡng Ẩm" },
        { id: "toner", label: "Toner" },
        { id: "body_care", label: "Body Care" },
        { id: "son", label: "Son" },
        { id: "kem_lot", label: "Kem Lót" },
        { id: "xit_khoa_nen", label: "Xịt Khóa Nền" },
        { id: "cushion", label: "Cushion & Kem Nền" },
        { id: "che_khuyet_diem", label: "Che Khuyết Điểm" },
        { id: "phan_mat", label: "Phấn Mắt" },
        { id: "phan_tao_khoi", label: "Phấn Tạo Khối" },
        { id: "phan_phu", label: "Phấn Phủ" },
        { id: "mascara", label: "Mascara & Eyeliner" },
      ]}
    />  


      <VideoSlide videos={videos} />

      {/* CATEGORY SECTIONS */}
      {!loading &&
        categories.map((cat) => (
          <Section key={cat.id} id={cat.slug}>
            <SlideShow
              introTitle={cat.name}
              category={cat.slug}
            />
          </Section>
        ))}
      <p className="text_center max_w_2xl mx_auto leading_relaxed">
       Lướt đến đây rồi mà vẫn chưa biết lấy cái nào thì là em đang phân vân lắm đúng không? Nếu em chưa từng dùng qua sản phẩm nào thì cứ hãy thử một cái đi. Vì chỉ khi đó, em mới biết được cái nào là cái phù hợp với em hơn.
       Anh vẫn đang cập nhật thêm thông tin chi tiết về các sản phẩm, cả ưu đãi mới và quà tặng cho em nữa. Để mỗi lần ghé vào đây, em đều có thể yên tâm sử dụng những thứ mà em thích! Thương em! 💝
      </p>

    <Footer />

    </main>
  );
}