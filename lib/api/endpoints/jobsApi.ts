import { api } from "../apiUtils";

export type WorkplaceType = "ON_SITE" | "HYBRID" | "REMOTE";
export type EmploymentType = "Full-time" | "Part-time" | "Contract";
export type Currency = "THB" | "USD";
export enum DegreeLevelCode {
    BACHELOR = "Bachelor's Degree",
    MASTER = "Master's Degree",
    DOCTORATE = "Doctoral Degree",
    PRIMARY = "Primary Education Level",
    SECONDARY = "Secondary Education Level",
}

export interface Job extends Omit<
    CreateJobDto,
    "employmentType" | "experienceLevel" | "category" | "skills"
> {
    id: string;
    postedAt: string;
    company: {
        id: string;
        name: string;
        logoUrl?: string;
    };
    employmentType: {
        name: "Full-time" | "Part-time" | "Contract";
    };
    experienceLevel: {
        name: string;
    };
    category: {
        name: string;
    };
    skillRequirements: {
        skill: {
            name: string;
        };
    }[];
    isOwner: boolean;
}

export interface CreateJobDto {
    title: string;
    description: string;
    workplaceType: WorkplaceType;
    salaryMin?: number;
    salaryMax?: number;
    currency?: Currency;
    isActive: boolean;
    location?: {
        city?: string;
        province?: string;
        country: string;
    };
    employmentType: EmploymentType;
    experienceLevel?: string;
    category: string;
    skillWeight: number;
    educationWeight: number;
    experienceWeight: number;
    skills: Array<string>;
    educationRequirements: [
        {
            degreeLevelCode: keyof typeof DegreeLevelCode;
            fieldOfStudy?: string;
            isOptional: boolean;
        },
    ];
}

export const jobsApi = {
    getJobs: () => api.get<Job[]>("/job-posts"),

    getJob: (id: string) => api.get<Job>(`/job-posts/${id}`),

    createJob: (data: CreateJobDto) =>
        api.post<Job, CreateJobDto>("/job-posts", data),

    updateJob: (id: string, data: Partial<CreateJobDto>) =>
        api.patch<Job, Partial<CreateJobDto>>(`/job-posts/${id}`, data),

    deleteJob: (id: string) => api.delete<void>(`/job-posts/${id}`),
};
