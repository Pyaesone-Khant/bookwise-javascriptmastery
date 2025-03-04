'use server';

import { users } from "@/database/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const updateUserStatusAction = async (params: { userId: string, status: 'APPROVED' | 'REJECTED' }) => {
    try {
        const { userId, status } = params;

        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.id, userId))
            .limit(1);

        if (!user) {
            return {
                success: false,
                message: 'User not found!'
            }
        }

        await db.update(users)
            .set({ status: status })
            .where(eq(users.id, userId));

        revalidatePath('/account-requests', 'page')

        return {
            success: true,
            message: `User ${user.fullName} has been ${status.toLowerCase()}!`
        }
    } catch (error) {
        console.log('Error in updateUserStatus', error);
    }
}