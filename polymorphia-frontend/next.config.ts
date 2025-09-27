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
    deviceSizes: [640, 768, 1024, 1280, 1600],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  turbopack: {
    root: path.resolve(__dirname, "./"),
  },
};
