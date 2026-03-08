"use server";

import { cookies } from "next/headers";
import { API_BASE_URL } from "@/lib/api-config";

export type CandidateResponseType = {
    id: string;
    user: {
        firstName: string;
        lastName: string;
        email: string;
        profilePictureUrl?: string;
        phone?: string;
    };
    aiAnalysisResults: {
        aiScore: number;
        strengths: string[];
        weaknesses: string[];
        summary: string;
        reasonForPoints: string[];
        resumeTextUsed: string;
        resumeUrlUsed: string;
        snapshottedEducation?: string;
        snapshottedExperience?: string;
        snapshottedSkills?: string;
    }[];
};

export async function getCandidateRecommendations(jobId: string) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    try {
        const response = await fetch(
            `${API_BASE_URL}/candidate-recommendations/${jobId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        const data = await response.json();

        if (!response.ok) {
            return {
                error: `failed to fetch candidate recommendations. (${data.message}) `,
            };
        }

        return { success: true, data }; // ส่งคืน data กลับไปให้ UI
    } catch (_) {
        return { error: "failed to fetch candidate recommendations." };
    }
}
