import Image from "next/image";

export type PictureIconProps = {
    imageUrl?: string;
    alt?: string;
    width?: number;
    height?: number;
    className?: string;
};

export default function PictureIcon({
    imageUrl,
    alt,
    width = 400,
    height = 400,
    className,
}: PictureIconProps) {
    return (
        <div>
            {imageUrl ? (
                <Image
                    width={width}
                    height={height}
                    src={imageUrl}
                    alt={alt ? alt : imageUrl ? imageUrl : "picture"}
                    className={`${className} rounded-full object-cover border`}
                />
            ) : (
                <div className={`${className} bg-gray-300 rounded-full`} />
            )}
        </div>
    );
}
