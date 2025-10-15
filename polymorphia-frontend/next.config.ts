import { API_STATIC_HOST_PATTERN } from "./services/api";
import path from "node:path";

/** @type {import("next").NextConfig} */
module.exports = {
  async redirects() {
    return [
      {
        source: "/knowledge-base",
        destination: "/knowledge-base/evolution-stages/",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      API_STATIC_HOST_PATTERN,
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
    formats: ["image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  turbopack: {
    root: path.resolve(__dirname, "./"),
  },
};
