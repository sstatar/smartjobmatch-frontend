"use client";

import { useState } from "react";
import JobCard from "./JobCard";
import JobDetail from "./JobDetail";
import { AiAnalysisResults } from "./JobAppliedList.client";

export interface JobCardData {
    id: string;
    title: string;
    description: string;
    salaryMin: number | null;
    salaryMax: number | null;
    currency: string | null;
    isActive: boolean;
    workplaceType: string;
    postedAt: string;
    skillWeight: number;
    educationWeight: number;
    experienceWeight: number;
    companyId: string;
    locationId?: string;
    employedTypeId?: string;
    experienceLevelId?: string;
    categoryId: string;
    company: {
        id: string;
        name: string;
        logoUrl: string | null;
    };
    location?: {
        id: string;
        city?: string;
        province?: string;
        country: string;
    };
    employmentType?: {
        id: string;
        name: string;
    };
    experienceLevel?: {
        id: string;
        name: string;
    };
    category: {
        id: string;
        name: string;
        keywords: string[];
    };
    skillRequirements: Array<{
        jobPostId: string;
        skillId: string;
        skill: {
            id: string;
            name: string;
        };
    }>;
    aiAnalysisResults?: AiAnalysisResults[];
}

export default function JobsListClient({ jobs }: { jobs: JobCardData[] }) {
    const [selectedJob, setSelectedJob] = useState<JobCardData | null>(null);

    if (!jobs)
        return (
            <div>
                <p>Loading...</p>
            </div>
        );

    jobs.sort((a, b) => {
        const aScore = a.aiAnalysisResults?.length
            ? a.aiAnalysisResults[0].aiScore
            : 0;
        const bScore = b.aiAnalysisResults?.length
            ? b.aiAnalysisResults[0].aiScore
            : 0;
        return bScore - aScore;
    });

    return (
        <div className="jobs flex gap-4">
            <div className="jobs-list flex w-1/3 flex-col gap-4">
                {jobs.map((job) => (
                    <JobCard
                        key={job.id}
                        jobData={job}
                        isSelected={selectedJob?.id === job.id}
                        onClick={() => setSelectedJob(job)}
                    />
                ))}
            </div>

            <div className="jobs-detail w-2/3">
                <JobDetail
                    key={selectedJob?.id || "empty-job"}
                    job={selectedJob}
                    aiAnalysisResult={selectedJob?.aiAnalysisResults?.[0]}
                />
            </div>
        </div>
    );
}
