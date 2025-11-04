export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export type ApiBody = string | FormData | URLSearchParams | object;

export interface ApiRequestOptions {
  path: string;
  method: HttpMethod;
  headers?: HeadersInit;
  body?: ApiBody;
}
