import ProgressBar from "./ui/ProgressBar";

type ProgressBarProps = {
    progress: number;
};
export default function ProgressBarCard({ progress }: ProgressBarProps) {
    
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/50  transition-opacity" />

                <div className="relative z-10 animate-in fade-in zoom-in duration-200 flex flex-col items-center gap-10 w-full max-w-2xl bg-secondary py-20 rounded-4">
                    <h1 className="text-accent text-heading-2 font-(--weight-heading)">
                        Analyze Your Resume
                    </h1>

                    <ProgressBar progress={progress} />
                </div>
            </div>
        </>
    );
}
