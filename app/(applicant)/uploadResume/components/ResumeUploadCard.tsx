"use client";

import { useRef } from "react";
import ContentCircle from "@/components/ui/ContentCircle";
import IconDownload from "@/components/icon/IconDownload";
import CheckIcon from "@/public/svgs/check.svg";
import ButtonSecond from "@/components/ui/Button-2";
import Cross from "@/public/svgs/cross.svg";

type ResumeUploadCardProps = {
    file: File | null;
    onFileSelect: (file: File | null) => void;
    onAnalyze: () => void;
    onPreview: () => void;
};

export default function ResumeUploadCard({
    onAnalyze,
    onPreview,
    onFileSelect,
    file,
}: ResumeUploadCardProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (!file) {
            inputRef.current?.click();
        } else {
            onAnalyze();
        }
    };

    return (
        // 💡 1. พระเอกคือ `w-full max-w-[450px] mx-auto` เพื่อให้กางเต็มที่บนมือถือ แต่ถูกล็อกขนาดไว้บนจอคอม
        // 💡 2. ปรับ Padding: px-6 py-8 (บนมือถือ) และขยายเป็น px-16 py-11 (บนจอคอม md ขึ้นไป)
        <div
            className={`relative w-full max-w-[450px] mx-auto flex flex-col items-center justify-center px-6 py-8 md:px-16 md:py-11 rounded-2xl border ${
                file ? "border-success" : "border-accent"
            }`}
        >
            {file && (
                // 💡 3. ปรับปุ่มกากบาท (ลบไฟล์) ให้ชิดขอบขึ้นนิดนึงบนจอมือถือ
                <div className="absolute top-4 right-4 md:top-6 md:right-6">
                    <Cross
                        className="cursor-pointer text-gray-500 hover:text-red-500 transition-colors"
                        onClick={() => {
                            onFileSelect(null);
                            if (inputRef.current) {
                                inputRef.current.value = "";
                            }
                        }}
                    />
                </div>
            )}
            <div
                className={`flex flex-col items-center justify-center ${
                    file ? "gap-4 md:gap-5" : "gap-6 md:gap-10" // 💡 ลดช่องว่างบนมือถือลงนิดนึง
                }`}
            >
                <ContentCircle padding="p-5 md:p-6">
                    <IconDownload className="w-10 h-10 md:w-12 md:h-12 text-accent" />
                </ContentCircle>

                {file && (
                    <div
                        className="flex gap-2 items-center cursor-pointer hover:opacity-80 transition-opacity w-full max-w-[250px]"
                        onClick={onPreview}
                    >
                        <CheckIcon className="w-5 h-5 flex-shrink-0 text-success" />
                        {/* 💡 4. เพิ่ม truncate ป้องกันกรณีอัปโหลดไฟล์ที่ชื่อยาวมากๆ แล้วดันกล่องพัง */}
                        <span className="underline text-primary font-medium truncate">
                            {file.name}
                        </span>
                    </div>
                )}

                <ButtonSecond
                    variant={file ? "primary" : "tertiary"}
                    className={file ? "px-8 md:px-10" : "w-full"} // 💡 ถ้ายังไม่มีไฟล์ ให้ปุ่มกางเต็ม w-full เพื่อให้กดง่ายบนมือถือ
                    onClick={handleClick}
                >
                    {file ? "Analyze Resume" : "Upload your resume"}
                </ButtonSecond>

                <input
                    type="file"
                    ref={inputRef}
                    hidden
                    accept=".pdf"
                    onChange={(e) => {
                        if (e.target.files) {
                            onFileSelect(e.target.files[0]);
                        }
                    }}
                />
            </div>
        </div>
    );
}
