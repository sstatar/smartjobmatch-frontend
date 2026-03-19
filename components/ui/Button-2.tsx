" use client";
type ButtonSecondProps = {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "tertiary";
    disabled?: boolean;
    className?: string;
};

export default function ButtonSecond({
    children,
    onClick,
    variant = "primary",
    disabled = false,
    className = "",
}: ButtonSecondProps) {
    const base =
        "h-[56px] inline-flex items-center justify-center gap-2 px-7.5 rounded-xl text-button-1 font-[var(--weight-button)] transition max-w-[350px]";
    const variants = {
        primary: "bg-success text-secondary",
        secondary: "bg-primary text-secondary",
        tertiary: "bg-accent text-secondary",
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${base} ${className} ${variants[variant]} ${
                disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
        >
            {children}
        </button>
    );
}
