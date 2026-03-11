export interface ApiResponse<T> {
    data: T;
    message?: string;
}

export type FetchMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface FetchOptions<TBody = unknown> {
    method?: FetchMethod;
    body?: TBody;
    headers?: HeadersInit;
    cache?: RequestCache;
}
