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
    // ① /admin/login → /admin だけ許可
    {
      source: '/admin/login',
      destination: '/admin',
      permanent: true,
    },
    // ② 他は一切リダイレクトしない（/service は触らない）
  ];
}

}


export default nextConfig;
