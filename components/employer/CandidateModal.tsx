import { Candidate } from "@/app/(employer)/jobs/[jobId]/JobPostDetail";
import { RESUME_BASE_URL } from "@/lib/api-config";
import Link from "next/link";
import { useState } from "react";
import Modal, { ModalProps } from "../ui/Modal";
import CircularProgress from "../ui/CircularProgress";
import PictureIcon from "../ui/PictureIcon";

export interface CandidateModalProps extends Omit<ModalProps, "children"> {
    candidate: Candidate | null;
}

interface Education {
    university: string;
    degreeLevel: string;
    fieldOfStudy: string;
    startMonth?: string;
    startYear?: number;
    graduationMonth?: string | null;
    graduationYear?: number | null;
}

interface Experience {
    jobTitle: string;
    companyName?: string;
    summary?: string;
    descriptions?: string[];
    startDate?: string;
    endDate?: string;
}

function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every((v) => typeof v === "string");
}

function isStringifiedArray(value: unknown): value is string {
    if (typeof value !== "string") return false;

    try {
        const parsed = JSON.parse(value);
        return (
            Array.isArray(parsed) && parsed.every((v) => typeof v === "string")
        );
    } catch {
        return false;
    }
}

function toStringArray(value: unknown): string[] {
    // กรณีเป็น array อยู่แล้ว
    if (isStringArray(value)) {
        return value;
    }

    // กรณีเป็น string ที่ต้อง parse
    if (isStringifiedArray(value)) {
        return JSON.parse(value);
    }

    // fallback
    return [];
}

