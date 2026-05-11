import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Allow project screenshots hosted on GitHub raw content
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
    ],
  },
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
