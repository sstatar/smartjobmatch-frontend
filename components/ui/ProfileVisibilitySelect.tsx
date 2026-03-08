"use client";
import IconHidden from "@/public/svgs/iconHidden.svg";
import IconDropdown from "@/public/svgs/iconDropdown.svg";
import { useState } from "react";
export default function ProfileVisibilitySelect() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
            className="flex w-full max-w-[300px] items-center justify-between"
            onClick={() => setIsOpen(!isOpen)}>
                <div className="flex gap-2 px-4 py-2 items-center border-2 border-accent rounded-xl w-full max-w-[300px]">
                    <IconHidden></IconHidden>
                    <span className="text-accent">
                        Hidden from hiring employer
                    </span>
                    <IconDropdown></IconDropdown>
                </div>
            </button>

            {isOpen && (
                <div className="inset-0 bg-accent blackdrop-blur "> </div>
            )}
        </>
    );
}
