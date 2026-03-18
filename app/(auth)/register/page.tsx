"use client";
import AuthCard from "@/components/AuthCard";
import AuthFeatureBanner from "@/components/AuthFeatureBanner";
import { useActionState } from "react";
import { register } from "@/app/actions/auth";

export default function Page() {
    const [state, formAction] = useActionState(register, { error: null });
    return (
        <div className="w-full flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] w-full max-w-[950px] items-stretch relative">
                <AuthFeatureBanner></AuthFeatureBanner>
                <div className=" flex items-center z-10 md:-ml-10 mt-8 md:mt-0">
                    <AuthCard
                        type="register"
                        subtitle="Wellcome Back!"
                        formAction={formAction} // 💡 ส่ง Action ลงไป
                        error={state?.error}
                    ></AuthCard>
                </div>
            </div>
        </div>
    );
}
