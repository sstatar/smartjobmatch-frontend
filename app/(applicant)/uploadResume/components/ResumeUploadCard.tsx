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

export default function ResumeUploadCard({ onAnalyze, onPreview, onFileSelect, file}: ResumeUploadCardProps )  {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (!file) {
            // ยังไม่มีไฟล์ → เปิด file picker
            inputRef.current?.click();
        } else {
            // มีไฟล์แล้ว → เรียก analyze
            onAnalyze();
        }
    };

    return (
        <div
            className={`relative flex flex-col items-center justify-center px-16 py-11 rounded-sm border ${
                file ? "border-success" : "border-accent"
            }`}
        >
            {file && (
                <div className="absolute top-6 right-6">
                    <Cross
                        className="cursor-pointer"
                        onClick={() => onFileSelect(null)}
                    />
                </div>
            )}
            <div
                className={`flex flex-col items-center justify-center ${
                    file ? "gap-3" : "gap-10"
                }`}
            >
                <ContentCircle padding="p-6">
                    <IconDownload className="w-12 h-12 text-accent" />
                </ContentCircle>
                {file && (
                    <div className="flex gap-2 items-center"
                    onClick={onPreview}
                    >
                        <CheckIcon className="w-5 h-5 text-success" />
                        <span className="underline text-primary font-medium">
                            {file.name}
                        </span>
                    </div>
                )}

                <ButtonSecond
                    variant={file ? "primary" : "tertiary"}
                    className={file ? "px-10" : ""}
                    onClick={handleClick}
                >
                    {file ? "Analyze Resume" : "Upload your resume"}
                </ButtonSecond>

                {/* input ซ่อน */}
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
