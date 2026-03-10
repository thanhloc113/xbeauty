import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Footer from "@/components/Footer";
import SlideShow from "@/components/SlideShow";
const suaRuaMat = [
  {
    title: "Sữa Rửa Mặt Tạo Bọt Mềm Mịn Làm Sạch Sâu Rau Má Cho Da Mụn Da Dầu Nhạy Cảm",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mln8oeqgag3z8a.webp",
    link: "https://s.shopee.vn/2qPh620hJX",
  },
  {
    title: "Sữa Rửa Mặt Hạt Nghệ Thorakao Ngừa Mụn",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m2hxz6hyrjci14.webp",
    link: "https://s.shopee.vn/W1mJycmN7",
  },
  {
    title: "Sữa rửa mặt dành cho da dầu Cerave Foaming Facial Cleanser ",
    media: "https://down-vn.img.susercontent.com/file/sg-11134201-7rd58-m6yvwwfrhhgb75.webp",
    link: "https://s.shopee.vn/8KkaR7RzKF",
  },
  {
    title: "Sữa rửa mặt La Roche-Posay Effaclar Purifying Foaming Gel M",
    media: "https://down-vn.img.susercontent.com/file/sg-11134201-82612-mlm900t3hlvm8e.webp",
    link: "https://s.shopee.vn/7VBVoQNKaH",
  },
    {
    title: "Sữa rửa mặt Senka Perfect Whip Facial Cleanser ",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mlee88tha5mo63.webp",
    link: "https://s.shopee.vn/9fG0PDGobJ",
  },
      {
    title: "Sữa Rửa Mặt Cosrx Low pH Good Morning Gel Cleanser",
    media: "https://down-vn.img.susercontent.com/file/vn-11134201-7ra0g-m872cbydelxe1e.webp",
    link: "https://s.shopee.vn/900JbQOlDs",
  },
];

const bongTayTrang = [
  {
    title: "Nước Tẩy Trang làm sạch sâu dịu nhẹ cho mọi loại da - Garnier Micellar Cleansing Water ",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mledsmu33kzp22.webp",
    link: "https://s.shopee.vn/8fNTGDfmfB",
  },
  {
    title: "[AMINO MICELLAR MỚI] Nước tẩy trang làm sạch sâu, loại bỏ bụi bẩn & trang điểm 3-in-1 L'Oreal Paris Micellar Water ",
    media: "https://down-vn.img.susercontent.com/file/sg-11134201-8261e-mlmxnj5ykc1x65.webp",
    link: "https://s.shopee.vn/gLCVpNkDC",
  },
  {
    title: "Nước tẩy trang làm sạch sâu cho da nhạy cảm La Roche-Posay Micellar Water Sensitive Skin ",
    media: "https://down-vn.img.susercontent.com/file/sg-11134201-8262z-mlm901qb0idf94.webp",
    link: "https://s.shopee.vn/70FFHFvOM9",
  },
  {
    title: "Dung dịch làm sạch và tẩy trang công nghệ Micellar cho da thường & nhạy cảm Bioderma Sensibio H2O ",
    media: "https://down-vn.img.susercontent.com/file/sg-11134201-8261c-mlliqp2zas5g24.webp",
    link: "https://s.shopee.vn/2B9zWlIwjK",
  },
    {
    title: "NƯỚC TẨY TRANG SẠCH SÂU DỊU NHẸ - SIMPLE MICELLAR WATER  ",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mkhiywf47jt2c2.webp",
    link: "https://s.shopee.vn/50UAtn3BY4",
  },
];


