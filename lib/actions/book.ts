'use server';

import { books, borrowedBooks } from "@/database/schema";
import { db } from "@/db";
import dayjs from "dayjs";
import { eq } from "drizzle-orm";

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

        const newRecord = db.insert(borrowedBooks)
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
            data: JSON.parse(JSON.stringify(newRecord))
        }

    } catch (error) {
        console.log('Error in borrowBook', error);
    }
}