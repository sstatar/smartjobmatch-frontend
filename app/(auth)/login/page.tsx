"use client"; // จำเป็นต้องใส่เพราะเรากำลังจะใช้ React Hook

import { useActionState } from "react";
import { login } from "@/app/actions/auth";

// กำหนด state เริ่มต้น
const initialState = { error: "" };

export default function LoginPage() {
    // ใช้ Hook เพื่อจัดการ state, ผูกฟังก์ชันเข้ากับฟอร์ม และดูสถานะโหลด
    const [state, formAction, isPending] = useActionState(login, initialState);

    return (
        <div className="m-4">
            <h2 className="text-center m-4">เข้าสู่ระบบ</h2>
            <form
                action={formAction}
                className="flex flex-col items-center gap-4"
            >
                <div className="flex">
                    <label>email:</label>
                    <input
                        type="email"
                        name="email"
                        className="border border-accent"
                        required
                    />
                </div>
                <div className="flex">
                    <label>password:</label>
                    <input
                        type="password"
                        name="password"
                        className="border border-accent"
                        required
                    />
                </div>

                {/* แสดงข้อความ Error ที่ถูกส่งกลับมาจาก Server Action */}
                {state?.error && (
                    <p style={{ color: "red", margin: 0 }}>{state.error}</p>
                )}

                <button
                    type="submit"
                    disabled={isPending}
                    className={`border border-accent rounded-lg px-6 py-3 ${isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                    {isPending ? "กำลังเข้าสู่ระบบ..." : "ล็อกอิน"}
                </button>
            </form>
        </div>
    );
}
