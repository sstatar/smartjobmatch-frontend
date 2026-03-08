import ArrowSmall from "@/public/svgs/arrow-small.svg";
import { Span } from "next/dist/trace";

export interface EducationProps {
    id: number;
    startMonth: string;
    startYear: string;
    graduationYear: string;
    graduationMonth: string;
    university: string;
    degreeLevelName: string;
    fieldOfStudy: string;
    gpa: string;
}

export default function EducationDisplay({ data }: { data: EducationProps[] }) {
    return (
        <div className="flex flex-col">
            {data.map((item) => (
                <div key={item.id} className="relative pl-8 pb-8 last:pb-0">
                    {/* เส้นแนวตั้ง */}
                    <div className="absolute left-[11px] top-2 bottom-0 w-[2px] bg-accent" />

                    {/* วงกลม Timeline */}
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full border-2 border-accent bg-white z-10" />

                    {/* เนื้อหาข้อมูล */}
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            {item.startYear && (<span>{item.startYear}</span>)}
                            {item.startYear && item.startMonth && (<span>-</span>)}
                            {item.startMonth &&(<span>{item.startYear}</span>)}
                            
                            <ArrowSmall />
                            {item.graduationYear && (<span>{item.graduationYear}</span>)}
                            {item.graduationYear && item.graduationMonth && (<span>-</span>)}
                            {item.graduationMonth &&(<span>{item.graduationYear}</span>)}
                        </div>
                        <h3 className="font-bold text-lg text-black">
                            {item.university}
                        </h3>
                        <div>
                            {item.degreeLevelName}
                            {item.fieldOfStudy &&
                                item.fieldOfStudy !== "null" && (
                                    <> in {item.fieldOfStudy}</>
                                )}
                        </div>
                        {item.gpa && Number(item.gpa) !== 0 && (
                            <p className="text-gray-700 font-medium">
                                GPAX: {item.gpa}
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
