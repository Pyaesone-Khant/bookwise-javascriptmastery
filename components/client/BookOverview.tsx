import { users } from "@/database/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import Image from "next/image";
import { BookCover } from "./BookCover";
import BorrowBookButton from "./BorrowBookButton";

interface Props extends Book {
    userId: string;
}

export async function BookOverview({
    title,
    author,
    genre,
    rating,
    totalCopies,
    availableCopies,
    description,
    coverColor,
    coverUrl,
    id,
    userId,
}: Props) {
    const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);

    const borrowingEligiblity = {
        isEligible: availableCopies > 0 && user.status === "APPROVED",
        message:
            availableCopies <= 0
                ? "No copies available!"
                : "You are not eligible to borrow this book!",
    };

    return (
        <section className="book-overview">
            <div className="flex flex-1 flex-col gap-5">
                <h2 className="text-7xl font-semibold font-bebas-neue text-light-100">
                    {title}
                </h2>
                <article className="book-info">
                    <p>
                        By{" "}
                        <span className="font-semibold text-light-200">
                            {author}
                        </span>
                    </p>
                    <p>
                        Category{" "}
                        <span className="font-semibold text-light-200">
                            {genre}
                        </span>
                    </p>

                    <div className="flex flex-row gap-1">
                        <Image
                            src={"/icons/star.svg"}
                            alt="star"
                            width={24}
                            height={24}
                        />
                        <p>{rating}</p>
                    </div>
                </article>
                <div className="book-copies">
                    <p>Total Books: {totalCopies}</p>
                    <p>Available Books: {availableCopies}</p>
                </div>
                <p className="book-description">{description}</p>

                {
                    user && (
                        <BorrowBookButton bookId={id} userId={userId} borrowingEligiblity={borrowingEligiblity} />
                    )
                }
            </div>

            <div className="relative flex flex-1 justify-center">
                <div className="relative">
                    <BookCover
                        variant="wide"
                        className="z-10"
                        coverColor={coverColor}
                        coverImage={coverUrl}
                    />
                    <div className=" absolute left-16 top-10 opacity-40 rotate-12 max-sm:hidden ">
                        <BookCover
                            variant="wide"
                            className="z-10"
                            coverColor={coverColor}
                            coverImage={coverUrl}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
