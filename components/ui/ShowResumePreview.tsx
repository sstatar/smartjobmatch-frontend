"use client";

import { useEffect } from "react";
import Button from "./Button";

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
                : // : `https://f8f3-49-237-80-96.ngrok-free.app/uploads/${file}` // เติม Path ที่เพื่อนเก็บไฟล์ไว้
                  `http://localhost:3300/uploads/${file}` // เติม Path ที่เพื่อนเก็บไฟล์ไว้
            : URL.createObjectURL(file);

    useEffect(() => {
        return () => {
            if (typeof file !== "string" && file) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [file, previewUrl]);

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
