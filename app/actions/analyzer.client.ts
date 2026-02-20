import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { API_BASE_URL } from "@/lib/api-config";
import axios from "axios";
import { JobCardData } from "@/components/JobsList/JobsList.client";

export async function analyzeResume(
    file: File,
    onProgress: (progress: number) => void,
) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        redirect("/login");
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await axios.post(
            `${API_BASE_URL}/profiles`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total,
                        );
                        onProgress(percentCompleted);
                    }
                },
            },
        );
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Upload Error:", error);
        return { success: false, error: "เกิดข้อผิดพลาดในการอัปโหลดไฟล์" };
    }
}

export async function analyzeJobPost(job: JobCardData) {}
