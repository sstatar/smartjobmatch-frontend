// lib/api-config.ts
export const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "http://localhost:3300/api/v1";
export const RESUME_BASE_URL =
    process.env.NEXT_PUBLIC_RESUME_BASE_URL || "http://localhost:3300";