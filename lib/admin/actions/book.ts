'use server';

import { books } from "@/database/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";

export const createBookAction = async (params: BookParams) => {
    try {

        const newBook = await db.insert(books).values({
            ...params,
            availableCopies: params.totalCopies,
        }).returning();

        return {
            success: true,
            data: JSON.parse(JSON.stringify(newBook[0])),
            message: "Book created successfully!"
        }

    } catch (error) {
        return {
            success: false,
            message: "Error while creating book!"
        }
    }
}

export const updateBookAction = async (bookId: string, params: BookParams) => {
    try {

        const [book] = await db.select()
            .from(books)
            .where(eq(books.id, bookId))
            .limit(1);

        if (!book) {
            return {
                success: false,
                message: "Book not found!"
            }
        }

        const updatedBook = await db.update(books)
            .set({
                ...params
            })
            .where(eq(books.id, bookId))
            .returning();

        return {
            success: true,
            data: JSON.parse(JSON.stringify(updatedBook[0])),
            message: "Book updated successfully!"
        }

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Error while updating book!"
        }
    }
}

export const removeBookAction = async (bookId: string) => {
    try {

        const [book] = await db.select()
            .from(books)
            .where(eq(books.id, bookId))
            .limit(1);

        if (!book) {
            return {
                success: false,
                message: "Book not found!"
            }
        }

        await db.delete(books)
            .where(eq(books.id, bookId))
            .returning();

        return {
            success: true,
            message: "Book deleted successfully!"
        }

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Error while deleting book!"
        }
    }
}