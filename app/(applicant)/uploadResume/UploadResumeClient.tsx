"use client";

import { useState } from "react";
import ResumeUploadCard from "@/app/(applicant)/uploadResume/components/ResumeUploadCard";
import SkipButton from "@/components/SkipButton";
import ProgressBar from "@/components/ui/ProgressBar";
import { useRouter } from "next/navigation";
import ShowResumePreview from "@/components/ui/ShowResumePreview";

type Step = "upload" | "preview" | "analyzing";

export default function UploadResumeClient() {
    const router = useRouter();
    const [step, setStep] = useState<Step>("upload");
    const [file, setFile] = useState<File | null>(null);
    const [progress, setProgress] = useState(0);

    const handleAnalyze = async (file: File) => {
        setStep("analyzing");
        setProgress(0);

        let value = 0;

        const interval = setInterval(() => {
            value += 10;
            setProgress(value);

            if (value >= 100) {
                clearInterval(interval);
                router.push("/");
            }
        }, 300);
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
