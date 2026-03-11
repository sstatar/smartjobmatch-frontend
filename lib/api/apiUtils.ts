import { apiFetch } from "./apiClient";

export const api = {
    get: <T>(url: string) => apiFetch<T>(url, { method: "GET" }),

    post: <T, B = unknown>(url: string, body: B) =>
        apiFetch<T, B>(url, { method: "POST", body }),

    put: <T, B = unknown>(url: string, body: B) =>
        apiFetch<T, B>(url, { method: "PUT", body }),

    patch: <T, B = unknown>(url: string, body: B) =>
        apiFetch<T, B>(url, { method: "PATCH", body }),

    delete: <T>(url: string) => apiFetch<T>(url, { method: "DELETE" }),
};
