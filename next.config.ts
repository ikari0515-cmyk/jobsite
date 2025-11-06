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
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/admin/login',
        destination: '/admin',
        permanent: true,
      },
      {
        source: '/service',
        destination: 'https://job.asteriskjob.com/service',
        permanent: true,
      },
      {
        source: '/service/',
        destination: 'https://job.asteriskjob.com/service',
        permanent: true,
      },
      {
        source: '/jobs/:path*',
        destination: 'https://job.asteriskjob.com/jobs/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
