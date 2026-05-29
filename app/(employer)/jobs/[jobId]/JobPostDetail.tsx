"use client";

import CandidateCard from "@/components/employer/CandidateCard";
import JobDetailCard from "@/components/shared/JobDetailCard";
import JobCard from "@/components/shared/JobsList/JobCard";
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
        <div className="mb-10 mx-20 flex flex-col gap-4">
            <section id="job-description" className="flex gap-4">
                <div className="banner w-1/3 flex flex-col gap-8 items-start">
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
                    {/* TODO: hide the button if user role is applicant */}
                    {isOwner && (
                        <>
                            <Link href={`/jobs/${job.id}/candidates`}>
                                <Button variant="secondary">
                                    Find matching candidates
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
                <div className="w-2/3">
                    <JobDetailCard content={job.description} />
                </div>
            </section>
            {isOwner && (
                <section id="candidates">
                    <h1 className="text-heading-3 font-semibold">Candidates</h1>
                    <div className="mt-4 flex gap-3">
                        {/* TODO: if user role is applicant, hide this part */}
                        {candidates.length > 0
                            ? candidates.map((candidate) => (
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
                                              candidate.aiAnalysisResult
                                                  .summary,
                                          aiScore:
                                              candidate.aiAnalysisResult
                                                  .aiScore,
                                          status: candidate.status,
                                          aiAnalysisResult:
                                              candidate.aiAnalysisResult,
                                      }}
                                      onClick={() =>
                                          setSelectedCandidate(candidate)
                                      }
                                  />
                              ))
                            : "No candidates"}
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
