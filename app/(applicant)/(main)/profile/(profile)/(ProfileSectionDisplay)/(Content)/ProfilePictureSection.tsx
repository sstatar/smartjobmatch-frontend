"use client";

import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import { uploadProfilePictureAction } from "../../service/profileAction";

function initialsFromName(name: string): string {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "?";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function ProfilePictureSection({
    initialUrl,
    displayName,
}: {
    initialUrl?: string | null;
    displayName: string;
}) {
    const [preview, setPreview] = useState<string | null>(initialUrl ?? null);
    const [error, setError] = useState<string | null>(null);
    const [pending, startTransition] = useTransition();
    const inputRef = useRef<HTMLInputElement>(null);

    const onPickFile = () => inputRef.current?.click();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        e.target.value = "";
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            setError("Please choose an image file (JPEG, PNG, WebP, or GIF).");
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            setError("Image must be 2 MB or smaller.");
            return;
        }

        setError(null);
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        const fd = new FormData();
        fd.append("file", file);

        startTransition(async () => {
            const res = await uploadProfilePictureAction(fd);
            URL.revokeObjectURL(objectUrl);
            if (!res.success) {
                setError(res.error ?? "Upload failed");
                setPreview(initialUrl ?? null);
                return;
            }
            if (res.profilePictureUrl) {
                setPreview(res.profilePictureUrl);
            } else {
                setPreview(initialUrl ?? null);
            }
        });
    };

    return (
        <div className="flex shrink-0 flex-col items-center gap-2 sm:items-start">
            <div className="relative h-28 w-28 overflow-hidden rounded-full border border-white/10 bg-black/20">
                {preview ? (
                    <Image
                        src={preview}
                        alt={displayName}
                        fill
                        className="object-cover"
                        sizes="112px"
                        unoptimized
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-heading-4 font-semibold text-accent">
                        {initialsFromName(displayName)}
                    </div>
                )}
                {pending && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-xs text-white">
                        Uploading…
                    </div>
                )}
            </div>
            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={onChange}
            />
            <button
                type="button"
                onClick={onPickFile}
                disabled={pending}
                className="text-sm text-accent underline-offset-2 hover:underline disabled:opacity-50"
            >
                {preview ? "Change photo" : "Upload photo"}
            </button>
            {error && (
                <p className="max-w-[12rem] text-center text-xs text-red-400 sm:text-left">
                    {error}
                </p>
            )}
        </div>
    );
}
