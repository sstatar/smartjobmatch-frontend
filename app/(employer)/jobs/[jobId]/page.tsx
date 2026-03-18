// import { JobPost } from "@/app/actions/company";
import { JobPost } from "@/lib/api/endpoints/companiesApi";
import JobPostDetail from "./JobPostDetail";
import { getJobById } from "./service/jobs";

export default async function Page({
    params,
}: {
    params: Promise<{ jobId: string }>;
}) {
    const { jobId } = await params;
    const res = await getJobById(jobId);
    const isOwner = res.data?.isOwner;
    const job: JobPost & {
        company: { id: string; name: string; logoUrl?: string };
        experienceLevel: { id: string; name: string };
        skillRequirements: { skill: { name: string } }[];
    } = res.data;
    if (!job) return <div className="text-center">Job not found</div>;
    const candidates = Array.isArray(job.applications)
        ? job.applications.sort(
              (a, b) => b.aiAnalysisResult.aiScore - a.aiAnalysisResult.aiScore,
          )
        : [];

    return job ? (
        <JobPostDetail job={job} candidates={candidates} isOwner={isOwner} />
    ) : (
        <div>{res.error}</div>
    );
}
