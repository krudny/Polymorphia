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
    remotePatterns: [API_STATIC_HOST_PATTERN],
  },
  turbopack: {
    root: path.resolve(__dirname, "./"),
  },
};
