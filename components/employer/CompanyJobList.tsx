"use client";

import { JobCardData } from "@/components/shared/JobsList/JobsList.client";
import JobCard from "@/components/shared/JobsList/JobCard";
import { useRouter } from "next/navigation";

export default function CompanyJobList({
    jobsData,
}: {
    jobsData: JobCardData[];
}) {
    const router = useRouter();
    return (
        <div className="flex flex-col gap-3">
            <h1 className="text-heading-4 font-semibold">Jobs</h1>
            <div className="jobs flex flex-col gap-2">
                {jobsData && jobsData.length > 0 ? (
                    jobsData.map((job) => (
                        <div key={job.id} className="job w-3/4">
                            <JobCard
                                jobData={job}
                                showBookmark={false}
                                onClick={() => router.push(`/jobs/${job.id}`)}
                            />
                        </div>
                    ))
                ) : (
                    <p>No jobs found</p>
                )}
            </div>
        </div>
    );
}
