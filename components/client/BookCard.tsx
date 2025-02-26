import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { BookCover } from "./BookCover";
import { DownloadReceiptButton } from "./DownloadReceiptButton";

export function BookCard({ id, title, genre, coverColor, coverUrl, isLoanedBook = false }: Book) {
    return (
        <li
            className={cn('w-full')}
        >
            <Link
                href={`/books/${id}`}
                className={cn({
                    "w-full flex flex-col": isLoanedBook
                })}
            >
                <BookCover
                    coverColor={coverColor}
                    coverImage={coverUrl}
                />

                <div
                    className={cn('mt-4')}
                >
                    <h3
                        className="book-title"
                    >
                        {title}
                    </h3>
                    <p
                        className="book-genre"
                    >
                        {genre}
                    </p>
                </div>

                {
                    isLoanedBook && (
                        <div
                            className=" space-y-3 mt-3 w-full"
                        >
                            <div
                                className="book-loaned"
                            >
                                <div
                                    className="relative size-5 max-sm:size-4 aspect-square "
                                >
                                    <Image
                                        src={'/icons/calendar.svg'}
                                        alt="calendar"
                                        fill
                                        className="object-contain w-full h-full"
                                    />
                                </div>
                                <p
                                    className="text-primary text-sm"
                                >
                                    11 days left to return
                                </p>
                            </div>

                            <DownloadReceiptButton />
                        </div>
                    )
                }
            </Link>
        </li>
    )
}
