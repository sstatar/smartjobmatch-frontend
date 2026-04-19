"use client";

import ResumeUploadCard from "@/app/(applicant)/uploadResume/components/ResumeUploadCard";
import { uploadResumeAndAnalyzeAction } from "@/app/actions/resume";
import ProgressBar from "@/components/ui/ProgressBar";
import ShowResumePreview from "@/components/ui/ShowResumePreview";
import SkipButton from "@/components/ui/SkipButton";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Step = "upload" | "preview" | "analyzing";

export default function UploadResumeClient() {
    const router = useRouter();
    const [step, setStep] = useState<Step>("upload");
    const [file, setFile] = useState<File | null>(null);
    const [progress, setProgress] = useState(0);

    const handleAnalyze = async (selectedFile: File) => {
        setStep("analyzing");
        setProgress(0);

        // 💡 1. เปิดโหมด Fake Progress วิ่งทีละ 5% รันทุกๆ ครึ่งวินาที
        const progressInterval = setInterval(() => {
            setProgress((prev) => (prev >= 90 ? 90 : prev + 5));
        }, 500);

        try {
            // 💡 2. Step 1: อัปโหลดไฟล์ไปที่ Backend ก่อน
            const formData = new FormData();
            formData.append("resume", selectedFile); // ชื่อ key "resume" ตามที่ uploadResumeAction รับ

            const uploadResult = await uploadResumeAndAnalyzeAction(formData);
            if (!uploadResult.success) {
                throw new Error(uploadResult.error);
            }

            // // 💡 3. Step 2: สั่งให้ AI วิเคราะห์ไฟล์ที่เพิ่งอัปโหลด
            // const analyzeResult = await analyzeResumeAction();
            // if (!analyzeResult.success) {
            //     throw new Error(analyzeResult.error);
            // }

            // 💡 4. เมื่อทุกอย่างเสร็จสมบูรณ์ หยุดหลอดและกระชากไป 100%
            clearInterval(progressInterval);
            setProgress(100);
            // console.log("Analyze Success!", analyzeResult.data);

            // รอให้ผู้ใช้เห็น 100% แป๊บนึง ค่อยเด้งไปหน้าโฮม
            setTimeout(() => {
                router.push("/profile/resume");
            }, 800);
        } catch (error) {
            // 💡 1. ลบ : any ออก ปล่อยให้มันเป็น unknown ไป
            clearInterval(progressInterval);
            console.error("Error pipeline:", error);

            // 💡 2. เช็คก่อนว่า error ที่โยนมาเป็นก้อน Error Object จริงไหม
            let errorMessage = "เกิดข้อผิดพลาดบางอย่าง กรุณาลองใหม่"; // ข้อความกันเหนียว

            if (error instanceof Error) {
                errorMessage = error.message; // ถ้าเป็น Error ค่อยดึง .message มาใช้
            } else if (typeof error === "string") {
                errorMessage = error; // ถ้าโยนมาเป็น String ก็จับใส่เลย
            }

            alert(`Analysis failed: ${errorMessage}`);
            setProgress(0);
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
