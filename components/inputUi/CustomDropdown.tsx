"use client";

import { useState, useRef, useEffect } from "react";

interface Option {
    value: string;
    label: string;
}

interface CustomDropdownProps {
    options: Option[];
    selected?: Option;
    onChange?: (option: Option) => void;
    className?: string;
}

export default function CustomDropdown({
    options,
    selected,
    onChange,
    className = "", // กำหนดค่าเริ่มต้นเป็น string ว่าง
}: CustomDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (option: Option) => {
        if (onChange) onChange(option);
        setIsOpen(false);
    };

    return (
        // เอา w-40 ออก แล้วรับ className จากภายนอกเข้ามาแทนที่
        <div className={`relative inline-block ${className}`} ref={dropdownRef}>
            <button
                type="button"
                className="flex items-center justify-between w-full px-4 py-2 bg-white border border-accent rounded-md text-subtitle-1 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="truncate">{selected?.label}</span>
                <svg
                    className={`w-4 h-4 ml-2 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute z-10 w-full bg-white border border-accent rounded-md shadow-lg overflow-hidden">
                    <ul className="py-1 text-subtitle-1 max-h-60 overflow-y-auto">
                        {options.map((option) => (
                            <li key={option.value}>
                                <button
                                    type="button"
                                    className={`w-full text-left px-4 py-2 transition-colors hover:bg-gray-100 ${
                                        selected?.value === option.value
                                            ? "bg-gray-50 font-bold"
                                            : ""
                                    }`}
                                    onClick={() => handleSelect(option)}
                                >
                                    {option.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
