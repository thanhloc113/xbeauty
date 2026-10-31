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
    "Mang yêu thương đến cho em",
    
  metadataBase: new URL("https://dearmydarling.com"),

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Dear My Darling",
    description:
          "Mang yêu thương đến cho em. Khám phá kiến thức & Thư giãn sau ngày dài mệt mỏi. Đồng hành cùng em trên hành trình xinh đẹp mỗi ngày.",
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
      "Mang yêu thương đến cho em",
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
