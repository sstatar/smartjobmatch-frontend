import Badge from "./Badge";
type ButtonProps = {
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    variant?: "primary" | "secondary" | "tertiary";
    disabled?: boolean;
    count?: number;
    type?: "button" | "submit" | "reset";
    form?: string;
};

export default function Button({
    children,
    onClick,
    variant = "primary",
    disabled = false,
    count,
    type = "button",
    form,
}: ButtonProps) {
    const base =
        "inline-flex items-center justify-center gap-2 rounded-xl font-[var(--weight-button)] text-button-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 " +
        "h-9 px-4 md:h-[38px] md:px-6"; // มือถือสูง 36px (h-9) ขอบ 16px (px-4) / จอคอมสูง 38px ขอบ 24px (px-6)
    const variants = {
        primary:
            "bg-accent text-secondary hover:brightness-80 active:brightness-50",
        secondary:
            "bg-secondary text-accent border border-gray-200 hover:bg-gray-50 active:bg-gray-100",
        tertiary:
            "bg-transparent text-gray-800 hover:bg-gray-100 active:bg-gray-200",
    };

    return (
        <button
            type={type}
            form={form}
            onClick={onClick}
            disabled={disabled}
            className={`${base} ${variants[variant]} ${
                disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
        >
            {children}

            {count !== undefined && <Badge count={count} />}
        </button>
    );
}
