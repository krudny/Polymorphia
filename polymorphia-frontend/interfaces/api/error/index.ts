export interface BackendErrorResponse {
  detail?: string;
  title?: string;
}

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}
