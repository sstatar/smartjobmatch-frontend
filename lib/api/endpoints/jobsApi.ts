import { api } from "../apiUtils";

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
        name: string;
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
    workplaceType: string;
    salaryMin?: number;
    salaryMax?: number;
    currency?: string;
    isActive: boolean;
    location?: {
        city?: string;
        province?: string;
        country: string;
    };
    employmentType: string;
    experienceLevel?: string;
    category: string;
    skillWeight: number;
    educationWeight: number;
    experienceWeight: number;
    skills: Array<string>;
    educationRequirements: [
        {
            degreeLevelCode: string;
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
