"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { API_BASE_URL } from "@/lib/api-config";

// 1. ประกาศ Type สำหรับ State ที่จะส่งไป-กลับระหว่าง Client และ Server Action
export type AuthState = {
    error: string;
};

// 2. แทนที่ any ด้วย AuthState ที่เราเพิ่งสร้างขึ้นมา
export async function login(prevState: AuthState, formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        // Return ค่ากลับไปโดยมีโครงสร้างตรงกับ AuthState
        return { error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" };
    }

    const data = await response.json();
    const token = data.accessToken;

    const cookieStore = await cookies();

    cookieStore.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
        path: "/",
    });

    // redirect จะหยุดการทำงานของฟังก์ชันทันที
    redirect("/dashboard");
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    redirect("/login");
}
