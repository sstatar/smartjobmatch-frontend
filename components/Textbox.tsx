import React from "react";

export type TextboxProps = {
    width?: string;
    height?: string;
    className?: string;
    placeholder?: string;
    children?: React.ReactNode;
};

export default function Textbox({
    width,
    height,
    className,
    placeholder = "",
    children,
}: TextboxProps) {
    const widthClass = width ? `w-[${width}]` : "w-[400px]";
    const heightClass = height ? `h-[${height}]` : "h-[40px]";
    const borderClass = `border border-transparent focus:outline-none focus:ring-1 focus:ring-accent focus:border-transparent`;
    const base = `${borderClass} bg-accent-2 p-2 ${children ? "pl-10" : "pl-4"} w-full h-full`;

    return (
        <div className={`${widthClass} ${heightClass}`}>
            <label className="relative flex items-center w-full h-full">
                {children}
                <input
                    type="text"
                    className={`${base} ${className}`}
                    placeholder={placeholder}
                />
            </label>
        </div>
    );
}
