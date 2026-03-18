"use server";

import { cookies } from "next/headers";
import { API_BASE_URL } from "@/lib/api-config";

export async function getJobById(jobId: string) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    try {
        const response = await fetch(`${API_BASE_URL}/job-posts/${jobId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                error: `failed to fetch this job post id (${data.message})`,
            };
        }

        return { success: true, data }; // ส่งคืน data กลับไปให้ UI
    } catch (_) {
        return { error: "failed to fetch this job post id" };
    }
}
