import Badge from "./Badge";
type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
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
        "h-[38px] inline-flex items-center justify-center gap-2 px-6 rounded-xl text-button-2 font-[var(--weight-button)] transition cursor-pointer";
    const variants = {
        primary: "bg-accent text-secondary",
        secondary: "bg-secondary text-accent",
        tertiary: "bg-transparent text-gray-800",
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
