"use client";

type ButtonSecondProps = {
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    variant?: "primary" | "secondary" | "tertiary";
    disabled?: boolean;
    className?: string;
    // 💡 1. เพิ่ม type เข้าไปใน Props
    type?: "button" | "submit" | "reset";
};

export default function ButtonSecond({
    children,
    onClick,
    variant = "primary",
    disabled = false,
    className = "",
    // 💡 2. รับค่า type เข้ามา (ถ้าไม่ส่งมา ให้ค่าเริ่มต้นเป็น "button")
    type = "button",
}: ButtonSecondProps) {
    // 💡 ปลดล็อก max-w-[350px] ออก และเติม w-full เพื่อให้ปุ่มยืดหยุ่น 100% ตามกล่องพ่อแม่
    const base =
        "h-[56px] inline-flex w-full items-center justify-center gap-2 px-7.5 rounded-xl text-button-1 font-[var(--weight-button)] transition";

    const variants = {
        primary: "bg-success text-secondary",
        secondary: "bg-primary text-secondary",
        tertiary: "bg-accent text-secondary",
    };

    return (
        <button
            // 💡 3. ส่งค่า type ลงไปให้ปุ่ม HTML ตัวจริง
            type={type}
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
