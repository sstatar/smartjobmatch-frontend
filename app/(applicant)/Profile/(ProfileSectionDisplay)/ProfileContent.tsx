"use client";

import ProfileTabs from "./ProfileTabs";
import ProfileSectionWrapper from "./ProfileSectionWrapper";
import PersonalInfoDisplay from "./(Content)/PersonalInfoDisplay";
import EducationDisplay from "./(Content)/EducationDisplay";
import WorkExperienceDisplay from "./(Content)/WorkExperienceDisplay";
import SkillsDisplay from "./(Content)/SkillsDisplay";
import { useState } from "react";
import SidePanel from "../(formUser)/SidePanel";
import PersonalForm from "../(formUser)/(FromContent)/PersonalForm";
import EducationForm from "../(formUser)/(FromContent)/EducationForm";
import WorkExperienceForm from "../(formUser)/(FromContent)/WorkExperienceForm";
import SkillsForm from "../(formUser)/(FromContent)/SkillsForm";

interface UserData {
    name: string;
    address?: string;
    mail?: string;
    phone?: string;
    linkedin?: string;
    github?: string;
}

interface EducationItem {
    id: number;
    period: string;
    institution: string;
    degree: string;
    gpax?: string;
}

interface WorkItem {
    id: number;
    period: string;
    company: string;
    position: string;
    summary?: string;
    descriptions?: string[];
}

// 2. ปรับ ProfileContentProps ให้ใช้ Interface ที่เราสร้างขึ้น
type ProfileContentProps = {
    userData: UserData; // ไม่ใช่ string[]
    educationData: EducationItem[]; // เป็น Array ของ Object
    workData: WorkItem[]; // เป็น Array ของ Object
    skills: string[]; // อันนี้เป็น string[] ถูกต้องแล้ว
};

export default function ProfileContent({
    userData,
    educationData,
    workData,
    skills,
}: ProfileContentProps) {
    const [editingSection, setEditingSection] = useState<string | null>(null);

    const handleEdit = (section: string) => {
        alert(`Editing ${section}`);
    };

    return (
        <div className="flex flex-col bg-accent-2 p-6 rounded-xl overflow-hidden">
            <ProfileTabs />
            <div className="bg-secondary rounded-b-2xl overflow-y-auto flex-1 scroll-smooth">
                <ProfileSectionWrapper
                    id="personal"
                    title="Personal Information"
                    onEdit={() => setEditingSection("personal")}
                >
                    <PersonalInfoDisplay Data={userData} />
                </ProfileSectionWrapper>
                {/* Section 2: Education (เพิ่มเข้ามาใหม่) */}
                <ProfileSectionWrapper
                    id="education"
                    title="Education"
                    onEdit={() => setEditingSection("education")}
                    isEmpty={educationData.length === 0}
                >
                    <EducationDisplay data={educationData} />
                </ProfileSectionWrapper>

                {/* Section 3: Work Experience (ใหม่!) */}
                <ProfileSectionWrapper
                    id="work"
                    title="Work Experience"
                    onEdit={() => setEditingSection("work")}
                    isEmpty={workData.length === 0}
                >
                    <WorkExperienceDisplay data={workData} />
                </ProfileSectionWrapper>

                {/* Section 4: Skills (ใหม่!) */}
                <ProfileSectionWrapper
                    id="skills"
                    title="Skills"
                    onEdit={() => setEditingSection("skills")}
                    isEmpty={skills.length === 0}
                >
                    <SkillsDisplay skills={skills} />
                </ProfileSectionWrapper>
            </div>

            <SidePanel
                // เปิดเมื่อ State ไม่ใช่ null
                isOpen={editingSection !== null}
                // ปิดโดยการเซ็ตค่ากลับเป็น null
                onClose={() => setEditingSection(null)}
                // เปลี่ยนหัวข้อตาม State
                title={`Edit ${editingSection}`}
            >
                {/* 💡 4. เลือกว่าจะโชว์ Form ไหน ขึ้นอยู่กับ State ปัจจุบัน */}
                {editingSection === "personal" && (
                    <PersonalForm
                        onSaveSuccess={() => setEditingSection(null)}
                    />
                )}
                {editingSection === "education" && (
                    <EducationForm
                        onSaveSuccess={() => setEditingSection(null)}
                    />
                )}
                {editingSection === "work" && (
                    <WorkExperienceForm
                        onSaveSuccess={() => setEditingSection(null)}
                    />
                )}

                {editingSection === "skills" && (
                    <SkillsForm
                        initialData={skills}
                        onSaveSuccess={() => setEditingSection(null)}
                    />
                )}
            </SidePanel>
        </div>
    );
}
