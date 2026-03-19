import React, { useState } from "react";
import { updateSkillsAction } from "../../service/profileAction";
type SkillsFormProps = {
    initialData?: string[];
    onSaveSuccess?: (data: string[]) => void;
};

export default function SkillsForm({
    initialData = [],
    onSaveSuccess,
}: SkillsFormProps) {
    // State สำหรับเก็บรายการ Skills
    const [skills, setSkills] = useState<string[]>(initialData);

    // State สำหรับเก็บข้อความที่กำลังพิมพ์ในช่อง Add skill...
    const [inputValue, setInputValue] = useState("");

    // 💡 ฟังก์ชันจัดการการกดปุ่มบนคีย์บอร์ด
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // ถ้าปุ่มที่กดคือ "Enter"
        if (e.key === "Enter") {
            e.preventDefault(); // 🛑 ห้ามรันพฤติกรรมดั้งเดิม (ห้าม Submit ฟอร์ม!)

            const newSkill = inputValue.trim(); // ตัด Spacebar หน้า-หลังทิ้ง

            // เช็คว่าไม่ได้พิมพ์ค่าว่าง และ ทักษะนั้นยังไม่มีใน Array
            if (newSkill !== "" && !skills.includes(newSkill)) {
                setSkills([...skills, newSkill]); // เพิ่ม Skill ใหม่เข้าไปใน Array
                setInputValue(""); // เคลียร์ช่องพิมพ์ให้ว่างเพื่อรอรับคำถัดไป
            }
        }
    };

    const handleRemove = (skillToRemove: string) => {
        // กรองเอาตัวที่ชื่อตรงกับที่กด ✕ ออกไป
        setSkills(skills.filter((skill) => skill !== skillToRemove));
    };

    const handleSaveAll = async (e: React.FormEvent) => {
        e.preventDefault();

        // เตรียม Payload ตามที่ Backend ต้องการ { skills: [...] }
        const payload = {
            skills: skills,
        };

        console.log("Payload to Backend:", payload);

        const result = await updateSkillsAction(payload);

        if (result.success) {
            alert("บันทึกทักษะสำเร็จ!");
            if (onSaveSuccess) onSaveSuccess(skills); // ปิด SidePanel
        } else {
            alert(result.error || "เกิดข้อผิดพลาดในการบันทึก");
        }
    };

    return (
        <form
            id="side-panel-form"
            onSubmit={handleSaveAll}
            className="bg-secondary p-5"
        >
            <div className="flex flex-wrap gap-3">
                {/* 1. วนลูปแสดง Skills ที่มีอยู่เป็น Tag (เช่น React, Next.js, Tailwind) */}
                {skills.map((skill, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl text-sm font-medium text-gray-800"
                    >
                        {skill}
                        <button
                            type="button"
                            onClick={() => handleRemove(skill)}
                            className="text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                        >
                            ✕
                        </button>
                    </div>
                ))}

                {/* 2. ช่องพิมพ์สำหรับเพิ่ม Skill ใหม่ */}
                <div className="flex items-center bg-gray-50 px-4 py-2 rounded-xl min-w-[150px] border border-gray-100 focus-within:border-emerald-400 transition-colors">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown} // ผูกฟังก์ชันดักจับปุ่ม Enter ไว้ที่นี่
                        placeholder="Add skill..."
                        className="bg-transparent focus:outline-none text-sm w-full placeholder:text-gray-400"
                    />
                </div>
            </div>

            {/* คำใบ้บอกผู้ใช้ว่าต้องกดอะไร */}
            <p className="text-xs text-gray-400 mt-6 flex items-center gap-1.5">
                <span className="bg-accent text-secondary rounded-md px-1.5 py-0.5 font-mono text-[10px]">
                    Enter
                </span>
                Type a skill and press Enter to add
            </p>
        </form>
    );
}
