import { API_STATIC_HOST_PATTERN } from "./services/api";

/** @type {import('next').NextConfig} */
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
  eslint: {
    // Pomija ESLint podczas buildowania
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Pomija sprawdzanie TypeScript podczas buildowania
    ignoreBuildErrors: true,
  },
};
