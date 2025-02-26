'use server';

import { books, borrowedBooks } from "@/database/schema";
import { db } from "@/db";
import dayjs from "dayjs";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const borrowBookAction = async (params: BorrowBookParams) => {
    const { bookId, userId } = params;

    try {
        const bookList = await db.select({ avalableCopies: books.totalCopies })
            .from(books)
            .where(eq(books.id, bookId))
            .limit(1);

        if (!bookList?.length || bookList[0].avalableCopies === 0) {
            return {
                success: false,
                message: 'Book is not available for borrowing!'
            }
        }

        const dueDate = dayjs().add(7, 'day').toDate().toDateString();

        await db.insert(borrowedBooks)
            .values({
                userId,
                bookId,
                dueDate,
                status: 'BORROWED'
            });

        await db.update(books)
            .set({ availableCopies: bookList[0].avalableCopies - 1 })
            .where(eq(books.id, bookId));

        return {
            success: true,
            message: 'Book borrowed successfully!',
        }

    } catch (error) {
        console.log('Error in borrowBook', error);
    }
}

export const returnBookAction = async (params: ReturnBookParams) => {
    const { userId, bookId, pathToRevalidate } = params;

    try {
        const borrowedBookList = await db.select({ id: borrowedBooks.id })
            .from(borrowedBooks)
            .where(
                eq(borrowedBooks.userId, userId) &&
                eq(borrowedBooks.bookId, bookId) &&
                eq(borrowedBooks.status, 'BORROWED')
            )
            .limit(1);

        if (!borrowedBookList?.length) {
            return {
                success: false,
                message: 'Book is not borrowed by the user!'
            }
        }

        await db.update(borrowedBooks)
            .set({
                status: 'RETURNED',
                returnDate: dayjs().toDate().toDateString()
            })
            .where(eq(borrowedBooks.id, borrowedBookList[0].id));

        const bookList = await db.select({ avalableCopies: books.availableCopies })
            .from(books)
            .where(eq(books.id, bookId))
            .limit(1);

        await db.update(books)
            .set({ availableCopies: bookList[0].avalableCopies + 1 })
            .where(eq(books.id, bookId));

        revalidatePath(pathToRevalidate, 'page');
        return {
            success: true,
            message: 'Book returned successfully!'
        }
    } catch (error) {
        console.log('Error in returnBook', error);
    }

}