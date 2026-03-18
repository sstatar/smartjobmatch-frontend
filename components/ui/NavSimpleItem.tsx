export interface NavSimpleItemProps {
    label: string;
    isActived?: boolean;
}

export default function NavSimpleItem({
    label,
    isActived = false,
}: NavSimpleItemProps) {
    return (
        <div
            className={`${isActived ? "underline underline-offset-4 decoration-gray-400" : ""}`}
        >
            {label}
        </div>
    );
}
