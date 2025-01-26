import { cn } from "@/lib/utils";
import Image from "next/image";

type BookCoverVariant = 'extraSmall' | 'small' | 'medium' | 'regular' | 'wide';

const variantStyles: Record<BookCoverVariant, string> = {
    extraSmall: 'book-cover_extra_small',
    small: 'book-cover_small',
    medium: 'book-cover_medium',
    regular: 'book-cover_regular',
    wide: 'book-cover_wide',
}

interface Props {
    variant: BookCoverVariant;
    className?: string;
    coverColor: string;
    coverImage: string;
}

export function BookCover({
    variant = 'regular',
    className,
    coverColor = "#012B4B",
    coverImage = "https://placehold.co/400x600.png",
}: Props) {
    return (
        <div
            className={cn("relative transition-all duration-300 ", variantStyles[variant], className)}
        >
            <div
                className="absolute z-10 inset-0 bg-gray-100"
                style={{
                    left: '12%',
                    width: '87.5%',
                    height: '88%',
                }}
            >
                <Image
                    src={coverImage}
                    alt="cover"
                    fill
                    className="rounded-sm object-fill"
                />
            </div>
        </div>
    )
}
