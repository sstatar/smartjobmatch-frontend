"use server";

import { cookies } from "next/headers";
import { API_BASE_URL } from "@/lib/api-config";

export async function aiAnalyzeJob(jobId: string) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const response = await fetch(
        `${API_BASE_URL}/job-posts/aiMatchAnalysis?jobId=${jobId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );

    if (!response.ok) {
        return { error: "เกิดข้อผิดพลาดในการวิเคราะห์ข้อมูล" };
    }

    const data = await response.json();
    return { success: true, data }; // ส่งคืน data กลับไปให้ UI
}
