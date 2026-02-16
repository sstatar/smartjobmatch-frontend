type BadgeProps = {
  count: number;
};

export default function Badge({ count }: BadgeProps) {
  return (
    <span className="min-w-[15px] h-[15px] px-1 flex items-center justify-center rounded-full bg-accent text-button-3 text-secondary leading-none">
      {count}
    </span>
  );
}