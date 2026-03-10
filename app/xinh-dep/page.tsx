import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Gallery from "@/components/Gallery";
import Item from "@/components/Item";
import Section from "@/components/Section";
import Footer from "@/components/Footer";
import SlideShow from "@/components/SlideShow";
const suaRuaMat = [
  {
    title: "Sữa Rửa Mặt Tạo Bọt Mềm Mịn Làm Sạch Sâu Rau Má Cho Da Mụn Da Dầu Nhạy Cảm",
    media: "image/sexy3.jpg",
    link: "https://s.shopee.vn/2qPh620hJX",
  },
  {
    title: "Sữa Rửa Mặt Hạt Nghệ Thorakao Ngừa Mụn",
    media: "image/sexy2.jpg",
    link: "https://s.shopee.vn/W1mJycmN7",
  },
  {
    title: "Sữa rửa mặt dành cho da dầu Cerave Foaming Facial Cleanser ",
    media: "image/sexy4.jpg",
    link: "https://s.shopee.vn/8KkaR7RzKF",
  },
  {
    title: "Sữa rửa mặt La Roche-Posay Effaclar Purifying Foaming Gel M",
    media: "image/sexy1.jpg",
    link: "https://s.shopee.vn/7VBVoQNKaH",
  },
    {
    title: "Sữa rửa mặt Senka Perfect Whip Facial Cleanser ",
    media: "image/sexy1.jpg",
    link: "https://s.shopee.vn/9fG0PDGobJ",
  },
      {
    title: "Sữa Rửa Mặt Cosrx Low pH Good Morning Gel Cleanser",
    media: "image/sexy1.jpg",
    link: "https://s.shopee.vn/900JbQOlDs",
  },
];

const bongTayTrang = [
  {
    title: "Nước Tẩy Trang làm sạch sâu dịu nhẹ cho mọi loại da - Garnier Micellar Cleansing Water ",
    media: "image/sexy3.jpg",
    link: "https://s.shopee.vn/8fNTGDfmfB",
  },
  {
    title: "[AMINO MICELLAR MỚI] Nước tẩy trang làm sạch sâu, loại bỏ bụi bẩn & trang điểm 3-in-1 L'Oreal Paris Micellar Water ",
    media: "image/sexy2.jpg",
    link: "https://s.shopee.vn/gLCVpNkDC",
  },
  {
    title: "Nước tẩy trang làm sạch sâu cho da nhạy cảm La Roche-Posay Micellar Water Sensitive Skin ",
    media: "image/sexy4.jpg",
    link: "https://s.shopee.vn/70FFHFvOM9",
  },
  {
    title: "Dung dịch làm sạch và tẩy trang công nghệ Micellar cho da thường & nhạy cảm Bioderma Sensibio H2O ",
    media: "image/sexy1.jpg",
    link: "https://s.shopee.vn/2B9zWlIwjK",
  },
    {
    title: "NƯỚC TẨY TRANG SẠCH SÂU DỊU NHẸ - SIMPLE MICELLAR WATER  ",
    media: "image/sexy1.jpg",
    link: "https://s.shopee.vn/50UAtn3BY4",
  },
];


const serum = [
  {
    title: "Dưỡng chất giảm thâm nám và dưỡng sáng toàn diện La Roche-Posay Mela B3 serum ",
    media: "image/sexy3.jpg",
    link: "https://s.shopee.vn/6VIzPUXwk0",
  },
  {
    title: "Bộ đôi phục hồi sức khỏe & cấp ẩm đa tầng oh!oh! Skin Health Serum 30ml & oh!oh! ",
    media: "image/sexy2.jpg",
    link: "https://s.shopee.vn/1qXABkISJu",
  },
  {
    title: "Torriden Serum DIVE IN chứa Hyaluronic Acid Siêu dưỡng ẩm cho da",
    media: "image/sexy4.jpg",
    link: "https://s.shopee.vn/gL9OYt9JX",
  },
  {
    title: "Tinh Chất The Ordinary Niacinamide 10% + Zinc 1% giảm mụn, mờ thâm, thu nhỏ lỗ chân lông hiệu quả ",
    media: "image/sexy1.jpg",
    link: "https://s.shopee.vn/6KzYOUWOW4",
  },
    {
    title: "Serum Torriden Tinh chất chăm sóc lỗ chân lông hoàn hảo CELLMAZING ",
    media: "image/sexy1.jpg",
    link: "https://s.shopee.vn/3VfNsnE8WE",
  },
    {
    title: "Serum khoáng “quốc dân” giúp phục hồi và cấp ẩm chuyên biệt Vichy Mineral 89 50ml, chống đa tác nhân làm suy yếu da ",
    media: "image/sexy1.jpg",
    link: "https://s.shopee.vn/LiM4RrAzU",
  },
      {
    title: "Serum dưỡng cấp ẩm tức thì, giúp làm giảm nếp nhăn & căng mướt da L'Oreal Paris Revitalift 1.5% Hyaluronic Acid ",
    media: "image/sexy1.jpg",
    link: "https://s.shopee.vn/4LEUpCNTIN",
  },
];

