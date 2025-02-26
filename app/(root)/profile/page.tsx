import { auth, signOut } from "@/auth";
import { BookList } from "@/components/client";
import { Button } from "@/components/ui/button";
import { borrowedBooks } from "@/database/schema";
import { db } from "@/db";
import { redirect } from "next/navigation";
import nProgress from "nprogress";

export default async function ProfilePage() {

    const session = await auth();

    if (!session) redirect('/sign-in');

    const borrowedBookList = await db.select().from(borrowedBooks);

    console.log(borrowedBookList)

    return (
        <>
            <form 
                action={async () => {
                    'use server';

                    nProgress.start();
                    await signOut();
                    nProgress.done();
                }}
                className="mb-10"
            >
                <Button>
                    Logout
                </Button>
            </form>

            {
                borrowedBookList?.length > 0 ? (
                    <BookList
                        title="Borrowed Books"
                        books={borrowedBookList}
                    />
                ) : (
                    <div>

                    </div>
                )
            }
        </>
    )
}
