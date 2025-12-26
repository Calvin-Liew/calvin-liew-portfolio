import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/profile',
        permanent: true, // 301 redirect
      },
      {
        source: '/experience',
        destination: '/profile',
        permanent: true, // 301 redirect
      },
    ];
  },
};

export default nextConfig;
