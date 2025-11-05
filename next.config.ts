import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Ignore ESLint errors during Vercel builds
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
