"use client";

type ProgressBarProps = {
    progress: number;
};

export default function ProgressBar({ progress }: ProgressBarProps) {
    return (
        <div className="w-full max-w-xl">
            <div className="w-full border-2 border-accent rounded-full h-3 overflow-hidden">
                <div
                    className="bg-success h-full transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <p className="mt-3 text-sm text-secondary text-center">
                {progress}%
            </p>
        </div>
    );
}
