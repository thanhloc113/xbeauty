import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
        url: "image/logo.jpg",
        width: 1200,
        height: 1200,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "XBeauty – Beauty & Beach Store",
    description:
      "Mỹ phẩm chất lượng, bikini đẹp và thực phẩm healthy.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
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
      </body>
    </html>
  );
}
