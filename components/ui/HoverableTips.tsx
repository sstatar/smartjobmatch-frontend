interface HoverableTipsProps {
    symbol: string;
    body: string;
}

export default function HoverableTips({ symbol, body }: HoverableTipsProps) {
    return (
        <div className="group relative flex items-end justify-center pb-3">
            <span className="cursor-pointer underline">{symbol}</span>
            <div className="absolute bottom-full mb-2 hidden w-50 rounded bg-accent p-2 text-center text-white shadow-lg group-hover:block">
                {body}
                <div className="absolute left-1/2 top-full h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-accent"></div>
            </div>
        </div>
    );
}
