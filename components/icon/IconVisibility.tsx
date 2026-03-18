import IconHidden from "@/public/svgs/iconHidden.svg";
import IconNoneHidden from "@/public/svgs/iconNoneHidden.svg";
type IconVisibilityProps = {
    isHidden?: boolean;
    className?: string;
};
export default function IconVisibility({
    isHidden = false,
    className,
}: IconVisibilityProps) {
    return isHidden ? (
        <IconHidden className={className}></IconHidden>
    ) : (
        <IconNoneHidden className={className}></IconNoneHidden>
    );
}
