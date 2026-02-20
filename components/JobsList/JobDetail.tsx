"use client";

import { aiAnalyzeJob } from "@/app/actions/ai-analyze"; // import ฟังก์ชัน Server Action
import { applyForJob } from "@/app/actions/application";
import { useState, useTransition } from "react";
import ReactMarkdown from "react-markdown";
import Button from "../ui/Button-2";
import { AiAnalysisResults } from "./JobAppliedList.client";
import { JobCardData } from "./JobsList.client";

export default function JobDetail({
    job,
    isApplied = false,
    aiAnalysisResult = undefined,
}: {
    job: JobCardData | null;
    isApplied?: boolean;
    isNeededAiAction?: boolean;
    aiAnalysisResult?: AiAnalysisResults | undefined;
}) {
    // State สำหรับ AI
    const [analysisResult, setAnalysisResult] = useState<
        AiAnalysisResults | undefined
    >(aiAnalysisResult);

    // State สำหรับเช็คว่าสมัครงานนี้ไปหรือยัง (เอาค่า isApplied จาก Props มาเป็นค่าเริ่มต้น)
    const [localIsApplied, setLocalIsApplied] = useState<boolean>(isApplied);

    const [isPendingAI, startTransitionAI] = useTransition();

    // เพิ่ม useTransition สำหรับปุ่มสมัครงาน
    const [isApplying, startTransitionApply] = useTransition();

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
                alert("สมัครงานสำเร็จ!");
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

    return (
        <div className="sticky top-4">
            <div className="max-h-screen overflow-y-auto">
                {job ? (
                    <div className="job-detail w-full sticky top-4">
                        <div className="head flex justify-between items-center p-4 border border-accent-2 rounded-t-lg">
                            <div className="title">
                                <h1>{job.title}</h1>
                                <p>{job.company.name}</p>
                                <p>
                                    {job.salaryMin} - {job.salaryMax}{" "}
                                    {job.currency}
                                </p>
                            </div>
                            {/* ปรับปรุงปุ่ม Apply Now */}
                            {!localIsApplied ? (
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
                            )}
                        </div>
                        <div className="job-description p-4 border border-accent-2">
                            <h2 className="text-heading-4 font-semibold">
                                Job Details
                            </h2>
                            <div className="markdown">
                                <ReactMarkdown>{job.description}</ReactMarkdown>
                            </div>
                        </div>
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
                    </div>
                ) : (
                    <div className="job-detail-placeholder w-full flex justify-center">
                        <h1 className="text-heading-3 p-10 border border-accent rounded-sm">
                            Select a job to see details
                        </h1>
                    </div>
                )}
            </div>
        </div>
    );
}
