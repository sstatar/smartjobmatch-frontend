import { Candidate } from "@/app/(employer)/jobs/[jobId]/JobPostDetail";
import { RESUME_BASE_URL } from "@/lib/api-config";
import Link from "next/link";
import { useState } from "react";
import Modal, { ModalProps } from "./Modal";
import CircularProgress from "./ui/CircularProgress";
import PictureIcon from "./ui/PictureIcon";

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
    gpa?: number;
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
    if (isStringArray(value)) {
        return value;
    }

    if (isStringifiedArray(value)) {
        return JSON.parse(value);
    }

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
            <div className="flex flex-col w-full max-h-[85vh] overflow-y-auto px-2 pb-4">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6 border-b pb-6 mt-4">
                    <div className="flex items-center gap-5">
                        <PictureIcon
                            src={imgSrc}
                            alt={candidate.profile.user.firstName}
                            width={100}
                            height={100}
                            className="w-24 h-24 shadow-sm"
                            onError={() => setImgSrc("/default-logo.png")}
                        />
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">
                                {candidate.profile.user.firstName}{" "}
                                {candidate.profile.user.lastName}
                            </h2>
                            <span className="inline-block mt-2 px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                                {candidate.status}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <CircularProgress
                            percentage={candidate.aiAnalysisResult.aiScore}
                            size={80}
                        />
                        <span className="text-sm font-medium text-gray-500 mt-2">
                            AI Match Score
                        </span>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    {/* Left Column */}
                    <div className="md:col-span-1 space-y-4">
                        <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 space-y-4">
                            <h3 className="font-semibold text-gray-800 border-b pb-2">
                                Contact Info
                            </h3>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">
                                    Email
                                </p>
                                <p className="text-sm font-medium break-all">
                                    {candidate.profile.user.email}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">
                                    Phone
                                </p>
                                <p className="text-sm font-medium">
                                    {candidate.profile.user.phone || "-"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">
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
                                    className="w-full flex justify-center py-2 px-4 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-semibold"
                                >
                                    View Original Resume
                                </Link>
                            </div>
                        </div>

                        {/* Skills Section */}
                        <div className="bg-white p-5 rounded-xl border border-gray-100">
                            <h3 className="font-semibold text-gray-800 mb-3">
                                Skills
                            </h3>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {skills.map((skill: string) => (
                                    <span
                                        key={skill}
                                        className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            {/* NEW: Skills Analysis */}
                            {candidate.aiAnalysisResult.skillsAnalysis && (
                                <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                                    <div className="text-xs font-semibold text-blue-800 uppercase tracking-wider mb-1">
                                        AI Skills Insight (Score:{" "}
                                        {
                                            candidate.aiAnalysisResult
                                                .skillsAnalysis.score
                                        }
                                        )
                                    </div>
                                    <p className="text-sm text-blue-900 leading-relaxed">
                                        {
                                            candidate.aiAnalysisResult
                                                .skillsAnalysis.reason
                                        }
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Summary */}
                        <div className="bg-white p-0">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                Summary
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {candidate.aiAnalysisResult.summary}
                            </p>
                        </div>

                        {/* Strengths & Weaknesses */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-green-50/50 p-4 rounded-xl border border-green-100">
                                <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500"></span>{" "}
                                    Strengths
                                </h4>
                                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                    {candidate.aiAnalysisResult.strengths.map(
                                        (strength) => (
                                            <li key={strength}>{strength}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                            <div className="bg-red-50/50 p-4 rounded-xl border border-red-100">
                                <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-red-500"></span>{" "}
                                    Weaknesses
                                </h4>
                                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                    {candidate.aiAnalysisResult.weaknesses.map(
                                        (weakness) => (
                                            <li key={weakness}>{weakness}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        </div>

                        {/* Experiences */}
                        {experiences.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
                                    Experience
                                </h3>

                                {/* NEW: Experience Analysis */}
                                {candidate.aiAnalysisResult
                                    .experienceAnalysis && (
                                    <div className="mb-4 p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                                        <div className="text-xs font-semibold text-blue-800 uppercase tracking-wider mb-1">
                                            AI Experience Insight (Score:{" "}
                                            {
                                                candidate.aiAnalysisResult
                                                    .experienceAnalysis.score
                                            }
                                            )
                                        </div>
                                        <p className="text-sm text-blue-900 leading-relaxed">
                                            {
                                                candidate.aiAnalysisResult
                                                    .experienceAnalysis.reason
                                            }
                                        </p>
                                    </div>
                                )}

                                <div className="space-y-4">
                                    {experiences.map(
                                        (item: Experience, index: number) => (
                                            <div
                                                key={index}
                                                className="pl-4 border-l-2 border-gray-200 relative"
                                            >
                                                <div className="absolute w-2.5 h-2.5 bg-blue-500 rounded-full -left-1.25 top-1.5 ring-4 ring-white"></div>
                                                <h4 className="font-semibold text-gray-800">
                                                    {item.jobTitle}
                                                </h4>
                                                <p className="text-sm text-blue-600 font-medium mb-1">
                                                    {item.companyName}
                                                    <span className="text-gray-400 ml-2 font-normal">
                                                        {item.startDate || ""}{" "}
                                                        {item.startDate &&
                                                        item.endDate
                                                            ? "—"
                                                            : ""}{" "}
                                                        {item.endDate ||
                                                            "Present"}
                                                    </span>
                                                </p>
                                                {item.summary && (
                                                    <p className="text-sm text-gray-600 mt-1 mb-2">
                                                        {item.summary}
                                                    </p>
                                                )}
                                                {item.descriptions &&
                                                    item.descriptions.length >
                                                        0 && (
                                                        <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                                                            {item.descriptions.map(
                                                                (desc, i) => (
                                                                    <li key={i}>
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
                                <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
                                    Education
                                </h3>

                                {/* NEW: Education Analysis */}
                                {candidate.aiAnalysisResult
                                    .educationAnalysis && (
                                    <div className="mb-4 p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                                        <div className="text-xs font-semibold text-blue-800 uppercase tracking-wider mb-1">
                                            AI Education Insight (Score:{" "}
                                            {
                                                candidate.aiAnalysisResult
                                                    .educationAnalysis.score
                                            }
                                            )
                                        </div>
                                        <p className="text-sm text-blue-900 leading-relaxed">
                                            {
                                                candidate.aiAnalysisResult
                                                    .educationAnalysis.reason
                                            }
                                        </p>
                                    </div>
                                )}

                                <div className="space-y-4">
                                    {educations.map(
                                        (item: Education, index: number) => (
                                            <div
                                                key={index}
                                                className="pl-4 border-l-2 border-gray-200 relative"
                                            >
                                                <div className="absolute w-2.5 h-2.5 bg-gray-400 rounded-full -left-1.25 top-1.5 ring-4 ring-white"></div>
                                                <h4 className="font-semibold text-gray-800">
                                                    {item.university}
                                                </h4>
                                                <p className="text-sm text-gray-700">
                                                    {item.degreeLevel} in{" "}
                                                    <span className="font-medium">
                                                        {item.fieldOfStudy}
                                                    </span>
                                                </p>
                                                {item.gpa && (
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        GPA : {item.gpa}
                                                    </p>
                                                )}
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
