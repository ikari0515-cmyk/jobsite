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
    {
      source: '/admin/login',
      destination: '/admin',
      permanent: true,
    },

    // /service とその配下はリダイレクトさせない
    {
      source: '/service/:path*',
      has: [
        { type: 'host', value: 'asteriskjob.com' },
      ],
      destination: '/service/:path*',
      permanent: false,
    },
    {
      source: '/service/:path*',
      has: [
        { type: 'host', value: 'www.asteriskjob.com' },
      ],
      destination: '/service/:path*',
      permanent: false,
    },

    // それ以外は wwwへ
    {
      source: '/:path*',
      destination: 'https://www.asteriskjob.com/:path*',
      permanent: false,
    },
  ];
}
}


export default nextConfig;
