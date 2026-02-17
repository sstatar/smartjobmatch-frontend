export interface ContentCircleProps {
    children: React.ReactNode;
    padding?: string;
}

export default function ContentCircle({ children, padding="p-4" }: ContentCircleProps) {
    return (
        <div className={`border rounded-full ${padding}`}>
            {children}
        </div>
    );
}

