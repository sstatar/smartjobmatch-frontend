import React, { useState } from "react";
import InputBox from "@/components/ui/InputBox";

// 💡 1. Type: สังเกตว่า descriptions เป็น Array ของ String ครับ
export type WorkData = {
    id: string;
    jobTitle?: string;
    company?: string;
    jobType?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    isCurrent?: boolean;
    summary?: string;
    descriptions?: string[]; // เก็บ Bullet points
};

type WorkFormProps = {
    initialData?: WorkData[];
    onSaveSuccess?: (data: WorkData[]) => void;
};

// ==========================================
// 1. WorkExperienceForm (ตัวคุมหลัก)
// ==========================================
export default function WorkExperienceForm({
    initialData,
    onSaveSuccess,
}: WorkFormProps) {
    
    // ตั้งค่าเริ่มต้น: ถ้าไม่มีข้อมูลเก่า ก็สร้างกล่องเปล่าๆ รอไว้ 1 กล่อง
    const [works, setWorks] = useState<WorkData[]>(() => {
        return initialData && initialData.length > 0
            ? initialData
            : [
                  {
                      id: Date.now().toString(),
                      descriptions: [""], // มี Bullet ว่างๆ รอไว้ 1 อัน
                  },
              ];
    });

    const handleAddWork = () => {
        setWorks([
            ...works,
            { id: Date.now().toString(), descriptions: [""] },
        ]);
    };

    const handleDeleteWork = (idToRemove: string) => {
        if (works.length === 1) {
            alert("คุณต้องมีประสบการณ์ทำงานอย่างน้อย 1 รายการครับ");
            return;
        }
        setWorks(works.filter((w) => w.id !== idToRemove));
    };

    const handleChangeWork = (idToUpdate: string, field: keyof WorkData, value: string | boolean | string[]) => {
        setWorks((prev) =>
            prev.map((w) => (w.id === idToUpdate ? { ...w, [field]: value } : w))
        );
    };

    const handleSaveAll = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("ข้อมูล Work Experience ที่จะส่ง API:", works);
        alert("กำลังบันทึกข้อมูล Work Experience...");
        if (onSaveSuccess) onSaveSuccess(works);
    };

    return (
        <form id="side-panel-form" onSubmit={handleSaveAll} className="bg-secondary p-1">
            
            {works.map((work, index) => (
                <WorkExperienceItem
                    key={work.id}
                    data={work}
                    index={index}
                    onDelete={() => handleDeleteWork(work.id)}
                    onChange={(field, value) => handleChangeWork(work.id, field, value)}
                />
            ))}

            <button
                type="button"
                onClick={handleAddWork}
                className="flex items-center gap-2 px-4 py-2 mt-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
            >
                <span className="text-lg leading-none">+</span> Add Work Experience
            </button>
        </form>
    );
}

// ==========================================
// 2. WorkExperienceItem (ตัวลูก: ช่องกรอก 1 งาน)
// ==========================================
type WorkItemProps = {
    data: WorkData;
    index: number;
    onDelete: () => void;
    onChange: (field: keyof WorkData, value: string | boolean | string[]) => void;
};

function WorkExperienceItem({ data, index, onDelete, onChange }: WorkItemProps) {
    
    // --- ฟังก์ชันจัดการ Bullet Points (Array ชั้นใน) ---
    const handleAddBullet = () => {
        const currentDesc = data.descriptions || [];
        onChange("descriptions", [...currentDesc, ""]);
    };

    const handleUpdateBullet = (bulletIndex: number, newValue: string) => {
        const currentDesc = [...(data.descriptions || [])];
        currentDesc[bulletIndex] = newValue;
        onChange("descriptions", currentDesc);
    };

    const handleDeleteBullet = (bulletIndex: number) => {
        const currentDesc = data.descriptions || [];
        onChange("descriptions", currentDesc.filter((_, i) => i !== bulletIndex));
    };
    // ----------------------------------------------

    return (
        <div className="mb-10 relative">
            {/* Header: Title & Delete Button */}
            <div className="flex items-center gap-3 mb-6">
                <h2 className="text-xl font-bold">Work Experience {index + 1}</h2>
                <button
                    type="button"
                    onClick={onDelete}
                    className="p-1.5 text-gray-500 hover:bg-gray-200 rounded-full transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    </svg>
                </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
                
                {/* Job Title */}
                <div className="col-span-2">
                    <InputBox
                        text="Job Title"
                        required
                        defaultValue={data.jobTitle}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange("jobTitle", e.target.value)}
                    />
                </div>

                {/* Company & Tip */}
                <div className="col-span-2">
                    <InputBox
                        text="Company"
                        required
                        defaultValue={data.company}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange("company", e.target.value)}
                    />
                </div>

                {/* Job Type & Location */}
                <div className="col-span-1">
                    <InputBox
                        text="Job Type"
                        defaultValue={data.jobType}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange("jobType", e.target.value)}
                    />
                </div>
                <div className="col-span-1">
                    <InputBox
                        text="Location"
                        defaultValue={data.location}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange("location", e.target.value)}
                    />
                </div>

                {/* Start & End Date */}
                <div className="col-span-1">
                    <InputBox
                        text="Start Date"
                        type="month"
                        defaultValue={data.startDate}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange("startDate", e.target.value)}
                    />
                </div>
                <div className="col-span-1 flex flex-col gap-3">
                    <InputBox
                        text="End Date"
                        type="month"
                        defaultValue={data.endDate}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange("endDate", e.target.value)}
                        disabled={data.isCurrent}
                    />
                    <label className="flex items-center gap-2 cursor-pointer mt-1">
                        <input
                            type="checkbox"
                            className="w-5 h-5 rounded text-emerald-400 focus:ring-emerald-400 accent-emerald-400"
                            checked={data.isCurrent || false}
                            onChange={(e) => {
                                onChange("isCurrent", e.target.checked);
                                if (e.target.checked) onChange("endDate", "");
                            }}
                        />
                        <span className="text-sm">I currently work here</span>
                    </label>
                </div>

                {/* Experience Summary */}
                <div className="col-span-2 mt-2">
                    <label className="text-sm font-bold text-gray-800 block mb-2">Experience Summary</label>
                    <div className="flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                        <input
                            type="text"
                            value={data.summary || ""}
                            onChange={(e) => onChange("summary", e.target.value)}
                            className="flex-1 bg-transparent focus:outline-none text-sm"
                        />
                        <button type="button" onClick={() => onChange("summary", "")} className="text-gray-400 hover:text-gray-600">✕</button>
                    </div>
                </div>

                {/* Job Description (Bullet Points) */}
                <div className="col-span-2 mt-2">
                    <label className="text-sm font-bold text-gray-800 block mb-2">Job Description</label>
                    
                    <div className="flex flex-col gap-2">
                        {(data.descriptions || []).map((desc, i) => (
                            <div key={i} className="flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                                <span className="mr-3 text-xl leading-none">•</span>
                                <input
                                    type="text"
                                    value={desc}
                                    onChange={(e) => handleUpdateBullet(i, e.target.value)}
                                    className="flex-1 bg-transparent focus:outline-none text-sm"
                                />
                                <button type="button" onClick={() => handleDeleteBullet(i)} className="text-gray-400 hover:text-gray-600 ml-2">✕</button>
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={handleAddBullet}
                        className="flex items-center gap-2 px-3 py-1.5 mt-3 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors w-fit"
                    >
                        <span className="text-lg leading-none">+</span> Bullet points
                    </button>
                </div>

            </div>
            <hr className="mt-10 mb-2 border-gray-200" />
        </div>
    );
}