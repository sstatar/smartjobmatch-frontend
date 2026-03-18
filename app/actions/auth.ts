"use server";

import { API_BASE_URL } from "@/lib/api-config";
import { User, usersApi } from "@/lib/api/endpoints/usersApi";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// 1. ประกาศ Type สำหรับ State ที่จะส่งไป-กลับระหว่าง Client และ Server Action
export type AuthState = {
    error: string;
};

export type UserRole = "EMPLOYER" | "APPLICANT";

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
        return { error: "Email or password is not correct" };
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
    revalidatePath("/", "layout");
    redirect("/dashboard");
}

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
