import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/service",
        destination: "https://job.asteriskjob.com/service",
        permanent: true,
      },
      {
        source: "/service/",
        destination: "https://job.asteriskjob.com/service",
        permanent: true,
      },
      {
        source: "/jobs/:path*",
        destination: "https://job.asteriskjob.com/jobs/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