const kemChongNang = [
  {
    title: "Kem chống nắng nâng tone cho da dầu La Roche-Posay Anthelios XL SPF50+ ",
    media: "image/sexy3.jpg",
    link: "https://s.shopee.vn/9Kd9yLhZ2g",
  },
  {
    title: "Kem chống nắng Skin Aqua Tone Up UV Essence ",
    media: "image/sexy2.jpg",
    link: "https://s.shopee.vn/6pvn2smrFk",
  },
  {
    title: "Kem chống nắng L'Oréal Paris UV Defender Invisible Fluid ",
    media: "image/sexy4.jpg",
    link: "https://s.shopee.vn/2Vmpq5PKXV",
  },
  {
    title: "Kem chống nắng SKIN1004 Madagascar Centella Air‑Fit Suncream Plus ",
    media: "image/sexy1.jpg",
    link: "https://s.shopee.vn/7fUu2gCYen",
  },
    {
    title: "Kem chống nắng BEPLAIN Sunmuse Moisture Sunscreen ",
    media: "image/sexy1.jpg",
    link: "https://s.shopee.vn/9Kd9yLhZ2g",
  },
    {
    title: "Essence Chống Nắng Màng Nước Dưỡng Ẩm Biore UV Aqua Rich Watery SPF50+/PA++++ ",
    media: "image/sexy1.jpg",
    link: "https://s.shopee.vn/8pguDZbQEB",
  },
];

const kemDuongAm = [
  {
    title: "Kem Dưỡng Ẩm Da Mặt Kiềm Dầu Ngừa Mụn Chiết Xuất Rau Má Cho Da Dầu Nhạy Cảm ",
    media: "image/sexy3.jpg",
    link: "https://s.shopee.vn/1qX9vpcqR6",
  },
  {
    title: "Kem dưỡng ẩm phục hồi chuyên sâu và giữ da ẩm mịn suốt 48H CERAVE MOISTURISING CREAM ",
    media: "image/sexy2.jpg",
    link: "https://s.shopee.vn/AUp8D1tCm0",
  },
  {
    title: "Kem Dưỡng Ẩm Phục Hồi Embryolisse Lait Creme Concentre ",
    media: "image/sexy4.jpg",
    link: "https://s.shopee.vn/30j7HV3kDq",
  },
  {
    title: "Kem dưỡng ẩm La Roche‑Posay Cicaplast Baume B5 ",
    media: "image/sexy1.jpg",
    link: "https://s.shopee.vn/1gDgu5ScKn",
  },
    {
    title: "Kem Dưỡng Da Tay Và Móng Dưỡng Ẩm Mềm Mịn Hand Cream ",
    media: "image/sexy1.jpg",
    link: "https://s.shopee.vn/8KkdgBogBL",
  },
    {
    title: "Kem dưỡng ẩm Garnier Water Gel mỏng nhẹ cấp ẩm tới 48H & hỗ trợ sáng da ",
    media: "image/sexy1.jpg",
    link: "https://s.shopee.vn/5q3IhRcbQB",
  },
];

