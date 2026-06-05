"use client";

import { useState } from "react";
import ResumeUploadCard from "@/app/(applicant)/uploadResume/components/ResumeUploadCard";
import SkipButton from "@/components/ui/SkipButton";
import ProgressBar from "@/components/ui/ProgressBar";
import { useRouter } from "next/navigation";
import ShowResumePreview from "@/components/applicant/ShowResumePreview";
import { analyzeResumeAction, uploadResumeAction } from "@/app/actions/resume";

type Step = "upload" | "preview" | "analyzing";

export default function UploadResumeClient() {
    const router = useRouter();
    const [step, setStep] = useState<Step>("upload");
    const [file, setFile] = useState<File | null>(null);
    const [progress, setProgress] = useState(0);

    const handleAnalyze = async (selectedFile: File) => {
        setStep("analyzing");
        setProgress(0);

        const progressInterval = setInterval(() => {
            setProgress((prev) => (prev >= 90 ? 90 : prev + 5));
        }, 500);

        try {
            const formData = new FormData();
            formData.append("resume", selectedFile);

            const uploadResult = await uploadResumeAction(formData);
            if (!uploadResult.success) {
                throw new Error(uploadResult.error);
            }

            const analyzeResult = await analyzeResumeAction();
            if (!analyzeResult.success) {
                throw new Error(analyzeResult.error);
            }

            clearInterval(progressInterval);
            setProgress(100);
            console.log("Analyze Success!", analyzeResult.data);

            setTimeout(() => {
                router.push("/profile/resume");
            }, 800);
        } catch (error) {
            clearInterval(progressInterval);
            console.error("Error pipeline:", error);

            let errorMessage = "เกิดข้อผิดพลาดบางอย่าง กรุณาลองใหม่";

            if (error instanceof Error) {
                errorMessage = error.message;
            } else if (typeof error === "string") {
                errorMessage = error;
            }

            alert(`Analysis failed: ${errorMessage}`);
            setProgress(0);
            setStep("upload");
        }
    };

    return (
        // 💡 1. เพิ่ม w-full และ max-w-4xl เพื่อคุมขนาดสูงสุดบนจอคอม
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center -mt-12 md:mt-0">
            <div className="flex flex-col items-center gap-8 md:gap-13 w-full">
                {step === "upload" && (
                    <>
                        {/* 💡 2. ใส่ text-center และ ปรับขนาดฟอนต์บนมือถือ */}
                        <h1 className="text-accent text-xl sm:text-2xl md:text-heading-200 font-(--weight-heading) text-center px-4">
                            Would you like to personalize your search by
                            <br className="hidden md:block" /> uploading a
                            resume?
                        </h1>

                        {/* 💡 3. หุ้มกล่องนี้ด้วย w-full เพื่อให้ขยายได้เต็มที่ตามที่ Layout นอกอนุญาต */}
                        <div className="w-full px-4 md:px-0">
                            <ResumeUploadCard
                                file={file}
                                onFileSelect={(f) => setFile(f)}
                                onPreview={() => setStep("preview")}
                                onAnalyze={() => {
                                    if (file) handleAnalyze(file);
                                }}
                            />
                        </div>
                    </>
                )}

                {step === "preview" && file && (
                    <div className="w-full px-4 md:px-0">
                        <ShowResumePreview
                            file={file}
                            onConfirm={() => setStep("upload")}
                        />
                    </div>
                )}

                {step === "analyzing" && (
                    // 💡 4. ลด margin-top บนจอมือถือ (mt-16) และคง mt-30 บนจอคอม
                    <div className="flex flex-col md: gap-8 md:gap-10 w-full px-4 md:px-20 text-center">
                        <h1 className="text-accent text-xl md:text-heading-1 font-(--weight-heading)">
                            Analyzing Your Resume...
                        </h1>
                        <ProgressBar progress={progress} />
                    </div>
                )}
            </div>

            {/* 💡 5. แก้จุดตาย! เปลี่ยน mx-60 เป็นการจัด justify แทน */}
            {step === "upload" && (
                <div className="w-full mt-8 md:mt-10 flex justify-end px-6 md:px-8">
                    <SkipButton href="/" />
                </div>
            )}
        </div>
    );
}
