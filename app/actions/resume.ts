// app/(applicant)/uploadResume/service/resumeService.ts
"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "@/lib/api-config";

export async function uploadResumeAction(formData: FormData) {
    try {
        const token = (await cookies()).get("token")?.value;
        if (!token) return { success: false, error: "Unauthorized" };

        // ดึงไฟล์จาก FormData ที่ส่งมาจาก Client
        const file = formData.get("resume"); // 💡 ชื่อ Key ต้องตรงกับที่ฝั่ง Client ส่งมา

        if (!file) return { success: false, error: "No file provided" };

        // เตรียม FormData ใหม่เพื่อยิงหาเพื่อน
        const backendFormData = new FormData();
        backendFormData.append("file", file); // 💡 ปรับชื่อ Key ให้ตรงตามที่เพื่อนต้องการ (เช่น "file" หรือ "resume")

        await axios.post(`${API_BASE_URL}/profiles/resume`, backendFormData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });

        // สั่งให้หน้า Profile โหลดข้อมูลใหม่เพื่อให้ UI อัปเดตชื่อไฟล์ล่าสุด
        revalidatePath("/profile/resume");
        return { success: true };
    } catch (err: unknown) {
        if (err instanceof AxiosError) {
            console.error(
                "Upload Error Details:",
                err.response?.data || err.message,
            );
            return {
                success: false,
                error:
                    err.response?.data?.message || "Backend rejected the file",
            };
        }
        return { success: false, error: "Internal Server Error" };
    }
}

export async function analyzeResumeAction() {
    try {
        const token = (await cookies()).get("token")?.value;
        if (!token) return { success: false, error: "Unauthorized" };

        const response = await axios.get(
            `${API_BASE_URL}/profiles/analyze-resume`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        console.log("Analyze Success:", response.data);

        revalidatePath("/profile/resume", "page");
        revalidatePath("/profile", "layout");

        return { success: true, data: response.data };
    } catch (err: unknown) {
        if (err instanceof AxiosError) {
            console.error(
                "Analysis Error Details:",
                err.response?.data || err.message,
            );
            return {
                success: false,
                error: err.response?.data?.message || "Backend AI Error",
            };
        }
        return { success: false, error: "Internal Server Error" };
    }
}

export async function autoFillResumeAction() {
    try {
        const token = (await cookies()).get("token")?.value;
        if (!token) return { success: false, error: "Unauthorized" };

        const response = await axios.post(
            `${API_BASE_URL}/profiles/autofill`, {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        revalidatePath("/profile/resume", "page");
        revalidatePath("/profile", "layout");

        return { success: true, data: response.data };
    } catch (err: unknown) {
        if (err instanceof AxiosError) {
            console.error(
                "Analysis Error Details:",
                err.response?.data || err.message,
            );
            return {
                success: false,
                error: err.response?.data?.message || "Backend AI Error",
            };
        }
        return { success: false, error: "Internal Server Error" };
    }
}