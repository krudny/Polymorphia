export type Fetch = (
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) => Promise<Response>;

export interface UseFetch {
  fetch: Fetch;
}
