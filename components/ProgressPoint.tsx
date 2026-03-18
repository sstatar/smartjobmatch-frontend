export interface ProgressPointProps {
    step: number;
    maxSteps: number;
}

export default function ProgressPoint({ step, maxSteps }: ProgressPointProps) {
    return (
        <div>
            Progress Cycle {step}/{maxSteps}
        </div>
    );
}
