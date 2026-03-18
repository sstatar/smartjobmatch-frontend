"use server";

import { API_BASE_URL } from "@/lib/api-config";
import { User, usersApi } from "@/lib/api/endpoints/usersApi";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Type สำหรับ State ส่งกลับไปให้หน้า UI
export type AuthState = {
    error: string | null;
    success?: boolean; // เอาไว้บอกหน้า UI ว่าสำเร็จแล้วนะ
};

export type UserRole = "APPLICANT" | "EMPLOYER";

// ---------------------------------------------
// 🟢 1. ฟังก์ชัน LOGIN (อัปเกรด Error Handling)
// ---------------------------------------------
export async function login(
    prevState: AuthState | undefined,
    formData: FormData,
) {
    const email = formData.get("email");
    const password = formData.get("password");

    let redirectPath = "";

    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        // ถ้า Backend ไม่ให้ผ่าน (เช่น 400, 401, 404)
        if (!response.ok) {
            // ดึงข้อความ Error จาก Backend ถ้าไม่มีให้ใช้ Default
            return { error: data.message || "อีเมลหรือรหัสผ่านไม่ถูกต้อง" };
        }

        // ถ้าผ่าน จะได้ Token มาเก็บลงตู้เซฟ
        const token = data.accessToken;
        const cookieStore = await cookies();

        try {
            const payloadBase64 = token.split(".")[1];
            const decodedPayload = Buffer.from(
                payloadBase64,
                "base64",
            ).toString("utf-8");
            const tokenData = JSON.parse(decodedPayload);

            // ลองปริ้นท์ดูว่าเพื่อนแอบซ่อน role ไว้ในนี้ไหม!
            console.log("ข้อมูลใน Token:", tokenData);

            // ถ้ามี เราก็ดึงมาเช็คได้เลย
            if (tokenData.role === "employer") {
                redirectPath = "/employer/dashboard";
            } else {
                // 💡 ท่าแอบถาม: ถ้าเป็น Applicant ให้ยิงไปดึงข้อมูล Profile ของตัวเองมาเช็คก่อน
                try {
                    // 🚨 ข้อควรระวัง: ต้องเปลี่ยน /profiles/me เป็น Endpoint ที่ใช้ดึงข้อมูลโปรไฟล์ของเพื่อนคุณนะครับ
                    const profileResponse = await fetch(
                        `${API_BASE_URL}/profiles/me`,
                        {
                            method: "GET",
                            headers: {
                                Authorization: `Bearer ${token}`, // ส่ง Token ไปยืนยันตัวตนด้วย
                            },
                        },
                    );

                    const profileData = await profileResponse.json();

                    // 💡 เช็คว่ามีข้อมูล Resume หรือยัง (ต้องดูว่าเพื่อนตั้งชื่อ field ว่าอะไร เช่น resumeUrl, resume_file, etc.)
                    // สมมติว่าถ้าไม่มี resumeUrl แปลว่าเพิ่งสมัครใหม่
                    if (!profileData.resumeUrl) {
                        redirectPath = "/uploadResume"; // ยังไม่มีของ พาไปอัปโหลด
                    } else {
                        redirectPath = "/dashboard"; // มีแล้ว พาไปหน้าหลัก
                    }
                } catch (checkError) {
                    console.error("เช็ค Profile ไม่ผ่าน", checkError);
                    // ถ้า API เช็คโปรไฟล์พัง กันเหนียวให้พาไปหน้าอัปโหลดก่อน
                    redirectPath = "/uploadResume";
                }
            }
        } catch (e) {
            console.log("แกะ Token ไม่สำเร็จ หรือ Token ผิดรูปแบบ");
        }
        cookieStore.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // เก็บไว้ 7 วัน (แก้ได้ตามต้องการ)
            path: "/",
        });
    } catch (error) {
        console.error("🔥 error เพราะ", error);
        return { error: "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้" };
    }
    if (redirectPath) {
        redirect(redirectPath);
    }

    // 💡 redirect ต้องอยู่นอก try-catch เสมอใน Next.js
    redirect("/dashboard"); // 👈 เปลี่ยนเป็นหน้าแรกที่คุณอยากให้ไปหลัง Login เสร็จ
}

// ---------------------------------------------
// 🔵 2. ฟังก์ชัน REGISTER (สร้างใหม่)
// ---------------------------------------------
export async function register(
    prevState: AuthState | undefined,
    formData: FormData,
) {
    const email = formData.get("email");
    const password = formData.get("password");
    const role = formData.get("role");
    // 💡 ถ้า Backend คุณรับชื่อ-นามสกุลด้วย ก็ดึงเพิ่มตรงนี้ เช่น:
    // const firstName = formData.get("firstName");
    let isSuccess = false;

    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            // 👈 ต้องถามเพื่อนว่าเส้น Register ชื่ออะไร
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, role }),
        });

        const data = await response.json();

        if (!response.ok) {
            // สมมติว่าอีเมลซ้ำ Backend จะด่ากลับมา เราก็ส่งไปบอก UI
            return { error: data.message || "การสมัครสมาชิกล้มเหลว" };
        }

        isSuccess = true;
    } catch (error) {
        return { error: "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้" };
    }

    if (isSuccess) {
        redirect("/login");
    }
}

// ---------------------------------------------
// 🔴 3. ฟังก์ชัน LOGOUT (เหมือนเดิม)
// ---------------------------------------------
export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    redirect("/login");
}

export async function getMyInfo() {
    let user: User | null = null;

    try {
        user = await usersApi.getMe();
    } catch (_) {}

    return user;
}
