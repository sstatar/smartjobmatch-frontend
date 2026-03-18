import { api } from "../apiUtils";

export type AiAnalysisResult = {
    aiScore: number;
    strengths: string[];
    weaknesses: string[];
    reasonForPoints: ReasonForPoint[];
    summary: string;
    resumeUrlUsed: string;
    snapshottedEducation: string;
    snapshottedExperience: string;
    snapshottedSkills: string[];
};

export interface ReasonForPoint {
    reason: string;
    pointValue: number;
}

export type JobPost = {
    id: string;
    title: string;
    description: string;
    salaryMin?: number;
    salaryMax?: number;
    currency?: string;
    isActive: boolean;
    workplaceType: string;
    postedAt: string;
    location: {
        city?: string;
        province?: string;
        country: string;
    };
    employmentType: {
        id: string;
        name: string;
    };
    category: {
        id: string;
        name: string;
    };
    applications: Array<{
        id: string;
        status: string;
        profileId: string;
        profile: {
            user: {
                firstName: string;
                lastName: string;
                email: string;
                phone: string;
                profilePictureUrl?: string;
            };
        };
        appliedAt: string;
        aiAnalysisResult: AiAnalysisResult;
    }>;
};

export type Company = {
    id: string;
    name: string;
    description?: string;
    website?: string;
    logoUrl?: string;
    industry?: string;
    createdAt: string;
    updatedAt: string;
    jobPosts: JobPost[];
};

export interface CreateCompanyDto {
    name: string;
    description?: string;
    website?: string;
    logoUrl?: string;
    industry?: string;
}

export const companiesApi = {
    getMyCompany: async () => api.get<Company>("/companies/me"),

    createCompany: async (data: CreateCompanyDto) =>
        api.post<Company>("/companies", data),

    updateCompany: async (data: CreateCompanyDto) =>
        api.patch<Company>("/companies/me", data),

    deleteCompany: async () => api.delete<void>("/companies/me"),
};
