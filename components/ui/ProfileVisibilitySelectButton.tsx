"use client";
import IconHidden from "@/public/svgs/iconHidden.svg";
import IconDropdown from "@/public/svgs/iconDropdown.svg";
import { useState } from "react";
import ProfileVisibilitySelectCard from "./ProfileVisibleSelectCard";
import IconVisibility from "../icon/IconVisibility";
import { updateVisibilityAction } from "@/app/(applicant)/profile/resume/service/resumeAction";
export default function ProfileVisibilitySelect({
    isSearchable,
}: {
    isSearchable: string;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [visibility, setVisibility] = useState(isSearchable);
    const [isPending, setIsPending] = useState(false);

    const handleSaveToDB = async (newValue: string) => {
        setIsPending(true);

        // 💡 แปลงค่าจาก string "public"/"private" เป็น boolean true/false
        const searchableBool = newValue === "public";

        try {
            const result = await updateVisibilityAction(searchableBool);

            if (result.success) {
                setVisibility(newValue);
                setIsOpen(false);
                console.log("บันทึกค่าสำเร็จ:", newValue);
            } else {
                alert(`Error: ${result.error}`);
            }
        } catch (error) {
            alert("Something went wrong");
        } finally {
            setIsPending(false);
        }
    };
    return (
        <>
            <button
                className="flex w-full max-w-[330px] items-center justify-between cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex gap-2 px-4 py-2 items-center border-2 border-accent rounded-xl w-full max-w-[330px]">
                    <IconVisibility
                        className="w-5 h-5 flex-shrink-0 text-accent"
                        isHidden={visibility === "private"}
                    />
                    <span className="text-accent text-subtitle-2 font-semibold">
                        {visibility === "private"
                            ? "Hiring Employers can't find you"
                            : "Hiring Employers can find you"}
                    </span>
                    <IconDropdown></IconDropdown>
                </div>
            </button>

            {isOpen && (
                /* 1. Wrapper สำหรับ Modal: ใช้ fixed inset-0 เพื่อจองพื้นที่เต็มหน้าจอ */
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        /* bg-black/50 คือสีดำโปร่งแสง 50%, backdrop-blur-sm คือการเบลอฉากหลัง */
                        className="absolute inset-0 bg-black/50  transition-opacity"
                        onClick={() => setIsOpen(false)} // 👈 เพิ่มเพื่อให้กดที่ว่างแล้วปิด Modal ได้
                    />

                    <div className="relative z-10 animate-in fade-in zoom-in duration-200">
                        <ProfileVisibilitySelectCard
                            onclose={() => setIsOpen(false)}
                            setVisibility={setVisibility}
                            visibility={visibility}
                            onSave={handleSaveToDB}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
