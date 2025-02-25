import { auth } from "@/auth";
import { Header, Sidebar } from "@/components/admin";
import "@/styles/admin.css";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AdminLayout({ children }: { children: ReactNode }) {

    const session = await auth();

    if (!session?.user?.id) return redirect('/sign-in')

    return (
        <main
            className="flex min-h-screen w-full flex-row"
        >
            <Sidebar
                session={session}
            />

            <section
                // className="admin-container"
                className="w-full"
            >
                <Header
                    session={session}
                />
                <div
                    className="p-8 bg-light-300"
                >
                    {children}
                </div>
            </section>
        </main>
    )
}
