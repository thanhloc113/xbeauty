import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dear My Darling",
  description:
    "Chăm sóc da thông minh hơn - hiệu quả hơn ",
    
  metadataBase: new URL("https://dearmydarling.com"),

  openGraph: {
    title: "DearMyDarling",
    description:
      "Dear My Darling – Khám phá kiến thức chăm sóc da, mỹ phẩm và làm đẹp khoa học. Đánh giá sản phẩm, hướng dẫn skincare, bí quyết chăm sóc tóc, cơ thể và lựa chọn mỹ phẩm phù hợp cho mọi làn da.",
    url: "https://dearmydarling.com",
    siteName: "DearMyDarling",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "https://i.pinimg.com/736x/b3/88/b4/b388b419365b411aa8ba4c35a1cf2ecd.jpg",
        width: 736,
        height: 977,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Dear My Darling",
    description:
      "Chăm sóc da thông minh hơn - hiệu quả hơn",
    images: ["image/logo.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "image/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        {/* <!-- Google tag (gtag.js) --> */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6JMZL6ZMNX"
          strategy="afterInteractive"
        />

        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6JMZL6ZMNX');
          `}
        </Script>
      </body>


    </html>
  );
}
