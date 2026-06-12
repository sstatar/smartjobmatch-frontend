"use client";

import { createPortal } from "react-dom"; // 💡 นำเข้า createPortal
import ProgressBar from "../ui/ProgressBar";

type ProgressBarProps = {
    progress: number;
    title?: string;
};

export default function ProgressBarCard({
    progress,
    title = "Analyze Your Resume",
}: ProgressBarProps) {
    // 💡 เช็คว่าระบบโหลดบนเบราว์เซอร์หรือยัง (หลบ Error ฝั่ง Server)
    if (typeof window === "undefined") return null;

    // 💡 วาร์ปเนื้อหาทั้งหมดไปแปะที่ document.body
    return createPortal(
        // 💡 อัปเกรด z-index เป็น 9999 ให้ทะลุทุกสิ่ง
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 transition-opacity" />

            <div className="relative z-10 animate-in fade-in zoom-in duration-200 flex flex-col items-center gap-6 md:gap-10 w-full max-w-2xl bg-secondary py-16 md:py-20 rounded-4 shadow-2xl">
                <h1 className="text-accent text-xl md:text-heading-2 font-(--weight-heading) text-center px-4">
                    {title}
                </h1>

                <ProgressBar progress={progress} />
            </div>
        </div>,
        document.body,
    );
}
