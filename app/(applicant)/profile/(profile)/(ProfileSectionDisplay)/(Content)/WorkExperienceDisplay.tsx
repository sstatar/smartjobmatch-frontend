import ArrowSmall from '@/public/svgs/arrow-small.svg';
export interface WorkExperienceProps {
    id: number;
    jobTitle: string;
    companyName: string;
    description: string;
    startDate: string;
    endDate: string;
}

export default function WorkExperienceDisplay({
    data,
}: {
    data: WorkExperienceProps[];
}) {
    return (
        <div className="flex flex-col">
            {data.map((item) => (
                <div key={item.id} className="relative pl-8 pb-8 last:pb-0">
                    <div className="absolute left-[11px] top-2 bottom-0 w-[2px] bg-accent" />

                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full border-2 border-accent bg-white z-10" />

                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <span>
                                {item.startDate}
                            </span>
                            <ArrowSmall />
                            <span>
                                {item.endDate}
                            </span>
                        </div>
                        <h3 className="font-bold text-lg text-black">
                            {item.companyName}
                        </h3>
                        <p className="text-gray-800 font-medium">
                            {item.jobTitle}
                        </p>

                        {item.description && (
                            <p className="text-gray-600 text-sm mt-1">
                                {item.description}
                            </p>
                        )}

                        {/* Job Description (Bullet Points) */}
                        {/* {item.descriptions && item.descriptions.length > 0 && (
                            <ul className="list-disc ml-5 mt-2 text-sm text-gray-600 space-y-1">
                                {item.descriptions.map((desc, index) => (
                                    <li key={index}>{desc}</li>
                                ))}
                            </ul>
                        )} */}
                    </div>
                </div>
            ))}
        </div>
    );
}
