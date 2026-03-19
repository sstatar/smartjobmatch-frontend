import Image from "next/image";

export type PictureIconProps = {
    src?: string;
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
    className,
    onError,
}: PictureIconProps) {
    return (
        <div>
            {src ? (
                <Image
                    width={width}
                    height={height}
                    src={src}
                    alt={alt ? alt : src ? src : "picture"}
                    className={`${className} rounded-full object-cover border border-accent-2`}
                    onError={onError}
                />
            ) : (
                <Image
                    width={width}
                    height={height}
                    src="/default-logo.png"
                    alt={alt ? alt : src ? src : "picture"}
                    className={`${className} rounded-full object-cover border border-accent-2`}
                    onError={onError}
                />
            )}
        </div>
    );
}
