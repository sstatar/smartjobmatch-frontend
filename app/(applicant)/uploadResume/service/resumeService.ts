// app/(applicant)/uploadResume/service/resumeService.ts
import axios from "axios";

// ไม่ต้องดึง token หรือใช้ API_BASE_URL ตรงนี้แล้ว เพราะเราจะยิงไปที่ Route Handler ของเราเอง
export const analyzeResume = async (
    file: File,
    onProgress?: (percent: number) => void,
) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post("/api/analyze-resume", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
            if (onProgress) {
                const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / (progressEvent.total || 1),
                );
                onProgress(percentCompleted);
            }
        },
    });

    return response.data;
};
