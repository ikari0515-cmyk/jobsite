import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "asteriskjob.com",
          }
        ],
        destination: "https://job.asteriskjob.com",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
