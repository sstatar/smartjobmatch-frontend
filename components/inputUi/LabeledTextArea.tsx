"use client";

import { useState } from "react";

interface LabeledTextboxProps {
    label?: string;
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
}

export default function LabeledTextArea({
    label,
    value,
    placeholder,
    onChange,
}: LabeledTextboxProps) {
    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        if (onChange) onChange(e.target.value);
    }

    return (
        <div className="flex flex-col gap-1 w-full h-full">
            {label && <span className="text-heading-4 font-bold">{label}</span>}
            <textarea
                className="py-2 px-4 border border-accent rounded-md text-subtitle-2 h-full resize-none"
                placeholder={placeholder}
                onChange={handleChange}
                value={value}
            />
        </div>
    );
}