export default function CandidateModal({
    isOpen,
    onClose,
    candidate,
}: CandidateModalProps) {
    const [imgSrc, setImgSrc] = useState(
        candidate?.profile.user.profilePictureUrl || "/default-logo.png",
    );

    if (!candidate) return null;

    const rawEducations = candidate?.aiAnalysisResult.snapshottedEducation;
    const educations =
        typeof rawEducations === "object"
            ? rawEducations
            : JSON.parse(rawEducations || "[]");
    const rawExperiences = candidate?.aiAnalysisResult.snapshottedExperience;
    const experiences =
        typeof rawExperiences === "object"
            ? rawExperiences
            : JSON.parse(
                  candidate?.aiAnalysisResult.snapshottedExperience || "[]",
              );

    const rawSkills = candidate?.aiAnalysisResult.snapshottedSkills;
    const skills = toStringArray(rawSkills);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            {/* ปรับ max-h ให้พอดีกับหน้าจอมือถือมากขึ้น (90vh) */}
            <div className="flex flex-col w-full max-h-[90vh] overflow-y-auto px-2 md:px-4 pb-4">
                {/* 1. ปรับ Header ให้วงกลม AI อยู่ข้างๆ ชื่อเสมอ เพื่อประหยัดพื้นที่แนวตั้งบนมือถือ */}
                <div className="flex justify-between items-start gap-4 border-b pb-6 mt-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
                        <PictureIcon
                            src="" // TODO: รอเชื่อมรูปจริง
                            alt={candidate.profile.user.firstName}
                            width={100}
                            height={100}
                            className="w-16 h-16 sm:w-24 sm:h-24 shadow-sm object-cover rounded-full"
                            onError={() => setImgSrc("/default-logo.png")}
                        />
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 leading-tight">
                                {candidate.profile.user.firstName}{" "}
                                {candidate.profile.user.lastName}
                            </h2>
                            <span className="inline-block mt-2 px-3 py-1 text-xs sm:text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                                {candidate.status}
                            </span>
                        </div>
                    </div>

                    {/* วงกลม AI ให้ชิดขวาบน และลดขนาดลงนิดนึงบนมือถือ */}
                    <div className="flex flex-col items-center shrink-0">
                        <CircularProgress
                            percentage={candidate.aiAnalysisResult.aiScore}
                            size={64} // ใช้ 64 แทน 80 เพื่อไม่ให้เกะกะ
                            strokeWidth={5}
                        />
                        <span className="text-[10px] sm:text-xs font-medium text-gray-500 mt-1 sm:mt-2 text-center">
                            AI Match
                        </span>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    {/* Left Column: ข้อมูลการติดต่อ */}
                    <div className="lg:col-span-1 space-y-4">
                        <div className="bg-gray-50 p-4 sm:p-5 rounded-xl border border-gray-100 space-y-4">
                            <h3 className="font-semibold text-gray-800 border-b pb-2">
                                Contact Info
                            </h3>
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                                    Email
                                </p>
                                {/* เพิ่ม truncate กันอีเมลยาวทะลุจอ */}
                                <p
                                    className="text-sm font-medium truncate"
                                    title={candidate.profile.user.email}
                                >
                                    {candidate.profile.user.email}
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                                    Phone
                                </p>
                                <p className="text-sm font-medium">
                                    {candidate.profile.user.phone || "-"}
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                                    Applied At
                                </p>
                                <p className="text-sm font-medium">
                                    {candidate.appliedAt.split("T")[0]}
                                </p>
                            </div>
                            <div className="pt-2">
                                <Link
                                    href={`${RESUME_BASE_URL}/${candidate.aiAnalysisResult.resumeUrlUsed}`}
                                    target="_blank"
                                    className="w-full flex justify-center py-2 px-4 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-semibold whitespace-nowrap"
                                >
                                    View Original Resume
                                </Link>
                            </div>
                        </div>

                        {/* Skills Section */}
                        <div className="bg-white p-4 sm:p-5 rounded-xl border border-gray-100 shadow-sm">
                            <h3 className="font-semibold text-gray-800 mb-3">
                                Skills
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill: string) => (
                                    <span
                                        key={skill}
                                        className="px-2.5 py-1 bg-gray-100 border border-gray-200 text-gray-700 text-xs rounded-md font-medium"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: รายละเอียดจาก AI, ประสบการณ์ และการศึกษา */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Summary */}
                        <div className="bg-white">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                Summary
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {candidate.aiAnalysisResult.summary}
                            </p>
                        </div>

                        {/* Strengths & Weaknesses (แบ่ง 2 คอลัมน์) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-green-50/50 p-4 rounded-xl border border-green-100">
                                <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500 shrink-0"></span>{" "}
                                    Strengths
                                </h4>
                                <ul className="list-disc list-outside ml-4 text-sm text-gray-700 space-y-1">
                                    {candidate.aiAnalysisResult.strengths.map(
                                        (strength) => (
                                            <li key={strength} className="pl-1">
                                                {strength}
                                            </li>
                                        ),
                                    )}
                                </ul>
                            </div>
                            <div className="bg-red-50/50 p-4 rounded-xl border border-red-100">
                                <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-red-500 shrink-0"></span>{" "}
                                    Weaknesses
                                </h4>
                                <ul className="list-disc list-outside ml-4 text-sm text-gray-700 space-y-1">
                                    {candidate.aiAnalysisResult.weaknesses.map(
                                        (weakness) => (
                                            <li key={weakness} className="pl-1">
                                                {weakness}
                                            </li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        </div>

                        {/* Experiences */}
                        {experiences.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                                    Experience
                                </h3>
                                <div className="space-y-6">
                                    {experiences.map(
                                        (item: Experience, index: number) => (
                                            <div
                                                key={index}
                                                className="pl-5 border-l-2 border-gray-200 relative"
                                            >
                                                {/* ขยายขนาด Bullet และจัดตำแหน่งให้ตรง */}
                                                <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1.5 ring-4 ring-white"></div>
                                                <h4 className="font-semibold text-gray-800 text-base leading-tight">
                                                    {item.jobTitle}
                                                </h4>

                                                {/* 💡 ปรับปรุงส่วนนี้: ใช้ flex-wrap และตัดเวลา (T00:00:00.000Z) ออก */}
                                                <div className="flex flex-wrap items-baseline gap-x-2 mt-1 mb-2">
                                                    <span className="text-sm text-blue-600 font-medium">
                                                        {item.companyName}
                                                    </span>
                                                    <span className="text-xs text-gray-400 font-normal">
                                                        {item.startDate
                                                            ? item.startDate.split(
                                                                  "T",
                                                              )[0]
                                                            : ""}
                                                        {item.startDate &&
                                                        item.endDate
                                                            ? " — "
                                                            : ""}
                                                        {item.endDate
                                                            ? item.endDate.split(
                                                                  "T",
                                                              )[0]
                                                            : item.startDate
                                                              ? "Present"
                                                              : ""}
                                                    </span>
                                                </div>

                                                {item.summary && (
                                                    <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                                                        {item.summary}
                                                    </p>
                                                )}
                                                {item.descriptions &&
                                                    item.descriptions.length >
                                                        0 && (
                                                        <ul className="list-disc list-outside ml-4 text-sm text-gray-600 space-y-1">
                                                            {item.descriptions.map(
                                                                (desc, i) => (
                                                                    <li
                                                                        key={i}
                                                                        className="pl-1"
                                                                    >
                                                                        {desc}
                                                                    </li>
                                                                ),
                                                            )}
                                                        </ul>
                                                    )}
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Educations */}
                        {educations.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                                    Education
                                </h3>
                                <div className="space-y-6">
                                    {educations.map(
                                        (item: Education, index: number) => (
                                            <div
                                                key={index}
                                                className="pl-5 border-l-2 border-gray-200 relative"
                                            >
                                                {/* ขยายขนาด Bullet นิดนึงและจัดตำแหน่งให้ตรง */}
                                                <div className="absolute w-3 h-3 bg-gray-400 rounded-full -left-[7px] top-1.5 ring-4 ring-white"></div>
                                                <h4 className="font-semibold text-gray-800 text-base leading-tight">
                                                    {item.university}
                                                </h4>
                                                <p className="text-sm text-gray-700 mt-1">
                                                    {item.degreeLevel} in{" "}
                                                    <span className="font-medium">
                                                        {item.fieldOfStudy}
                                                    </span>
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {item.startMonth}{" "}
                                                    {item.startYear}
                                                    {(item.startYear ||
                                                        item.startMonth) &&
                                                        " — "}
                                                    {item.graduationMonth}{" "}
                                                    {item.graduationYear}
                                                </p>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    );
}
