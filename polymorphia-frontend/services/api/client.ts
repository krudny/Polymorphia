import { API_HOST } from "@/services/api";
import { BackendErrorResponse } from "@/interfaces/api/error";
import { ApiError } from "@/services/api/error";
import { ApiBody, ApiRequestOptions } from "@/services/api/types";

const GENERIC_ERROR_MESSAGE = "Wystąpił nieoczekiwany błąd. Spróbuj ponownie.";

export const readErrorMessage = async (response: Response): Promise<string> => {
  try {
    const { detail, title } = (await response.json()) as BackendErrorResponse;
    return detail?.trim() || title?.trim() || GENERIC_ERROR_MESSAGE;
  } catch {
    return GENERIC_ERROR_MESSAGE;
  }
};

const buildUrl = (path: string): string =>
  `${API_HOST}${path.startsWith("/") ? path : `/${path}`}`;

const buildHeaders = (
  headers: HeadersInit | undefined,
  hasJsonBody: boolean
): Headers | undefined => {
  if (!headers && !hasJsonBody) {
    return undefined;
  }
  const result = new Headers(headers);
  if (hasJsonBody && !result.has("Content-Type")) {
    result.set("Content-Type", "application/json");
  }
  return result;
};

const isApiJsonBody = (body: unknown): body is ApiBody =>
  body != null &&
  typeof body === "object" &&
  !(body instanceof FormData) &&
  !(body instanceof URLSearchParams);

async function request<TResponse>({
  path,
  method,
  body,
  headers,
}: ApiRequestOptions): Promise<TResponse> {
  const hasJsonBody = isApiJsonBody(body);
  const url = buildUrl(path);
  headers = buildHeaders(headers, hasJsonBody);

  const requestInit: RequestInit = {
    method,
    credentials: "include",
  };

  if (headers) {
    requestInit.headers = headers;
  }

  if (hasJsonBody) {
    requestInit.body = JSON.stringify(body);
  } else if (body !== undefined) {
    requestInit.body = body;
  }

  const response = await fetch(url, requestInit).catch((_error) => {
    throw new ApiError("Serwer nie odpowiada.", 503);
  });

  if (!response.ok) {
    throw new ApiError(await readErrorMessage(response), response.status);
  }

  const contentLength = response.headers.get("content-length");
  if (
    response.status === 204 ||
    (contentLength && Number(contentLength) === 0)
  ) {
    return undefined as TResponse;
  }

  try {
    return (await response.json()) as TResponse;
  } catch {
    throw new ApiError("Niepoprawna odpowiedź serwera.", 500);
  }
}

function get<TResponse>(path: string, headers?: HeadersInit) {
  return request<TResponse>({ path, method: "GET", headers });
}

function post(
  path: string,
  body?: ApiBody,
  headers?: HeadersInit
): Promise<void>;
function post<TResponse>(
  path: string,
  body?: ApiBody,
  headers?: HeadersInit
): Promise<TResponse>;
function post<TResponse>(path: string, body?: ApiBody, headers?: HeadersInit) {
  return request<TResponse>({ path, method: "POST", body, headers });
}

function put(
  path: string,
  body?: ApiBody,
  headers?: HeadersInit
): Promise<void>;
function put<TResponse>(
  path: string,
  body?: ApiBody,
  headers?: HeadersInit
): Promise<TResponse>;
function put<TResponse>(path: string, body?: ApiBody, headers?: HeadersInit) {
  return request<TResponse>({ path, method: "PUT", body, headers });
}

function del(path: string, headers?: HeadersInit): Promise<void> {
  return request({ path, method: "DELETE", headers });
}

export const ApiClient = {
  get,
  post,
  put,
  delete: del,
};
