// Components/(formUser)/(FromContent)/WorkExperienceItem.tsx
import React from "react";
import InputBox from "@/components/ui/InputBox";
import BulletPointInput from "./BulletPointInput";
import { WorkData } from "./WorkExperienceForm";

type WorkItemProps = {
    data: WorkData;
    index: number;
    onDelete: () => void;
    onChange: (
        field: keyof WorkData,
        value: string | boolean | string[],
    ) => void;
};

export default function WorkExperienceItem({
    data,
    index,
    onDelete,
    onChange,
}: WorkItemProps) {
    return (
        <div className="mb-10 relative">
            <div className="flex items-center gap-3 mb-6">
                <h2 className="text-xl font-bold text-accent">
                    Work Experience {index + 1}
                </h2>
                <button
                    type="button"
                    onClick={onDelete}
                    className="p-1.5 text-gray-500 hover:bg-gray-200 rounded-full cursor-pointer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    </svg>
                </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                    <InputBox
                        text="Job Title"
                        required
                        value={data.jobTitle || ""}
                        onChange={(e) => onChange("jobTitle", e.target.value)}
                    />
                </div>
                <div className="col-span-2">
                    <InputBox
                        text="Company"
                        required
                        value={data.companyName || ""}
                        onChange={(e) =>
                            onChange("companyName", e.target.value)
                        }
                    />
                </div>
                <div className="col-span-1">
                    <InputBox
                        text="Start Date"
                        type="month"
                        value={data.startDate || ""}
                        onChange={(e) => onChange("startDate", e.target.value)}
                    />
                </div>
                <div className="col-span-1 flex flex-col gap-3">
                    <InputBox
                        text="End Date"
                        type="month"
                        value={data.endDate || ""}
                        onChange={(e) => onChange("endDate", e.target.value)}
                        disabled={data.isCurrent}
                    />
                    <label className="flex items-center gap-2 cursor-pointer mt-1">
                        <input
                            type="checkbox"
                            className="w-5 h-5 rounded text-emerald-400 accent-emerald-400"
                            checked={data.isCurrent || false}
                            onChange={(e) => {
                                onChange("isCurrent", e.target.checked);
                                if (e.target.checked) onChange("endDate", "");
                            }}
                        />
                        <span className="text-sm">I currently work here</span>
                    </label>
                </div>

                <div className="col-span-2">
                    <label className="text-sm font-bold text-accent block mb-2">
                        Experience Summary
                    </label>
                    <textarea
                        value={data.summary || ""}
                        onChange={(e) => onChange("summary", e.target.value)}
                        placeholder="Briefly describe your role or achievements..."
                        rows={4} // 💡 กำหนดความสูงเริ่มต้น (4 บรรทัด)
                        className="w-full bg-accent-2 rounded-md px-4 py-3 border border-gray-100 focus:outline-none focus:ring-1 focus:ring-accent text-subtitle-2 resize-none"
                    />
                </div>

                <BulletPointInput
                    points={data.descriptions || []}
                    onUpdate={(newPoints) =>
                        onChange("descriptions", newPoints)
                    }
                />
            </div>
            <hr className="mt-10 border-gray-200" />
        </div>
    );
}
