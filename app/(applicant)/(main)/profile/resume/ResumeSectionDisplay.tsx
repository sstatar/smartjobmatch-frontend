"use client";
import { autoFillResumeAction, uploadResumeAction } from "@/app/actions/resume";
import ButtonSecond from "@/components/ui/Button-2";
import ProfileVisibilitySelect from "@/components/ui/ProfileVisibilitySelectButton";
import ResumeFileCard from "@/components/ui/ResumeFileCard";
import ShowResumePreview from "@/components/ui/ShowResumePreview";
import { useEffect, useRef, useState } from "react";

type Step = "start" | "upload" | "done";

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
    const [isUploading, setIsUploading] = useState(false); //เผื่ออยากเพิ่มทีหลัง

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
                // 💡 เตรียม FormData เพื่อส่งให้ Server Action
                const formData = new FormData();
                formData.append("resume", selectedFile);

                // 💡 เรียกใช้ Server Action
                const result = await uploadResumeAction(formData);

                if (result.success) {
                    setStep("upload"); // สำเร็จ! หยุดรอให้ User กด Analyze เอง
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
        // 💡 สั่งให้ input[type="file"] ทำงานใหม่ทันที
        inputRef.current?.click();
    };

    const [isAutofilling, setIsAutofilling] = useState(false);

    const handleAutofillClick = async () => {
        setIsAutofilling(true);
        try {
            const res = await autoFillResumeAction();
            if (res.success) {
                alert("Autofill Success!");
            } else {
                alert("Autofill Failed!\n" + res.error);
            }
        } finally {
            setIsAutofilling(false);
        }
    };

    return (
        <>
            <div className="flex flex-col gap-3 bg-secondary p-6 rounded-lg w-full items-start">
                {step === "start" && (
                    <div className="flex flex-col gap-3">
                        <span>
                            you don&apos;t have any resume. Please upload your
                            resume to autofill your profile.
                        </span>
                        <ButtonSecond
                            variant="tertiary"
                            onClick={() => inputRef.current?.click()}
                        >
                            Upload Resume
                        </ButtonSecond>
                    </div>
                )}
                {/* สถานะ: อัปโหลดแล้ว (รอ Analyze) หรือ วิเคราะห์เสร็จแล้ว (Done) */}
                {(step === "upload" || step === "done") && (
                    <div className="flex flex-col gap-6 w-full">
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

                        <ButtonSecond
                            onClick={handleAutofillClick}
                            disabled={isAutofilling || isUploading}
                        >
                            {isAutofilling
                                ? "Autofilling…"
                                : "Autofill From Resume"}
                        </ButtonSecond>
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
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-100 p-4">
                    <div className="bg-white p-8 rounded-2xl max-w-4xl w-full relative">
                        <button
                            onClick={() => setShowPreview(false)}
                            className="absolute top-4 right-4 text-2xl hover:text-accent transition-colors"
                        >
                            ✕
                        </button>

                        <ShowResumePreview
                            file={fileToPreview} // ส่งตัวแปรใหม่ไป
                            onConfirm={() => setShowPreview(false)}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
// ดึงข้อมูลจาก API ว่ามีไฟล์ไหม ถ้าไม่มี set step == "start"  ถ้ามี set step == "done"

// step start : ไม่แสดง resumeUploadCardและโปรไฟล์ Visibility Select แต่จะ แสดงตัวอักษรแจ้งและปุ่มขึ้นให้อัพโหลด
// step upload : จะแสดง resumeUploadCard และโปรไฟล์ Visibility Select และเปลี่ยนปุ่มเป็น Analyze Resume (มีไฟล์ เอาชื่อไฟล์ วันที่เพิ่มไฟล์)
// step analyze : แสดง progressbarCard (ส่ง Progress เข้าไป)
// step done : จะแสดง resumeUploadCard และโปรไฟล์ Visibility Select และเปลี่ยนปุ่มเป็น Analyze Resume เป็น Success Analyzing (ใช้ชื่อไฟล์ วันที่เพิ่มไฟล์)
