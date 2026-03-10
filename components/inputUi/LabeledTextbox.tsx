"use client";

import { useState } from "react";

interface LabeledTextboxProps {
    label?: string;
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
}

export default function LabeledTextbox({
    label,
    type = "text",
    placeholder,
    value,
    onChange,
}: LabeledTextboxProps) {
    function handleValueChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (onChange) onChange(e.target.value);
    }

    return (
        <div className="flex flex-col gap-1 w-full h-full">
            {label && <span className="text-heading-4 font-bold">{label}</span>}
            <input
                type={type}
                className="py-2 px-4 border border-accent rounded-md text-subtitle-1 h-full"
                placeholder={placeholder}
                onChange={handleValueChange}
                value={value}
            />
        </div>
    );
}
