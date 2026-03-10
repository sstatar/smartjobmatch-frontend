import CustomDropdown from "./CustomDropdown";

interface Option {
    value: string;
    label: string;
}

interface LabeledDropdownProps {
    label?: string;
    options: Option[];
    selected?: Option;
    onChange?: (option: Option) => void;
}

export default function LabeledDropdown({
    label,
    options,
    selected,
    onChange,
}: LabeledDropdownProps) {
    function handleChange(option: Option) {
        if (onChange) onChange(option);
    }

    return (
        <div className="flex flex-col gap-1 w-full">
            {label && <span className="text-heading-4 font-bold">{label}</span>}
            <CustomDropdown
                options={options}
                onChange={handleChange}
                selected={selected}
            />
        </div>
    );
}