const serum = [
  {
    title: "Dưỡng chất giảm thâm nám và dưỡng sáng toàn diện La Roche-Posay Mela B3 serum ",
    media: "https://down-vn.img.susercontent.com/file/sg-11134201-82633-mlm8zw4fbldxb3.webp",
    link: "https://s.shopee.vn/6VIzPUXwk0",
  },
  {
    title: "BTinh Chất Dưỡng Trắng Sáng Da, Se Khít Lỗ Chân Lông oh!oh! Skin Health Serum with 20% Niacinamide 10ml/30ml ",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-820l4-mes3l9a7y8slc2.webp",
    link: "https://s.shopee.vn/15XXmtnFW",
  },
  {
    title: "Torriden Serum DIVE IN chứa Hyaluronic Acid Siêu dưỡng ẩm cho da",
    media: "https://down-vn.img.susercontent.com/file/sg-11134207-8262h-mlg2u1ewiqrme0.webp",
    link: "https://s.shopee.vn/gL9OYt9JX",
  },
  {
    title: "Tinh Chất The Ordinary Niacinamide 10% + Zinc 1% giảm mụn, mờ thâm, thu nhỏ lỗ chân lông hiệu quả ",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-820l4-mj8ivivnnlkz72.webp",
    link: "https://s.shopee.vn/6KzYOUWOW4",
  },
    {
    title: "Serum Torriden Tinh chất chăm sóc lỗ chân lông hoàn hảo CELLMAZING ",
    media: "https://down-vn.img.susercontent.com/file/sg-11134207-81zw1-mijy1soq38jmc0.webp",
    link: "https://s.shopee.vn/3VfNsnE8WE",
  },
    {
    title: "Serum khoáng “quốc dân” giúp phục hồi và cấp ẩm chuyên biệt Vichy Mineral 89 50ml, chống đa tác nhân làm suy yếu da ",
    media: "https://down-vn.img.susercontent.com/file/sg-11134201-82602-mli2rklm6m84b6.webp",
    link: "https://s.shopee.vn/LiM4RrAzU",
  },
      {
    title: "Serum dưỡng cấp ẩm tức thì, giúp làm giảm nếp nhăn & căng mướt da L'Oreal Paris Revitalift 1.5% Hyaluronic Acid ",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mlnaj7dg90qw89.webp",
    link: "https://s.shopee.vn/1VuLKxdmnj",
  },
];

const kemChongNang = [
  {
    title: "Kem chống nắng nâng tone cho da dầu La Roche-Posay Anthelios XL SPF50+ ",
    media: "https://down-vn.img.susercontent.com/file/sg-11134201-8262e-mlm8zyy96ku8d2.webp",
    link: "https://s.shopee.vn/1Lav8rdQpW",
  },
  {
    title: "Kem chống nắng Skin Aqua Tone Up UV Essence ",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mkaismq7x3pe39.webp",
    link: "https://s.shopee.vn/6pvn2smrFk",
  },
  {
    title: "Kem chống nắng L'Oréal Paris UV Defender Invisible Fluid ",
    media: "https://down-vn.img.susercontent.com/file/sg-11134201-8260k-mlmx4judk93948.webp",
    link: "https://s.shopee.vn/2Vmpq5PKXV",
  },
  {
    title: "Kem chống nắng SKIN1004 Madagascar Centella Air‑Fit Suncream Plus ",
    media: "https://down-vn.img.susercontent.com/file/sg-11134201-8260c-mlf7yixab7cxcf.webp",
    link: "https://s.shopee.vn/7fUu2gCYen",
  },
    {
    title: "Kem chống nắng BEPLAIN Sunmuse Moisture Sunscreen ",
    media: "https://down-vn.img.susercontent.com/file/sg-11134207-7rbl7-m5nnw7w7rm8e38.webp",
    link: "https://s.shopee.vn/9Kd9yLhZ2g",
  },
    {
    title: "Essence Chống Nắng Màng Nước Dưỡng Ẩm Biore UV Aqua Rich Watery SPF50+/PA++++ ",
    media: "https://down-vn.img.susercontent.com/file/sg-11134201-82605-mlhk7r4vbzls39.webp",
    link: "https://s.shopee.vn/8pguDZbQEB",
  },
];

