"use client";
import AuthCard from "@/components/shared/auth/AuthCard";
import AuthFeatureBanner from "@/components/shared/auth/AuthFeatureBanner";
import { useActionState } from "react";
import { register } from "@/app/actions/auth";

export default function Page() {
    const [state, formAction] = useActionState(register, { error: null });
    return (
        <div className="w-full flex justify-center items-center min-h-[85vh] px-4 md:px-0 py-6 md:py-0">
            <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] w-full max-w-[950px] items-stretch relative">
                <div className="hidden md:block">
                    <AuthFeatureBanner />
                </div>
                <div className=" flex items-center justify-center md:justify-start z-10 md:-ml-10 w-full">
                    <AuthCard
                        type="register"
                        subtitle="Get Started!"
                        formAction={formAction} // 💡 ส่ง Action ลงไป
                        error={state?.error}
                    ></AuthCard>
                </div>
            </div>
        </div>
    );
}
