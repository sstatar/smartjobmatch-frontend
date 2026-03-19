import { JobPost } from "@/lib/api/endpoints/companiesApi";
import JobDetailCard from "@/components/JobDetailCard";
import JobCard from "@/components/JobsList/JobCard";
import { getJobById } from "../service/jobs";
import {
    CandidateResponseType,
    getCandidateRecommendations,
} from "./service/candidate";
import RecommendCandidateList from "@/components/RecommendCandidatesList";

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
        <div className="mx-10 mb-10 flex gap-8 justify-center">
            <div className="job-description w-1/3 flex flex-col gap-4">
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
            <div className="candidates w-2/3 flex flex-col gap-4">
                <h1 className="text-heading-3 font-semibold">Pick for you</h1>
                {candidates.length === 0 ? (
                    <h1>No candidates</h1>
                ) : (
                    <RecommendCandidateList candidates={candidates} />
                )}
            </div>
        </div>
    ) : (
        <div>
            empty<h1>div</h1>
        </div>
    );
}
