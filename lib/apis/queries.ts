import { books, borrowedBooks, users } from "@/database/schema";
import { db } from "@/db";
import { desc, eq } from "drizzle-orm";

export const getBookList = async (userId?: string): Promise<Book[]> => {
    try {
        const result = (await db
            .select()
            .from(books)
            .orderBy(desc(books.createdAt))) as Book[]

        if (userId) {
            const borrowedBooks = await getBorrowedBooks(userId);

            result.forEach((book) => {
                if (borrowedBooks.some((item) => item.id === book.id)) {
                    book['isLoanedBook'] = true;
                } else {
                    book['isLoanedBook'] = false;
                }
            })
        }

        return result;
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getBookDetail = async (bookId: string, userId: string): Promise<Book> => {
    try {
        const [book] = (await db
            .select()
            .from(books)
            .where(eq(books.id, bookId))
            .limit(1)
            .execute()) as Book[];

        const borrowedBooks = await getBorrowedBooks(userId);

        if (borrowedBooks.some((item) => item.id === book.id)) {
            book['isLoanedBook'] = true;
        } else {
            book['isLoanedBook'] = false;
        }

        return book;
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getBorrowedBooks = async (userId: string): Promise<Book[]> => {
    try {
        const result = (await db.select()
            .from(borrowedBooks)
            .where(eq(borrowedBooks.userId, userId) && eq(borrowedBooks.status, 'BORROWED'))
            .leftJoin(books, eq(borrowedBooks.bookId, books.id))
            .execute()
            .then((res) => {
                return res?.map((item) => item['books']);
            })) as Book[];

        return result;
    } catch (error: any) {
        throw new Error(error)
    }
}

// admin
export const getBorrowRecords = async () => {
    try {

        const result = await db.select()
            .from(borrowedBooks)
            .leftJoin(books, eq(borrowedBooks.bookId, books.id))
            .leftJoin(users, eq(borrowedBooks.userId, users.id))
            .execute()
            .then((res) => {
                return res?.map((item) => {
                    return {
                        ...item['borrowed_books'],
                        user: item['users'],
                        book: item['books']
                    }
                });
            })

        return result;
    } catch (error: any) {
        throw new Error(error)
    }
}