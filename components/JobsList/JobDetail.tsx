"use client";

import { aiAnalyzeJob } from "@/app/actions/ai-analyze"; // import ฟังก์ชัน Server Action
import { applyForJob } from "@/app/actions/application";
import { useState, useTransition } from "react";
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
}

export default function JobDetail({
    userRole = "APPLICANT",
    job,
    isApplied = false,
    aiAnalysisResult = undefined,
}: JobDetailProps) {
    // State สำหรับ AI
    const [analysisResult, setAnalysisResult] = useState<
        AiAnalysisResults | undefined
    >(aiAnalysisResult);

    // State สำหรับเช็คว่าสมัครงานนี้ไปหรือยัง (เอาค่า isApplied จาก Props มาเป็นค่าเริ่มต้น)
    const [localIsApplied, setLocalIsApplied] = useState<boolean>(isApplied);

    const [isPendingAI, startTransitionAI] = useTransition();

    // เพิ่ม useTransition สำหรับปุ่มสมัครงาน
    const [isApplying, startTransitionApply] = useTransition();

    if (!job)
        return (
            <div className="sticky top-0 job-detail-placeholder w-full flex justify-center">
                <h1 className="text-heading-3 p-10 border border-accent rounded-sm">
                    Select a job to see details
                </h1>
            </div>
        );

    const handleAnalyzeClick = () => {
        if (!job) return;

        startTransitionAI(async () => {
            const result = await aiAnalyzeJob(job.id);
            if (result.error) {
                alert(result.error);
            } else if (result.success) {
                setAnalysisResult(result.data);
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

    const { aiScore, strengths, weaknesses, summary } = analysisResult || {};
    const aiResultString: string = `
**match score** : ${aiScore}
**strengths** : 
${strengths?.map((s) => `- ${s}`).join("\n")}
**weaknesses** : 
${weaknesses?.map((w) => `- ${w}`).join("\n")}
**summary** : ${summary}
`;

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
        <div className="sticky top-20">
            <div className="max-h-screen overflow-y-auto">
                <div className="job-detail w-full sticky top-4">
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
                                <div className="job-actions p-4 border border-accent-2">
                                    <h2 className="text-heading-4 font-semibold">
                                        AI Analysis Result
                                    </h2>
                                    <div className="markdown">
                                        <ReactMarkdown>
                                            {aiResultString
                                                .split("\n")
                                                .join("\n\n")}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            ) : (
                                <div className="job-actions p-4 border border-accent-2 flex flex-col gap-4">
                                    <h4 className="text-heading-4 font-semibold">
                                        Want to know which skills you need to
                                        improve your match score?
                                    </h4>
                                    <div className="stretch-start">
                                        {/* ผูก event onClick และทำปุ่ม disable ระหว่างโหลด */}
                                        <Button
                                            variant="primary"
                                            onClick={handleAnalyzeClick}
                                            disabled={isPendingAI}
                                        >
                                            {isPendingAI
                                                ? "Analyzing..."
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
