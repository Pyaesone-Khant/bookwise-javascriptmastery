import { BookCard } from "./BookCard";

interface Props {
    title: string;
    books: Book[] | [];
    containerClassName?: string;
    isInProfile?: boolean;
}

export function BookList({
    title,
    books,
    containerClassName,
    isInProfile = false
}: Props) {

    if (!isInProfile && books?.length! < 2) return null;

    return (
        <section
            className={containerClassName}
        >
            <h2
                className=" font-bebas-neue text-4xl  text-light-100"
            >
                {title}
            </h2>

            <ul
                className="book-list"
            >
                {
                    books?.map((book) => (
                        <BookCard
                            key={book.id}
                            {...book}
                        />
                    ))
                }
            </ul>
        </section>
    )
}
