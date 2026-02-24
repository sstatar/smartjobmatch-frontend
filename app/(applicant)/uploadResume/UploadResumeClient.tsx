"use client";

import { useState } from "react";
import ResumeUploadCard from "@/app/(applicant)/uploadResume/components/ResumeUploadCard";
import SkipButton from "@/components/ui/SkipButton";
import ProgressBar from "@/components/ui/ProgressBar";
import { useRouter } from "next/navigation";
import ShowResumePreview from "@/components/ui/ShowResumePreview";
import { analyzeResume } from "@/app/(applicant)/uploadResume/service/resumeService";

type Step = "upload" | "preview" | "analyzing";

export default function UploadResumeClient() {
    const router = useRouter();
    const [step, setStep] = useState<Step>("upload");
    const [file, setFile] = useState<File | null>(null);
    const [progress, setProgress] = useState(0);

    const handleAnalyze = async (selectedFile: File) => {
        try {
            setStep("analyzing");
            const result = await analyzeResume(selectedFile, (percent) => {
                setProgress(percent);
            });

            console.log("Analysis Result:", result);

            setTimeout(() => {
                router.push("/home");
            }, 500);
        } catch (error) {
            console.error("Error analyzing resume:", error);
            alert(
                "Sorry, an error occurred while analyzing your data. Please try again.",
            );
            setFile(null);
            setStep("upload");
        }
    };

    return (
        <>
            <div className="flex flex-col items-center gap-13">
                {step === "upload" && (
                    <>
                        <h1 className="text-accent text-heading-200 font-(--weight-heading)">
                            Would you like to personalize your search by
                            uploading a resume?
                        </h1>

                        <ResumeUploadCard
                            file={file}
                            onFileSelect={(f) => setFile(f)}
                            onPreview={() => setStep("preview")}
                            onAnalyze={() => {
                                if (file) handleAnalyze(file);
                            }}
                        />
                    </>
                )}

                {step === "preview" && file && (
                    <ShowResumePreview
                        file={file}
                        onConfirm={() => setStep("upload")}
                    />
                )}

                {step === "analyzing" && (
                    <div className="flex flex-col mt-30 gap-10">
                        <h1 className="text-accent text-heading-1 font-(--weight-heading)">
                            Analyze Your Resume
                        </h1>

                        <ProgressBar progress={progress} />
                    </div>
                )}
            </div>
            {step === "upload" && (
                <div className="mx-60 flex justify-end items-center gap-6">
                    <SkipButton href="/" />
                </div>
            )}
        </>
    );
}
