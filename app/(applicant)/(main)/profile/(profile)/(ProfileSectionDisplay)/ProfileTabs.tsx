"use client";
import { analyzeResumeAction } from "@/app/actions/resume";
import ButtonSecond from "@/components/ui/Button-2";
import ProgressBarCard from "@/components/ui/ProgressBarCard";
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
            // เลื่อนหน้าจอไปที่ id นั้นแบบนุ่มนวล
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
        <div className="flex bg-secondary border-b-1 border-accent-2 h-15 rounded-t-3 px-15 pt-2">
            <div className="flex items-center justify-start w-full gap-10">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => scrollToSection(tab.id)}
                        className={`relative h-full px-4 text-heading-5 font-semibold transition-all cursor-pointer
                        ${activeTab === tab.id ? "text-black" : "text-gray-400 hover:text-gray-600"}
                `}
                    >
                        {tab.label}
                        {/* เส้นขีดสีดำด้านล่าง (Active Indicator) */}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-accent rounded-t-full transition-all" />
                        )}
                    </button>
                ))}
            </div>
            {step === "analyze" && <ProgressBarCard progress={progress} />}
            <ButtonSecond
                className="h-11.5! px-4! w-60!"
                onClick={handleAnalyze}
                disabled={step === "analyze"}
            >
                {step === "analyze" ? "Analyzing…" : "Smart Analyze"}
            </ButtonSecond>
        </div>
    );
}
