import Image from "next/image";

export type PictureIconProps = {
    src?: string | null; // เผื่อกรณีที่ API ส่ง null กลับมา
    alt?: string;
    width?: number;
    height?: number;
    className?: string;
    onError?: () => void;
};

export default function PictureIcon({
    src,
    alt,
    width = 400,
    height = 400,
    className = "",
    onError,
}: PictureIconProps) {
    // กำหนดรูปที่จะใช้ ถ้าไม่มี src ให้ใช้ default ทันที
    const imageSource = src || "/default-logo.png";

    // คืนค่า <Image> ตัวเดียวเพียวๆ โดยไม่มี div มาครอบ
    return (
        <Image
            width={width}
            height={height}
            src={imageSource}
            alt={alt || "Profile picture"}
            className={`${className} rounded-full object-cover border border-accent-2`}
            onError={onError}
        />
    );
}
