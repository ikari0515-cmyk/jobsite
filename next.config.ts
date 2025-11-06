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
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      
    {
  source: '/service/:path*',
  destination: '/service/:path*',
  has: [],  // ← これがあると上書きされず確実に例外になる
  permanent: false,
},


      // ✅ /service 以外のすべては job.asteriskjob.com へ
      {
        source: '/:path*',
        destination: 'https://job.asteriskjob.com/:path*',
        permanent: false,
      },
      {
        source: '/admin/login',
        destination: '/admin',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
