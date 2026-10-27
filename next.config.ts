import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["43lmwy-3000.csb.app"],
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
