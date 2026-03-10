interface SelectableOptionProps {
    option: string;
    isSelected?: boolean;
    onClick?: () => void;
}

export default function SelectableOption({
    option,
    isSelected = false,
    onClick,
}: SelectableOptionProps) {
    return (
        <button
            type="button"
            className={`px-6 py-2 text-subtitle-1 font-medium cursor-pointer transition-colors duration-200 outline-none ${
                isSelected
                    ? "bg-accent text-white"
                    : "bg-white hover:bg-gray-100"
            }`}
            onClick={onClick}
        >
            {option}
        </button>
    );
}
