"use client";

import ButtonMenu from "@/components/ui/ButtonMenu";
import Profile from "@/public/svgs/profile.svg";
import EducationDisplay from "./(ProfileSectionDisplay)/(Content)/EducationDisplay";
import PersonalInfoDisplay from "./(ProfileSectionDisplay)/(Content)/PersonalInfoDisplay";
import SkillsDisplay from "./(ProfileSectionDisplay)/(Content)/SkillsDisplay";
import WorkExperienceDisplay from "./(ProfileSectionDisplay)/(Content)/WorkExperienceDisplay";
import ProfileSectionWrapper from "./(ProfileSectionDisplay)/ProfileSectionWrapper";
const mockSkills = [
    "React",
    "Next.js",
    "Tailwind CSS",
    "TypeScript",
    "Figma",
    "Node.js",
];

export default function page() {
    // 💡 สร้างข้อมูลจำลองตรงนี้
    const mockUserData = {
        name: "Sasiporn Chatthongchai",
        address: "Bangkok, Thailand",
        mail: "sasiporn.c@example.com",
        phone: "098-XXX-XXXX",
        linkedin: "linkedin.com/in/sasiporn",
        github: "github.com/sasiporn-c",
    };

    const mockEducationData = [
        {
            id: 1,
            period: "2022-09 ↳ Present",
            institution: "King Mongkut's Institute of Technology Ladkrabang",
            degree: "Bachelor's degree in Computer Science", // ปรับจาก Master ตามที่คุณเรียนจริง
            gpax: "3.00",
        },
    ];

    interface WorkItem {
        id: number;
        period: string;
        company: string;
        position: string;
        summary?: string;
        descriptions?: string[];
    }

    const mockWorkData: WorkItem[] = [
        {
            id: 1,
            period: "2022-09 ↳ Present",
            company: "Google",
            position: "Frontend Developer",
            summary: "some summary from this work",
            descriptions: ["Job description", "Job description"],
        },
    ];

    return (
        <div className="flex items-start justify-center">
            <ButtonMenu text="Profile" icon={Profile}></ButtonMenu>
            <div className="flex flex-col">
                <div>
                    <h1 className=" text-heading-2">Profile</h1>
                </div>
                <ProfileSectionWrapper
                    title="Personal Information"
                    onEdit={() => alert("Edit Clicked!")}
                    isEmpty={false}
                >
                    <PersonalInfoDisplay Data={mockUserData} />
                </ProfileSectionWrapper>

                {/* Section 2: Education (เพิ่มเข้ามาใหม่) */}
                <ProfileSectionWrapper
                    title="Education"
                    onEdit={() => alert("Edit Education")}
                    isEmpty={mockEducationData.length === 0}
                >
                    <EducationDisplay data={mockEducationData} />
                </ProfileSectionWrapper>

                {/* Section 3: Work Experience (ใหม่!) */}
                <ProfileSectionWrapper
                    title="Work Experience"
                    onEdit={() => alert("Edit Work Experience")}
                    isEmpty={mockWorkData.length === 0}
                >
                    <WorkExperienceDisplay data={mockWorkData} />
                </ProfileSectionWrapper>

                {/* Section 4: Skills (ใหม่!) */}
                <ProfileSectionWrapper
                    title="Skills"
                    onEdit={() => alert("Edit Skills")}
                    isEmpty={mockSkills.length === 0}
                >
                    <SkillsDisplay skills={mockSkills} />
                </ProfileSectionWrapper>
            </div>
        </div>
    );
}
