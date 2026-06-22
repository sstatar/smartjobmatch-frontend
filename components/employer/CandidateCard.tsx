"use client";

import { AiAnalysisResult } from "@/lib/api/endpoints/companiesApi";
import Image from "next/image";
import CircularProgress from "@/components/ui/CircularProgress";
import PictureIcon from "@/components/ui/PictureIcon";

export type CandidateProps = {
    profileId: string;
    profilePictureUrl?: string;
    email: string;
    firstName: string;
    lastName: string;
    status: string;
    aiScore: number;
    summary: string;
    aiAnalysisResult: AiAnalysisResult;
};

export default function CandidateCard({
    candidate,
    onClick,
}: {
    candidate: CandidateProps;
    onClick?: () => void;
}) {
    function handleCandidateCardClick() {
        if (onClick) onClick();
    }

    return (
        <div
            className="cursor-pointer border border-gray-300 rounded-lg p-4 flex flex-col gap-3 min-w-70"
            onClick={handleCandidateCardClick}
        >
            <div className="flex justify-between">
                <PictureIcon
                    // src={candidate.profilePictureUrl}
                    src=""
                    alt={candidate.firstName}
                    width={100}
                    height={100}
                    className="w-20 h-20"
                />
                {/* {candidate.profilePictureUrl ? (
                    <Image
                        width={400}
                        height={400}
                        src={candidate.profilePictureUrl}
                        alt={candidate.firstName}
                        className="w-20 h-20 rounded-full object-cover border"
                    />
                ) : (
                    <Image
                        width={400}
                        height={400}
                        src="/default-logo.png"
                        alt={candidate.firstName}
                        className="w-20 h-20 rounded-full object-cover border"
                    />
                )} */}
                <CircularProgress size={80} percentage={candidate.aiScore} />
            </div>
            <div className="flex flex-col">
                <h1>
                    {candidate.firstName} {candidate.lastName}
                </h1>
                <h1>{candidate.email}</h1>
                <h1>
                    status :{" "}
                    <span className="text-subtitle-2 font-thin text-blue-500">
                        {candidate.status}
                    </span>
                </h1>
            </div>
        </div>
    );
}
