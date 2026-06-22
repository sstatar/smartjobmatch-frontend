"use client";

import CandidateCard from "@/components/employer/CandidateCard";
import JobDetailCard from "@/components/shared/JobDetailCard";
import JobCard from "@/components/employer/JobCard";
import CandidateModal from "@/components/employer/CandidateModal";
import Button from "@/components/ui/Button-2";
import { AiAnalysisResult, JobPost } from "@/lib/api/endpoints/companiesApi";
import Link from "next/link";
import { useState } from "react";

export interface Candidate {
    id: string;
    status: string;
    profileId: string;
    profile: {
        user: {
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
            profilePictureUrl?: string | undefined;
        };
    };
    appliedAt: string;
    aiAnalysisResult: AiAnalysisResult;
}

export interface JobPostDetailProps {
    job: JobPost & {
        company: {
            id: string;
            name: string;
            logoUrl?: string;
        };
        experienceLevel: {
            id: string;
            name: string;
        };
        skillRequirements: {
            skill: {
                name: string;
            };
        }[];
    };
    candidates: Candidate[];
    isOwner?: boolean;
}

export default function JobPostDetail({
    job,
    candidates,
    isOwner = false,
}: JobPostDetailProps) {
    const [selectedCandidate, setSelectedCandidate] =
        useState<Candidate | null>(null);
    return (
        // 1. ปรับ margin ซ้ายขวาให้หดเล็กลงบนมือถือ (mx-4) และขยายกลับเป็น mx-20 บนจอใหญ่
        <div className="mb-10 mx-4 md:mx-10 lg:mx-15 flex flex-col gap-8 md:gap-12">
            {/* 2. เปลี่ยนให้เรียงบน-ล่าง (flex-col) บนมือถือ และเรียงซ้าย-ขวา (lg:flex-row) บนจอใหญ่ */}
            <section
                id="job-description"
                className="flex flex-col lg:flex-row gap-6 md:gap-8"
            >
                {/* 3. ปรับให้กางเต็ม 100% บนมือถือ (w-full) และหดเหลือ 1/3 บนจอใหญ่ */}
                <div className="banner w-full lg:w-1/3 flex flex-col gap-6 items-start lg:sticky lg:top-8 self-start">
                    {/* 💡 พี่แอบแถม lg:sticky ให้ด้วยครับ เผื่อเวลาเลื่อนอ่านเนื้อหางานยาวๆ การ์ดฝั่งซ้ายจะได้เกาะติดหน้าจอตามลงมา! */}
                    <JobCard
                        jobData={{
                            ...job,
                            companyId: job.company.id,
                            categoryId: job.category.id,
                        }}
                        showBookmark={false}
                        isOwner={isOwner}
                    />

                    {/* TODO: add loading screen while finding candidates*/}
                    {isOwner && (
                        <Link
                            href={`/jobs/${job.id}/candidates`}
                            className="w-full px-10 md:px-35 lg:px-0"
                        >
                            {/* บังคับปุ่มให้กว้างเต็มกล่อง (w-full) เพื่อให้ผู้ใช้กดง่ายๆ บนมือถือ */}
                            <Button
                                variant="secondary"
                                className="w-full justify-center px-4 whitespace-nowrap"
                            >
                                Find matching candidates
                            </Button>
                        </Link>
                    )}
                </div>

                {/* 4. ปรับให้กางเต็ม 100% บนมือถือ (w-full) และกว้าง 2/3 บนจอใหญ่ */}
                <div className="w-full lg:w-2/3">
                    <JobDetailCard content={job.description} />
                </div>
            </section>

            {isOwner && (
                <section
                    id="candidates"
                    className="border-t border-gray-200 pt-8"
                >
                    <h1 className="text-heading-3 font-semibold">Candidates</h1>

                    {/* 5. เปลี่ยนจาก flex ธรรมดา เป็น grid เพื่อให้การ์ดเรียงต่อกันเป็นตารางและปัดตกลงมาบรรทัดใหม่ได้สวยงาม */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {/* TODO: if user role is applicant, hide this part */}
                        {candidates.length > 0 ? (
                            candidates.map((candidate) => (
                                <CandidateCard
                                    key={`${candidate.id}`}
                                    candidate={{
                                        profileId: candidate.profileId,
                                        profilePictureUrl:
                                            candidate.profile.user
                                                .profilePictureUrl,
                                        firstName:
                                            candidate.profile.user.firstName,
                                        lastName:
                                            candidate.profile.user.lastName,
                                        email: candidate.profile.user.email,
                                        summary:
                                            candidate.aiAnalysisResult.summary,
                                        aiScore:
                                            candidate.aiAnalysisResult.aiScore,
                                        status: candidate.status,
                                        aiAnalysisResult:
                                            candidate.aiAnalysisResult,
                                    }}
                                    onClick={() =>
                                        setSelectedCandidate(candidate)
                                    }
                                />
                            ))
                        ) : (
                            <p className="text-gray-500 italic">
                                No candidates applied yet.
                            </p>
                        )}
                    </div>
                </section>
            )}

            <CandidateModal
                key={selectedCandidate?.id}
                isOpen={selectedCandidate != null}
                onClose={() => setSelectedCandidate(null)}
                candidate={selectedCandidate}
            />
        </div>
    );
}
