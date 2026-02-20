import Link from "next/link";
import ContentCircle from "@/components/ui/ContentCircle";
import IconRightArrow from "@/components/icon/IconRightArrow";

type SkipButtonProps = {
  href: string;
  label?: string;
  className?: string;
};

export default function SkipButton({
  href,
  label = "Skip for now",
  className = "",
}: SkipButtonProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-6 ${className}`}
    >
      <span className="text-xl font-bold text-primary">
        {label}
      </span>

      <ContentCircle padding="p-0">
        <IconRightArrow className="w-15 h-15 text-accent" />
      </ContentCircle>
    </Link>
  );
}
