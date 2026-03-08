"use client";

import { useState } from "react";
import JobCard from "./JobCard";
import { JobCardData } from "./JobsList.client";
import JobDetail from "./JobDetail";

export type AiAnalysisResults = {
    id: string;
    aiScore: number;
    strengths: string[];
    weaknesses: string[];
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

    return (
        <div className="jobs flex gap-4">
            <div className="jobs-list flex w-1/3 flex-col gap-4">
                {sortedJobs.length > 0 ? (
                    sortedJobs.map((job) => (
                        <JobCard
                            key={job.id}
                            aiScore={job.aiAnalysisResult?.aiScore}
                            jobData={job.jobPost}
                            isSelected={selectedJob?.id === job.id}
                            onClick={() => setSelectedJob(job)}
                        />
                    ))
                ) : (
                    <p>No jobs found</p>
                )}
            </div>

            <div className="jobs-detail w-2/3">
                <JobDetail
                    key={selectedJob?.id || "empty-job"}
                    job={selectedJob?.jobPost ?? null}
                    isApplied={true}
                    aiAnalysisResult={selectedJob?.aiAnalysisResult}
                />
            </div>
        </div>
    );
}
