"use client"; // จำเป็นต้องใส่เพราะเรากำลังจะใช้ React Hook

import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import AuthCard from "@/components/shared/auth/AuthCard";

// กำหนด state เริ่มต้น
const initialState = { error: "" };

export default function LoginPage() {
    // ใช้ Hook เพื่อจัดการ state, ผูกฟังก์ชันเข้ากับฟอร์ม และดูสถานะโหลด
    const [state, formAction, isPending] = useActionState(login, initialState);

    return (
        <div className="w-full flex justify-center items-center h-full p-4 md:p-8">
            <AuthCard
                type="login"
                subtitle="Welcome Back!"
                formAction={formAction}
                error={state?.error}
            ></AuthCard>
        </div>
    );
}
