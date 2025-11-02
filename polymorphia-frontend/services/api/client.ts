import { API_HOST } from "@/services/api";
import { BackendErrorResponse } from "@/interfaces/api/error";
import { ApiError } from "@/services/api/error";
import toast from "react-hot-toast";
import AuthService from "@/services/auth";

const GENERIC_ERROR_MESSAGE = "Wystąpił nieoczekiwany błąd. Spróbuj ponownie.";

const readErrorMessage = async (response: Response): Promise<string> => {
  try {
    const { detail, title } = (await response.json()) as BackendErrorResponse;
    return detail?.trim() || title?.trim() || GENERIC_ERROR_MESSAGE;
  } catch {
    return GENERIC_ERROR_MESSAGE;
  }
};

const handleUnauthorized = async () => {
  toast.error("Sesja wygasła. Zaloguj się ponownie.", {
    id: "session-expired-toast",
  });
  await AuthService.logout();
  setTimeout(() => {
    window.location.href = "/";
  }, 1000);
};

const request = async (path: string, init?: RequestInit): Promise<Response> => {
  const url = `${API_HOST}${path.startsWith("/") ? path : `/${path}`}`;

  const response = await fetch(url, {
    ...(init ?? {}),
    credentials: "include",
  });

  if (!response.ok) {
    if (response.status === 401) {
      handleUnauthorized();
    }
    throw new ApiError(await readErrorMessage(response));
  }

  return response;
};

export const getEndpoint = (path: string): Promise<Response> =>
  request(path, { method: "GET" });

export const deleteEndpoint = (path: string): Promise<Response> =>
  request(path, { method: "DELETE" });

export const postEndpoint = (
  path: string,
  body?: BodyInit,
  addJsonContentType: boolean = false,
  headers?: HeadersInit
): Promise<Response> => {
  return request(path, {
    method: "POST",
    headers:
      headers ??
      (addJsonContentType ? { "Content-Type": "application/json" } : undefined),
    body,
  });
};

export const putEndpoint = (
  path: string,
  body?: BodyInit,
  addJsonContentType: boolean = false
): Promise<Response> => {
  return request(path, {
    method: "PUT",
    headers: addJsonContentType
      ? { "Content-Type": "application/json" }
      : undefined,
    body,
  });
};

export const fetchJson = async <T>(promise: Promise<Response>): Promise<T> => {
  const response = await promise;
  return (await response.json()) as T;
};
