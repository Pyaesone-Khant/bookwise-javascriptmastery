import { auth } from "@/auth";
import { Header, Sidebar } from "@/components/admin";
import { users } from "@/database/schema";
import { db } from "@/db";
import "@/styles/admin.css";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AdminLayout({ children }: { children: ReactNode }) {

    const session = await auth();

    if (!session?.user?.id) return redirect('/sign-in');

    const isAdmin = await db.select({ isAdmin: users.role })
        .from(users)
        .where(eq(users.id, session.user.id))
        .limit(1)
        .then((res) => res[0]?.isAdmin === 'ADMIN');

    if (!isAdmin) return redirect('/');

    return (
        <main
            className="flex min-h-screen w-full flex-row"
        >
            <Sidebar
                session={session}
            />

            <section
                // className="admin-container"
                className="w-full flex flex-col flex-1"
            >
                <Header
                    session={session}
                />
                <div
                    className="p-8 bg-light-300 flex-1"
                >
                    {children}
                </div>
            </section>
        </main>
    )
}
