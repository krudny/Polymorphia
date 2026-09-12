export const API_HOST = "/api";

const STATIC_BASE_URL = process.env.NEXT_PUBLIC_STATIC_BASE_URL;

export const API_STATIC_URL =
  STATIC_BASE_URL !== undefined
    ? STATIC_BASE_URL + "/static"
    : API_HOST + "/static";
