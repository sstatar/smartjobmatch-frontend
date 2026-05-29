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
            className="px-6 py-4 border border-gray-300 rounded-lg flex justify-between items-center cursor-pointer"
            onClick={handleCandidateCardClick}
        >
            <div className="left w-1/6">
                <PictureIcon
                    // src={candidate.user.profilePictureUrl}
                    src=""
                    alt={candidate.user.firstName}
                    className="w-16 h-16 ml-2"
                />
                <h1 className="text-subtitle-2">
                    {candidate.user.firstName} {candidate.user.lastName}
                </h1>
            </div>
            <div className="mid w-4/6 text-sm">
                <h1>
                    {" "}
                    <span className="font-semibold text-blue-600">
                        AI summary :{" "}
                    </span>
                    {candidate.aiAnalysisResults[0].summary}
                </h1>
            </div>
            <div className="right w-1/6 flex justify-center">
                <CircularProgress
                    percentage={candidate.aiAnalysisResults[0].aiScore}
                    size={80}
                />
            </div>
        </div>
    );
}
