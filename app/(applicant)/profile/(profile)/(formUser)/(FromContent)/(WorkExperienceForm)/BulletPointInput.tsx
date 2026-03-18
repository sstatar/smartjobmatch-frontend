// Components/(formUser)/(FromContent)/BulletPointInput.tsx
import React from "react";

type BulletProps = {
    points: string[];
    onUpdate: (newPoints: string[]) => void;
};

export default function BulletPointInput({ points, onUpdate }: BulletProps) {
    const handleAdd = () => onUpdate([...points, ""]);
    const handleEdit = (index: number, val: string) => {
        const newArr = [...points];
        newArr[index] = val;
        onUpdate(newArr);
    };
    const handleDelete = (index: number) => {
        if (points.length === 1 && points[0] === "") return; // ไม่ลบถ้าเหลืออันเดียวและว่าง
        onUpdate(points.filter((_, i) => i !== index));
    };

    return (
        <div className="col-span-2 mt-2">
            <label className="text-sm font-bold text-gray-800 block mb-2">
                Job Description
            </label>
            <div className="flex flex-col gap-2">
                {points.map((desc, i) => (
                    <div
                        key={i}
                        className="flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-100"
                    >
                        <span className="mr-3 text-xl leading-none">•</span>
                        <input
                            type="text"
                            value={desc}
                            onChange={(e) => handleEdit(i, e.target.value)}
                            className="flex-1 bg-transparent focus:outline-none text-sm"
                            placeholder="e.g. Developed a web application using React"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleAdd();
                                }
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => handleDelete(i)}
                            className="text-gray-400 hover:text-gray-600 ml-2 cursor-pointer"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
            <button
                type="button"
                onClick={handleAdd}
                className="flex items-center gap-2 px-3 py-1.5 mt-3 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors w-fit cursor-pointer"
            >
                <span className="text-lg leading-none">+</span> Bullet points
            </button>
        </div>
    );
}
