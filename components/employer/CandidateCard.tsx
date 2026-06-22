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
            // 1. เปลี่ยน min-w-70 เป็น w-full และเพิ่ม hover effect (เงา + ขอบสีฟ้า)
            className="w-full cursor-pointer border border-gray-300 rounded-lg p-4 flex flex-col gap-4 bg-white hover:shadow-md hover:border-blue-400 transition-all"
            onClick={handleCandidateCardClick}
        >
            {/* ส่วนรูปภาพและคะแนน AI */}
            <div className="flex justify-between items-start">
                <PictureIcon
                    src="" // TODO: รอเชื่อม src จริง
                    alt={candidate.firstName}
                    width={80}
                    height={80}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover" // ย่อรูปนิดนึงบนมือถือ
                />
                <CircularProgress size={75} percentage={candidate.aiScore} />
            </div>

            {/* ส่วนข้อมูลตัวอักษร */}
            <div className="flex flex-col gap-1 overflow-hidden">
                {/* 2. เปลี่ยน <h1> เป็น <h3> และ <p> พร้อมใส่ truncate กันข้อความยาวทะลุขอบ */}
                <h3
                    className="text-lg font-bold text-gray-900 truncate"
                    title={`${candidate.firstName} ${candidate.lastName}`}
                >
                    {candidate.firstName} {candidate.lastName}
                </h3>

                <p
                    className="text-sm text-gray-500 truncate"
                    title={candidate.email}
                >
                    {candidate.email}
                </p>

                <div className="mt-2 flex items-center gap-2 text-sm text-gray-700">
                    <span className="font-semibold">Status:</span>
                    {/* ตกแต่ง Status ให้ดูเป็นป้าย (Badge) สวยๆ */}
                    <span className="text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                        {candidate.status}
                    </span>
                </div>
            </div>
        </div>
    );
}
