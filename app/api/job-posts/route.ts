// app/api/job-posts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";
import { API_BASE_URL } from "@/lib/api-config";

export async function POST(req: NextRequest) {
    try {
        // รับไฟล์ที่ส่งมาจาก Client
        const data = await req.json();

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
        const response = await fetch(`${API_BASE_URL}/job-posts`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => res.json());

        // ส่งผลลัพธ์กลับไปยัง Client
        return NextResponse.json(response);
    } catch (error: unknown) {
        // 1. เปลี่ยนจาก any เป็น unknown
        // 2. ตรวจสอบก่อนว่าข้อผิดพลาดมาจาก Axios (เช่น 400, 401, 500) ใช่หรือไม่
        if (axios.isAxiosError(error)) {
            // TypeScript จะรับรู้แล้วว่านี่คือ AxiosError และอนุญาตให้ใช้ property อย่าง error.response ได้
            return NextResponse.json(
                { error: error.response?.data },
                { status: error.response?.data.statusCode || 500 },
            );
        }

        // 3. ตรวจสอบว่าเป็นข้อผิดพลาดมาตรฐานของระบบหรือไม่ (เช่น หาไฟล์ไม่เจอ, Network หลุด)
        if (error instanceof Error) {
            return NextResponse.json(
                { error: "Internal Server Error" },
                { status: 500 },
            );
        }

        // 4. กรณีที่เป็นข้อผิดพลาดรูปแบบอื่นที่ไม่ระบุชนิด
        return NextResponse.json(
            { error: "An unexpected error occurred" },
            { status: 500 },
        );
    }
}
