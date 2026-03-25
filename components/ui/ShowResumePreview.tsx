"use client";

import { useEffect } from "react";
import Button from "./Button";
import { RESUME_BASE_URL } from "@/lib/api-config";

type ShowResumePreviewProps = {
    file: File | string;
    onConfirm: () => void;
};

export default function ShowResumePreview({
    file,
    onConfirm,
}: ShowResumePreviewProps) {
    const previewUrl =
        typeof file === "string"
            ? file.startsWith("http")
                ? file
                : `${RESUME_BASE_URL}/${file}` // เติม Path ที่เพื่อนเก็บไฟล์ไว้
            : URL.createObjectURL(file);

    useEffect(() => {
        return () => {
            if (typeof file !== "string" && file) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [file, previewUrl] );

    return (
        <div className="flex flex-col gap-6 w-full max-w-3xl">
            <div className="w-full h-123.5 border border-accent rounded-md overflow-auto">
                <iframe
                    src={previewUrl}
                    className="w-full h-full"
                    title="Resume Preview"
                />
            </div>

            <div className="flex justify-center">
                <Button onClick={onConfirm}>Confirm</Button>
            </div>
        </div>
    );
}
