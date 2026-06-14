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
    const [selectedJob, setSelectedJob] = useState<JobCardData | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [userBookmarkedJobIds, setUserBookmarkedJobIds] = useState(
        new Set<string>(),
    );
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

    // เลื่อนลงไปแก้แค่ตรงส่วน return ด้านล่างสุดของไฟล์ JobListClient.tsx นะครับ

    // 💡 ... (โค้ดด้านบนเหมือนเดิม เลื่อนมาแก้แค่ตรง return)

    return jobs.length > 0 ? (
        <>
            {/* 💻 โครงสร้างหลัก: มือถือเรียงลง (flex-col) จอคอมเรียงซ้ายขวา (lg:flex-row) */}
            <div className="jobs flex flex-col lg:flex-row gap-4 w-full relative">
                
                {/* 👈 ฝั่งซ้าย: รายการการ์ดงาน */}
                <div className="jobs-list flex w-full lg:w-1/3 flex-col gap-4">
                    {jobs.map((job) => (
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

                {/* 👉 ฝั่งขวา (เฉพาะจอคอม): แสดงรายละเอียดงาน */}
                <div className="jobs-detail hidden lg:block w-full lg:w-2/3">
                    <JobDetail
                        key={selectedJob?.id || "empty-job"}
                        job={selectedJob}
                        aiAnalysisResult={selectedJob?.aiAnalysisResults?.[0]}
                        userRole={user?.role}
                    />
                </div>
            </div>

            {/* 📱 팝อัปสำหรับมือถือ: เด้งขึ้นมาเมื่อมีการกดเลือกงาน (selectedJob มีค่า) และจะซ่อนบนจอคอม (lg:hidden) */}
            {selectedJob && (
                <div className="fixed inset-0 z-[100] bg-white lg:hidden flex flex-col animate-in slide-in-from-bottom-5 duration-200">
                    
                    {/* 🔙 ปุ่ม Back ด้านบน */}
                    <div className="flex-none p-4 border-b border-gray-200 bg-white flex items-center shadow-sm z-10 sticky top-0">
                        <button 
                            onClick={() => setSelectedJob(null)}
                            className="flex items-center gap-2 text-accent font-semibold hover:bg-gray-100 p-2 rounded-lg transition-colors"
                        >
                            {/* SVG ลูกศรกลับ */}
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                            </svg>
                            Back to Jobs
                        </button>
                    </div>
                    
                    {/* 📝 เนื้อหารายละเอียดงาน */}
                    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                        <JobDetail
                            key={selectedJob.id}
                            job={selectedJob}
                            aiAnalysisResult={selectedJob.aiAnalysisResults?.[0]}
                            userRole={user?.role}
                        />
                    </div>
                </div>
            )}
        </>
    ) : (
        <div className="w-full flex justify-center py-10">
            <p className="text-gray-500 font-medium">No jobs found</p>
        </div>
    );
}
