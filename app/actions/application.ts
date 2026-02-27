"use server";

import { cookies } from "next/headers";
import { API_BASE_URL } from "@/lib/api-config";

export async function applyForJob(jobId: string) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const response = await fetch(`${API_BASE_URL}/applications`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ jobPostId: jobId }),
    });

    if (!response.ok) {
        return { error: "เกิดข้อผิดพลาดในการสมัครงาน" };
    }

    const data = await response.json();
    return { success: true, data }; // ส่งคืน data กลับไปให้ UI
}
