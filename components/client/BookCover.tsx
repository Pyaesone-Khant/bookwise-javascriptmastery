import { cn } from "@/lib/utils";
import Image from "next/image";
import { BookCoverSvg } from "./BookCoverSvg";

type BookCoverVariant = 'small' | 'default' | 'wide';

const variantStyles: Record<BookCoverVariant, string> = {
    small: 'book-cover_small',
    default: 'book-cover',
    wide: 'book-cover_wide',
}

interface Props {
    variant?: BookCoverVariant;
    className?: string;
    coverColor: string;
    coverImage: string;
}

export function BookCover({
    className,
    variant = "default",
    coverColor = "#012B4B",
    coverImage = "https://placehold.co/400x600.png",
}: Props) {
    return (
        <div
            className={cn("relative transition-all duration-300 ", variantStyles[variant], className)}
        >
            <BookCoverSvg
                coverColor={coverColor}
            />

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
