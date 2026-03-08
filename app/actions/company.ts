"use server";

import { cookies } from "next/headers";
import { API_BASE_URL } from "@/lib/api-config";

export type AiAnalysisResult = {
    aiScore: number;
    summary: string;
    strengths: string;
    weaknesses: string;
    reasonForPoints: string;
    resumeUrlUsed: string;
    snapshottedEducation: string;
    snapshottedExperience: string;
    snapshottedSkills: string;
};

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
        id: string;
        city: string;
        province: string;
        country: string;
    };
    employmentType: {
        id: string;
        name: string;
    };
    category: {
        id: string;
        name: string;
        keywords: Array<string>;
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

export async function getMyCompany() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    try {
        const response = await fetch(`${API_BASE_URL}/companies/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            return { error: "failed to get your company data" };
        }

        const data: Company = await response.json();
        return { success: true, data }; // ส่งคืน data กลับไปให้ UI
    } catch (_) {
        return { error: "failed to get your company data" };
    }
}
