interface StatCardProps {
    title: string;
    value: number;
}

export default function StatCard({ title, value }: StatCardProps) {
    return (
        <div className="flex gap-1 md:gap-2 border border-gray-400 p-2 justify-center rounded-2 bg-accent-2 ">
            <p className="text-subtitle-2 font-bold text-primary ">{value}</p>

            <h3 className="text-accent text-subtitle-2">: {title}</h3>
        </div>
    );
}