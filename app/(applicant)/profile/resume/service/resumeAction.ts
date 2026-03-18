// app/profile/service/profileAction.ts
"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "@/lib/api-config";

export async function updateVisibilityAction(isSearchable: boolean) {
    try {
        const token = (await cookies()).get("token")?.value;
        if (!token) return { success: false, error: "Unauthorized" };

        // 🚀 ยิง PATCH ไปที่เส้นที่เพื่อนเตรียมไว้
        await axios.patch(
            `${API_BASE_URL}/profiles/me/is-searchable`, 
            { isSearchable }, // ส่ง Body เป็น { isSearchable: true/false }
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );

        revalidatePath("/profile/resume");
        return { success: true };

    } catch (err: unknown) {
        if (err instanceof AxiosError) {
            return { 
                success: false, 
                error: err.response?.data?.message || "Failed to update visibility" 
            };
        }
        return { success: false, error: "Internal Server Error" };
    }
}