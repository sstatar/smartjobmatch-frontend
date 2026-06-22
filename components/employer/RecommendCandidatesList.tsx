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
    // 1. เพิ่มความปลอดภัย: ใช้ optional chaining (?.) ป้องกัน error กรณีไม่มีข้อมูล AI
    // และใช้ [...candidates] เพื่อ copy array ก่อน sort จะได้ไม่กระทบข้อมูลต้นทาง
    const sortedCandidate = [...candidates].sort(
        (a, b) =>
            (b.aiAnalysisResults?.[0]?.aiScore || 0) -
            (a.aiAnalysisResults?.[0]?.aiScore || 0),
    );

    const [selectedCandidate, setSelectedCandidate] =
        useState<CandidateResponseType | null>(null);

    // หน้า Empty State นี้อาจจะไม่ถูกเรียกใช้ (เพราะไฟล์แม่ดักไว้แล้ว) แต่ปรับให้ดูดีไว้ก่อนครับ
    if (candidates.length === 0)
        return (
            <div className="text-center text-gray-500 italic p-4">
                No candidates found
            </div>
        );

    return (
        <>
            {/* 2. เปลี่ยนจาก flex-col เป็น grid ให้เรียงเหมือนหน้า JobDetail หลัก */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
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
                        status: "Recommended", // 3. ปรับคำให้ดูสั้นและสวยงามขึ้นเมื่อเป็น Badge
                        profileId: selectedCandidate.id || "",
                        profile: {
                            user: {
                                // ป้องกัน error กรณี user เป็น null
                                firstName:
                                    selectedCandidate.user?.firstName || "",
                                lastName:
                                    selectedCandidate.user?.lastName || "",
                                email: selectedCandidate.user?.email || "",
                                phone: selectedCandidate.user?.phone || "",
                                profilePictureUrl:
                                    selectedCandidate.user?.profilePictureUrl,
                            },
                        },
                        appliedAt: "Not applied yet",
                        aiAnalysisResult: {
                            ...selectedCandidate.aiAnalysisResults[0],
                            reasonForPoints: [],
                            snapshottedEducation:
                                selectedCandidate.aiAnalysisResults[0]
                                    ?.snapshottedEducation || "",
                            snapshottedExperience:
                                selectedCandidate.aiAnalysisResults[0]
                                    ?.snapshottedExperience || "",
                            snapshottedSkills:
                                selectedCandidate.aiAnalysisResults[0]
                                    ?.snapshottedSkills || [],
                        },
                    }}
                />
            )}
        </>
    );
}
