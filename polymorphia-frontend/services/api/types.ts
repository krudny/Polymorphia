export const HttpMethods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
} as const;

export type HttpMethod = (typeof HttpMethods)[keyof typeof HttpMethods];

export type ApiBody = null | string | FormData | URLSearchParams | object;

export interface ApiRequestOptions {
  path: string;
  method: HttpMethod;
  headers?: HeadersInit;
  body?: ApiBody;
}
