export type CircularProgressProps = {
    percentage: number;
    size?: number;
    strokeWidth?: number;
    circleColor?: string;
    progressColor?: string;
};

const CircularProgress = ({
    percentage,
    size = 100,
    strokeWidth = 10,
    circleColor = "stroke-accent-2",
    progressColor = "stroke-success",
}: CircularProgressProps) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className={`relative`} style={{ width: size, height: size }}>
            <svg
                className={`w-full h-full transform -rotate-90`}
                viewBox={`0 0 ${size} ${size}`}
            >
                {/* Background Circle (Track) */}
                <circle
                    className={circleColor}
                    strokeWidth={strokeWidth}
                    fill="#dcf5de"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                {/* Progress Circle (Indicator) */}
                <circle
                    className={`${progressColor} transition-all duration-500 ease-in-out`}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
            </svg>
            {/* Percentage Text */}
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-gray-800">{`${percentage}%`}</span>
            </div>
        </div>
    );
};

export default CircularProgress;
