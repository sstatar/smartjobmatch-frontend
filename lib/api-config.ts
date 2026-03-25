// lib/api-config.ts
export const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "http://192.168.1.105:3300/api/v1";
export const RESUME_BASE_URL =
    process.env.NEXT_PUBLIC_RESUME_BASE_URL || "http://192.168.1.105:3300/uploads";
