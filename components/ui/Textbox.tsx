import React from "react";

export type TextboxProps = {
    width?: string;
    height?: string;
    className?: string;
    placeholder?: string;
    defaultValue?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    children?: React.ReactNode;
};

export default function Textbox({
    width,
    height,
    className,
    placeholder = "",
    defaultValue = "",
    onChange,
    children,
}: TextboxProps) {
    const widthClass = width ? `w-[${width}]` : "w-[400px]";
    const heightClass = height ? `h-[${height}]` : "h-[40px]";
    const borderClass = `border border-transparent focus:outline-none focus:ring-1 focus:ring-accent focus:border-transparent`;
    const base = `${borderClass} bg-accent-2 p-2 ${children ? "pl-10" : "pl-4"} w-full h-full`;

    const enhancedChildren = React.Children.map(children, (child) => {
        if (React.isValidElement<{ className?: string }>(child)) {
            return React.cloneElement(child, {
                className: `absolute w-6 h-6 left-3 top-1/2 -translate-y-1/2 ${child.props.className ?? ""}`,
            });
        }
        return child;
    });

    return (
        <div className={`${widthClass} ${heightClass}`}>
            <label className="relative flex items-center w-full h-full">
                {enhancedChildren}
                <input
                    type="text"
                    className={`${base} ${className}`}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    onChange={onChange}
                />
            </label>
        </div>
    );
}
