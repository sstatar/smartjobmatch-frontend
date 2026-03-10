"use client";

import SelectableOption from "./SelectableOption";

interface Option {
    value: string;
    label: string;
}

interface LabeledDropdownProps {
    label?: string;
    options: Option[];
    selected?: Option;
    onChange?: (option: Option) => void;
}

export default function LabeledDropdown({
    label,
    options,
    selected,
    onChange,
}: LabeledDropdownProps) {
    function handleOptionClick(option: Option) {
        if (onChange) onChange(option);
    }

    return (
        <div className="flex flex-col gap-1 w-full">
            {label && <span className="text-heading-4 font-bold">{label}</span>}

            <div className="inline-flex w-fit border border-accent rounded-md overflow-hidden divide-x divide-accent">
                {options.map((option) => (
                    <SelectableOption
                        key={option.value}
                        option={option.label}
                        isSelected={selected === option}
                        onClick={() => handleOptionClick(option)}
                    />
                ))}
            </div>
        </div>
    );
}
