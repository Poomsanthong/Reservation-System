// /shared/api/client.ts
// This module provides a shared `request` function that wraps the native `fetch` API, handling both success and error responses in a consistent way. It also defines TypeScript types for the expected API response format, allowing for better type safety when making API calls from the frontend.
export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiFailure = {
  success: false;
  error: string;
};

export type ApiResult<T> = ApiSuccess<T> | ApiFailure;

async function parseJson<T>(response: Response): Promise<T> {
  return (await response.json()) as T;
}

// Shared fetch wrapper used by the frontend API helpers.
// It understands both raw JSON responses and our `{ success, data }` envelope.
export async function request<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(input, init);
  const body = await parseJson<ApiResult<T> | T>(response);

  if (!response.ok) {
    if (
      typeof body === "object" &&
      body !== null &&
      "error" in body &&
      typeof body.error === "string"
    ) {
      throw new Error(body.error);
    }

    throw new Error("Request failed");
  }

  if (
    typeof body === "object" &&
    body !== null &&
    "success" in body &&
    body.success === true &&
    "data" in body
  ) {
    return body.data as T;
  }

  if (
    typeof body === "object" &&
    body !== null &&
    "success" in body &&
    body.success === false &&
    "error" in body &&
    typeof body.error === "string"
  ) {
    throw new Error(body.error);
  }

  return body as T;
}