const kemDuongAm = [
  {
    title: "Kem Dưỡng Ẩm Da Mặt Kiềm Dầu Ngừa Mụn Chiết Xuất Rau Má Cho Da Dầu Nhạy Cảm ",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mln84x2cxv5w92.webp",
    link: "https://s.shopee.vn/1qX9vpcqR6",
  },
  {
    title: "Kem dưỡng ẩm phục hồi chuyên sâu và giữ da ẩm mịn suốt 48H CERAVE MOISTURISING CREAM ",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-mcljdhjp86jm97.webp",
    link: "https://s.shopee.vn/AUp8D1tCm0",
  },
  {
    title: "Kem Dưỡng Ẩm Phục Hồi Embryolisse Lait Creme Concentre ",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m9tyha81ptny20.webp",
    link: "https://s.shopee.vn/30j7HV3kDq",
  },
  {
    title: "Kem dưỡng ẩm La Roche‑Posay Cicaplast Baume B5 ",
    media: "https://down-vn.img.susercontent.com/file/sg-11134201-8260t-mlm8zzmg2oea40.webp",
    link: "https://s.shopee.vn/1gDgu5ScKn",
  },
    {
    title: "Kem Dưỡng Da Tay Và Móng Dưỡng Ẩm Mềm Mịn Hand Cream ",
    media: "https://down-vn.img.susercontent.com/file/sg-11134201-82634-mldz1gwa5lvs70.webp",
    link: "https://s.shopee.vn/5q3IhRcbQB",

  },
    {
    title: "Kem dưỡng ẩm Garnier Water Gel mỏng nhẹ cấp ẩm tới 48H & hỗ trợ sáng da ",
    media: "https://down-vn.img.susercontent.com/file/sg-11134201-82634-mldz1gwa5lvs70.webp",
    link: "https://s.shopee.vn/8KkdgBogBL",
  },
];

const toner = [
  {
    title: "Klairs Supple Preparation Toner ",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-820l4-mgnh1y8qtr0rff.webp",
    link: "https://s.shopee.vn/8ARAengUnm",
  },
  {
    title: "Active Toner Dưỡng Ẩm Ngừa Mụn Rau Má Dành Cho Da Mụn Da Dầu Nhạy Cảm ",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mln8rzc00kjmc6.webp",
    link: "https://s.shopee.vn/4Av4mVFACw",
  },
     {
    title: "Active Toner Tơ Tằm Dưỡng Ẩm Cho Da  ",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mln6tz41d7gg62.webp",
    link: "https://s.shopee.vn/5L72Apths9",
  },
    {
    title: "[MUA 2 GIẢM 45%] Combo Nước cân bằng sen 310ml & Nước tẩy trang bí đao ",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mlg3ccrlkr9e6b.webp",
    link: "https://s.shopee.vn/50UBjY9vE6",
  },
    {
    title: "Toner Nước Hoa Hồng Diếp Cá Bellena Heartleaf Toner Hỗ Trợ Giảm Thâm Mụn ",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-820l4-mel9c2kacd8j8d.webp",
    link: "https://s.shopee.vn/70FG7WhEB9",
  },
  {
    title: "Hada Labo Gokujyun Lotion Toner ",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-820l4-mfs1harg12q315.webp",
    link: "https://s.shopee.vn/2LTNhk2Nzu",
  },
  {
    title: "Some By Mi AHA BHA PHA Toner ",
    media: "https://down-vn.img.susercontent.com/file/sg-11134207-824i0-mes8femnru2p74.webp",
    link: "https://s.shopee.vn/7fUu3kJaAa",
  },
  

   {
    title: "Anua Heartleaf 77 Toner ",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mlfpeiu1ombzc0.webp",
    link: "https://s.shopee.vn/4qAihdUfod",
  },
 
];

const bodyCare = [
  {
    title: "Cocoon Dak Lak Coffee Body Polish ",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-820l4-mib0mmkttloja9.webp",
    link: "https://s.shopee.vn/2LTNjqg86O",
  },
  {
    title: "Smoothie Tẩy Tế Bào Chết Body Dove Chăm Da Sáng Mịn ",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mleg4vidn0n4f8.webp",
    link: "https://s.shopee.vn/AACHw89Y67",
  },
  {
    title: "Kem Giảm Thâm ARMPIT CREAM Giúp Dưỡng Trắng Làn Da Sạm Ở Vùng Nách Mông Bikini Khuỷu Tay Đầu Gối ",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-mdblzo5exeos7e.webp",
    link: "https://s.shopee.vn/5q3In5kk6K",
  }
];

