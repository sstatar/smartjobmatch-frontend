// import { JobPost } from "@/app/actions/company";
import { JobPost } from "@/lib/api/endpoints/companiesApi";
import CandidateCard from "@/components/CandidateCard";
import JobDetailCard from "@/components/JobDetailCard";
import JobCard from "@/components/JobsList/JobCard";
import Button from "@/components/ui/Button-2";
import Link from "next/link";
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
        <div className="my-10 mx-20 flex flex-col gap-4">
            <section id="job-description" className="flex gap-4">
                <div className="banner w-1/3 flex flex-col gap-8 items-start">
                    <JobCard
                        jobData={{
                            ...job,
                            companyId: job.company.id,
                            categoryId: job.category.id,
                        }}
                        showBookmark={false}
                        isOwner={isOwner}
                    />
                    {/* TODO: add loading screen while finding candidates*/}
                    {/* TODO: hide the button if user role is applicant */}
                    {isOwner && (
                        <>
                            <Link href={`/jobs/${job.id}/candidates`}>
                                <Button variant="secondary">
                                    Find matching candidates
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
                <div className="w-2/3">
                    <JobDetailCard content={job.description} />
                </div>
            </section>
            {isOwner && (
                <section id="candidates">
                    <h1 className="text-heading-3 font-semibold">Candidates</h1>
                    <div className="mt-4 flex gap-3">
                        {/* TODO: if user role is applicant, hide this part */}
                        {candidates.length > 0
                            ? candidates.map((candidate) => (
                                  <CandidateCard
                                      key={`${candidate.id}`}
                                      candidate={{
                                          profileId: candidate.profileId,
                                          profilePictureUrl:
                                              candidate.profile.user
                                                  .profilePictureUrl,
                                          firstName:
                                              candidate.profile.user.firstName,
                                          lastName:
                                              candidate.profile.user.lastName,
                                          email: candidate.profile.user.email,
                                          summary:
                                              candidate.aiAnalysisResult
                                                  .summary,
                                          aiScore:
                                              candidate.aiAnalysisResult
                                                  .aiScore,
                                          status: candidate.status,
                                          aiAnalysisResult:
                                              candidate.aiAnalysisResult,
                                      }}
                                  />
                              ))
                            : "No candidates"}
                    </div>
                </section>
            )}
        </div>
    ) : (
        <div>{res.error}</div>
    );
}
