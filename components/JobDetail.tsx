import Button from "./ui/Button-2";
import { JobCardData } from "./JobsList/JobsList.client";
import ReactMarkdown from "react-markdown";
import { AiAnalysisResults } from "./JobsList/JobAppliedList.client";

export default function JobDetail({
    job,
    isApplied = false,
    aiAnalysisResult = undefined,
}: {
    job: JobCardData | null;
    isApplied?: boolean;
    isNeededAiAction?: boolean;
    aiAnalysisResult?: AiAnalysisResults | undefined;
}) {
    const { aiScore, strengths, weaknesses, summary } = aiAnalysisResult || {};
    const aiResultString: string = `
**match score** : ${aiScore}
**strengths** : 
${strengths?.map((s) => `- ${s}`).join("\n")}
**weaknesses** : 
${weaknesses?.map((w) => `- ${w}`).join("\n")}
**summary** : ${summary}
`;

    return job ? (
        <div className="job-detail w-full">
            <div className="head flex justify-between items-center p-4 border border-accent-2 rounded-t-lg">
                <div className="title">
                    <h1>{job.title}</h1>
                    <p>{job.company.name}</p>
                    <p>
                        {job.salaryMin} - {job.salaryMax} {job.currency}
                    </p>
                </div>
                {!isApplied && <Button variant="primary">Apply Now</Button>}
            </div>
            <div className="job-description p-4 border border-accent-2">
                <h2 className="text-heading-4 font-semibold">Job Details</h2>
                <div className="markdown">
                    <ReactMarkdown>{job.description}</ReactMarkdown>
                </div>
            </div>
            <div className="bg-tertiary">
                {aiAnalysisResult ? (
                    <div className="job-actions p-4 border border-accent-2">
                        <h2 className="text-heading-4 font-semibold">
                            AI Analysis Result
                        </h2>
                        <div className="markdown">
                            <ReactMarkdown>
                                {aiResultString.split("\n").join("\n\n")}
                            </ReactMarkdown>
                        </div>
                    </div>
                ) : (
                    <div className="job-actions p-4 border border-accent-2 flex flex-col gap-4">
                        <h4 className="text-heading-4 font-semibold">
                            Want to know which skills you need to improve your
                            match score?
                        </h4>
                        <div className="stretch-start">
                            <Button variant="primary">Get AI Analysis</Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    ) : (
        <div className="job-detail-placeholder w-full flex justify-center">
            <h1 className="text-heading-3 p-10 border border-accent rounded-sm">
                Select a job to see details
            </h1>
        </div>
    );
}
