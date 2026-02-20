interface EducationItem {
    id: number;
    period: string;
    institution: string;
    degree: string;
    gpax?: string;
}

export default function EducationDisplay({ data }: { data: EducationItem[] }) {
    return (
        <div className="flex flex-col">
            {data.map((item, index) => (
                <div key={item.id} className="relative pl-8 pb-8 last:pb-0">
                    {/* เส้นแนวตั้ง */}
                    <div className="absolute left-[11px] top-2 bottom-0 w-[2px] bg-accent" />
                    
                    {/* วงกลม Timeline */}
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full border-2 border-accent bg-white z-10" />

                    {/* เนื้อหาข้อมูล */}
                    <div className="flex flex-col gap-1">
                        <span className="text-gray-500 text-sm">{item.period}</span>
                        <h3 className="font-bold text-lg text-black">{item.institution}</h3>
                        <p className="text-gray-700">{item.degree}</p>
                        {item.gpax && <p className="text-gray-700">{item.gpax}</p>}
                    </div>
                </div>
            ))}
        </div>
    );
}