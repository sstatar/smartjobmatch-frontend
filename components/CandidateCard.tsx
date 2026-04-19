"use client";

import { AiAnalysisResult } from "@/lib/api/endpoints/companiesApi";
import Image from "next/image";
import CircularProgress from "./ui/CircularProgress";
import PictureIcon from "./ui/PictureIcon";

export type CandidateProps = {
    profileId: string;
    profilePictureUrl?: string;
    email: string;
    firstName: string;
    lastName: string;
    status: string;
    aiScore: number;
    summary: string;
    appliedAt: string;
    aiAnalysisResult: AiAnalysisResult;
};

export default function CandidateCard({
    candidate,
    onClick,
}: {
    candidate: CandidateProps;
    onClick?: () => void;
}) {
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const appliedAtDate = new Date(candidate.appliedAt);
    const appliedAtDateString =
        appliedAtDate.getDate() +
        " " +
        months[appliedAtDate.getMonth()] +
        " " +
        appliedAtDate.getFullYear();

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
                    src={candidate.profilePictureUrl}
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
                <h1>Applied At : {appliedAtDateString}</h1>
            </div>
        </div>
    );
}
