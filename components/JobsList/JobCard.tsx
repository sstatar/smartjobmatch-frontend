import BookmarkIcon from "@/public/svgs/bookmark.svg";
import CircularProgress from "../ui/CircularProgress";
import { JobCardData } from "./JobsList.client";

interface JobCardProps {
    jobData: JobCardData;
    aiScore?: number | undefined;
    /**
     * Determines if the card is in the 'selected' or 'focused' state.
     * Changes border to black and adds a medium shadow.
     */
    isSelected?: boolean;
    onClick?: () => void;
}

export default function JobCard({
    jobData,
    aiScore = undefined,
    isSelected = false, // Default เป็น false (โหมดปกติ)
    onClick,
}: JobCardProps) {
    if (aiScore === undefined) {
        if (jobData.aiAnalysisResults?.length) {
            aiScore = jobData.aiAnalysisResults[0].aiScore;
        }
    }

    return (
        <div
            className={`job-card flex gap-1.75 p-4 w-full rounded-lg border bg-white transition-all duration-200 ease-in-out
            ${
                isSelected
                    ? "border-black shadow-xl" // Styles เมื่อถูกเลือก (ขอบดำ + เงาเพิ่มขึ้น)
                    : "border-gray-300 shadow-sm" // Styles ปกติ
            }`}
            onClick={onClick}
        >
            <div className="card-info flex items-center w-full justify-between">
                <div className="job-short-info ml-4">
                    <div className="company-name font-medium text-subtitle-2">
                        {jobData.company?.name}
                    </div>
                    <div className="job-title font-semibold text-heading-4">
                        {jobData.title}
                    </div>
                    <div className="location font-medium text-subtitle-2">
                        {jobData.location?.province
                            ? `${jobData.location?.province}, `
                            : ""}
                        {jobData.location?.country}
                    </div>
                    <div className="salary font-medium text-subtitle-2">
                        {jobData.salaryMin !== null &&
                        jobData.salaryMax !== null &&
                        jobData.currency
                            ? `${jobData.salaryMin.toLocaleString()} - ${jobData.salaryMax.toLocaleString()} ${jobData.currency}`
                            : "Salary not specified"}
                    </div>
                </div>
                <div className="shrink-0">
                    <>
                        {aiScore && (
                            <>
                                <CircularProgress
                                    percentage={aiScore}
                                    size={72}
                                    strokeWidth={6}
                                />
                            </>
                        )}
                    </>
                    {/* <CircularProgress
                        percentage={80}
                        size={72}
                        strokeWidth={6}
                    /> */}
                </div>
            </div>
            {/* <BookmarkIcon className="w-6 h-6 text-accent" /> */}
            <BookmarkIcon className="w-6 h-6 text-accent stroke-2 fill-current" />
        </div>
    );
}
