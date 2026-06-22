import { JobPost } from "@/lib/api/endpoints/companiesApi";
import JobDetailCard from "@/components/shared/JobDetailCard";
import JobCard from "@/components/shared/JobsList/JobCard";
import { getJobById } from "../service/jobs";
import {
    CandidateResponseType,
    getCandidateRecommendations,
} from "./service/candidate";
import RecommendCandidateList from "@/components/employer/RecommendCandidatesList";

export default async function Page({
    params,
}: {
    params: Promise<{ jobId: string }>;
}) {
    const { jobId } = await params;
    const resJob = await getJobById(jobId);
    const job: JobPost & {
        company: { id: string; name: string; logoUrl?: string };
        experienceLevel: { id: string; name: string };
        skillRequirements: { skill: { name: string } }[];
    } = resJob.data;

    const resCandidate = await getCandidateRecommendations(jobId);
    const candidates: CandidateResponseType[] = resCandidate.data;

    return job ? (
        // 1. เปลี่ยนจาก flex เฉยๆ เป็น flex-col บนมือถือ และ lg:flex-row บนหน้าจอใหญ่
        // 2. ปรับระยะขอบ (Margin) ให้พอดีกับมือถือ (mx-4)
        <div className="mx-4 md:mx-10 mb-10 flex flex-col lg:flex-row gap-6 md:gap-8 justify-center">
            {/* ฝั่งซ้าย: ข้อมูลงาน */}
            {/* 3. ให้กางเต็ม 100% บนมือถือ (w-full) และบีบเหลือ 1/3 บนจอคอม */}
            {/* 💡 แอบเติม lg:sticky lg:top-8 self-start ให้กล่องนี้เกาะติดหน้าจอตามลงมาตอนเลื่อนดูผู้สมัครเยอะๆ ฝั่งขวาครับ */}
            <div className="job-description w-full lg:w-1/3 flex flex-col gap-4 lg:sticky lg:top-8 self-start">
                <JobCard
                    jobData={{
                        ...job,
                        companyId: job.company.id,
                        categoryId: job.category.id,
                    }}
                    showBookmark={false}
                />
                <div>
                    <JobDetailCard content={job.description} />
                </div>
            </div>

            {/* ฝั่งขวา: รายชื่อ Candidate */}
            {/* 4. ให้กางเต็ม 100% บนมือถือ (w-full) และใช้ 2/3 บนจอคอม */}
            <div className="candidates w-full lg:w-2/3 flex flex-col gap-4">
                <h1 className="text-heading-4 md:text-heading-3 font-semibold text-gray-900">
                    Pick for you
                </h1>

                {/* 5. ตกแต่งหน้า Empty State (ตอนหาคนไม่เจอ) ให้ดูเป็นกล่องสวยงามแทนการใช้ <h1> เปล่าๆ */}
                {candidates.length === 0 ? (
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-10 flex flex-col items-center justify-center text-center gap-2">
                        <span className="text-3xl">🔍</span>
                        <h3 className="text-lg font-medium text-gray-900">
                            No candidates found
                        </h3>
                        <p className="text-sm text-gray-500">
                            We couldn&apos;t find any recommended candidates for this
                            position right now.
                        </p>
                    </div>
                ) : (
                    <RecommendCandidateList candidates={candidates} />
                )}
            </div>
        </div>
    ) : (
        // ปรับแก้หน้าโหลดไม่ขึ้น (Fallback) ให้ดูสะอาดตาขึ้น
        <div className="flex flex-col items-center justify-center h-[50vh] text-gray-500">
            <h2 className="text-xl font-semibold">Job not found</h2>
            <p className="text-sm mt-2">
                The job post you are looking for does not exist or has been
                removed.
            </p>
        </div>
    );
}
