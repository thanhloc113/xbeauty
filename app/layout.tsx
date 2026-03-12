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
  title: "XBeauty – Mỹ phẩm, đồ đi biển & healthy food",
  description:
    "Gian hàng mỹ phẩm, đồ đi biển, bikini và thực phẩm healthy được nhiều người tin dùng.",
    
  metadataBase: new URL("https://xbeauty.vercel.app"),

  openGraph: {
    title: "XBeauty – Beauty & Beach ",
    description:
      "Mỹ phẩm chất lượng, bikini đẹp và thực phẩm healthy.",
    url: "https://xbeauty.vercel.app",
    siteName: "XBeauty",
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
    title: "XBeauty – Beauty & Beach Store",
    description:
      "Mỹ phẩm chất lượng, bikini đẹp và thực phẩm healthy.",
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
