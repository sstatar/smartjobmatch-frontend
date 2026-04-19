"use client";

import { aiAnalyzeJob } from "@/app/actions/ai-analyze"; // import ฟังก์ชัน Server Action
import { applyForJob } from "@/app/actions/application";
import { useEffect, useState, useTransition } from "react";
import ReactMarkdown from "react-markdown";
import Button from "../ui/Button-2";
import { AiAnalysisResults } from "./JobAppliedList.client";
import { JobCardData } from "./JobsList.client";
import { UserRole } from "@/app/actions/auth";
import LocationIcon from "@/public/svgs/iconMapMarker.svg";

export interface JobDetailProps {
    userRole?: UserRole;
    job: JobCardData | null;
    isApplied?: boolean;
    isNeededAiAction?: boolean;
    aiAnalysisResult?: AiAnalysisResults | undefined;
    onAnalysisComplete?: (jobId: string, analysis: AiAnalysisResults) => void;
}

function normalizeAnalyzeResponse(data: unknown): AiAnalysisResults | null {
    if (!data || typeof data !== "object") return null;
    const d = data as Record<string, unknown>;
    if (typeof d.aiScore !== "number") return null;
    return {
        id: String(d.aiAnalysisResultId ?? d.id ?? ""),
        aiScore: d.aiScore,
        strengths: (d.strengths as string[]) ?? [],
        weaknesses: (d.weaknesses as string[]) ?? [],
        skillsAnalysis: d.skillsAnalysis as {
            score: number;
            reason: string;
        },
        experienceAnalysis: d.experienceAnalysis as {
            score: number;
            reason: string;
        },
        educationAnalysis: d.educationAnalysis as {
            score: number;
            reason: string;
        },
        summary: String(d.summary ?? ""),
    };
}

