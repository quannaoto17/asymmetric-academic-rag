import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from "./schema";

export interface ProblemDetail {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  timestamp?: string;
  properties?: {
    [key: string]: unknown;
  };
}

export class ApiProblemError extends Error {
  readonly status: number;
  readonly title: string;
  readonly detail: string;
  readonly timestamp?: string;

  constructor(problem: ProblemDetail, fallbackStatus = 500) {
    const title = problem.title ?? "API Error";
    const detail = problem.detail ?? "An unexpected error occurred while communicating with the server.";
    super(`${title}: ${detail}`);
    this.name = "ApiProblemError";
    this.status = problem.status ?? fallbackStatus;
    this.title = title;
    this.detail = detail;
    this.timestamp = problem.timestamp;
  }
}

export function extractProblemMessage(error: unknown): string {
  if (error instanceof ApiProblemError) {
    return error.detail;
  }
  if (error && typeof error === "object") {
    const maybeProblem = error as ProblemDetail;
    if (maybeProblem.detail) {
      return maybeProblem.detail;
    }
    if (maybeProblem.title) {
      return maybeProblem.title;
    }
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "Đã xảy ra lỗi không xác định.";
}

const problemDetailMiddleware: Middleware = {
  async onResponse({ response }) {
    if (!response.ok) {
      const contentType = response.headers.get("content-type") ?? "";
      if (contentType.includes("application/problem+json") || contentType.includes("application/json")) {
        try {
          const body = (await response.clone().json()) as ProblemDetail;
          if (body && (body.title || body.detail || body.status)) {
            throw new ApiProblemError(body, response.status);
          }
        } catch (err) {
          if (err instanceof ApiProblemError) {
            throw err;
          }
        }
      }
    }
    return response;
  },
};

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export const apiClient = createClient<paths>({
  baseUrl: API_BASE_URL,
});

apiClient.use(problemDetailMiddleware);
