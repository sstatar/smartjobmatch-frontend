"use client";

import { useState } from "react";
import JobCard from "./JobCard";
import { JobCardData } from "./JobsList.client";
import JobDetail from "./JobDetail";

export type AnalysisResult = {
    score: number;
    reason: string;
};

export type AiAnalysisResults = {
    id: string;
    aiScore: number;
    strengths: string[];
    weaknesses: string[];
    skillsAnalysis: AnalysisResult;
    experienceAnalysis: AnalysisResult;
    educationAnalysis: AnalysisResult;
    summary: string;
};

export type ApplyJobsData = {
    id: string;
    status: string;
    appliedAt: string;
    jobPost: JobCardData;
    aiAnalysisResult: AiAnalysisResults;
};

export default function JobsAppliedListClient({
    jobs,
}: {
    jobs: ApplyJobsData[];
}) {
    const [selectedJob, setSelectedJob] = useState<ApplyJobsData | null>(null);

    const sortedJobs = Array.isArray(jobs)
        ? jobs.sort((a, b) => {
              return b.aiAnalysisResult.aiScore - a.aiAnalysisResult.aiScore;
          })
        : [];

    return sortedJobs.length > 0 ? (
        <>
            <div className="jobs flex gap-4">
                <div className="jobs-list flex w-1/3 shrink-0 flex-col gap-4 self-start">
                    {sortedJobs.map((job) => (
                        <JobCard
                            key={job.id}
                            aiScore={job.aiAnalysisResult?.aiScore}
                            jobData={job.jobPost}
                            isSelected={selectedJob?.id === job.id}
                            onClick={() => setSelectedJob(job)}
                            showBookmark={false}
                        />
                    ))}
                </div>
                <div className="jobs-detail flex min-h-0 w-2/3 min-w-0 flex-col self-stretch">
                    <JobDetail
                        key={selectedJob?.id || "empty-job"}
                        job={selectedJob?.jobPost ?? null}
                        isApplied={true}
                        aiAnalysisResult={selectedJob?.aiAnalysisResult}
                    />
                </div>
            </div>
        </>
    ) : (
        <p className="text-center">No jobs found</p>
    );
}
