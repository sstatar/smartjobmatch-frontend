"use client";
import IconVisibility from "@/components/icon/IconVisibility";
import IconCross from "@/public/svgs/cross.svg";
import ButtonSecond from "@/components/ui/Button-2";
import { useState } from "react"; // 💡 เอา useEffect ออกไปได้เลย
import { createPortal } from "react-dom";

type ProfileVisibilitySelectCardProps = {
    onclose: () => void;
    setVisibility: (value: string) => void;
    visibility: string;
    onSave: (newValue: string) => void;
};

export default function ProfileVisibilitySelectCard({
    onclose,
    visibility,
    onSave,
}: ProfileVisibilitySelectCardProps) {
    const [localVisibility, setLocalVisibility] = useState(visibility);

    // 💡 ท่าไม้ตายใหม่: ถ้าระบบยังโหลดอยู่บน Server ให้คืนค่า null ไปก่อน
    // แต่ถ้ายูสเซอร์กดปุ่มเปิด Modal แปลว่าอยู่บนฝั่ง Client แน่นอน โค้ดจะผ่านบรรทัดนี้ไปได้
    if (typeof window === "undefined") return null;

    // 💡 วาร์ปโค้ดทั้งหมดไปแปะที่ document.body โดยตรง
    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] h-[100dvh]">
            <div className="bg-secondary flex flex-col w-full max-w-2xl max-h-[90vh] p-3 md:p-5 rounded-2xl shadow-xl overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-end shrink-0">
                    <button
                        className="p-2 cursor-pointer hover:bg-accent-2 rounded-full transition-colors duration-200 group"
                        onClick={onclose}
                    >
                        <IconCross className="w-5 h-5 text-accent" />
                    </button>
                </div>

                <div className="flex flex-col mb-4 mx-2 md:mx-4 items-center gap-4 md:gap-6">
                    <h1 className="text-accent text-xl md:text-heading-3 font-bold text-center">
                        Visibility to hiring employers
                    </h1>

                    <label className="flex items-start md:items-center justify-between w-full gap-3 md:gap-6 cursor-pointer p-3 md:p-4 px-4 md:px-6 rounded-xl hover:bg-accent-2 transition-colors duration-200 border border-transparent hover:border-accent/10">
                        <input
                            type="radio"
                            name="visibility"
                            value={"public"}
                            checked={localVisibility === "public"}
                            onChange={(e) => setLocalVisibility(e.target.value)}
                            className="w-5 h-5 md:w-6 md:h-6 accent-accent cursor-pointer shrink-0 mt-0.5 md:mt-0"
                        />
                        <div className="flex flex-col gap-1 md:gap-2 flex-1 min-w-0">
                            <span className="text-accent text-sm md:text-heading-5 font-semibold">
                                Hiring employers can find you
                            </span>
                            <span className="text-accent text-xs md:text-sm text-gray-600 leading-relaxed">
                                Allow employers to find me through
                                SmartJobsMatch using my resume and profile. I
                                agree to SmartJobsMatch&apos;s Terms and
                                acknowledge their Cookie & Privacy Policies.
                            </span>
                        </div>
                        <IconVisibility className="w-5 h-5 md:w-6 md:h-6 text-accent shrink-0 hidden sm:block mt-0.5 md:mt-0" />
                    </label>

                    <label className="flex items-start md:items-center justify-between w-full gap-3 md:gap-6 cursor-pointer p-3 md:p-4 px-4 md:px-6 rounded-xl hover:bg-accent-2 transition-colors duration-200 border border-transparent hover:border-accent/10">
                        <input
                            type="radio"
                            name="visibility"
                            value={"private"}
                            checked={localVisibility === "private"}
                            onChange={(e) => setLocalVisibility(e.target.value)}
                            className="w-5 h-5 md:w-6 md:h-6 accent-accent cursor-pointer shrink-0 mt-0.5 md:mt-0"
                        />
                        <div className="flex flex-col gap-1 md:gap-2 flex-1 min-w-0">
                            <span className="text-accent text-sm md:text-heading-5 font-semibold">
                                Hiring employers can&apos;t find you
                            </span>
                            <span className="text-accent text-xs md:text-sm text-gray-600 leading-relaxed">
                                Employers can’t find your profile on
                                SmartJobsMatch or reach out unless you apply to
                                one of their jobs.
                            </span>
                        </div>
                        <IconVisibility
                            isHidden={true}
                            className="w-5 h-5 md:w-6 md:h-6 text-accent shrink-0 hidden sm:block mt-0.5 md:mt-0"
                        />
                    </label>

                    <ButtonSecond
                        variant="tertiary"
                        onClick={() => onSave(localVisibility)}
                        className="w-full md:w-auto mt-2"
                    >
                        Save
                    </ButtonSecond>
                </div>
            </div>
        </div>,
        document.body,
    );
}
