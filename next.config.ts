import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  async redirects() {
  
  return [
    {
      source: "/",
      has: [{ type: "host", value: "asteriskjob.com" }],
      destination: "https://job.asteriskjob.com",
      permanent: true,
    },
  ];
},
}
export default nextConfig;
