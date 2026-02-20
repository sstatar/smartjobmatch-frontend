import axios from "axios";
import { API_BASE_URL } from "@/lib/api-config";

const apiClient = axios.create({
    headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZDcxMmQ5Yi02NmVjLTRiNGUtYWY5ZS0wODg0ZTBjMTY3NTAiLCJlbWFpbCI6ImFwcGxpY2FudDJAYWRtaW4uYWRtaW4iLCJyb2xlIjoiQVBQTElDQU5UIiwiaWF0IjoxNzcxNTc3MzIwLCJleHAiOjE3NzE2NjM3MjB9.a7cVrrpEaDUoyk0IX1-rRUBdcs0SyUrc4f0Q8X7olvs`,
    },
    baseURL: API_BASE_URL,
});

export const analyzeResume = async (file: File, onProgress?: (percent: number) => void) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post("/profiles", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
            if (onProgress) {
                const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / (progressEvent.total || 1)
                );
                onProgress(percentCompleted);
            }
        },
    });

    return response.data;
};