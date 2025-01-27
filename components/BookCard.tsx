import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { BookCover } from "./BookCover";
import { Button } from "./ui/button";

export function BookCard({ id, title, genre, color, coverUrl, isLoanedBook = false }: Book) {
    return (
        <li
            className={cn({
                "xs:w-52 w-full": isLoanedBook,
            })}
        >
            <Link
                href={`/books/${id}`}
                className={cn({
                    "w-full flex flex-col items-center": isLoanedBook
                })}
            >
                <BookCover
                    coverColor={color}
                    coverImage={coverUrl}
                />

                <div
                    className={cn('mt-4', {
                        "xs:max-w-40 max-w-28": !isLoanedBook
                    })}
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
                            className="mt-3 w-full"
                        >
                            <div
                                className="book-loaned"
                            >
                                <Image
                                    src={'/icons/calendar.svg'}
                                    alt="calendar"
                                    width={24}
                                    height={24}
                                    className="object-contain"
                                />
                                <p
                                    className="text-light-100"
                                >
                                    11 days left to return
                                </p>
                            </div>

                            <Button
                                className="book-btn"
                            >
                                Download Receipt
                            </Button>
                        </div>
                    )
                }
            </Link>
        </li>
    )
}
