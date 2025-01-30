'use server';

import { signIn } from "@/auth";
import { users } from "@/database/schema";
import { db } from "@/db";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";

export const signup = async (params: AuthCredentials) => {
    const { fullName, email, password, universityId, universityCard } = params;

    // check if the user already exists
    const existingUsers = await db.select().from(users).where(eq(users.email, email)).limit(1).execute();

    if (existingUsers.length > 0) {
        return { success: false, error: 'User already exists' };
    }

    const hashedPassword = await hash(password, 10);

    try {
        await db.insert(users).values({
            fullName,
            email,
            universityCard,
            universityId,
            password: hashedPassword
        });

        await signinWithCredentials({ email, password });

        return { success: true };

    } catch (error) {
        return { success: false, error: 'An error occurred while signing in.' };
    }

}

export const signinWithCredentials = async (params: Pick<AuthCredentials, 'email' | 'password'>) => {

    const { email, password } = params;

    try {

        const result = await signIn('credentials', { email, password, redirect: false });

        if (result?.error) {
            return { success: false, error: result.error };
        }

        return { success: true };

    } catch (error) {
        return { success: false, error: 'Invalid credentials' };
    }

}