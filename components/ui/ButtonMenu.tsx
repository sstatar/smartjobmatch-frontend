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
    // 💡 1. เติม whitespace-nowrap และ items-center
    // 💡 2. ปรับ padding ให้เล็กลงนิดนึงบนมือถือ (py-2.5 md:py-3) เพื่อไม่ให้ปุ่มดูอ้วนเกินไป
    const baseStyles =
        "flex items-center justify-start gap-2 px-4 py-2.5 md:py-3 rounded-lg md:rounded-sm font-medium transition-all duration-200 active:scale-95 w-full whitespace-nowrap cursor-pointer";

    const activeStyles = "bg-accent-2 !text-accent";

    const variants = {
        primary: "bg-secondary text-white hover:bg-accent-2 ",
        outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    };

    return (
        <button
            onClick={onClick}
            className={`${baseStyles} ${isActive ? activeStyles : variants[variant]}`}
        >
            {/* 💡 แอบกระซิบ: ถ้าคุณอยากให้ Icon และ Text เปลี่ยนสีตาม variant (เช่นเป็นสี white) 
                คุณอาจจะต้องลบ text-accent ตรงนี้ออกนะครับ เพราะมันจะฟิกซ์สีทับ variants เอาไว้
                (แต่ถ้าตอนนี้สีตรงตามดีไซน์อยู่แล้ว ไม่ต้องแก้ก็ได้ครับ!) */}
            <Icon className="w-5 h-5 md:w-6 md:h-6 text-accent" />
            <span className="text-accent font-(--weight-button) text-sm md:text-base">
                {text}
            </span>
        </button>
    );
}
