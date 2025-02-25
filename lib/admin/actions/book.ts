'use server';

import { books } from "@/database/schema";
import { db } from "@/db";

export const createBookAction = async (params: BookParams) => {
    try {

        const newBook = await db.insert(books).values({
            ...params,
            availableCopies: params.totalCopies,
        }).returning();

        return {
            success: true,
            data: JSON.parse(JSON.stringify(newBook[0]))
        }

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Error while creating book!"
        }
    }
}