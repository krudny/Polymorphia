import path from "node:path";
import withBundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";
import type { RemotePattern } from "next/dist/shared/lib/image-config";

const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!backendUrl) {
  throw new Error(
    "Missing required environment variable: NEXT_PUBLIC_API_BASE_URL"
  );
}

const parsedUrl = new URL(backendUrl);
const remotePatterns: RemotePattern[] = [
  {
    protocol: parsedUrl.protocol.replace(":", "") as "http" | "https",
    hostname: parsedUrl.hostname,
    port: parsedUrl.port || undefined,
  },
  {
    protocol: "https",
    hostname: "raw.githubusercontent.com",
  },
];

if (process.env.NEXT_PUBLIC_STATIC_BASE_URL) {
  const staticUrl = new URL(process.env.NEXT_PUBLIC_STATIC_BASE_URL);
  remotePatterns.push({
    protocol: staticUrl.protocol.replace(":", "") as "http" | "https",
    hostname: staticUrl.hostname,
    port: staticUrl.port || undefined,
  });
}

const nextConfig: NextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/knowledge-base",
        destination: "/knowledge-base/evolution-stages/",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/:path*`,
      },
    ];
  },
  images: {
    qualities: [75],
    dangerouslyAllowLocalIP: true,
    remotePatterns,
    formats: ["image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  turbopack: {
    root: path.resolve(__dirname, "./"),
  },
  experimental: {
    optimizePackageImports: [
      "@mui/material",
      "react-hot-toast",
      "@tanstack/react-query",
      "@tanstack/react-form",
      "gsap",
      "zod",
    ],
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);
