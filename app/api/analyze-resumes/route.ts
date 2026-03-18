// app/api/analyze-resumes/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";
import { API_BASE_URL } from "@/lib/api-config";

export async function POST(req: NextRequest) {
    try {
        // รับไฟล์ที่ส่งมาจาก Client
        const formData = await req.formData();

        // ดึง Token จาก Cookie (ทำงานบน Server ได้อย่างปลอดภัย)
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
            );
        }

        // ส่งต่อไปยัง Backend หลักของคุณ
        const response = await axios.post(
            `${API_BASE_URL}/profiles`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            },
        );

        // ส่งผลลัพธ์กลับไปยัง Client
        return NextResponse.json(response.data);
    } catch (error: unknown) {
        // 1. เปลี่ยนจาก any เป็น unknown
        // 2. ตรวจสอบก่อนว่าข้อผิดพลาดมาจาก Axios (เช่น 400, 401, 500) ใช่หรือไม่
        if (axios.isAxiosError(error)) {
            // ดึง Error Message จริงๆ จาก Backend เพื่อนมาส่งต่อให้ Frontend เราเห็น
            const backendMessage =
                error.response?.data?.message || "Failed to analyze resume";

            return NextResponse.json(
                { error: backendMessage },
                { status: error.response?.status || 500 },
            );
        }

        // 3. ตรวจสอบว่าเป็นข้อผิดพลาดมาตรฐานของระบบหรือไม่ (เช่น หาไฟล์ไม่เจอ, Network หลุด)
        if (error instanceof Error) {
            console.error("System Error:", error.message);
            return NextResponse.json(
                { error: "Internal Server Error" },
                { status: 500 },
            );
        }

        // 4. กรณีที่เป็นข้อผิดพลาดรูปแบบอื่นที่ไม่ระบุชนิด
        console.error("Unknown Error:", error);
        return NextResponse.json(
            { error: "An unexpected error occurred" },
            { status: 500 },
        );
    }
}
