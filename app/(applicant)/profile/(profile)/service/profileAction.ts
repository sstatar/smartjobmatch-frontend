// ไฟล์: Profile/service/profileAction.ts
"use server";

import api from "@/lib/axios";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { UpdateEducationRequest, UpdateWorkExperienceRequest, UpdateSkillsRequest, UpdatePersonalRequest } from "./type";
import { AxiosError } from "axios";

// ฟังก์ชันดึงข้อมูล (เปลี่ยนชื่อเล็กน้อยให้รู้ว่าเป็น Action)
export const fetchUserProfileServer = async () => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) return null;

        const response = await api.get("/profiles/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Server Action Error:", error);
        return null;
    }
};

// put data -- Education --
export async function updatePersonalAction(payload: UpdatePersonalRequest) {
    try {
        const token = (await cookies()).get("token")?.value;
        if (!token) return { success: false, error: "Unauthorized" };

        // ปกติข้อมูลส่วนตัวมักจะยิงไปที่ /profiles/me หรือ /profiles/me/personal
        await api.patch("/profiles/me", payload, {
            headers: { Authorization: `Bearer ${token}` },
        });

        revalidatePath("/profile");
        return { success: true };
    } catch (err: unknown) {
        if (err instanceof AxiosError) {
            console.error("Personal Update Error:", err.response?.data || err.message);
        }
        return { 
            success: false, 
            error: err instanceof AxiosError && err.response?.data?.message 
                ? err.response.data.message 
                : "Failed to update personal information" 
        };
    }
}

export async function updateEducationAction(
    educations: UpdateEducationRequest,
) {
    try {
        console.log(educations);

        const token = (await cookies()).get("token")?.value;
        if (!token) return { success: false, error: "Unauthorized" };

        // ยิงไปหา Backend จริงของคุณ
        await api.put("/profiles/me/educations", educations, {
            headers: { Authorization: `Bearer ${token}` },
        });
        revalidatePath("/profile");
        return { success: true };
    } catch (error) {
        console.error("Update Error:", error);
        return { success: false, error: "Failed to update education" };
    }
}


export async function updateWorkExperienceAction(
    payload: UpdateWorkExperienceRequest,
) {
    try {
        const token = (await cookies()).get("token")?.value;
        if (!token) return { success: false, error: "Unauthorized" };
        await api.put("/profiles/me/experiences", payload, {
            headers: { Authorization: `Bearer ${token}` },
        });

        revalidatePath("/profile");
        return { success: true };
    } catch (err: unknown) { // 1. เปลี่ยนจาก any เป็น unknown
        // 2. ใช้ Type Guard ตรวจสอบว่าเป็น AxiosError หรือไม่
        if (err instanceof AxiosError) {
            console.error(
                "Work Experience Update Error:",
                err.response?.data || err.message
            );
        } else if (err instanceof Error) {
            // กรณีเป็น Error ทั่วไปที่ไม่ใช่จาก Axios
            console.error("General Error:", err.message);
        } else {
            console.error("An unknown error occurred");
        }

        return { 
            success: false, 
            error: err instanceof AxiosError && err.response?.data?.message 
                ? err.response.data.message 
                : "Failed to update work experience" 
        };
    }
}

export async function updateSkillsAction(payload: UpdateSkillsRequest) {
    try {
        const token = (await cookies()).get("token")?.value;
        if (!token) return { success: false, error: "Unauthorized" };

        // ยิงไปที่ Endpoint ของ Skills (ปรับ URL ตามจริง เช่น /profiles/me/skills)
        await api.put("/profiles/me/skills", payload, {
            headers: { Authorization: `Bearer ${token}` },
        });

        revalidatePath("/profile");
        return { success: true };
    } catch (err: unknown) {
        if (err instanceof AxiosError) {
            console.error("Skills Update Error:", err.response?.data || err.message);
        }
        return { 
            success: false, 
            error: err instanceof AxiosError && err.response?.data?.message 
                ? err.response.data.message 
                : "Failed to update skills" 
        };
    }
}