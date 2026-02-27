import React, { useState } from "react";
import InputBox from "@/components/ui/InputBox";

// เพิ่ม id เข้ามาใน Type เพื่อให้ React แยกแยะกล่องข้อมูลแต่ละอันได้เวลาลบหรือแก้ไข
export type EducationData = {
    id: string;
    schoolName?: string;
    major?: string;
    degreeType?: string;
    gpa?: string;
    startDate?: string;
    endDate?: string;
    isCurrent?: boolean;
};

type EducationFormProps = {
    initialData?: EducationData[]; // เปลี่ยนมารับเป็น Array แทน
    onSaveSuccess?: (data: EducationData[]) => void;
};

// ==========================================
// 1. EducationForm (ตัวคุมหลัก / ตัวแม่)
// ==========================================
export default function EducationForm({
    initialData,
    onSaveSuccess,
}: EducationFormProps) {
    // State สำหรับเก็บประวัติการศึกษาเป็น Array (ถ้าไม่มีข้อมูลเก่า ให้สร้าง 1 กล่องเปล่าๆ รอไว้)
    const [educations, setEducations] = useState<EducationData[]>(() => {
        return initialData && initialData.length > 0
            ? initialData
            : [
                  {
                      id: Date.now().toString(), // ใช้เวลาปัจจุบันสร้าง ID ไม่ซ้ำกัน
                      schoolName:
                          "King Mongkut's Institute of Technology Ladkrabang",
                      major: "Computer Science",
                      degreeType: "Master's degree",
                      gpa: "3.00",
                      startDate: "2022-09",
                      isCurrent: true,
                  },
              ];
    });

    // ฟังก์ชัน: เมื่อกดปุ่ม + Add Education
    const handleAdd = () => {
        setEducations([
            ...educations,
            {
                id: Date.now().toString(),
                schoolName: "",
                major: "",
                degreeType: "",
                gpa: "",
                startDate: "",
                endDate: "",
                isCurrent: false,
            },
        ]);
    };

    // ฟังก์ชัน: เมื่อกดปุ่มถังขยะ
    const handleDelete = (idToRemove: string) => {
        if (educations.length === 1) {
            alert("คุณต้องมีประวัติการศึกษาอย่างน้อย 1 รายการครับ");
            return;
        }
        setEducations(educations.filter((edu) => edu.id !== idToRemove));
    };

    // ฟังก์ชัน: เมื่อผู้ใช้พิมพ์ข้อมูลในช่องต่างๆ (รับค่าจากตัวลูกมาอัปเดต Array)
    const handleChange = (
        idToUpdate: string,
        field: keyof EducationData,
        value: string | boolean,
    ) => {
        // เพิ่ม (prevEducations) => เข้าไปข้างใน setEducations
        setEducations((prevEducations) =>
            prevEducations.map((edu) =>
                edu.id === idToUpdate ? { ...edu, [field]: value } : edu,
            ),
        );
    };

    // ฟังก์ชัน: เมื่อกดปุ่ม Update ที่ SidePanel
    const handleSaveAll = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("ข้อมูลทั้งหมดที่เตรียมส่งให้ API:", educations);
        alert("กำลังบันทึกข้อมูล Education ทั้งหมด...");
        if (onSaveSuccess) onSaveSuccess(educations);
    };

    return (
        <form
            id="side-panel-form"
            onSubmit={handleSaveAll}
            className="bg-secondary p-1"
        >
            {/* วนลูป (Map) สร้างกล่อง EducationItem ตามจำนวนใน Array */}
            {educations.map((edu, index) => (
                <EducationItem
                    key={edu.id}
                    data={edu}
                    index={index}
                    onDelete={() => handleDelete(edu.id)}
                    onChange={(field, value) =>
                        handleChange(edu.id, field, value)
                    }
                />
            ))}

            {/* ปุ่ม Add Education (ย้ายมาไว้ข้างล่างสุดของฟอร์มหลัก) */}
            <button
                type="button"
                onClick={handleAdd}
                className="flex items-center gap-2 px-4 py-2 mt-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
            >
                <span className="text-lg leading-none">+</span> Add Education
            </button>
        </form>
    );
}

// ==========================================
// 2. EducationItem (ตัว UI ช่องกรอก 1 รายการ / ตัวลูก)
// ==========================================
type EducationItemProps = {
    data: EducationData;
    index: number;
    onDelete: () => void;
    onChange: (field: keyof EducationData, value: string | boolean) => void;
};

// สังเกตว่าเราไม่ได้ export ตรงนี้นะครับ ให้มันใช้แค่ในไฟล์นี้ก็พอ
function EducationItem({
    data,
    index,
    onDelete,
    onChange,
}: EducationItemProps) {
    return (
        <div className="mb-8 relative">
            {/* Header: Title & Delete Button */}
            <div className="flex items-center gap-3 mb-6">
                <h2 className="text-xl font-bold">Education {index + 1}</h2>
                <button
                    type="button"
                    onClick={onDelete}
                    className="p-1.5 text-gray-500 hover:bg-gray-200 rounded-full transition-colors"
                    title="Delete Education"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    </svg>
                </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
                {/* School Name */}
                <div className="col-span-2">
                    <InputBox
                        text="School Name"
                        required
                        value={data.schoolName || ""}
                        onChange={(e) => onChange("schoolName", e.target.value)}
                    />
                </div>

                {/* Major */}
                <div className="col-span-1">
                    <InputBox
                        text="Major"
                        required
                        value={data.major || ""}
                        onChange={(e) => onChange("major", e.target.value)}
                    />
                </div>

                {/* Degree Type & GPA (ที่แก้เรื่องล้นกล่องแล้ว) */}
                <div className="col-span-1 flex gap-4">
                    <div className="flex-1 min-w-0">
                        <InputBox
                            text="Degree Type"
                            required
                            value={data.degreeType || ""}
                            onChange={(e) =>
                                onChange("degreeType", e.target.value)
                            }
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <InputBox
                            text="GPA"
                            value={data.gpa || ""}
                            onChange={(e) => onChange("gpa", e.target.value)}
                        />
                    </div>
                </div>

                {/* Start Date */}
                <div className="col-span-1">
                    <InputBox
                        text="Start Date"
                        type="month"
                        value={data.startDate || ""}
                        onChange={(e) => onChange("startDate", e.target.value)}
                    />
                </div>

                {/* End Date & Checkbox */}
                <div className="col-span-1 flex flex-col gap-3">
                    <InputBox
                        text="End Date"
                        type="month"
                        value={data.endDate || ""}
                        onChange={(e) => onChange("endDate", e.target.value)}
                        disabled={data.isCurrent} // ถ้าติ๊กช่องกำลังศึกษา ให้ปิดไม่ให้พิมพ์
                    />

                    <label className="flex items-center gap-2 cursor-pointer mt-1">
                        <input
                            type="checkbox"
                            className="w-5 h-5 rounded text-emerald-400 focus:ring-emerald-400 accent-emerald-400"
                            checked={data.isCurrent || false}
                            onChange={(e) => {
                                onChange("isCurrent", e.target.checked);
                                // ถ้าเลือกเรียนอยู่ ให้เคลียร์ช่อง End Date ทิ้ง
                                if (e.target.checked) onChange("endDate", "");
                            }}
                        />
                        <span className="text-sm">I currently study here</span>
                    </label>
                </div>
            </div>

            {/* เส้นคั่นระหว่างฟอร์มแต่ละอัน */}
            <hr className="mt-8 mb-4 border-gray-200" />
        </div>
    );
}
