"use client";

import { aiAnalyzeJob } from "@/app/actions/ai-analyze"; // import ฟังก์ชัน Server Action
import { applyForJob } from "@/app/actions/application";
import { useState, useTransition } from "react";
import ReactMarkdown from "react-markdown";
import Button from "../../ui/Button-2";
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
        <div className="sticky top-0">
            <div className="max-h-screen overflow-y-auto">
                <div className="job-detail w-full sticky top-4 bg-white"> 
                    
                    {/* 💡 1. คง flex-row ไว้เสมอ ไม่ว่าจะจอมือถือหรือจอคอม (ลบ flex-col ออก) 
                        และปรับ gap ให้น้อยลงบนมือถือ (gap-2) เพื่อประหยัดพื้นที่ */}
                    <div className="head flex flex-row justify-between items-start lg:items-center gap-2 lg:gap-4 p-4 border border-accent-2 rounded-t-lg">
                        
                        {/* 💡 2. ให้กล่องข้อความยืดหยุ่นด้วย flex-1 และใช้ min-w-0 เพื่อห้ามข้อความดันทะลุกล่อง */}
                        <div className="flex flex-col gap-1 lg:gap-2 flex-1 min-w-0">
                            
                            {/* ส่วนหัว: ชื่อตำแหน่งและชื่อบริษัท */}
                            <div>
                                {/* 💡 ลดขนาดตัวหนังสือบนมือถือเป็น text-xl และใส่ line-clamp-2 เผื่อชื่อยาวเกินไป */}
                                <h1 className="text-xl lg:text-3xl font-bold text-gray-900 tracking-tight break-words line-clamp-2">
                                    {job.title}
                                </h1>
                                <p className="text-sm lg:text-lg font-medium text-blue-600 mt-1 truncate">
                                    {job.company.name}
                                </p>
                            </div>

                            {/* ส่วนรายละเอียด: เงินเดือน และ สถานที่ */}
                            <div className="flex flex-col xl:flex-row xl:items-center gap-y-1 gap-x-6 text-gray-600 text-xs lg:text-base">
                                <div className="flex items-center gap-1 lg:gap-2">
                                    <span className="font-semibold text-gray-800">
                                        {formatSalary(job.salaryMin)} -{" "}
                                        {formatSalary(job.salaryMax)}{" "}
                                        {job.currency}
                                    </span>
                                </div>

                                {locationString && (
                                    <div className="flex items-center gap-1 truncate">
                                        <LocationIcon className="w-4 h-4 lg:w-5 lg:h-5 shrink-0" />
                                        <span className="truncate">{locationString}</span>
                                    </div>
                                )}
                            </div>

                            {/* ส่วนป้ายกำกับ (Badges) */}
                            <div className="flex flex-wrap gap-1 lg:gap-2 mt-1">
                                {job.workplaceType && (
                                    <span className="px-2 py-0.5 lg:px-3 lg:py-1 bg-blue-50 text-blue-700 text-xs lg:text-sm font-medium rounded-full border border-blue-100 whitespace-nowrap">
                                        {job.workplaceType}
                                    </span>
                                )}
                                {job.employmentType?.name && (
                                    <span className="px-2 py-0.5 lg:px-3 lg:py-1 bg-gray-50 text-gray-700 text-xs lg:text-sm font-medium rounded-full border border-gray-200 whitespace-nowrap">
                                        {job.employmentType.name}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* 💡 3. ฝั่งปุ่ม: หดขนาดลง (shrink-0) เพื่อไม่ให้โดนบีบ และปรับขนาดปุ่มให้เล็กลงบนมือถือ */}
                        <div className="shrink-0 flex items-start lg:items-center">
                            {userRole === "APPLICANT" &&
                                (!localIsApplied ? (
                                    <Button
                                        variant="primary"
                                        onClick={handleApplyClick}
                                        disabled={isApplying}
                                        // 💡 ปรับลด padding และขนาดตัวหนังสือของปุ่ม (ถ้าคอมโพเนนต์ Button รองรับ className)
                                        className="!px-3 !py-2 !h-auto !text-sm lg:!px-7.5 lg:!py-3 lg:!h-[56px] lg:!text-base whitespace-nowrap"
                                    >
                                        {isApplying ? "Applying..." : "Apply Now"}
                                    </Button>
                                ) : (
                                    <span className="inline-block text-green-600 font-semibold px-3 py-1.5 lg:px-4 lg:py-2 text-sm lg:text-base bg-green-50 rounded-md whitespace-nowrap">
                                        Applied
                                    </span>
                                ))}
                        </div>
                    </div>

                    {/* ส่วน Job Description (ดีไซน์เดิมของคุณเป๊ะๆ) */}
                    <div className="job-description p-4 border border-accent-2 border-t-0 bg-white"> {/* 💡 เติม border-t-0 เพื่อไม่ให้เส้นขอบทับซ้อนกัน 2 เส้น */}
                        <h2 className="text-heading-4 font-semibold">
                            Job Details
                        </h2>
                        <div className="markdown mt-2">
                            <ReactMarkdown>{job.description}</ReactMarkdown>
                        </div>
                    </div>

                    {/* ส่วน AI Analysis (ดีไซน์เดิมของคุณเป๊ะๆ) */}
                    {userRole === "APPLICANT" && (
                        <div className="bg-tertiary">
                            {analysisResult ? (
                                <div className="job-actions p-4 border border-accent-2 border-t-0 bg-tertiary rounded-b-lg">
                                    <h2 className="text-heading-4 font-semibold">
                                        AI Analysis Result
                                    </h2>
                                    <div className="markdown mt-2">
                                        <ReactMarkdown>
                                            {aiResultString.split("\n").join("\n\n")}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            ) : (
                                <div className="job-actions p-4 border border-accent-2 border-t-0 bg-tertiary rounded-b-lg flex flex-col gap-4">
                                    <h4 className="text-heading-4 font-semibold">
                                        Want to know which skills you need to improve your match score?
                                    </h4>
                                    <div className="stretch-start">
                                        <Button
                                            variant="primary"
                                            onClick={handleAnalyzeClick}
                                            disabled={isPendingAI}
                                        >
                                            {isPendingAI ? "Analyzing..." : "Get AI Analysis"}
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
};
