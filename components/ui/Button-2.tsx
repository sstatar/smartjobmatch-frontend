
type ButtonSecondProps = {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "tertiary";
    disabled?: boolean;
};

export default function ButtonSecond({
    children,
    onClick,
    variant = "primary",
    disabled = false,
}: ButtonSecondProps) {
    const base =
        "h-[56px] inline-flex items-center justify-center gap-2 px-6 rounded-xl text-button-2 font-[var(--weight-button)] transition";
    const variants = {
        primary: "bg-success text-secondary",
        secondary: "bg-primary text-secondary",
        tertiary: "bg-accent text-secondary",
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${base} ${variants[variant]} ${
                disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
        >
            {children}
        </button>
    );
}
