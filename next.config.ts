import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "dearmydarling.vercel.app",
          },
        ],
        destination: "https://dearmydarling.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;