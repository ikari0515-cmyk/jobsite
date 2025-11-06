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
      // ✅ admin は Vercel内で動作
      {
        source: '/admin/:path*',
        destination: '/admin/:path*',
        permanent: false,
      },

      // ✅ service も Vercel内で動作
      {
        source: '/service/:path*',
        destination: '/service/:path*',
        permanent: false,
      },

      // ✅ 上記以外のアクセスは Canva側へ飛ばす
      {
        source: '/:path*',
        destination: 'https://job.asteriskjob.com/:path*',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
