// Components/(formUser)/(FromContent)/WorkExperienceForm.tsx
"use client";
import React, { useState } from "react";
import WorkExperienceItem from "./WorkExperienceItem";
import { updateWorkExperienceAction } from "../../../service/profileAction";
import { UpdateWorkExperienceRequest } from "../../../service/type";

export type WorkData = {
    id: string;
    jobTitle?: string;
    companyName?: string;
    startDate?: string;
    endDate?: string;
    isCurrent?: boolean;
    summary?: string;
    descriptions?: string[]; // 💡 ยึดตัวแปรที่มี (s) ตัวนี้เป็นหลักนะครับ
};

type WorkFormProps = {
    initialData?: WorkData[];
    onSaveSuccess?: () => void;
};

export default function WorkExperienceForm({
    initialData,
    onSaveSuccess,
}: WorkFormProps) {
    // State สำหรับเก็บประสบการณ์ทำงานเป็น Array
    const [works, setWorks] = useState<WorkData[]>(() => {
        if (initialData && initialData.length > 0) {
            return initialData.map((w) => ({
                ...w,
                // 💡 จุดแก้ไขที่ 1: แก้จาก description เป็น descriptions (เติม s) เพื่อให้ตรงกับ Type ด้านบนครับ
                descriptions:
                    w.descriptions && w.descriptions.length > 0
                        ? w.descriptions
                        : [""],
            }));
        }
        // 💡 จุดแก้ไขที่ 2: แก้ตรงค่าเริ่มต้นตอนไม่มีข้อมูลให้เติม s เช่นเดียวกันครับ
        return [{ id: Date.now().toString(), descriptions: [""] }];
    });

    const handleAdd = () =>
        setWorks([...works, { id: Date.now().toString(), descriptions: [""] }]);

    const handleDelete = (id: string) => {
        if (works.length === 1) return alert("ต้องมีอย่างน้อย 1 รายการ");
        setWorks(works.filter((w) => w.id !== id));
    };

    const handleChange = (
        id: string,
        field: keyof WorkData,
        value: string | boolean | string[],
    ) => {
        setWorks((prev) =>
            prev.map((w) => (w.id === id ? { ...w, [field]: value } : w)),
        );
    };

    const handleSaveAll = async (e: React.FormEvent) => {
        e.preventDefault();

        const mappedWorks = works.map((work) => {
            const cleanedDescription = (work.descriptions || []).filter(
                (desc) => desc.trim() !== "",
            );

            const formatDate = (dateStr: string) => {
                if (!dateStr) return "";
                return `${dateStr}-01`;
            };

            return {
                jobTitle: work.jobTitle || "",
                companyName: work.companyName || "",
                summary: work.summary || "",
                descriptions: cleanedDescription,
                startDate: work.startDate ? formatDate(work.startDate) : "",
                endDate: work.isCurrent
                    ? ""
                    : work.endDate
                      ? formatDate(work.endDate)
                      : "",
                isCurrent: work.isCurrent || false,
            };
        });

        const payload: UpdateWorkExperienceRequest = {
            experiences: mappedWorks,
        };

        console.log("Payload to Backend:", payload);

        const result = await updateWorkExperienceAction(payload);

        if (result.success) {
            alert("บันทึกประสบการณ์ทำงานสำเร็จ!");
            if (onSaveSuccess) onSaveSuccess();
        } else {
            alert(result.error || "เกิดข้อผิดพลาดในการบันทึก");
        }
    };

    return (
        <form
            id="side-panel-form"
            onSubmit={handleSaveAll}
            // 💡 ปรับ Padding บนจอมือถือจาก p-1 เป็น p-0 md:p-1 ให้เนียนรับกับขอบกล่อง SidePanel ตัวแม่ครับ
            className="bg-secondary p-0 md:p-1"
        >
            {works.map((work, index) => (
                <WorkExperienceItem
                    key={work.id}
                    data={work}
                    index={index}
                    onDelete={() => handleDelete(work.id)}
                    onChange={(field, val) => handleChange(work.id, field, val)}
                />
            ))}

            <button
                type="button"
                onClick={handleAdd}
                className="flex items-center gap-2 px-4 py-2 mt-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
            >
                {/* 💡 จุดแก้ไขที่ 3: เปลี่ยนข้อความปุ่มให้ถูกต้องตรงกับบริบทฟอร์มงาน */}
                <span className="text-lg leading-none">+</span> Add Work
                Experience
            </button>
        </form>
    );
}
