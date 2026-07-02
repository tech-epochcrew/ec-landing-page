import config from "@/config";
import type { IFeedbackPayload } from "@/types";

/**
 * Generic HTTP client for the backend API.
 *
 * SRP  — one class, one responsibility: network communication.
 * OCP  — add new HTTP verbs without modifying existing methods.
 * Encapsulation — fetch details are private; callers receive typed results.
 */
export class ApiService {
  private static instance: ApiService;

  private constructor(private readonly baseUrl: string) {}

  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService(config.api.baseUrl);
    }
    return ApiService.instance;
  }

  async get<TRes>(path: string): Promise<TRes> {
    const res = await fetch(`${this.baseUrl}${path}`);
    if (!res.ok) {
      throw new Error(`GET ${path} → ${res.status} ${res.statusText}`);
    }
    return res.json() as Promise<TRes>;
  }

  async post<TRes, TBody = unknown>(path: string, body: TBody): Promise<TRes> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error(`POST ${path} → ${res.status} ${res.statusText}`);
    }
    return res.json() as Promise<TRes>;
  }
}

export const apiService = ApiService.getInstance();

export async function submitFeedback(payload: IFeedbackPayload): Promise<void> {
  await apiService.post<{ id: number }>("/feedback", {
    name: payload.name,
    email: payload.email,
    message: payload.message,
  });
}
