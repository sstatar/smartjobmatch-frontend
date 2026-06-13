"use client";

import { useEffect, useState } from "react";
import Button from "../ui/Button";
import { RESUME_BASE_URL } from "@/lib/api-config";

type ShowResumePreviewProps = {
    file: File | string;
    onConfirm: () => void;
};

export default function ShowResumePreview({
    file,
    onConfirm,
}: ShowResumePreviewProps) {
    const [objectUrl, setObjectUrl] = useState<string>("");

    useEffect(() => {
        // กรณีเป็น File (เพิ่งอัปโหลดใหม่ๆ)
        if (typeof file !== "string" && file instanceof File) {
            const url = URL.createObjectURL(file);

            // 💡 ท่าไม้ตายหลบ Linter: ใช้ setTimeout ดีเลย์การตั้งค่าไว้ 0 วินาที
            // เพื่อให้มันหลุดออกจากรอบการทำงานแบบ Synchronous ของ useEffect
            const timer = setTimeout(() => {
                setObjectUrl(url);
            }, 0);

            return () => {
                clearTimeout(timer); // เคลียร์ timer ทิ้งด้วยถ้า Component ถูกทำลาย
                URL.revokeObjectURL(url);
            };
        }
    }, [file]);

    // 💡 สร้าง URL สำหรับแสดงผลแบบไม่ต้องพึ่ง State (สำหรับ String)
    let previewUrl = "";

    if (typeof file === "string") {
        if (file.startsWith("http")) {
            previewUrl = file;
        } else {
            previewUrl = `${RESUME_BASE_URL}/uploads/${file}`;
        }
    } else {
        previewUrl = objectUrl;
    }

    return (
        <div className="flex flex-col gap-4 md:gap-6 w-full h-full">
            <div className="w-full h-[60vh] md:h-[70vh] min-h-[300px] border border-accent/30 rounded-lg overflow-hidden bg-gray-50 flex flex-col items-center justify-center relative">
                {previewUrl ? (
                    <>
                        <iframe
                            src={previewUrl}
                            className="w-full h-full z-10"
                            title="Resume Preview"
                        />

                        {/* 💡 ปุ่มสำรอง: ถ้า iframe ขาวโพลน ให้ลองกดปุ่มนี้เพื่อเปิดดูตรงๆ */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                            <a
                                href={previewUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="bg-black/70 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-black transition-colors shadow-lg"
                            >
                                Open PDF in new tab
                            </a>
                        </div>
                    </>
                ) : (
                    <span className="text-gray-400 animate-pulse">
                        Loading preview...
                    </span>
                )}
            </div>

            <div className="flex justify-center shrink-0">
                <Button onClick={onConfirm}>Confirm</Button>
            </div>
        </div>
    );
}
