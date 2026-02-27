"use client";
import { useState } from "react";

const tabs = [
    { id: "personal", label: "Personal" },
    { id: "education", label: "Education" },
    { id: "work", label: "Work Experience" },
    { id: "skills", label: "Skill" },
];

export default function ProfileTabs() {
    const [activeTab, setActiveTab] = useState("personal");

    const scrollToSection = (id: string) => {
        setActiveTab(id);
        const element = document.getElementById(id);
        if (element) {
            // เลื่อนหน้าจอไปที่ id นั้นแบบนุ่มนวล
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <div className="flex bg-secondary border-b-1 border-accent-2 h-15 rounded-t-3 px-15 pt-2">
            <div className="flex items-center justify-start w-full gap-10">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => scrollToSection(tab.id)}
                        className={`relative h-full px-4 text-heading-5 font-semibold transition-all
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
        </div>
    );
}
