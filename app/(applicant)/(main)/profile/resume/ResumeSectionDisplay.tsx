"use client";
import ResumeFileCard from "@/components/applicant/ResumeFileCard";
import ProfileVisibilitySelect from "@/components/ui/ProfileVisibilitySelectButton";
import ButtonSecond from "@/components/ui/Button-2";
import { useEffect, useRef, useState } from "react";
import ProgressBarCard from "@/components/applicant/ProgressBarCard";
import { autoFillResumeAction, uploadResumeAction } from "@/app/actions/resume";
import ShowResumePreview from "@/components/applicant/ShowResumePreview";

// 💡 เปลี่ยนจาก "analyze" เป็น "autofill" ให้ตรงกับการทำงานจริง
type Step = "start" | "upload" | "autofill" | "done";

interface Props {
    initialStep: Step;
    resumeData?: {
        fileName: string;
        uploadDate: string;
        isSearchable: boolean;
        resumeUrl: string;
        isResumeAnalyzed: boolean;
    };
}

export default function ResumeSectionDisplay({
    initialStep,
    resumeData,
}: Props) {
    const [step, setStep] = useState<Step>(initialStep);
    const [file, setFile] = useState<File | null>(null);
    const [progress, setProgress] = useState(0);
    const [showPreview, setShowPreview] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const fileToPreview = file || resumeData?.resumeUrl;

    useEffect(() => {
        setStep(initialStep);
    }, [initialStep]);

    const onFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setIsUploading(true);

            try {
                const formData = new FormData();
                formData.append("resume", selectedFile);
                const result = await uploadResumeAction(formData);

                if (result.success) {
                    setStep("upload");
                } else {
                    alert(`Upload failed: ${result.error}`);
                    setStep(resumeData?.resumeUrl ? "upload" : "start");
                }
            } catch (error) {
                console.error("Unexpected Error:", error);
                alert("An unexpected error occurred during upload.");
            } finally {
                setIsUploading(false);
            }
        }
    };

    const handleReplace = () => {
        inputRef.current?.click();
    };

    const handleAutofillClick = async () => {
        // 💡 เปลี่ยนมาใช้ "autofill"
        setStep("autofill");
        setProgress(10);

        const interval = setInterval(() => {
            setProgress((prev) => (prev < 90 ? prev + 5 : prev));
        }, 1000);

        try {
            const res = await autoFillResumeAction();
            clearInterval(interval);

            if (res.success) {
                setProgress(100);
                setTimeout(() => {
                    alert(
                        "Autofill Success! เติมข้อมูลลงในโปรไฟล์เรียบร้อยแล้ว",
                    );
                    setStep("upload");
                    setProgress(0);
                }, 500);
            } else {
                alert(`Autofill Failed! \n${res.error}`);
                setStep("upload");
                setProgress(0);
            }
        } catch (error) {
            clearInterval(interval);
            console.error("Unexpected Error:", error);
            alert("An unexpected error occurred.");
            setStep("upload");
            setProgress(0);
        }
    };

    return (
        <>
            <div className="flex flex-col gap-4 md:gap-6 bg-secondary p-4 md:p-6 rounded-lg w-full items-start">
                {step === "start" && (
                    <div className="flex flex-col gap-3 w-full">
                        <span className="text-gray-600 text-sm md:text-base">
                            You don’t have any resume. Please upload your resume
                            to autofill your profile.
                        </span>
                        <ButtonSecond
                            variant="tertiary"
                            className="h-10! px-6! text-sm! w-full md:w-fit! rounded-xl!"
                            onClick={() => inputRef.current?.click()}
                            disabled={isUploading}
                        >
                            {isUploading ? "Uploading..." : "Upload Resume"}
                        </ButtonSecond>
                    </div>
                )}

                {/* 💡 เปลี่ยนจุดเช็คเงื่อนไขเป็น "autofill" */}
                {(step === "upload" ||
                    step === "autofill" ||
                    step === "done") && (
                    <div className="flex flex-col gap-4 md:gap-5 w-full">
                        <ProfileVisibilitySelect
                            isSearchable={
                                resumeData?.isSearchable ? "public" : "private"
                            }
                        />
                        <ResumeFileCard
                            step={step}
                            resumeName={
                                file
                                    ? file.name
                                    : resumeData?.fileName || "Resume.pdf"
                            }
                            dateAdded={
                                file
                                    ? "Just now"
                                    : resumeData?.uploadDate || "01/01/2026"
                            }
                            onPreview={() => setShowPreview(true)}
                            onReplace={handleReplace}
                        />
                        {/* 💡 แสดง Progress Bar ตอน step เป็น "autofill" */}
                        {step === "autofill" && (
                            <div className="w-full py-1">
                                {/* 💡 ส่งคำใหม่เข้าไปให้ตรงกับบริบทของการ Autofill */}
                                <ProgressBarCard
                                    progress={progress}
                                    title="Autofilling Your Profile"
                                />
                            </div>
                        )}
                        
                        {(step === "upload" || step === "done") && (
                            <ButtonSecond
                                className="h-10! px-6! text-sm! w-full md:w-fit! md:text-xl! rounded-xl! mt-1"
                                onClick={handleAutofillClick}
                            >
                                Autofill From Resume
                            </ButtonSecond>
                        )}
                    </div>
                )}
            </div>

            <input
                type="file"
                ref={inputRef}
                className="hidden"
                onChange={onFileSelected}
                accept=".pdf"
            />

            {showPreview && fileToPreview && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-0 md:p-4 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
                    <div className="bg-white w-full max-w-4xl h-full md:h-auto md:max-h-[90vh] p-4 md:p-8 rounded-none md:rounded-2xl shadow-xl flex flex-col relative animate-in fade-in zoom-in duration-200">
                        <button
                            onClick={() => setShowPreview(false)}
                            className="absolute top-2 right-2 md:top-4 md:right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-colors z-10"
                        >
                            ✕
                        </button>

                        <div className="flex-1 overflow-y-auto mt-8 md:mt-0">
                            <ShowResumePreview
                                file={fileToPreview}
                                onConfirm={() => setShowPreview(false)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
