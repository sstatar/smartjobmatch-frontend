import React from 'react';
type WorkItem = {
        id: number;
        period: string;
        company: string;
        position: string;
        summary?: string;
        descriptions?: string[];
    }

export default function WorkExperienceDisplay({ data }: { data: WorkItem[] }) {
    return (
        <div className="flex flex-col">
            {data.map((item) => (
                <div key={item.id} className="relative pl-8 pb-8 last:pb-0">
                    {/* เส้นแนวตั้ง Timeline */}
                    <div className="absolute left-[11px] top-2 bottom-0 w-[2px] bg-accent" />
                    
                    {/* วงกลม Timeline */}
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full border-2 border-accent bg-white z-10" />

                    {/* ข้อมูลเนื้อหา */}
                    <div className="flex flex-col gap-1">
                        <span className="text-gray-500 text-sm">{item.period}</span>
                        <h3 className="font-bold text-lg text-black">{item.company}</h3>
                        <p className="text-gray-800 font-medium">{item.position}</p>
                        
                        {/* Summary */}
                        {item.summary && (
                            <p className="text-gray-600 text-sm mt-1">{item.summary}</p>
                        )}

                        {/* Job Description (Bullet Points) */}
                        {item.descriptions && item.descriptions.length > 0 && (
                            <ul className="list-disc ml-5 mt-2 text-sm text-gray-600 space-y-1">
                                {item.descriptions.map((desc, index) => (
                                    <li key={index}>{desc}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
