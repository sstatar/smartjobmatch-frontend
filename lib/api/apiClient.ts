"use server";

import { cookies } from "next/headers";
import { API_BASE_URL } from "../api-config";
import { ApiError } from "./apiError";

export type FetchMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface FetchOptions<TBody = unknown> {
    method?: FetchMethod;
    body?: TBody;
    headers?: HeadersInit;
}

export async function apiFetch<TResponse, TBody = unknown>(
    path: string,
    options: FetchOptions<TBody> = {},
): Promise<TResponse> {
    const { method = "GET", body, headers = {} } = options;

    const token = (await cookies()).get("token")?.value;

    const res = await fetch(`${API_BASE_URL}${path}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
            ...headers,
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
    });

    let data: unknown;

    try {
        data = await res.json();
    } catch {
        data = null;
    }

    if (!res.ok) {
        throw new ApiError(res.status, "API request failed", data);
    }

    return data as TResponse;
}
