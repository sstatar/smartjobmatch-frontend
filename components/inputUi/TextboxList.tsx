import { useState } from "react";

interface TextboxListProps {
    values: string[];
    icon?: string;
    onChange?: (value: string[]) => void;
}

export default function TextboxList({
    values,
    icon,
    onChange,
}: TextboxListProps) {
    const [value, setValue] = useState("");

    const addItem = () => {
        if (!value.trim()) return;

        const newSkills = [...values, value.trim()];
        onChange?.(newSkills);

        setValue("");
    };

    const removeItem = (index: number) => {
        const newSkills = values.filter((_, i) => i !== index);
        onChange?.(newSkills);
    };

    return (
        <div className="flex flex-col gap-2 max-w-md">
            {/* add value */}
            <div className="flex gap-2">
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") addItem();
                    }}
                    placeholder="Add a value"
                    className="flex-1 border border-accent rounded-sm px-4 py-2 text-subtitle-2"
                />

                <button
                    onClick={addItem}
                    className="px-3 py-1 bg-accent text-white rounded-sm"
                >
                    Add
                </button>
            </div>

            {/* value list */}
            {values.map((value, index) => (
                <div
                    key={index}
                    className="flex items-center border border-accent rounded-md gap-2 px-4 py-2"
                >
                    <span className="flex-1 text-subtitle-2">{value}</span>

                    {icon && (
                        <button
                            onClick={() => removeItem(index)}
                            className="text-red-500 text-heading-4"
                        >
                            {icon}
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}