const son = [
  {
    title: "Son kem lì nhung mịn 3CE Velvet Lip Tint ",
    media: "https://down-vn.img.susercontent.com/file/sg-11134201-8260r-mldsigv35beob9.webp",
    link: "https://s.shopee.vn/9pZRjgLVbd",
  },
  {
    title: "Son Kem Lì Nhung Mịn 3CE Velvet Lip Tint Plush  ",
    media: "https://down-vn.img.susercontent.com/file/sg-11134201-8260e-mldsifk0cc20be.webp",
    link: "https://s.shopee.vn/3qIEaxOqoa",
  },
  {
    title: "Son Kem 3CE Cho Viền Môi Mờ Ảo Không Lem Blur Water Tint 4.6g  ",
    media: "https://down-vn.img.susercontent.com/file/sg-11134201-8261u-mldsiifjdtz810.webp",
    link: "https://s.shopee.vn/70FGLU5VvU",
  }
  ,
  {
    title: "Son dưỡng có màu MAC Glow Play Tendertalk Lip Balm   ",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mlmzca5phhj746.webp",
    link: "https://s.shopee.vn/1VuJw2hCNe",
  }
    ,
  {
    title: "Son kem MAC Powder Kiss Lip & Cheek Mousse | Bền màu, ẩm mịn suốt 10H ",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mlmz1em68hdu2f.webp",
    link: "https://s.shopee.vn/7poNSu2f2w",
  }
    ,
  {
    title: "Son kem lì khóa màu MAC Locked Kiss Ink 24HR Lipcolour 4ml | Chống lem, mịn lì bền màu 24 giờ  ",
    media: "https://down-vn.img.susercontent.com/file/sg-11134201-82633-mlli93m3nc3s8e.webp",
    link: "https://s.shopee.vn/7poNT3z6R0",
  }
    ,
  {
    title: "Son thỏi dạng bút MAC Powder Kiss Velvet Blur Slim Stick nhẹ môi, dưỡng ẩm, giữ màu, khóa ẩm sắc nét 12H  ",
    media: "https://down-vn.img.susercontent.com/file/sg-11134201-8262j-mlli95mw4kcj2b.webp",
    link: "https://s.shopee.vn/1LatjJJ8by",
  }
    ,
  {
    title: "Son thỏi nhung lì MAC MACximal Silky Matte Lipstick | Son thỏi bán chạy nhất, hiệu ứng mịn lì, bền màu suốt 12H  ",
    media: "https://down-vn.img.susercontent.com/file/sg-11134201-8262n-mlli95sk8d1rf1.webp",
    link: "https://s.shopee.vn/8pguebOpdz",
  }
    ,
  {
    title: "Son Môi Lụa Diễm Mềm Mịn Mướt Môi Cỏ Mềm ",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mln8kg2hgw7jfd.webp",
    link: "https://s.shopee.vn/70FGLq5Hz3",
  }
    ,
  {
    title: "Son Dưỡng Cỏ Mềm Cải Thiện Nứt Nẻ Môi Giảm Thâm Môi Cỏ Mềm 4,5gr ",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mlna9mhghhqc97.webp",
    link: "https://s.shopee.vn/10y3CcxrEt",
  }
    ,
  {
    title: "Son Bóng Bền Màu Nhẹ Môi Superstay Vinyl Ink Maybelline New York   ",
    media: "https://down-vn.img.susercontent.com/file/sg-11134201-8262q-mllvsz742jno91.webp",
    link: "https://s.shopee.vn/1qXACbRmAE",
  }
    ,
  {
    title: "[Rom&nd] Son kem siêu lì, cho đôi môi mịn mượt Hàn Quốc Romand Blur Fudge Tint  ",
    media: "https://down-vn.img.susercontent.com/file/sg-11134201-8260r-mlhqn2lalngi2c.webp",
    link: "https://s.shopee.vn/50UC3oLjMP",
  }
];

