"use client"; // เพิ่มบรรทัดนี้เพื่อให้รองรับการใช้ useState และ Event Listener ใน Next.js

import { deleteJobById } from "@/app/actions/job";
import FilledBookmark from "@/public/svgs/bookmark-filled.svg";
import BookmarkIcon from "@/public/svgs/bookmark.svg";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import CircularProgress from "../../ui/CircularProgress";
import { JobCardData } from "./JobsList.client";

interface JobCardProps {
    jobData: JobCardData; // สมมติว่า jobData มีฟิลด์ id เพื่อส่งกลับไปตอนลบ/แก้ไข
    aiScore?: number | undefined;
    /**
     * Determines if the card is in the 'selected' or 'focused' state.
     * Changes border to black and adds a medium shadow.
     */
    isSelected?: boolean;
    showBookmark?: boolean;
    isBookmarked?: boolean;
    isOwner?: boolean; // เพิ่ม prop เพื่อเช็คว่าเป็นเจ้าของโพสต์หรือไม่
    onClick?: () => void;
    onBookmarkClick?: (jobId: string) => void;
}

export default function JobCard({
    jobData,
    aiScore = undefined,
    isSelected = false,
    showBookmark = true,
    isBookmarked = false,
    isOwner = false,
    onClick,
    onBookmarkClick,
}: JobCardProps) {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // AI Score fallback
    if (aiScore === undefined) {
        if (jobData.aiAnalysisResults?.length) {
            aiScore = jobData.aiAnalysisResults[0].aiScore;
        }
    }

    // Effect สำหรับการปิดเมนูเมื่อผู้ใช้คลิกพื้นที่อื่นบนหน้าจอ (Click outside)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Handler สำหรับแก้ไข
    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMenuOpen(false);
        // 3. ใช้ router.push ตรงนี้ได้เลย
        if (jobData.id) {
            router.push(`/jobs/${jobData.id}/edit`);
        }
    };

    // Handler สำหรับลบ
    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMenuOpen(false);

        try {
            if (confirm("Are you sure you want to delete this job post?")) {
                const result = await deleteJobById(jobData.id);

                // เช็คว่า Server Action ทำงานพลาดและส่ง Error Message กลับมาหรือไม่
                if (result?.error) {
                    alert(result.error);
                }
            }
        } catch (error) {
            if (!isRedirectError(error))
                alert(
                    "An unexpected error occurred from the Client or during communication.",
                );
        }
    };

    const handleBookmarkClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onBookmarkClick?.(jobData.id);
    };

    return (
        <div
            // ใช้ Design เดิมของคุณเป๊ะๆ ไม่เปลี่ยนคลาสสีหรือเงาเลย
            className={`job-card relative cursor-pointer flex flex-col md:flex-row md:items-center gap-4 p-4 w-full rounded-lg border bg-white transition-all duration-200 ease-in-out
            ${
                isSelected
                    ? "border-black shadow-xl"
                    : "border-gray-300 shadow-sm"
            }`}
            onClick={onClick}
        >
            {/* --- ส่วนประกอบเมนู Meatballs --- */}
            {isOwner && (
                <div
                    className="absolute top-4 right-4 z-10"
                    ref={menuRef}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Job options"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden flex flex-col">
                            <button
                                onClick={handleEdit}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Edit Job
                            </button>
                            <button
                                onClick={handleDelete}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                                Delete Job
                            </button>
                        </div>
                    )}
                </div>
            )}
            {/* --- จบส่วนประกอบเมนู Meatballs --- */}

            {/* กล่องคลุมเนื้อหาหลัก จัด flex ให้รองรับมือถือ */}
            <div className="card-info flex items-start md:items-center w-full justify-between min-w-0">
                <div className="job-short-info flex-1 min-w-0 pr-10">
                    {" "}
                    {/* เติม pr-10 ไว้กันข้อความไปชนกับปุ่ม 3 จุด */}
                    <div className="company-name font-medium text-subtitle-2 text-gray-600">
                        {jobData.company?.name}
                    </div>
                    {/* ปรับขนาดชื่องานให้ใหญ่ขึ้นนิดนึงบนจอใหญ่ */}
                    <h3 className="job-title font-semibold text-heading-5 md:text-heading-4 text-gray-900 break-words my-1">
                        {jobData.title}
                    </h3>
                    <div className="location font-medium text-subtitle-2 text-gray-500">
                        {jobData.location?.province
                            ? `${jobData.location?.province}, `
                            : ""}
                        {jobData.location?.country}
                    </div>
                    <div className="salary font-medium text-subtitle-2 text-gray-600 mt-1">
                        {jobData.salaryMin}
                        {jobData.salaryMin && jobData.salaryMax && " - "}
                        {jobData.salaryMax}
                        {jobData.salaryMin || jobData.salaryMax
                            ? ` ${jobData.currency}`
                            : ""}
                    </div>
                    <div className="mt-3">
                        <span
                            className={`text-xs px-2 py-0.5 rounded-full border ${
                                jobData.isActive
                                    ? "border-green-500 text-green-700 bg-green-50"
                                    : "border-gray-400 text-gray-600 bg-gray-100"
                            }`}
                        >
                            {jobData.isActive ? "Active" : "Inactive"}
                        </span>
                    </div>
                </div>

                {/* ส่วนคะแนน AI วงกลม (ให้อยู่ขวาบนในมือถือ และขวากลางในจอใหญ่) */}
                <div className="shrink-0 flex flex-col items-end gap-2">
                    {aiScore !== undefined && (
                        <div className="bg-white rounded-full shadow-sm">
                            <CircularProgress
                                percentage={aiScore}
                                size={64} // ปรับเล็กลงนิดนึงให้ดูพอดีกับการ์ด
                                strokeWidth={5}
                            />
                        </div>
                    )}

                    {/* ย้ายปุ่ม Bookmark มารวมไว้ฝั่งขวากับวงกลม AI (ถ้ามีการแสดง) */}
                    {showBookmark && (
                        <button
                            onClick={handleBookmarkClick}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label="Bookmark job"
                        >
                            {isBookmarked ? (
                                <FilledBookmark className="w-6 h-6 text-blue-600" />
                            ) : (
                                <BookmarkIcon className="w-6 h-6 text-gray-400 hover:text-gray-600" />
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
