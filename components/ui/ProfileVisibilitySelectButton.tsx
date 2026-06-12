"use client";
import IconHidden from "@/public/svgs/iconHidden.svg";
import IconDropdown from "@/public/svgs/iconDropdown.svg";
import { useState } from "react";
import ProfileVisibilitySelectCard from "../applicant/ProfileVisibleSelectCard";
import IconVisibility from "../icon/IconVisibility";
import { updateVisibilityAction } from "@/app/(applicant)/(main)/profile/resume/service/resumeAction";
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
            {/* 💡 1. ปรับกล่องนอกสุดจาก w-full เป็น w-fit เพื่อให้ปุ่มหดสั้นลงพอดีกับเนื้อหา ไม่กางแผ่เต็มจอ */}
            <button
                className="flex w-fit items-center cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                {/* 💡 2. ปรับ Padding บนมือถือให้เล็กลง (px-2.5 py-1) และลดความหนาของเส้นขอบบนมือถือเหลือ border เฉยๆ */}
                <div className="flex gap-1.5 md:gap-2 px-2.5 md:px-4 py-1 md:py-2 items-center border border-accent/70 md:border-2 border-accent rounded-lg md:rounded-xl w-fit max-w-[280px] md:max-w-[330px]">
                    {/* 💡 3. ย่อขนาดไอคอนบนมือถือลงเล็กน้อย (w-4 h-4) */}
                    <IconVisibility
                        className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 text-accent"
                        isHidden={visibility === "private"}
                    />

                    {/* 💡 4. ลดขนาดฟอนต์บนมือถือเหลือ text-[11px] เพื่อให้ดูเป็นปุ่มสถานะเล็กๆ ไซส์มินิมอล */}
                    <span className="text-accent text-[11px] md:text-subtitle-2 font-semibold whitespace-nowrap">
                        {visibility === "private"
                            ? "Employers can't find you"
                            : "Employers can find you"}
                    </span>

                    {/* 💡 5. ย่อขนาดไอคอน Dropdown บนมือถือ */}
                    <div className="w-3 h-3 md:w-4 md:h-4 flex items-center justify-center text-accent shrink-0">
                        <IconDropdown className="w-full h-full" />
                    </div>
                </div>
            </button>

            {/* โค้ดส่วน Modal {isOpen && (...)} ด้านล่างสามารถคงไว้เหมือนเดิมได้เลยครับ */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/50 transition-opacity"
                        onClick={() => setIsOpen(false)}
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
