"use client";
import { useState } from "react";
import MeatballsMenu from "@/public/svgs/meatballsMenu.svg";

type DataProps = {
    resumeName: string;
    dateAdded: string;
    step?: string;
    onPreview: () => void;
    onReplace: () => void;
};
export default function ResumeFileCard({
    resumeName,
    dateAdded,
    step,
    onPreview,
    onReplace,
}: DataProps) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div
            className={`py-5 px-6 rounded-lg  w-full max-w-100 ${step === "done" ? "border-3 border-success shadow-[7px_6px_10px_-2px_rgba(0,0,0,0.1)]" : "border-2 border-accent"}`}
        >
            <div className="flex items-center justify-between ">
                <div className="flex flex-col gap-1">
                    <h1 className="text-heading-3 text-accent font-bold">
                        {resumeName}
                    </h1>
                    <span>Date added : {dateAdded} </span>
                </div>
                <div className="relative">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="hover:bg-gray-100 rounded-full p-3 active:scale-95 transition-colors cursor-pointer"
                    >
                        <MeatballsMenu></MeatballsMenu>
                    </button>

                    {isOpen && (
                        <div className="absolute right-[-10px] mt-2 w-40 flex flex-col border-2 border-accent bg-white rounded-md shadow-lg z-50 overflow-hidden">
                            <button
                                type="button" // ระบุ type เพื่อความปลอดภัย
                                onClick={(e) => {
                                    e.stopPropagation(); // กัน event ไหลไปที่อื่น
                                    onPreview();
                                    setIsOpen(false);
                                }}
                                className="px-4 py-2 text-left hover:bg-accent/10 transition-colors border-b border-accent/20"
                            >
                                Preview
                            </button>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onReplace(); // ✅ เรียกฟังก์ชัน Replace
                                    setIsOpen(false);
                                }}
                                className="px-4 py-2 text-left hover:bg-accent/10 transition-colors border-b border-accent/20 cursor-pointer"
                            >
                                Replace file
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
