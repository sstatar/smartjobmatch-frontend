interface LabeledTextboxProps {
    label?: string;
    value?: string;
    placeholder?: string;
    required?: boolean;
    onChange?: (value: string) => void;
}

export default function LabeledTextArea({
    label,
    value,
    placeholder,
    required = false,
    onChange,
}: LabeledTextboxProps) {
    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        if (onChange) onChange(e.target.value);
    }

    return (
        <div className="flex flex-col gap-1 w-full h-full">
            {label && (
                <span className="text-heading-4 font-bold">
                    {label}
                    {required && (
                        <span className="text-red-600 font-semibold">*</span>
                    )}
                </span>
            )}
            <textarea
                className="py-2 px-4 border border-accent rounded-md text-subtitle-2 h-full resize-none"
                placeholder={placeholder}
                onChange={handleChange}
                value={value}
                required={required}
            />
        </div>
    );
}
