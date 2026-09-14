export const API_HOST = "/api";

const STATIC_BASE_URL =
  process.env.NEXT_PUBLIC_STATIC_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:8101";

export const API_STATIC_URL = `${STATIC_BASE_URL.replace(/\/$/, "")}/static`;
