export type CircularProgressProps = {
    percentage: number;
    size?: number;
    strokeWidth?: number;
    // อนุญาตให้ override สีได้หากต้องการใช้สีแบบคงที่
    trackColor?: string;
    progressColor?: string;
    fillColor?: string;
    textColor?: string;
};

const CircularProgress = ({
    percentage,
    size = 100,
    strokeWidth = 10,
    trackColor = "stroke-gray-100", // สีของเส้นขอบพื้นหลัง
    progressColor,
    fillColor,
    textColor,
}: CircularProgressProps) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    // --- ตรรกะการเปลี่ยนสีอัตโนมัติตาม Percentage ---
    const isExcellent = percentage >= 80;
    const isGood = percentage >= 50;

    // สีเส้น Progress
    const dynamicProgressColor =
        progressColor ||
        (isExcellent
            ? "stroke-success"
            : isGood
              ? "stroke-yellow-500"
              : "stroke-red-500");

    // สีพื้นหลังวงกลมด้านใน (แทนที่ #dcf5de แบบ Fix)
    const dynamicFillColor =
        fillColor ||
        (isExcellent
            ? "fill-success/25"
            : isGood
              ? "fill-yellow-50"
              : "fill-red-50");

    // สีตัวอักษร
    const dynamicTextColor =
        textColor ||
        (isExcellent
            ? "text-green-700"
            : isGood
              ? "text-yellow-700"
              : "text-red-700");

    return (
        <div className={`relative`} style={{ width: size, height: size }}>
            <svg
                className={`w-full h-full transform -rotate-90`}
                viewBox={`0 0 ${size} ${size}`}
            >
                {/* Background Circle (Track) */}
                <circle
                    className={`${trackColor} ${dynamicFillColor} transition-colors duration-500`}
                    strokeWidth={strokeWidth}
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                {/* Progress Circle (Indicator) */}
                <circle
                    className={`${dynamicProgressColor} transition-all duration-1000 ease-in-out`}
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
                <span
                    className={`text-xl font-bold ${dynamicTextColor} transition-colors duration-500`}
                >
                    {`${percentage}%`}
                </span>
            </div>
        </div>
    );
};

export default CircularProgress;
