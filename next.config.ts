import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  async redirects() {
    return [
      // 🔸 トップページは Canva のサイトへ
      {
        source: "/",
        has: [
          { type: "host", value: "asteriskjob.com" },
        ],
        destination: "https://job.asteriskjob.com",
        permanent: false,
      },
      // 🔸 /service はそのままこのVercelアプリ内で処理（リダイレクトしない）
      {
        source: "/service",
        has: [
          { type: "host", value: "asteriskjob.com" },
        ],
        destination: "/service",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
