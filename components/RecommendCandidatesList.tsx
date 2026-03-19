"use client";

import { CandidateResponseType } from "@/app/(employer)/jobs/[jobId]/candidates/service/candidate";
import RecommendCandidateCard from "./RecommendCandidateCard";
import CandidateModal from "./CandidateModal";
import { useState } from "react";

export default function RecommendCandidateList({
    candidates,
}: {
    candidates: CandidateResponseType[];
}) {
    const sortedCandidate = candidates.sort(
        (a, b) =>
            b.aiAnalysisResults[0].aiScore - a.aiAnalysisResults[0].aiScore,
    );

    const [selectedCandidate, setSelectedCandidate] =
        useState<CandidateResponseType | null>(null);

    if (candidates.length === 0)
        return <div className="text-center">No candidates found</div>;
    return (
        <>
            <div className="flex flex-col gap-4">
                {sortedCandidate.map((candidate) => (
                    <RecommendCandidateCard
                        key={candidate.id}
                        candidate={candidate}
                        onClick={() => setSelectedCandidate(candidate)}
                    />
                ))}
            </div>

            {selectedCandidate !== null && (
                <CandidateModal
                    key={selectedCandidate.id}
                    isOpen={selectedCandidate != null}
                    onClose={() => setSelectedCandidate(null)}
                    candidate={{
                        ...selectedCandidate,
                        id: selectedCandidate.id || "",
                        status: "RECOMMENDATION RESULT",
                        profileId: selectedCandidate.id || "",
                        profile: {
                            user: {
                                firstName:
                                    selectedCandidate.user.firstName || "",
                                lastName: selectedCandidate.user.lastName || "",
                                email: selectedCandidate.user.email || "",
                                phone: selectedCandidate.user.phone || "",
                                profilePictureUrl:
                                    selectedCandidate.user.profilePictureUrl,
                            },
                        },
                        appliedAt: "not applied yet.",
                        aiAnalysisResult: {
                            ...selectedCandidate.aiAnalysisResults[0],
                            reasonForPoints: [],
                            snapshottedEducation:
                                selectedCandidate.aiAnalysisResults[0]
                                    .snapshottedEducation || "",
                            snapshottedExperience:
                                selectedCandidate.aiAnalysisResults[0]
                                    .snapshottedExperience || "",
                            snapshottedSkills:
                                selectedCandidate.aiAnalysisResults[0]
                                    .snapshottedSkills || [],
                        },
                    }}
                />
            )}
        </>
    );
}
