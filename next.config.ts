import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ['image/webp', 'image/avif'],
  },

  async redirects() {
  return [
    // ✅ /service はリダイレクトせず残す
    {
      source: '/service/:path*',
      destination: '/service/:path*',
      permanent: false,
    },

    // ✅ adminも保持したい
    {
      source: '/admin/:path*',
      destination: '/admin/:path*',
      permanent: false,
    },

    // ✅ それ以外すべて Canva (job.asteriskjob.com) へ
    {
      source: '/:path*',
      has: [
        {
          type: 'host',
          value: 'asteriskjob.com',
        },
        {
          type: 'host',
          value: 'www.asteriskjob.com',
        },
      ],
      destination: 'https://job.asteriskjob.com/:path*',
      permanent: false,
    },
  ];
}

}


export default nextConfig;
