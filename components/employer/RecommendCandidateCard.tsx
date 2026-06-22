"use client";

import { CandidateResponseType } from "@/app/(employer)/jobs/[jobId]/candidates/service/candidate";
import PictureIcon from "@/components/ui/PictureIcon";
import CircularProgress from "@/components/ui/CircularProgress";

export default function RecommendCandidateCard({
    candidate,
    onClick,
}: {
    candidate: CandidateResponseType;
    onClick?: () => void;
}) {
    function handleCandidateCardClick() {
        if (onClick) onClick();
    }

    return (
        <div
            // ปรับเป็นการ์ด (flex-col) เพิ่ม hover effect ให้ดูน่ากด และใส่ transition ให้ดูนุ่มนวล
            className="w-full cursor-pointer border border-gray-300 rounded-lg p-4 flex flex-col gap-4 bg-white hover:shadow-md hover:border-blue-400 transition-all"
            onClick={handleCandidateCardClick}
        >
            {/* ส่วนหัว: รูปโปรไฟล์ ชื่อ และคะแนน AI */}
            <div className="flex justify-between items-start gap-2">
                <div className="flex items-center gap-3 min-w-0">
                    <PictureIcon
                        // src={candidate.user?.profilePictureUrl}
                        src=""
                        alt={candidate.user?.firstName || "Candidate"}
                        width={60}
                        height={60}
                        className="w-14 h-14 rounded-full object-cover shrink-0 shadow-sm"
                    />
                    <div className="min-w-0 flex flex-col">
                        <h3
                            className="text-lg font-bold text-gray-900 truncate"
                            title={`${candidate.user?.firstName} ${candidate.user?.lastName}`}
                        >
                            {candidate.user?.firstName}{" "}
                            {candidate.user?.lastName}
                        </h3>
                        {/* สมมติว่ามีฟิลด์ตำแหน่ง หรือใส่คำเกริ่นนำเล็กๆ ก็ได้ */}
                        <p className="text-xs text-gray-500 truncate">
                            Recommended Candidate
                        </p>
                    </div>
                </div>

                <div className="shrink-0">
                    <CircularProgress
                        // ใส่ ?. ป้องกันเว็บพังกรณีไม่มีคะแนน AI
                        percentage={
                            candidate.aiAnalysisResults?.[0]?.aiScore || 0
                        }
                        size={56} // ย่อขนาดลงมานิดนึงให้พอดีกับการ์ด
                        strokeWidth={5}
                    />
                </div>
            </div>

            {/* ส่วนเนื้อหา: AI Summary */}
            <div className="bg-blue-50/50 p-3 rounded-md border border-blue-100">
                <p
                    className="text-sm text-gray-700 leading-relaxed line-clamp-3"
                    title={candidate.aiAnalysisResults?.[0]?.summary}
                >
                    <span className="font-semibold text-blue-700 mr-1.5">
                        AI Summary:
                    </span>
                    {candidate.aiAnalysisResults?.[0]?.summary ||
                        "No summary available."}
                </p>
            </div>
        </div>
    );
}
