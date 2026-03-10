"use client";

interface LabeledTextboxProps {
    label?: string;
    isChecked?: boolean;
    onClick?: (isChecked: boolean) => void;
}

export default function LabeledCheckbox({
    label,
    isChecked = false,
    onClick,
}: LabeledTextboxProps) {
    function handleClick() {
        if (onClick) onClick(!isChecked);
    }

    return (
        <label className="flex gap-2 w-fit h-full items-center cursor-pointer">
            <input
                type="checkbox"
                className="w-4 h-4 accent-accent"
                checked={isChecked}
                onChange={handleClick}
            />
            {label && (
                <span className="text-heading-5 font-semibold">{label}</span>
            )}
        </label>
    );
}