const kemLot = [
  {
    title: "Kem lót Catrice Primer The Mattifier Oil-Control kiềm dầu dưỡng ẩm giảm dầu thừa và bã nhờn ",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mlercfur5fcxdc.webp",
    link: "https://s.shopee.vn/qedO1pv7p",
  },
  {
    title: "Kem Lót Red Earth Perfect Diary Silky Skin Perfecting 50g ",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-820l4-miwqm1284flwe4.webp",
    link: "https://s.shopee.vn/AUpA59lqai",
  },
  {
    title: "Ositree Kem lót mặt trang điểm Kem lót cách ly Kem dưỡng ẩm Hydrating Brightening Tone-up ",
    media: "https://down-vn.img.susercontent.com/file/cn-11134207-7ras8-m0l2l6711sjr0d.webp",
    link: "https://s.shopee.vn/2BA0zNxDOC",
  }
  ,
  {
    title: "Kem Lót Kiềm Dầu Ngăn Xuống Tông SPF 20 Fit Me Primer Matte+Poreless Maybelline New York  ",
    media: "https://down-vn.img.susercontent.com/file/sg-11134201-8262y-mllvt0ij7g1u4c.webp",
    link: "https://s.shopee.vn/15WPxVOZX",
  }
    
];

const xitKhoaNen = [
  {
    title: "Xịt Khóa nền So’Natural Make Up Setting Fixx giúp lớp nền căng bóng, mịn lì ",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-820l4-mhu853lb0b9d02.webp",
    link: "https://s.shopee.vn/40bfBYJ2rw",
  },
  {
    title: "Xịt khoá nền Charlotte Tilbury Air Brush Flawless Setting Spray dung tích 15ml 34ml và 100ml ",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mkl3fn2f9yx221.webp",
    link: "https://s.shopee.vn/2qPixUYqdG",
  }
];
export default function XinhDep() {
  return (
    <main>

      <Navbar />
        <Hero
          as="p"
          title="Những điều em thích 💕"
          subtitle={`Đợt này bộ y tế vừa công bố thu hồi 291 sản phẩm mỹ phẩm không đủ an toàn. Nên là anh đã tìm và list ra đây cho em các dòng sản phẩm chất lượng, được đánh giá review tốt, nhiều người tin dùng và không nằm trong danh sách cấm. Em bé cứ yên tâm dùng nhé! `}
          colors = {["#e208c5", "#a716fa", "#d6006b"]}
        />
 
    <Section>
      <SlideShow
        introTitle="Sữa rửa mặt 💕"
        variant={2}
        items={suaRuaMat}
      />
    </Section>
        <Section>
      <SlideShow
        introTitle="Nước tẩy trang 💕"
        variant={1}
        items={bongTayTrang}
      />
          </Section>
        <Section>
     <SlideShow
        introTitle="Serum 💕"
        variant={2}
        items={serum}
      />
          </Section>
        <Section>
      <SlideShow
        introTitle="Kem Chống Nắng 💕"
        variant={1}
        items={kemChongNang}
      />
          </Section>
        <Section>
      <SlideShow
        introTitle="Kem Dưỡng Ẩm 💕"
        variant={2}
        items={kemDuongAm}
      />
          </Section>
        <Section>
      <SlideShow
        introTitle="Toner 💕"
        variant={1}
        items={toner}
      />
          </Section>
        <Section>
      <SlideShow
        introTitle="Body Care 💕"
        variant={2}
        items={bodyCare}
      />
          </Section>
        <Section>
            <SlideShow
        introTitle="Son của em 💕"
        variant={1}
        items={son}
      />
          </Section>
        <Section>
      <SlideShow
        introTitle="Kem Lót 💕"
        variant={2}
        items={kemLot}
      />
    </Section>
        <Section>
      <SlideShow
        introTitle="Xịt Khóa Nền 💕"
        variant={1}
        items={xitKhoaNen}
      />
    </Section>
      <p className="text-center max-w-2xl mx-auto leading-relaxed">
        À. Một vài hãng sản phẩm ở đây thường xuyên hết hàng, thay đổi chính sách giá và quà tặng của họ, nên là em bé canh để săn được deal tốt! Anh sẽ cập nhật thêm các thông tin sản phẩm mới, trend, ưu đãi và quá tặng cho em. Khi cần dùng em nhớ ghé vào đây em nhé !
      <br/>Thương em ! 💝
      </p>

      <Footer />

    </main>
  );
}