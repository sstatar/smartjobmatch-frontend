"use client";

import Link from "next/link";
import { useFormStatus } from "react-dom";
import Logo from "./ui/Logo";
import { useState } from "react";

// 1. สร้าง Props เพื่อให้รู้ว่าหน้านี้คือ Login หรือ Register
interface AuthCardProps {
    type: "login" | "register";
    subtitle: string;
    formAction: string | ((formData: FormData) => void);
    error?: string | null;
}

// 2. สร้าง Component ปุ่ม Submit ที่มี Loading state
function SubmitButton({ type }: { type: "login" | "register" }) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full bg-accent hover:bg-black text-white text-heading-4 font-semibold py-2 px-4 rounded-md mt-4 transition-colors disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
        >
            {pending
                ? type === "login"
                    ? "Logging in..."
                    : "Signing up..."
                : type === "login"
                  ? "Log in"
                  : "Sign up"}
        </button>
    );
}

// 3. ตัว Component หลัก
export default function AuthCard({
    type,
    subtitle,
    formAction,
    error,
}: AuthCardProps) {
    const [role, setRole] = useState<"APPLICANT" | "EMPLOYER">("APPLICANT");
    return (
        <div className="bg-white border border-accent rounded-3xl shadow-xl p-8 sm:px-18 py-5 w-full max-w-112.5">
            {/* Header */}
            <div className="text-center mb-5">
                <Logo size="sm"></Logo>
                <h2 className="text-accent text-2xl font-semibold">
                    {subtitle}
                </h2>
            </div>

            {type === "register" && (
                <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
                    <button
                        type="button" // ต้องใส่ type="button" ไม่งั้นมันจะไป trigger Form Submit
                        onClick={() => setRole("APPLICANT")}
                        className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                            role === "APPLICANT"
                                ? "bg-accent text-secondary shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        Job Seeker
                    </button>
                    <button
                        type="button"
                        onClick={() => setRole("EMPLOYER")}
                        className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                            role === "EMPLOYER"
                                ? "bg-accent text-secondary shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        Employer
                    </button>
                </div>
            )}

            {/* Form */}
            <form action={formAction} className="flex flex-col gap-4 ">

                {/* Role Input (โชว์เฉพาะหน้า Register) */}
                {type === "register" && (
                    <input type="hidden" name="role" value={role} />
                )}

                {/* Email Input */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-accent/90 uppercase">
                        Email ID
                    </label>
                    <input
                        type="email"
                        name="email"
                        required
                        className="w-full border border-accent rounded-md px-4 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                </div>

                {/* Password Input */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-accent/90 uppercase">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        required
                        minLength={6}
                        className="w-full border border-accent rounded-md px-4 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                </div>

                {/* Confirm Password (โชว์เฉพาะหน้า Register) */}
                {type === "register" && (
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-accent/90 uppercase">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            minLength={6}
                            className="w-full border border-accent rounded-md px-4 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-blue-500 transition-all"
                        />
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg text-center mt-2">
                        {error}
                    </div>
                )}

                {/* Submit Button */}
                <SubmitButton type={type} />
            </form>

            {/* Footer Link */}
            <div className="text-center mt-6 text-sm text-gray-500">
                {type === "login" ? (
                    <p>
                        New to SmartJobsMatch?{" "}
                        <Link
                            href="/register"
                            className="text-gray-800 font-semibold hover:underline"
                        >
                            Join now!
                        </Link>
                    </p>
                ) : (
                    <p>
                        Already a member?{" "}
                        <Link
                            href="/login"
                            className="text-gray-800 font-semibold hover:underline"
                        >
                            Sign in now
                        </Link>
                    </p>
                )}
            </div>
        </div>
    );
}
