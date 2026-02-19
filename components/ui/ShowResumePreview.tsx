"use client";

import Button from "./Button";

type ShowResumePreviewProps = {
    file: File;
    onConfirm: () => void;
};

export default function ShowResumePreview({
    file,
    onConfirm,
}: ShowResumePreviewProps) {
    return (
        <div className="flex flex-col gap-6 w-full max-w-3xl">
            <div className="w-full h-[494px] border border-accent rounded-md overflow-auto">
                <iframe
                    src={URL.createObjectURL(file)}
                    className="w-full h-full"
                />
            </div>

            <div className="flex justify-center">
                <Button
                    onClick={onConfirm}
                >
                    Confirm
                </Button>
            </div>
        </div>
    );
}
