// Components/(formUser)/(FromContent)/WorkExperienceForm.tsx
import React, { useState } from "react";
import WorkExperienceItem from "./WorkExperienceItem";
import { updateWorkExperienceAction } from "../../../service/profileAction";
import { UpdateWorkExperienceRequest } from "../../../service/type";
// import { updateWorkExperienceAction } from "../../service/profileAction"; // สมมติว่ามี Action นี้

export type WorkData = {
    id: string;
    jobTitle?: string;
    companyName?: string;
    startDate?: string;
    endDate?: string;
    isCurrent?: boolean;
    summary?: string;
    descriptions?: string[];
};

type WorkFormProps = {
    initialData?: WorkData[];
    onSaveSuccess?: () => void;
};

export default function WorkExperienceForm({
    initialData,
    onSaveSuccess,
}: WorkFormProps) {
    const [works, setWorks] = useState<WorkData[]>(() => {
        if (initialData && initialData.length > 0) {
            return initialData.map((w) => ({
                ...w,
                // 💡 มั่นใจว่า description มีอย่างน้อย 1 ช่องว่างถ้าไม่มีข้อมูลมา
                description:
                    w.descriptions && w.descriptions.length > 0
                        ? w.descriptions
                        : [""],
            }));
        }
        return [{ id: Date.now().toString(), description: [""] }];
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
        e.preventDefault(); // อย่าลืมใส่ e.preventDefault() ป้องกันหน้า Refresh

        const mappedWorks = works.map((work) => {
            // กรอง Bullet points
            const cleanedDescription = (work.descriptions || []).filter(
                (desc) => desc.trim() !== "",
            );

            const formatDate = (dateStr: string) => {
                if (!dateStr) return "";
                // ถ้าส่งมาเป็น YYYY-MM ให้เติม -01 ต่อท้ายให้เป็นวันแรกของเดือน
                return `${dateStr}-01`;
            };

            return {
                jobTitle: work.jobTitle || "",
                companyName: work.companyName || "",
                summary: work.summary || "",
                descriptions: cleanedDescription, // ส่งชื่อ field ตามที่ Backend ต้องการ (description)
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
            experiences: mappedWorks, // ห่อใส่ object ตาม type
        };

        console.log("Payload to Backend:", payload);

        // 2. เรียกใช้ Action
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
            className="bg-secondary p-1"
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
                <span className="text-lg leading-none">+</span> Add Education
            </button>
        </form>
    );
}
