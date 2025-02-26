import { auth } from "@/auth";
import { Header } from "@/components/client";
import { users } from "@/database/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { ReactNode } from "react";

export default async function Layout({
    children
}: {
    children: ReactNode
}) {

    const session = await auth();

    if (!session) return redirect('/sign-in');


    // used 'after' <which was introduced in NextJS-15> to update logged in user's last activity date
    after(async () => {
        if (!session?.user?.id) return;

        // only update last activity date of logged in user once a day
        const user = await db
            .select()
            .from(users)
            .where(eq(users.id, session.user?.id))
            .limit(1)

        if (user[0].lastActivityDate === new Date().toISOString().slice(0, 10)) return;

        await db
            .update(users)
            .set({
                lastActivityDate: new Date().toISOString().slice(0, 10)
            })
            .where(eq(users.id, session.user?.id))
    })

    return (
        <main
            className="root-container"
        >
            <Header
                session={session}
            />
            <section
                className="px-5 xs:px-10 md:px-16"
            >
                <div
                    className="py-10 mx-auto max-w-7xl w-full"
                >
                    {children}
                </div>
            </section>
        </main>
    )
}
