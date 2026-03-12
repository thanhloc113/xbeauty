import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Footer from "@/components/Footer";
import SlideShow from "@/components/SlideShow";
import SectionNavigator from "@/components/SectionNavigator"
import VideoSlide from "@/components/VideoSlider";
import ScrollAlias from "@/components/ScrollAlias";

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
    title: "Sữa Rửa Mặt Cosrx Low pH Good Morning Gel Cleanser",
    media: "https://down-vn.img.susercontent.com/file/vn-11134201-7ra0g-m872cbydelxe1e.webp",
    link: "https://s.shopee.vn/900JbQOlDs",
  },
];

const nuocTayTrang = [
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
    title: "Kem dưỡng Medicube Deep Vita C Capsule Cream 55g ",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mladsf16eyhb75.webp",
    link: "https://s.shopee.vn/4qAnqEfO1A",
  },
  {
    title: "Kem dưỡng ẩm La Roche‑Posay Cicaplast Baume B5 ",
    media: "https://down-vn.img.susercontent.com/file/sg-11134201-8260t-mlm8zzmg2oea40.webp",
    link: "https://s.shopee.vn/1gDgu5ScKn",
  },
    {
    title: "Kem Dưỡng Da Tay Và Móng Dưỡng Ẩm Mềm Mịn Hand Cream ",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mln7mzgfsz5t8a.webp",
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
const cushion = [
  {
    title: "Phấn nước Aprilskin Magic Snow Cushion phiên bản Galaxy Edition ",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mlbiwgic9q0y3c.webp",
    link: "https://s.shopee.vn/30j9CmUMMG",
  },
  {
    title: "Carslan Black Magnet Air Cushion Bảo hiểm kiểm soát dầu Mặc dài 13g ",
    media: "https://down-vn.img.susercontent.com/file/cn-11134207-820l4-mjfbqaebgu8790.webp",
    link: "https://s.shopee.vn/5VQUBiLEAn",
  }
  ,
  {
    title: "Phấn nước Lasting Carslan Cushion lâu dài Kiểm soát dầu Trang điểm mặt 13,5g ",
    media: "https://down-vn.img.susercontent.com/file/cn-11134207-820l4-mix5a26gepdz23.webp",
    link: "https://s.shopee.vn/3LLzbkrc8c",
  }
    ,
  {
    title: "Kem nền dạng kem mịn, chống thấm nước và mồ hôi, che khuyết điểm lâu trôi",
    media: "https://down-vn.img.susercontent.com/file/cn-11134207-7ras8-m8abrhmxwsgte6.webp",
    link: "https://s.shopee.vn/2g6Iosdhfw",
  }
  ,
  {
    title: "Cushion Mistine Kem nền Cầu vồng Xiêm La Phấn mịn mềm mại",
    media: "https://down-vn.img.susercontent.com/file/cn-11134207-820l4-mkpg8mranz7l51.webp",
    link: "https://s.shopee.vn/6pvrmj1sNI",
  }
  ,
  {
    title: "Kem nền Catrice HD Liquid Coverage Foundation che phủ tự nhiên tạo độ mịn màng cho da",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mleq4qh20d1gb0.webp",
    link: "https://s.shopee.vn/6AgAzo5XTh",
  }
    ,
  {
    title: "Kem Nền Mịn Nhẹ Kiềm Dầu 16H Fit Me Maybelline Matte + Poreless Liquid Foundation Dành Cho Da Dầu và Da Thường",
    media: "https://down-vn.img.susercontent.com/file/sg-11134201-8260s-mllvt1azfvgh81.webp",
    link: "https://s.shopee.vn/1BHV2xRZTR",
  },
  {
    title: "Kem Nền Carslan Dạng Lỏng Kiểm Soát Dầu Lâu Trôi Chống Thấm Nước Suốt 24h 30g",
    media: "https://down-vn.img.susercontent.com/file/cn-11134207-820l4-mlg4kirut4w21f.webp",
    link: "https://s.shopee.vn/7fUynEN09E",
  }
  ,
  {
    title: "UODO Foundation kem nền Kiểm soát dầu lâu trôi không thấm nước ",
    media: "https://down-vn.img.susercontent.com/file/cn-11134207-820l4-mlee071iyk2086.webp",
    link: "https://s.shopee.vn/5L741X7eoI",
  }
];
const cheKhuyetDiem = [
  {
    title: "Che khuyết điểm TFIT Cover Up Pro Concealer, kem che khuyết điểm TFIT hũ 3 màu tiện lợi - TFIT HCM",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mled5ym5el8j98.webp",
    link: "https://s.shopee.vn/9AJmbjYutn",
  },
  {
    title: "[THE SAEM] Che khuyết điểm chống nắng che phủ cao THE SAEM Cover Perfection Tip",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mk4uh9mevb47d1.webp",
    link: "https://s.shopee.vn/900MPrXEoI",
  },
    {
    title: "Kem che khuyết điểm Aperire Daydream Cover Tip Concealer 4.5ml - Che phủ toàn diện mỏng nhẹ lâu trôi",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mksd4253t8nb4b.webp",
    link: "https://s.shopee.vn/2g6J9uNFpx",
  },
     {
    title: "Kem che khuyết điểm lâu trôi Luna LongLasting Tip Concealer Cover-Fit hoàn hảo tự nhiên",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m9qrxw9emqum9a.webp",
    link: "https://s.shopee.vn/BOyBWJL6p",
  },
    {
    title: "Kem che khuyết điểm & triệt sắc BEAUTILAB A2P Concentrate Peach Dark Spot & Retouch Brightening Concealer",
    media: "https://down-vn.img.susercontent.com/file/vn-11134201-81ztc-ml90f3vzzfgg14.webp",
    link: "https://s.shopee.vn/807pW5jHuD",
  },
];
const phanMat = [
  {
    title: "Bảng Phấn Mắt Carslan 10 Màu Trang Điểm Đa Chức Năng Phấn Má Hồng Phấn Bắt Sáng Tạo Khối",
    media: "https://down-vn.img.susercontent.com/file/cn-11134207-820l4-mkc0v1ev2goz56.webp",
    link: "https://s.shopee.vn/9UwdJFmjAG",
  },
  {
    title: "Bảng Phấn Mắt CLIO Pro Eye Palette Đủ Màu Dịu Dàng Cá Tính, Chất Phấn Mịn Chống Trôi",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m1yyvl5e5jha6a.webp",
    link: "https://s.shopee.vn/5q3Kx0V3Ju",
  },
   {
    title: "Flower knows Bảng Phấn Mắt swan ballet Sáu Màu Sắc Hiệu Ứng Mịn Màng Lâu Trôi",
    media: "https://down-vn.img.susercontent.com/file/cn-11134207-820l4-ml76kmlmaayp73.webp",
    link: "https://s.shopee.vn/LiOQjgiiI",
  },
    {
    title: "Bảng Phấn Mắt CHÉERYEP 16 Ô Natural Star Đa Năng Nhũ Lì Chuẩn Màu Đa Dạng Bảng Màu",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mlhbodbja58ka1.webp",
    link: "https://s.shopee.vn/2g6JBrezW8",
  },
     {
    title: "Bảng Phấn Mắt CHÉERYEP 16 Ô Natural Star Đa Năng Dễ Dùng Chuẩn Màu Lâu Trôi Đa Dạng",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mlhusg8utibp8d.webp",
    link: "https://s.shopee.vn/60MlA8ovVo",
  },
    {
    title: "3CE BST COLOR BAKER - SON GLAZY LIP GLOW, SON VELVET PLUSH, MÁ HỒNG FACE BLUSH, BẢNG MẮT MULTI EYE 9 COLORS PALETTE",
    media: "https://down-vn.img.susercontent.com/file/sg-11134201-82620-mldsifqzkyrk01.webp",
    link: "https://s.shopee.vn/2LTSnZEnM0",
  },
  {
    title: "Bảng phấn mắt đa năng Lemonade Aesthetic Multi-task Palette ",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-820l4-mj6sda5g426ce5.webp",
    link: "https://s.shopee.vn/qef1tHIPL",
  },
    {
    title: "Bảng phấn mắt Lemonade Aesthetic eyeshadow palette - Version 2 20.8g",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mlelv5leuhvn8e.webp",
    link: "https://s.shopee.vn/20qcQJaEeF",
  },
    {
    title: "Phấn Má Hồng Bắt Sáng 3CE Blushlighter",
    media: "https://down-vn.img.susercontent.com/file/sg-11134201-8261w-mldsigaq6pdv60.webp",
    link: "https://s.shopee.vn/7VBZ8GX4ue",
  },
   {
    title: "Phấn má hồng CARSLAN 6 màu thời trang cao cấp tùy chọn",
    media: "https://down-vn.img.susercontent.com/file/cn-11134207-820l4-mhsj0fhqt8u840.webp",
    link: "https://s.shopee.vn/qefCDcdGc",
  },
  {
    title: "Phấn má hồng mịn lì chuẩn màu Maybelline Fit Me Blush",
    media: "https://down-vn.img.susercontent.com/file/sg-11134201-8260n-mlnq5fj4sb9h19.webp",
    link: "https://s.shopee.vn/5L74YfvtPE",
  },
];
const phanTaoKhoi = [
  {
    title: "Bảng Phấn Tạo Khối Bắt Sáng 4 Ô JUDYDOLL Highlight & Contour Palette Mỏng Mịn Dễ tán Chuẩn màu 3D Lâu trô",
    media: "https://down-vn.img.susercontent.com/file/sg-11134201-8262a-mlljroko6sxx5b.webp",
    link: "https://s.shopee.vn/2Vmt2R0BZi",
  },
  
   {
    title: "Bảng Phấn Trang Điểm 3CE Layer It All (Eye, Blush, Contour Palette",
    media: "https://down-vn.img.susercontent.com/file/sg-11134201-8262d-mldsifk6nuhb7d.webp",
    link: "https://s.shopee.vn/6pvsCgaYuI",
  },
    {
    title: "GALIMARD 4 TRONG 1 Mềm & Cấu trúc Đường viền nhẹ Trang điểm mặt lung linh",
    media: "https://down-vn.img.susercontent.com/file/cn-11134207-820l4-mlecw2fwcvt006.webp",
    link: "https://s.shopee.vn/1gDm44ibIm",
  },
    {
    title: "Bảng phấn tạo khối 3 bước Catrice 3 Steps To Contour Palette mềm mịn và bền màu",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mlc0at5w4rggcf.webp",
    link: "https://s.shopee.vn/5VQUcVulmO",
  },
   
    {
    title: "Bút Tạo Khối 2 Đầu OUT OF OFFICE - Kem Highlighter Tạo Khối Mặt, Viền Mũi, Làm Bóng Và Sáng Da",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mk91scanpuyp1b.webp",
    link: "https://s.shopee.vn/LiOUklJjc",
  },
];
const phanPhu = [

  {
    title: "Phấn phủ Black Magnet CARSLAN kiềm dầu màu đen chống nước chống mồ hôi che phủ bóng dầu cho mặt",
    media: "https://down-vn.img.susercontent.com/file/cn-11134207-820l4-mhr07vjbbldw8d.webp",
    link: "https://s.shopee.vn/6AgBZL8Zvw",
  },
    {
    title: "【MEIKING】Phấn phủ hoa hồng đồng nội giúp kiềm dầu 24H Meiking, chống nước, kiểm soát mồ hôi, làm mịn và sáng ",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mlfr15n5hn2d8a.webp",
    link: "https://s.shopee.vn/2g6JR7AlW7",
  },
   {
    title: "Phấn Nén Black Magnetic Carslan 2.0 Kiểm soát dầu lâu trôi 24H",
    media: "https://down-vn.img.susercontent.com/file/cn-11134207-820l4-mkbzbjayd0y05e.webp",
    link: "https://s.shopee.vn/3B2a0ONK3n",
  },
    {
    title: "Phấn phủ bột kiềm dầu, mịn lì lâu trôi INNISFREE No Sebum Mineral Powder",
    media: "https://down-vn.img.susercontent.com/file/sg-11134201-8260p-mllv4gsit4w565.webp",
    link: "https://s.shopee.vn/4Av7CVFoKg",
  },
    {
    title: "Phấn Phủ Dạng Bột COLORKEY Siêu Mịn Giúp Lớp Trang Điểm Tự Nhiên",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mllitfz41894d9.webp",
    link: "https://s.shopee.vn/3fyqc54mOu",
  },
   {
    title: "Phấn Nén kiềm dầu Carslan Soft Mist 24h Phấn Phủ trang điểm Mềm Mại Lâu Trôi",
    media: "https://down-vn.img.susercontent.com/file/cn-11134207-820l4-mj3r1po1tr7l62@resize_w450_nl.webp",
    link: "https://s.shopee.vn/4LEXPr39Mm",
  },
];
const mascara = [

  {
    title: "Mascara COLORKEY Hỗ Trợ Giúp Mi Dài Và Tơi, Tạo Cảm Giác Tự Nhiên, Nhanh Khô, Không Lem Trôi",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-820l4-mj7xjwcv5pmo24@resize_w450_nl.webp",
    link: "https://s.shopee.vn/6AgBcRLcxR",
  },
    {
    title: "Mascara ZEESEA kháng nước lâu trôi 36h chống nhòe chuốt mi cong vút và dài hơn",
    media: "https://down-vn.img.susercontent.com/file/cn-11134207-7qukw-lj3vd548cfp6cd.webp",
    link: "https://s.shopee.vn/7Ks90jZp9E",
  },
   {
    title: "Bút Kẻ Mắt Nước Siêu Sắc Mảnh Maybelline New York Hyper Sharp Liner Extreme Không Lem Trôi",
    media: "https://down-vn.img.susercontent.com/file/sg-11134201-8262l-mlnq5fzpf11d75.webp",
    link: "https://s.shopee.vn/2qPjf2VKeu",
  },
    {
    title: "Bút kẻ mắt nước nét mảnh Carslan Không lem trôi suốt 12H",
    media: "https://down-vn.img.susercontent.com/file/cn-11134207-820l4-mk0mecg3yknbce.webp",
    link: "https://s.shopee.vn/9KdDP4Lp45",
  },
  {
    title: "Chì kẻ mày 2 đầu Lemonade Dual Eyebrow 2.75g",
    media: "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mlehlz2do2kv0c.webp",
    link: "https://s.shopee.vn/2g6JTlqW8Z",
  },
  {
    title: "Chì Kẻ Mày CARSLAN Tự Nhiên Chống Nước Lâu Trôi ",
    media: "https://down-vn.img.susercontent.com/file/cn-11134207-820l4-mhsj2lnor6ys94.webp",
    link: "https://s.shopee.vn/9KdDPgrDg9",
  },
    {
    title: "Bút kẻ mày Carslan Chống thấm nước và mồ hôi Màu sắc nhu hòa không bị lem hay dính 0.26g",
    media: "https://down-vn.img.susercontent.com/file/cn-11134207-820l4-mk0mbsnmtfyc68.webp",
    link: "https://s.shopee.vn/5AneS86aCw",
  },

];
  const videos = [
      {
     url:"https://ik.imagekit.io/7a7njhuhn/snaptik.vn_ZrXbv.mp4",
     title:"Xinh đẹp để đi học",
     poster:"https://i.pinimg.com/736x/3f/fa/37/3ffa37e25d53ee2d74ab543666786e97.jpg"
    },
    {
     url:"https://ik.imagekit.io/7a7njhuhn/snaptik.vn_Ie89D.mp4",
     title:"Xinh đẹp để đi làm",
     poster:"https://i.pinimg.com/736x/8a/ef/70/8aef707f9995a1b1e1d5142fe92bd571.jpg"
    },
    {
     url:"https://ik.imagekit.io/7a7njhuhn/snaptik.vn_aE5jM.mp4",
     title:"Xinh đẹp để đi chơi",
     poster:"https://i.pinimg.com/736x/f5/94/45/f59445db898d030a42b44a0eed74781f.jpg"
    },
    {
     url:"https://ik.imagekit.io/7a7njhuhn/snaptik.vn_GXsPq.mp4",
     title:"Xinh đẹp để đến đâu cũng là nơi đáng đến",
     poster:"https://i.pinimg.com/736x/63/34/39/63343907bd30b92c4205cf8be7f52427.jpg"
    },
    {
     url:"https://archive.org/download/0312_20260312/0312.mp4",
     title:"Xinh đẹp để yêu đời",
     poster:"https://i.pinimg.com/736x/e9/48/c3/e948c34d7cd1c583fc4bb503abd289ee.jpg"
    },
    {
     url:"https://ik.imagekit.io/7a7njhuhn/snaptik.vn_0uJQs.mp4",
     title:"Xinh đẹp để yêu thương",
     poster:"https://i.pinimg.com/1200x/11/73/d8/1173d83e710591f88ac8c97e736d2537.jpg"
    },
    {
     url:"https://archive.org/download/lv_0_20260312024947/lv_0_20260312024947.ia.mp4",
     title:"Xinh đẹp để có những kỉ niệm đẹp",
     poster:"https://i.pinimg.com/736x/b4/c2/a5/b4c2a5984623bfb6634e393ca29466f8.jpg"
    },
  ];
export default function XinhDep() {

  return (
    <main>
    <ScrollAlias
        ids={[
    "suaRuaMat", 
    "nuocTayTrang",
    "serum", 
    "kemChongNang",
    "kemDuongAm",
    "toner", 
    "bodyCare", 
    "son", 
    "kemLot", 
    "xitKhoaNen", 
    "cushion", 
    "cheKhuyetDiem", 
    "phanMat", 
    "phanTaoKhoi",
    "phanPhu",
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
    { id: "suaRuaMat", label: "Sửa Rửa Mặt" },
    { id: "nuocTayTrang", label: "Nước Tẩy Trang" },
    { id: "serum", label: "Serum" },
    { id: "kemChongNang", label: "Kem chống nắng" },
    { id: "kemDuongAm", label: "Kem Dưỡng Ẩm" },
    { id: "toner", label: "Toner" },
    { id: "bodyCare", label: "Body Care" },
    { id: "son", label: "Son" },
    { id: "kemLot", label: "Kem Lót" },
    { id: "xitKhoaNen", label: "Xịt Khóa Nền" },
    { id: "cushion", label: "Cushion & Kem Nền" },
    { id: "cheKhuyetDiem", label: "Che Khuyết Điểm" },
    { id: "phanMat", label: "Phấn Mắt" },
    { id: "phanTaoKhoi", label: "Phấn Tạo Khối" },
    { id: "phanPhu", label: "Phấn Phủ" },
    { id: "mascara", label: "Mascara & Eyeliner" },
  ]}
/>  
  <Section id="top">

    <VideoSlide videos={videos} />

  </Section>
    <Section id="suaRuaMat">
      <SlideShow
        introTitle="Sữa rửa mặt"
        variant={2}
        items={suaRuaMat}
      />
    </Section>
    <Section id="nuocTayTrang">
      <SlideShow
        introTitle="Nước tẩy trang"
        variant={2}
        items={nuocTayTrang}
      />
    </Section>
    <Section id="serum">
     <SlideShow
        introTitle="Serum"
        variant={2}
        items={serum}
      />
          </Section>
        <Section id="kemChongNang">
      <SlideShow
        introTitle="Kem Chống Nắng"
        variant={2}
        items={kemChongNang}
      />
          </Section>
        <Section id="kemDuongAm">
      <SlideShow
        introTitle="Kem Dưỡng Ẩm"
        variant={2}
        items={kemDuongAm}
      />
          </Section>
        <Section id="toner">
      <SlideShow
        introTitle="Toner"
        variant={2}
        items={toner}
      />
          </Section>
        <Section id="bodyCare">
      <SlideShow
        introTitle="Body Care"
        variant={2}
        items={bodyCare}
      />
          </Section>
        <Section id="son">
            <SlideShow
        introTitle="Son của em"
        variant={2}
        items={son}
      />
          </Section>
        <Section id="kemLot">
      <SlideShow
        introTitle="Kem Lót"
        variant={2}
        items={kemLot}
      />
    </Section>
    <Section id="xitKhoaNen">
      <SlideShow
        introTitle="Xịt Khóa Nền"
        variant={2}
        items={xitKhoaNen}
      />
    </Section>
    <Section id="cushion">
          <SlideShow
        introTitle="Kem nền (Foundation) & Cushion"
        variant={2}
        items={cushion}
      />
    </Section>
        <Section id="cheKhuyetDiem">
          <SlideShow
        introTitle="Kem che khuyết điểm "
        variant={2}
        items={cheKhuyetDiem}
      />
    </Section>

    <Section id="phanMat">
      <SlideShow
        introTitle="Bảng Mắt & Phấn Má Hồng "
        variant={2}
        items={phanMat}
      />
    </Section>
    <Section id="phanTaoKhoi">
      <SlideShow
        introTitle="Phấn Tạo Khối "
        variant={2}
        items={phanTaoKhoi}
      />
    </Section>
    <Section id="phanPhu">
      <SlideShow
        introTitle="Phấn Phủ"
        variant={2}
        items={phanPhu}
      />
    </Section>
    <Section id="mascara">
      <SlideShow
        introTitle="Mascara & Eyeliner"
        variant={2}
        items={mascara}
      />
    </Section>
      <p className="text-center max-w-2xl mx-auto leading-relaxed">
       Lướt đến đây rồi mà vẫn chưa biết lấy cái nào thì là em đang phân vân lắm đúng không? Nếu em chưa từng dùng qua sản phẩm nào thì cứ hãy thử một cái đi. Vì chỉ khi đó, em mới biết được cái nào là cái phù hợp với em hơn.
       Anh vẫn đang cập nhật thêm thông tin chi tiết về các sản phẩm, cả ưu đãi mới và quà tặng cho em nữa. Để mỗi lần ghé vào đây, em đều có thể yên tâm sử dụng những thứ mà em thích! Thương em! 💝
      </p>

    <Footer />

    </main>
  );
}