import { JobPost } from "@/app/actions/company";
import { getJobById } from "./service/jobs";
import ReactMarkdown from "react-markdown";
import JobCard from "@/components/JobsList/JobCard";
import Button from "@/components/ui/Button-2";
import CandidateCard from "@/components/CandidateCard";

export default async function Page({
    params,
}: {
    params: Promise<{ jobId: string }>;
}) {
    const { jobId } = await params;
    const res = await getJobById(jobId);
    const job: JobPost & {
        company: { id: string; name: string; logoUrl?: string };
        experienceLevel: { id: string; name: string };
        skillRequirements: { skill: { name: string } }[];
    } = res.data;

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
                    />
                    <Button variant="secondary">
                        Find matching candidates
                    </Button>
                </div>
                <div className="w-2/3 flex flex-col p-4 border border-gray-300 rounded-lg">
                    <h1 className="text-heading-3 font-semibold">
                        Job details
                    </h1>
                    <div className="markdown">
                        <ReactMarkdown>{job.description}</ReactMarkdown>
                    </div>
                </div>
            </section>
            <section id="candidates">
                <h1 className="text-heading-3 font-semibold">Candidates</h1>
                <div className="mt-4 flex gap-3">
                    {job.applications
                        ? job.applications.map((candidate) => (
                              <CandidateCard
                                  key={`${candidate.id}`}
                                  candidate={{
                                      profileId: candidate.profileId,
                                      profilePictureUrl:
                                          candidate.profile.user
                                              .profilePictureUrl,
                                      firstName:
                                          candidate.profile.user.firstName,
                                      lastName: candidate.profile.user.lastName,
                                      summary:
                                          candidate.aiAnalysisResult.summary,
                                      aiScore:
                                          candidate.aiAnalysisResult.aiScore,
                                      status: candidate.status,
                                  }}
                              />
                          ))
                        : "No candidates"}
                </div>
            </section>
        </div>
    ) : (
        <div>{res.error}</div>
    );
}
