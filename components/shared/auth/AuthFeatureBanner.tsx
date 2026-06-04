import React from "react";

// 💡 ทำเป็น Array ไว้ เผื่ออนาคตคุณอยากเปลี่ยนข้อความ ก็มาแก้ตรงนี้ได้เลยง่ายๆ
const features = [
    {
        title: "Smart AI Matching",
        description: "Get matched with the highest quality scam-free remote and hybrid roles perfectly suited to your skills.",
    },
    {
        title: "Score-Based System",
        description: "Know your chances before applying with our transparent scoring system that highlights your strengths.",
    },
    {
        title: "Auto Resume Analysis",
        description: "Upload your resume once and let our AI automatically extract and fill in your professional profile.",
    },
];

export default function AuthFeatureBanner() {
    return (
        // 💡 1. เพิ่ม pr-20 และ lg:pr-32 เข้าไป เพื่อกันที่ว่างฝั่งขวาไว้ให้ AuthCard มาเกยทับ
        <div className="bg-tertiary p-10 md:p-12 pr-20 lg:pr-32 rounded-3xl h-full flex flex-col justify-center">
            
            <div className="flex flex-col gap-10 lg:max-w-md">
                {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4 lg:gap-5">
                        
                        {/* วงกลมไอคอน (ใช้ div เปล่าๆ ไปก่อน ใส่ Icon ทีหลังได้) */}
                        <div className="w-12 h-12 rounded-full border border-gray-400 bg-white flex-shrink-0 flex items-center justify-center shadow-sm">
                            {/* คุณสามารถเอา <Icon... /> มาใส่ตรงนี้ได้ */}
                        </div>
                        
                        {/* ข้อความ */}
                        <div className="flex flex-col">
                            {/* 💡 2. ปรับขนาดฟอนต์ให้ใหญ่ขึ้นเพื่อให้อ่านง่ายบนจอคอม (text-base, text-sm) */}
                            <h3 className="text-base lg:text-lg font-bold text-gray-800">{feature.title}</h3>
                            <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}