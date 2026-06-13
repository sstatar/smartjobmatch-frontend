import ArrowSmall from "@/public/svgs/arrow-small.svg";
export interface WorkExperienceProps {
    id: string;
    jobTitle: string;
    companyName: string;
    summary: string;
    descriptions: string[];
    startYear: number | null;
    startMonth: string;
    endYear: number | null;
    endMonth: string;
    isCurrent: boolean;
}

export default function WorkExperienceDisplay({
    data,
}: {
    data: WorkExperienceProps[];
}) {
    return (
        <div className="flex flex-col">
            {data.map((item) => (
                // 💡 1. คืนค่า pl-8 ของคุณกลับมา เพื่อเว้นระยะห่างจากวงกลม ไม่ให้มันตีกันครับ
                <div key={item.id} className="relative pl-8 pb-8 last:pb-0">
                    {/* เส้นแนวตั้ง */}
                    <div className="absolute left-[11px] top-2 bottom-0 w-[2px] bg-accent" />

                    {/* วงกลม Timeline */}
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full border-2 border-accent bg-white z-10" />

                    {/* กล่องเนื้อหาหลัก (คง break-words ไว้กันข้อความยาวดันจอพัง) */}
                    <div className="flex flex-col gap-1 break-words">
                        {/* 💡 2. คืนค่าดีไซน์วันที่เดิมของคุณ 100% (ไม่มีการลดขนาดฟอนต์หรือเปลี่ยนสี)
                            เติมแค่ flex-wrap ไว้กันเหนียวตัว ArrowSmall เบี้ยวเฉยๆ ครับ */}
                        <div className="flex flex-wrap items-center gap-2">
                            {item.startYear && <span>{item.startYear}</span>}
                            {item.startYear && item.startMonth && (
                                <span>-</span>
                            )}
                            {item.startMonth && <span>{item.startMonth}</span>}

                            <ArrowSmall />
                            {item.isCurrent ||
                            (!item.endYear && !item.endMonth) ? (
                                <span className="text-accent font-bold">
                                    Present
                                </span>
                            ) : (
                                <>
                                    {item.endYear && (
                                        <span>{item.endYear}</span>
                                    )}
                                    {item.endYear && item.endMonth && (
                                        <span>-</span>
                                    )}
                                    {item.endMonth && (
                                        <span>{item.endMonth}</span>
                                    )}
                                </>
                            )}
                        </div>

                        {/* ส่วนเนื้อหาด้านล่างปรับตามขนาดหน้าจอและคงดีไซน์ของคุณไว้ */}
                        <h3 className="font-bold text-base md:text-lg text-black">
                            {item.companyName}
                        </h3>
                        <p className="text-gray-800 font-medium text-sm md:text-base">
                            {item.jobTitle}
                        </p>

                        {item.summary && (
                            <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                                {item.summary}
                            </p>
                        )}

                        {/* Job Description (Bullet Points) */}
                        {item.descriptions && item.descriptions.length > 0 && (
                            <ul className="list-disc ml-5 mt-2 text-sm text-gray-600 space-y-1">
                                {item.descriptions.map((desc, index) => (
                                    <li key={index} className="leading-relaxed">
                                        {desc}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