const toner = [
  {
    title: "Klairs Supple Preparation Toner ",
    media: "image/sexy3.jpg",
    link: "https://s.shopee.vn/8ARAengUnm",
  },
  {
    title: "Hada Labo Gokujyun Lotion Toner ",
    media: "image/sexy2.jpg",
    link: "https://s.shopee.vn/2LTNhk2Nzu",
  },
  {
    title: "Some By Mi AHA BHA PHA Toner ",
    media: "image/sexy4.jpg",
    link: "https://s.shopee.vn/7fUu3kJaAa",
  },
  {
    title: "Active Toner Dưỡng Ẩm Ngừa Mụn Rau Má Dành Cho Da Mụn Da Dầu Nhạy Cảm ",
    media: "image/sexy1.jpg",
    link: "https://s.shopee.vn/4Av4mVFACw",
  },
    {
    title: "[MUA 2 GIẢM 45%] Combo Nước cân bằng sen 310ml & Nước tẩy trang bí đao ",
    media: "image/sexy1.jpg",
    link: "https://s.shopee.vn/50UBjY9vE6",
  },
    {
    title: "Toner Nước Hoa Hồng Diếp Cá Bellena Heartleaf Toner Hỗ Trợ Giảm Thâm Mụn ",
    media: "image/sexy1.jpg",
    link: "https://s.shopee.vn/70FG7WhEB9",
  },
   {
    title: "Active Toner Tơ Tằm Dưỡng Ẩm Cho Da  ",
    media: "image/sexy1.jpg",
    link: "https://s.shopee.vn/5L72Apths9",
  },
   {
    title: "Anua Heartleaf 77 Toner ",
    media: "image/sexy1.jpg",
    link: "https://s.shopee.vn/4qAihdUfod",
  },
 
];

const bodyCare = [
  {
    title: "Cocoon Dak Lak Coffee Body Polish ",
    media: "image/sexy3.jpg",
    link: "https://s.shopee.vn/2LTNjqg86O",
  },
  {
    title: "Smoothie Tẩy Tế Bào Chết Body Dove Chăm Da Sáng Mịn ",
    media: "image/sexy2.jpg",
    link: "https://s.shopee.vn/AACHw89Y67",
  },
  {
    title: "Kem Giảm Thâm ARMPIT CREAM Giúp Dưỡng Trắng Làn Da Sạm Ở Vùng Nách Mông Bikini Khuỷu Tay Đầu Gối ",
    media: "image/sexy4.jpg",
    link: "https://s.shopee.vn/5q3In5kk6K",
  }
];

const son = [
  {
    title: "Son kem lì nhung mịn 3CE Velvet Lip Tint ",
    media: "image/sexy3.jpg",
    link: "https://s.shopee.vn/9pZRjgLVbd",
  },
  {
    title: "Son Kem Lì Nhung Mịn 3CE Velvet Lip Tint Plush  ",
    media: "image/sexy2.jpg",
    link: "https://s.shopee.vn/3qIEaxOqoa",
  },
  {
    title: "Son Kem 3CE Cho Viền Môi Mờ Ảo Không Lem Blur Water Tint 4.6g  ",
    media: "image/sexy4.jpg",
    link: "https://s.shopee.vn/70FGLU5VvU",
  }
  ,
  {
    title: "Son dưỡng có màu MAC Glow Play Tendertalk Lip Balm   ",
    media: "image/sexy4.jpg",
    link: "https://s.shopee.vn/1VuJw2hCNe",
  }
    ,
  {
    title: "Son kem MAC Powder Kiss Lip & Cheek Mousse | Bền màu, ẩm mịn suốt 10H ",
    media: "image/sexy4.jpg",
    link: "https://s.shopee.vn/7poNSu2f2w",
  }
    ,
  {
    title: "Son kem lì khóa màu MAC Locked Kiss Ink 24HR Lipcolour 4ml | Chống lem, mịn lì bền màu 24 giờ  ",
    media: "image/sexy4.jpg",
    link: "https://s.shopee.vn/7poNT3z6R0",
  }
    ,
  {
    title: "Son thỏi dạng bút MAC Powder Kiss Velvet Blur Slim Stick nhẹ môi, dưỡng ẩm, giữ màu, khóa ẩm sắc nét 12H  ",
    media: "image/sexy4.jpg",
    link: "https://s.shopee.vn/1LatjJJ8by",
  }
    ,
  {
    title: "Son thỏi nhung lì MAC MACximal Silky Matte Lipstick | Son thỏi bán chạy nhất, hiệu ứng mịn lì, bền màu suốt 12H  ",
    media: "image/sexy4.jpg",
    link: "https://s.shopee.vn/8pguebOpdz",
  }
    ,
  {
    title: "Son Môi Lụa Diễm Mềm Mịn Mướt Môi Cỏ Mềm ",
    media: "image/sexy4.jpg",
    link: "https://s.shopee.vn/70FGLq5Hz3",
  }
    ,
  {
    title: "Son Dưỡng Cỏ Mềm Cải Thiện Nứt Nẻ Môi Giảm Thâm Môi Cỏ Mềm 4,5gr ",
    media: "image/sexy4.jpg",
    link: "https://s.shopee.vn/10y3CcxrEt",
  }
    ,
  {
    title: "Son Bóng Bền Màu Nhẹ Môi Superstay Vinyl Ink Maybelline New York   ",
    media: "image/sexy4.jpg",
    link: "https://s.shopee.vn/1qXACbRmAE",
  }
    ,
  {
    title: "[Rom&nd] Son kem siêu lì, cho đôi môi mịn mượt Hàn Quốc Romand Blur Fudge Tint  ",
    media: "image/sexy4.jpg",
    link: "https://s.shopee.vn/50UC3oLjMP",
  }
];

