"use client";
import { analyzeResumeAction } from "@/app/actions/resume";
import ProgressBarCard from "@/components/applicant/ProgressBarCard";
import ButtonSecond from "@/components/ui/Button-2";
import { useState } from "react";

const tabs = [
    { id: "personal", label: "Personal" },
    { id: "education", label: "Education" },
    { id: "work", label: "Work Experience" },
    { id: "skills", label: "Skill" },
];

export default function ProfileTabs() {
    const [activeTab, setActiveTab] = useState("personal");
    const [step, setStep] = useState<"analyze" | "idle">("idle");
    const [progress, setProgress] = useState(0);

    const scrollToSection = (id: string) => {
        setActiveTab(id);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const handleAnalyze = async () => {
        setStep("analyze");
        setProgress(10);

        let interval: ReturnType<typeof setInterval> | undefined;
        try {
            interval = setInterval(() => {
                setProgress((prev) => (prev < 90 ? prev + 5 : prev));
            }, 1000);

            const result = await analyzeResumeAction();

            if (interval) clearInterval(interval);

            if (result.success) {
                setProgress(100);
                setTimeout(() => {
                    setStep("idle");
                    setProgress(0);
                }, 500);
            } else {
                alert(`Analysis failed: ${result.error}`);
                setStep("idle");
                setProgress(0);
            }
        } catch (error) {
            if (interval) clearInterval(interval);
            console.error("Unexpected Error:", error);
            alert("An unexpected error occurred.");
            setStep("idle");
            setProgress(0);
        }
    };

    return (
        <div className="flex items-center justify-between bg-secondary border-b-1 border-accent-2 h-15 rounded-t-3 px-3 md:px-15 pt-2 shrink-0 gap-2 md:gap-4">
            {/* 💡 1. เพิ่ม min-w-0 และลด gap-4 เหลือ gap-2 บนมือถือ เพื่อไม่ให้มันดันไปทับปุ่ม */}
            <div className="flex items-center justify-start flex-1 min-w-0 h-full gap-2 md:gap-10 overflow-x-auto no-scrollbar pr-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => scrollToSection(tab.id)}
                        // 💡 2. ลด padding ซ้ายขวาบนมือถือลงอีกนิด (px-1.5) เพื่อประหยัดพื้นที่
                        className={`relative h-full px-1.5 md:px-4 text-[13px] md:text-heading-5 font-semibold transition-all cursor-pointer shrink-0 whitespace-nowrap
                        ${activeTab === tab.id ? "text-black" : "text-gray-400 hover:text-gray-600"}
                        `}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-accent rounded-t-full transition-all" />
                        )}
                    </button>
                ))}
            </div>

            <div className="flex items-center gap-2 shrink-0 h-full pb-2">
                {step === "analyze" && (
                    <div className="hidden sm:block">
                        <ProgressBarCard progress={progress} />
                    </div>
                )}
                <ButtonSecond
                    // 💡 3. ปรับขนาดปุ่มบนมือถือให้เล็กกะทัดรัดสุดๆ (h-7, text-[11px], px-2.5)
                    // และเปลี่ยนความโค้งเป็น rounded-lg! เพื่อไม่ให้ดูเป็นแคปซูลอ้วนๆ บนจอมือถือ
                    className="h-7! md:h-10! px-2.5! md:px-5! w-auto! text-[11px]! md:text-sm! lg:text-xl! rounded-lg! md:rounded-xl! shrink-0 transition-all"
                    onClick={handleAnalyze}
                    disabled={step === "analyze"}
                >
                    {step === "analyze" ? "Analyzing…" : "Smart Analyze"}
                </ButtonSecond>
            </div>
        </div>
    );
}
