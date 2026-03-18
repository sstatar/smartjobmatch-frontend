type LogoProps = {
    size?: "sm" | "md" | "lg";
};

export default function Logo({ size = "md" }: LogoProps) {
    const sizes = {
        sm: "text-heading-4",
        md: "text-logo-1",
        lg: "text-heading-2",
    };

    return (
        <div
            className={`${sizes[size]} font-[var(--weight-heading)] text-primary cursor-default`}
        >
            SmartJobsMatch
        </div>
    );
}
