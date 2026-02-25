import Image from "next/image";
import CircularProgress from "./ui/CircularProgress";

export type CandidateProps = {
    profileId: string;
    profilePictureUrl?: string;
    firstName: string;
    email: string;
    lastName: string;
    summary: string;
    aiScore: number;
    status: string;
};

export default function CandidateCard({
    candidate,
}: {
    candidate: CandidateProps;
}) {
    return (
        <div className="cursor-pointer border border-gray-300 rounded-lg p-4 flex flex-col gap-3 min-w-70">
            <div className="flex justify-between">
                {candidate.profilePictureUrl ? (
                    <Image
                        width={400}
                        height={400}
                        src={candidate.profilePictureUrl}
                        alt={candidate.firstName}
                        className="w-20 h-20 rounded-full object-cover border"
                    />
                ) : (
                    <div className="w-20 h-20 bg-gray-300 rounded-full" />
                )}
                <CircularProgress size={80} percentage={candidate.aiScore} />
            </div>
            <div className="flex flex-col">
                <h1>
                    {candidate.firstName} {candidate.lastName}
                </h1>
                <h1>{candidate.email}</h1>
                <h1>
                    status :{" "}
                    <span className="text-subtitle-2 font-thin text-blue-500">
                        {candidate.status}
                    </span>
                </h1>
            </div>
        </div>
    );
}
