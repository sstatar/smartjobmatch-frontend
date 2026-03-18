import { CandidateResponseType } from "@/app/(employer)/jobs/[jobId]/candidates/service/candidate";
import RecommendCandidateCard from "./RecommendCandidateCard";

export default function RecommendCandidateList({
    candidates,
}: {
    candidates: CandidateResponseType[];
}) {
    const sortedCandidate = candidates.sort(
        (a, b) =>
            b.aiAnalysisResults[0].aiScore - a.aiAnalysisResults[0].aiScore,
    );
    return (
        <div className="flex flex-col gap-4">
            {sortedCandidate.map((candidate) => (
                <RecommendCandidateCard
                    key={candidate.id}
                    candidate={candidate}
                />
            ))}
        </div>
    );
}
