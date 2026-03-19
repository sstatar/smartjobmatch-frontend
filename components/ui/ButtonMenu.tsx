type IconButtonProps = {
    text: string;
    icon: React.ElementType;
    onClick?: () => void;
    variant?: "primary" | "outline";
    isActive?: boolean;
};
export default function ButtonMenu({
    text,
    icon: Icon,
    onClick,
    variant = "primary",
    isActive = false,
}: IconButtonProps) {
    const baseStyles =
        "flex  justify-start gap-2 px-4 py-3 rounded-sm font-medium transition-all duration-200 active:scale-95 w-full cursor-pointer";
    
        const activeStyles = "bg-accent-2 !text-accent"

    const variants = {
        primary: "bg-secondary text-white hover:bg-accent-2 ",
        outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    };

    return (
        <button
            onClick={onClick}
            className={`${baseStyles} ${isActive ? activeStyles : variants[variant]}`}
        >
            <Icon className="w-6 h-6 text-accent" />
            <span className="text-accent font-(--weight-button)">{text}</span>
        </button>
    );
}
