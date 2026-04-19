"use client";

import { User } from "@/lib/api/endpoints/usersApi";
import { useEffect, useState } from "react";
import { AiAnalysisResults } from "./JobAppliedList.client";
import JobCard from "./JobCard";
import JobDetail from "./JobDetail";
import { getMyInfo } from "@/app/actions/auth";
import {
    createBookmarked,
    deleteBookmarked,
    getMyBookmarkedJobs,
} from "@/app/actions/job";

export interface JobCardData {
    id: string;
    title: string;
    description: string;
    salaryMin?: number;
    salaryMax?: number;
    currency?: string;
    isActive: boolean;
    workplaceType: string;
    postedAt: string;
    skillWeight?: number;
    educationWeight?: number;
    experienceWeight?: number;
    companyId: string;
    locationId?: string;
    employedTypeId?: string;
    experienceLevelId?: string;
    categoryId: string;
    company: {
        id: string;
        name: string;
        logoUrl?: string;
    };
    location?: {
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
    };
    skillRequirements: Array<{
        skill: {
            name: string;
        };
    }>;
    aiAnalysisResults?: AiAnalysisResults[];
}

export interface JobListClientProps {
    jobs: JobCardData[];
}

export default function JobsListClient({ jobs }: JobListClientProps) {
    const [jobsState, setJobsState] = useState<JobCardData[]>(jobs);
    const [selectedJob, setSelectedJob] = useState<JobCardData | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [userBookmarkedJobIds, setUserBookmarkedJobIds] = useState(
        new Set<string>(),
    );

    useEffect(() => {
        setJobsState(jobs);
    }, [jobs]);

    useEffect(() => {
        async function fetchData() {
            const user = await getMyInfo();
            setUser(user);
            if (user) {
                const bookmarkedJobIds = await getMyBookmarkedJobs();
                if (Array.isArray(bookmarkedJobIds)) {
                    setUserBookmarkedJobIds(new Set(bookmarkedJobIds));
                }
            }
        }

        fetchData();
    }, []);

    const sortedJobs = [...jobsState].sort((a, b) => {
        const aScore = a.aiAnalysisResults?.length
            ? a.aiAnalysisResults[0].aiScore
            : 0;
        const bScore = b.aiAnalysisResults?.length
            ? b.aiAnalysisResults[0].aiScore
            : 0;
        return bScore - aScore;
    });

    const handleAnalysisComplete = (
        jobId: string,
        analysis: AiAnalysisResults,
    ) => {
        setJobsState((prev) =>
            prev.map((j) =>
                j.id === jobId
                    ? { ...j, aiAnalysisResults: [analysis] }
                    : j,
            ),
        );
        setSelectedJob((prev) =>
            prev?.id === jobId
                ? { ...prev, aiAnalysisResults: [analysis] }
                : prev,
        );
    };

    const handleBookmarkToggle = async (jobId: string) => {
        const isBookmarked = userBookmarkedJobIds.has(jobId);

        setUserBookmarkedJobIds((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(jobId)) newSet.delete(jobId);
            else newSet.add(jobId);
            return newSet;
        });

        try {
            if (!isBookmarked) {
                const result = await createBookmarked(jobId);
                if (result.success) {
                    setUserBookmarkedJobIds((prev) => {
                        const newSet = new Set(prev);
                        newSet.add(jobId);
                        return newSet;
                    });
                }
            } else {
                const result = await deleteBookmarked(jobId);
                if (result.success) {
                    setUserBookmarkedJobIds((prev) => {
                        const newSet = new Set(prev);
                        newSet.delete(jobId);
                        return newSet;
                    });
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    return sortedJobs.length > 0 ? (
        <div className="jobs flex gap-4">
            <div className="jobs-list flex w-1/3 shrink-0 flex-col gap-4 self-start">
                {sortedJobs.map((job) => (
                    <JobCard
                        key={job.id}
                        jobData={job}
                        isSelected={selectedJob?.id === job.id}
                        onClick={() => setSelectedJob(job)}
                        showBookmark={user?.role === "APPLICANT"}
                        isBookmarked={userBookmarkedJobIds.has(job.id)}
                        onBookmarkClick={handleBookmarkToggle}
                    />
                ))}
            </div>
            <div className="jobs-detail flex min-h-0 w-2/3 min-w-0 flex-col self-stretch">
                <JobDetail
                    key={selectedJob?.id || "empty-job"}
                    job={selectedJob}
                    aiAnalysisResult={selectedJob?.aiAnalysisResults?.[0]}
                    userRole={user?.role}
                    onAnalysisComplete={handleAnalysisComplete}
                />
            </div>
        </div>
    ) : (
        <div>
            <p className="text-center">No jobs found</p>
        </div>
    );
}