export default function JobDetail({
    userRole = "APPLICANT",
    job,
    isApplied = false,
    aiAnalysisResult = undefined,
    onAnalysisComplete,
}: JobDetailProps) {
    // State สำหรับ AI
    const [analysisResult, setAnalysisResult] = useState<
        AiAnalysisResults | undefined
    >(aiAnalysisResult);

    useEffect(() => {
        setAnalysisResult(aiAnalysisResult);
    }, [aiAnalysisResult]);

    // State สำหรับเช็คว่าสมัครงานนี้ไปหรือยัง (เอาค่า isApplied จาก Props มาเป็นค่าเริ่มต้น)
    const [localIsApplied, setLocalIsApplied] = useState<boolean>(isApplied);

    const [isPendingAI, startTransitionAI] = useTransition();

    // เพิ่ม useTransition สำหรับปุ่มสมัครงาน
    const [isApplying, startTransitionApply] = useTransition();

    if (!job)
        return (
            <div className="sticky top-20 self-start w-full">
                <div className="flex w-full justify-center">
                    <h1 className="text-heading-3 p-10 border border-accent rounded-sm">
                        Select a job to see details
                    </h1>
                </div>
            </div>
        );

    const handleAnalyzeClick = () => {
        if (!job) return;

        startTransitionAI(async () => {
            const result = await aiAnalyzeJob(job.id);
            if (result.error) {
                alert(result.error);
            } else if (result.success && result.data) {
                const normalized = normalizeAnalyzeResponse(result.data);
                if (normalized) {
                    setAnalysisResult(normalized);
                    onAnalysisComplete?.(job.id, normalized);
                }
            }
        });
    };

    // ฟังก์ชันจัดการเมื่อกดปุ่ม Apply Now
    const handleApplyClick = () => {
        if (!job) return;

        startTransitionApply(async () => {
            const result = await applyForJob(job.id);
            if (result.error) {
                alert(result.error);
            } else if (result.success) {
                alert("Job application successful!");
                setLocalIsApplied(true); // เปลี่ยนสถานะเป็นสมัครแล้ว เพื่อซ่อนปุ่ม
            }
        });
    };

    // สร้างตัวแปรจัดการที่อยู่ให้อ่านง่ายขึ้น ไม่ต้องมานั่งเขียนเงื่อนไขต่อคอมม่า (,) เอง
    const locationString = [
        job.location?.city,
        job.location?.province,
        job.location?.country,
    ]
        .filter(Boolean) // กรองค่าที่ว่าง (undefined, null, "") ทิ้งไป
        .join(", "); // นำคำที่เหลือมาต่อกันด้วย ", "

    // ฟังก์ชันจัดฟอร์แมตเงินเดือนให้มีลูกน้ำ (,)
    const formatSalary = (amount?: number) => {
        if (!amount) return "";
        return new Intl.NumberFormat("en-US").format(amount);
    };

    return (
        <div className="sticky top-20 z-10 w-full max-w-full self-start">
            <div className="max-h-[calc(100vh-6rem)] overflow-y-auto overflow-x-hidden overscroll-contain pb-6">
            <div className="job-detail w-full">
                    <div className="head flex justify-between items-center p-4 border border-accent-2 rounded-t-lg">
                        <div className="flex flex-col gap-2 max-w-4/5">
                            {/* ส่วนหัว: ชื่อตำแหน่งและชื่อบริษัท */}
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                                    {job.title}
                                </h1>
                                <p className="text-lg font-medium text-blue-600 mt-1">
                                    {job.company.name}
                                </p>
                            </div>

                            {/* ส่วนรายละเอียด: เงินเดือน และ สถานที่ */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-y-2 gap-x-6 text-gray-600">
                                <div className="flex items-center gap-2">
                                    {/* แนะนำให้หาไอคอนธนบัตรมาใส่ตรงนี้ */}
                                    <span className="font-semibold text-gray-800">
                                        {formatSalary(job.salaryMin)} -{" "}
                                        {formatSalary(job.salaryMax)}{" "}
                                        {job.currency}
                                    </span>
                                </div>

                                {locationString && (
                                    <div className="flex items-center gap-1">
                                        <LocationIcon />
                                        <span>{locationString}</span>
                                    </div>
                                )}
                            </div>

                            {/* ส่วนป้ายกำกับ (Badges): รูปแบบการทำงาน และ ประเภทการจ้าง */}
                            <div className="flex flex-wrap gap-2 mt-1">
                                {job.workplaceType && (
                                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full border border-blue-100">
                                        {job.workplaceType}
                                    </span>
                                )}
                                {job.employmentType?.name && (
                                    <span className="px-3 py-1 bg-gray-50 text-gray-700 text-sm font-medium rounded-full border border-gray-200">
                                        {job.employmentType.name}
                                    </span>
                                )}
                            </div>
                        </div>
                        {/* ปรับปรุงปุ่ม Apply Now */}
                        {userRole === "APPLICANT" &&
                            (!localIsApplied ? (
                                <Button
                                    variant="primary"
                                    onClick={handleApplyClick}
                                    disabled={isApplying} // ปิดปุ่มระหว่างรอ API ตอบกลับ
                                >
                                    {isApplying ? "Applying..." : "Apply Now"}
                                </Button>
                            ) : (
                                <span className="text-green-600 font-semibold px-4 py-2 bg-green-50 rounded-md">
                                    Applied
                                </span>
                            ))}
                    </div>
                    <div className="job-description p-4 border border-accent-2">
                        <h2 className="text-heading-4 font-semibold">
                            Job Details
                        </h2>
                        <div className="markdown">
                            <ReactMarkdown>{job.description}</ReactMarkdown>
                        </div>
                    </div>
                    {userRole === "APPLICANT" && (
                        <div className="bg-tertiary">
                            {analysisResult ? (
                                <div className="job-actions p-6 shadow-sm flex flex-col gap-6">
                                    {/* 1. Header & Overall Score */}
                                    <div className="flex justify-between items-center border-b pb-4">
                                        <h2 className="text-heading-4 font-bold text-gray-800">
                                            AI Analysis Result
                                        </h2>
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm text-gray-500 font-medium">
                                                Match Score
                                            </span>
                                            <span
                                                className={`text-2xl font-bold px-4 py-1 rounded-full ${
                                                    analysisResult.aiScore >= 80
                                                        ? "bg-green-100 text-green-700"
                                                        : analysisResult.aiScore >=
                                                            50
                                                          ? "bg-yellow-100 text-yellow-700"
                                                          : "bg-red-100 text-red-700"
                                                }`}
                                            >
                                                {analysisResult.aiScore}%
                                            </span>
                                        </div>
                                    </div>

                                    {/* 2. Summary */}
                                    <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                                        <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                                            📝 Executive Summary
                                        </h3>
                                        <p className="text-gray-700 text-sm leading-relaxed">
                                            {analysisResult.summary}
                                        </p>
                                    </div>

                                    {/* 3. Strengths & Weaknesses (Grid 2 Columns) */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Strengths */}
                                        <div className="bg-green-50/50 p-4 rounded-lg border border-green-100">
                                            <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                                                ✅ Top Strengths
                                            </h3>
                                            <ul className="flex flex-col gap-2">
                                                {analysisResult.strengths?.map(
                                                    (strength, index) => (
                                                        <li
                                                            key={index}
                                                            className="text-sm text-green-900 flex items-start gap-2"
                                                        >
                                                            <span className="mt-0.5 text-green-600">
                                                                •
                                                            </span>
                                                            <span>
                                                                {strength}
                                                            </span>
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        </div>

                                        {/* Weaknesses */}
                                        <div className="bg-red-50/50 p-4 rounded-lg border border-red-100">
                                            <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                                                🎯 Areas for Improvement
                                            </h3>
                                            <ul className="flex flex-col gap-2">
                                                {analysisResult.weaknesses?.map(
                                                    (weakness, index) => (
                                                        <li
                                                            key={index}
                                                            className="text-sm text-red-900 flex items-start gap-2"
                                                        >
                                                            <span className="mt-0.5 text-red-600">
                                                                •
                                                            </span>
                                                            <span>
                                                                {weakness}
                                                            </span>
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* 4. Detailed Breakdown */}
                                    <div className="flex flex-col gap-5 mt-2">
                                        <h3 className="font-bold text-gray-800 border-b pb-2">
                                            Detailed Breakdown
                                        </h3>

                                        {/* Helper function / inline render for breakdown items */}
                                        {[
                                            {
                                                title: "Skills Match",
                                                data: analysisResult.skillsAnalysis,
                                            },
                                            {
                                                title: "Education Match",
                                                data: analysisResult.educationAnalysis,
                                            },
                                            {
                                                title: "Experience Match",
                                                data: analysisResult.experienceAnalysis,
                                            },
                                        ].map((item, idx) => (
                                            <div
                                                key={idx}
                                                className="flex flex-col gap-1.5"
                                            >
                                                <div className="flex justify-between items-center">
                                                    <span className="font-medium text-gray-700 text-sm">
                                                        {item.title}
                                                    </span>
                                                    <span className="text-sm font-bold text-gray-600">
                                                        {item.data.score}%
                                                    </span>
                                                </div>
                                                {/* Progress Bar */}
                                                <div className="w-full bg-gray-100 rounded-full h-2">
                                                    <div
                                                        className={`h-2 rounded-full ${
                                                            item.data.score >=
                                                            80
                                                                ? "bg-green-500"
                                                                : item.data
                                                                        .score >=
                                                                    50
                                                                  ? "bg-yellow-500"
                                                                  : "bg-red-500"
                                                        }`}
                                                        style={{
                                                            width: `${item.data.score}%`,
                                                        }}
                                                    ></div>
                                                </div>
                                                {/* Reason Text */}
                                                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                                    {item.data.reason}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="job-actions p-6 flex flex-col items-center justify-center gap-4 text-center">
                                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl mb-2">
                                        🤖
                                    </div>
                                    <h4 className="text-heading-4 font-semibold text-gray-800 max-w-md">
                                        Want to know which skills you need to
                                        improve your match score?
                                    </h4>
                                    <p className="text-sm text-gray-500 mb-2">
                                        Our AI will analyze your resume against
                                        this job description and provide
                                        actionable feedback.
                                    </p>
                                    <div className="stretch-start">
                                        <Button
                                            variant="primary"
                                            onClick={handleAnalyzeClick}
                                            disabled={isPendingAI}
                                            className="min-w-50"
                                        >
                                            {isPendingAI
                                                ? "Analyzing Profile..."
                                                : "Get AI Analysis"}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
