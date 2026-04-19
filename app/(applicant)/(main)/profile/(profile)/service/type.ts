// app/profile/service/type.ts

// นี่คือหน้าตาที่ Backend (API จริง) ของคุณต้องการ
export interface EducationEntry {
    university: string;
    degreeLevelCode: string; // เช่น "BACHELOR", "MASTER"
    fieldOfStudy: string;
    startMonth: string; // เช่น "JANUARY"
    startYear: number; // เป็นตัวเลข 2020
    graduationMonth: string | null;
    graduationYear: number | null;
    degreeName?: string;
    gpa: number;
    isCurrent: boolean;
}

export interface UpdateEducationRequest {
    educations: EducationEntry[];
}

export interface WorkExperienceEntry {
    jobTitle: string;
    companyName: string;
    summary: string;
    descriptions: string[]; // Backend รอรับเป็น Array ของ string
    startDate: string; // ส่งเป็น ISO String ตามที่คุณทำไว้
    endDate: string | null;
    isCurrent: boolean;
}

export interface UpdateWorkExperienceRequest {
    experiences: WorkExperienceEntry[]; // ตรวจสอบชื่อ Key กับ Backend อีกทีนะครับ (เช่น workExperiences หรือ experiences)
}

export interface UpdateSkillsRequest {
    skills: string[]; // ส่งเป็น Array ของ string ตามที่ Backend ต้องการ
}

export interface UpdatePersonalRequest {
    firstName: string;
    lastName: string;
    phone?: string;
    linkedInUrl?: string;
    githubUrl?: string;
    // address?: string; // เพิ่มถ้า Backend ต้องการ
}

// type ในการดึงข้อมูล
export interface PersonalResponse {
    firstName: string;
    lastName: string;
    address?: string;
    email: string;
    phone: string;
    linkedin?: string;
    github?: string;
}

export interface WorkExperienceResponse {
    id: number;
    jobTitle: string;
    companyName: string;
    summary: string;
    descriptions: string[];
    startDate: string;
    endDate: string;
    isCurrent: boolean;
}

export interface EducationResponse {
    id: number;
    startMonth: string;
    startYear: string;
    graduationMonth: string;
    graduationYear: string;
    university: string;
    degreeLevel: {
        id: string;
        name: string;
    };
    fieldOfStudy: string;
    gpa?: string;
    isCurrent: boolean;
}

export interface SkillResponse {
    skill: {
        name: string;
    };
}
