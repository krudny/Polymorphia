import { API_HOST } from "@/services/api";
import { ApiError, BackendErrorResponse } from "@/interfaces/api/error";

const GENERIC_ERROR_MESSAGE = "Wystąpił nieoczekiwany błąd. Spróbuj ponownie.";

const readErrorMessage = async (response: Response): Promise<string> => {
  try {
    const { detail, title } = (await response.json()) as BackendErrorResponse;
    return detail?.trim() || title?.trim() || GENERIC_ERROR_MESSAGE;
  } catch {
    return GENERIC_ERROR_MESSAGE;
  }
};

export const apiFetch = async (
  path: string,
  init?: RequestInit
): Promise<Response> => {
  const url = `${API_HOST}${path.startsWith("/") ? path : `/${path}`}`;

  const response = await fetch(url, {
    ...(init ?? {}),
    credentials: "include",
  });

  if (!response.ok) {
    throw new ApiError(await readErrorMessage(response));
  }

  return response;
};

export const apiFetchJson = async <T>(
  path: string,
  init?: RequestInit
): Promise<T> => {
  const response = await apiFetch(path, init);
  return (await response.json()) as T;
};
