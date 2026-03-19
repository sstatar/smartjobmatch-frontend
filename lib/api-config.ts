// lib/api-config.ts
export const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://31b5-223-24-202-232.ngrok-free.app/api/v1";
export const RESUME_BASE_URL =
    process.env.NEXT_PUBLIC_RESUME_BASE_URL || "http://localhost:3333/uploads";
