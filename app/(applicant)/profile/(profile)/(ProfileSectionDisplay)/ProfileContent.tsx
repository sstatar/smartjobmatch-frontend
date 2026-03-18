"use client";

import ProfileTabs from "./ProfileTabs";
import ProfileSectionWrapper from "./ProfileSectionWrapper";
import PersonalInfoDisplay from "./(Content)/PersonalInfoDisplay";
import EducationDisplay, { EducationProps } from "./(Content)/EducationDisplay";
import WorkExperienceDisplay from "./(Content)/WorkExperienceDisplay";
import SkillsDisplay from "./(Content)/SkillsDisplay";
import { useState } from "react";
import SidePanel from "../(formUser)/SidePanel";
import PersonalForm from "../(formUser)/(FromContent)/PersonalForm";
import EducationForm from "../(formUser)/(FromContent)/EducationForm";
import WorkExperienceForm from "../(formUser)/(FromContent)/(WorkExperienceForm)/WorkExperienceForm";
import SkillsForm from "../(formUser)/(FromContent)/SkillsForm";
import { WorkExperienceProps } from "./(Content)/WorkExperienceDisplay";
import { PersonalDataProps } from "./(Content)/PersonalInfoDisplay";

type ProfileContentProps = {
    personalData: PersonalDataProps; // ไม่ใช่ string[]
    educationData: EducationProps[]; // เป็น Array ของ Object
    workData: WorkExperienceProps[]; // เป็น Array ของ Object
    skills: string[]; // อันนี้เป็น string[] ถูกต้องแล้ว
};

export default function ProfileContent({
    personalData,
    educationData,
    workData,
    skills,
}: ProfileContentProps) {
    const [editingSection, setEditingSection] = useState<string | null>(null);

    const cleanNull = (value: string | null | undefined) => {
        // เช็คทั้งค่าที่เป็น null จริงๆ และ string ที่เขียนว่า "null"
        if (value === "null" || value === null || value === undefined) {
            return "";
        }
        return value;
    };

    return (
        <div className="flex flex-col bg-accent-2 p-6 rounded-xl overflow-hidden">
            <ProfileTabs />
            <div className="bg-secondary rounded-b-2xl overflow-y-auto flex-1 scroll-smooth">
                {/* Section 1: Personal Information */}
                <ProfileSectionWrapper
                    id="personal"
                    title="Personal"
                    onEdit={() => setEditingSection("personal")}
                >
                    <PersonalInfoDisplay data={personalData} />
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
                        initialData={{
                            firstName: cleanNull(personalData.firstName),
                            lastName: cleanNull(personalData.lastName),
                            phone: cleanNull(personalData.phone),
                            address: cleanNull(personalData.address),
                            linkedInUrl: cleanNull(personalData.linkedInUrl),
                            githubUrl: cleanNull(personalData.githubUrl),
                            // เพิ่มฟิลด์อื่นๆ ตามที่มีใน PersonalDataProps
                        }}
                        onSaveSuccess={() => setEditingSection(null)}
                    />
                )}
                {editingSection === "education" && (
                    <EducationForm
                        initialData={educationData.map((edu) => ({
                            id: edu.id.toString(),
                            schoolName: edu.university,
                            major: edu.fieldOfStudy,
                            degreeType: edu.degreeLevelName,
                            gpa: edu.gpa?.toString() || "",
                            startDate: `${edu.startYear}-${edu.startMonth}`,
                            endDate: edu.graduationYear
                                ? `${edu.graduationYear}-${edu.graduationMonth}`
                                : "",
                            isCurrent: !edu.graduationYear,
                        }))}
                        onSaveSuccess={() => setEditingSection(null)}
                    />
                )}
                {editingSection === "work" && (
                    <WorkExperienceForm
                        initialData={workData.map((work) => ({
                            id: work.id.toString(),
                            jobTitle: work.jobTitle,
                            companyName: work.companyName,
                            summary: work.summary,
                            descriptions: work.descriptions,
                            startDate: work.startYear
                                ? `${work.startYear}-${work.startMonth}`
                                : "",
                            endDate: work.endYear
                                ? `${work.endYear}-${work.endMonth}`
                                : "",
                            isCurrent: !work.endYear,
                        }))}
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
