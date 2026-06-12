"use client";
import { useState, useEffect, useRef } from "react";
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

    // 💡 1. เพิ่ม Ref เพื่อเช็คการคลิกนอกกล่อง (Click Outside to Close)
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div
            // 💡 2. เปลี่ยน max-w-100 เป็น w-full เพื่อให้ยืดหยุ่น และลด padding บนมือถือ
            className={`py-4 md:py-5 px-4 md:px-6 rounded-lg w-full max-w-150 transition-all ${
                step === "done"
                    ? "border-3 border-success shadow-[0px_4px_12px_rgba(0,0,0,0.08)]"
                    : "border-2 border-accent"
            }`}
        >
            <div className="flex items-center justify-between gap-4">
                {/* 💡 3. เพิ่ม min-w-0 เพื่อป้องกันชื่อไฟล์ยาวทะลุกล่อง */}
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <h1
                        className="text-base md:text-heading-3 text-accent font-bold truncate"
                        title={resumeName} // โชว์ชื่อเต็มตอนเอาเมาส์ชี้
                    >
                        {resumeName}
                    </h1>
                    <span className="text-xs md:text-sm text-gray-500">
                        Date added: {dateAdded}
                    </span>
                </div>

                {/* 💡 หุ้ม Ref ไว้ที่กล่องนี้ */}
                <div className="relative shrink-0" ref={menuRef}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`rounded-full p-2 md:p-3 active:scale-95 transition-colors cursor-pointer ${
                            isOpen ? "bg-gray-200" : "hover:bg-gray-100"
                        }`}
                        aria-label="Open menu"
                    >
                        <MeatballsMenu className="w-5 h-5 md:w-6 md:h-6" />
                    </button>

                    {/* 💡 4. ปรับ Dropdown ให้ลอยสวยงามขึ้น */}
                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-36 md:w-40 flex flex-col border border-gray-200 bg-white rounded-lg shadow-xl z-50 overflow-hidden origin-top-right animate-in fade-in zoom-in-95 duration-150">
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onPreview();
                                    setIsOpen(false);
                                }}
                                className="px-4 py-2.5 text-sm md:text-base text-left hover:bg-gray-50 transition-colors border-b border-gray-100 cursor-pointer"
                            >
                                Preview
                            </button>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onReplace();
                                    setIsOpen(false);
                                }}
                                className="px-4 py-2.5 text-sm md:text-base text-left hover:bg-gray-50 transition-colors cursor-pointer text-red-600 hover:text-red-700"
                            >
                                Replace File
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
