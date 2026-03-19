"use server";

import { cookies } from "next/headers";
import { API_BASE_URL } from "@/lib/api-config";
import { revalidatePath } from "next/cache";

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

    const data = await response.json();

    if (!response.ok) {
        return { error: `failed to apply for this job (${data.message})` };
    }

    revalidatePath("/", "layout");
    return { success: true, data }; // ส่งคืน data กลับไปให้ UI
}
