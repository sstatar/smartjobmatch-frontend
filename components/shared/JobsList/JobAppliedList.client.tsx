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

    return sortedJobs.length > 0 ? (
        <>
            {/* 💻 โครงสร้างหลัก: มือถือเรียงลง (flex-col) จอคอมเรียงซ้ายขวา (lg:flex-row) */}
            <div className="jobs flex flex-col lg:flex-row gap-4 w-full relative">
                {/* 👈 ฝั่งซ้าย: รายการการ์ดงานที่สมัครไปแล้ว */}
                <div className="jobs-list flex w-full lg:w-1/3 flex-col gap-4">
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

                {/* 👉 ฝั่งขวา (เฉพาะจอคอม): แสดงรายละเอียดงาน */}
                <div className="jobs-detail hidden lg:block w-full lg:w-2/3">
                    <JobDetail
                        key={selectedJob?.id || "empty-job"}
                        job={selectedJob?.jobPost ?? null}
                        isApplied={true}
                        aiAnalysisResult={selectedJob?.aiAnalysisResult}
                    />
                </div>
            </div>

            {/* 📱 ป๊อปอัปสำหรับมือถือ: เด้งขึ้นมาเมื่อมีการกดเลือกงาน (selectedJob มีค่า) */}
            {selectedJob && (
                <div className="fixed inset-0 z-[100] bg-white lg:hidden flex flex-col animate-in slide-in-from-bottom-5 duration-200">
                    {/* 🔙 ปุ่ม Back ด้านบน */}
                    <div className="flex-none p-4 border-b border-gray-200 bg-white flex items-center shadow-sm z-10 sticky top-0">
                        <button
                            onClick={() => setSelectedJob(null)}
                            className="flex items-center gap-2 text-accent font-semibold hover:bg-gray-100 p-2 rounded-lg transition-colors"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 19l-7-7 7-7"
                                ></path>
                            </svg>
                            Back to Applied Jobs
                        </button>
                    </div>

                    {/* 📝 เนื้อหารายละเอียดงาน */}
                    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                        <JobDetail
                            key={selectedJob.id}
                            job={selectedJob.jobPost}
                            isApplied={true}
                            aiAnalysisResult={selectedJob.aiAnalysisResult}
                        />
                    </div>
                </div>
            )}
        </>
    ) : (
        // 💡 แสดงข้อความเมื่อยังไม่มีงานที่สมัคร
        <div className="w-full flex justify-center py-10">
            <p className="text-gray-500 font-medium">No applied jobs found</p>
        </div>
    );
}
