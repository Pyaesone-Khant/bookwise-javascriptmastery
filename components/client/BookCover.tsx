'use client'

import { config } from "@/lib/config";
import { cn } from "@/lib/utils";
import { IKImage } from "imagekitio-next";
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
                <IKImage
                    path={coverImage}
                    urlEndpoint={config.env.imagekit.urlEndpoint}
                    alt="cover"
                    fill
                    loading="lazy"
                    lqip={{ active: true }}
                    className="rounded-sm object-fill"
                />
            </div>
        </div>
    )
}