const kemLot = [
  {
    title: "Kem lót Catrice Primer The Mattifier Oil-Control kiềm dầu dưỡng ẩm giảm dầu thừa và bã nhờn ",
    media: "image/sexy3.jpg",
    link: "https://s.shopee.vn/qedO1pv7p",
  },
  {
    title: "Kem Lót Red Earth Perfect Diary Silky Skin Perfecting 50g ",
    media: "image/sexy2.jpg",
    link: "https://s.shopee.vn/2qPhm5LLNo",
  },
  {
    title: "Ositree Kem lót mặt trang điểm Kem lót cách ly Kem dưỡng ẩm Hydrating Brightening Tone-up ",
    media: "image/sexy4.jpg",
    link: "https://s.shopee.vn/2BA0zNxDOC",
  }
  ,
  {
    title: "Kem Lót Kiềm Dầu Ngăn Xuống Tông SPF 20 Fit Me Primer Matte+Poreless Maybelline New York  ",
    media: "image/sexy4.jpg",
    link: "https://s.shopee.vn/15WPxVOZX",
  }
    
];

const xitKhoaNen = [
  {
    title: "Xịt Khóa nền So’Natural Make Up Setting Fixx giúp lớp nền căng bóng, mịn lì ",
    media: "image/sexy3.jpg",
    link: "https://s.shopee.vn/40bfBYJ2rw",
  },
  {
    title: "Xịt khoá nền Charlotte Tilbury Air Brush Flawless Setting Spray dung tích 15ml 34ml và 100ml ",
    media: "image/sexy2.jpg",
    link: "https://s.shopee.vn/AUp8D1tCm0",
  }
];
export default function XinhDep() {
  return (
    <main>

      <Navbar />
        <Hero
          as="p"
          title="Những điều em thích 💕"
          subtitle="Đợt này bộ y tế vừa công bố thu hồi 291 sản phẩm mỹ phẩm không đủ an toàn.
Nên là anh đã tìm và list ra đây cho em các dòng sản phẩm chất lượng, được đánh giá review tốt, nhiều người tin dùng và không nằm trong danh sách cấm.  
Em bé cứ yên tâm dùng nhé !"
          colors = {["#e208c5", "#a716fa", "#d6006b"]}
        />
 
    <Section>
      <SlideShow
        introTitle="Sữa rửa mặt 💕"
        variant={2}
        items={suaRuaMat}
      />
      <SlideShow
        introTitle="Nước tẩy trang 💕"
        variant={1}
        items={bongTayTrang}
      />
     <SlideShow
        introTitle="Serum 💕"
        variant={2}
        items={serum}
      />
      <SlideShow
        introTitle="Kem Chống Nắng 💕"
        variant={1}
        items={kemChongNang}
      />
      <SlideShow
        introTitle="Kem Dưỡng Ẩm 💕"
        variant={2}
        items={kemDuongAm}
      />
      <SlideShow
        introTitle="Toner 💕"
        variant={1}
        items={toner}
      />
      <SlideShow
        introTitle="Body Care 💕"
        variant={2}
        items={bodyCare}
      />
            <SlideShow
        introTitle="Son của em 💕"
        variant={1}
        items={son}
      />
      <SlideShow
        introTitle="Kem Lót 💕"
        variant={2}
        items={kemLot}
      />

      <SlideShow
        introTitle="Xịt Khóa Nền 💕"
        variant={1}
        items={xitKhoaNen}
      />
      </Section>
      

      <Footer />

    </main>
  );
}