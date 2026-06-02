type LogoProps = {
    size?: "sm" | "md" | "lg";
};

export default function Logo({ size = "md" }: LogoProps) {
    const sizes = {
        sm: "text-base md:text-heading-4",
        md: "text-xl md:text-logo-1",
        lg: "text-2xl md:text-heading-2", 
    };

    return (
        <div
            className={`${sizes[size]} font-[var(--weight-heading)] text-primary cursor-default whitespace-nowrap transition-all duration-200`}
        >
            SmartJobsMatch
        </div>
    );
}