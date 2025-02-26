import { auth, signOut } from "@/auth";
import { BookList } from "@/components/client";
import { Button } from "@/components/ui/button";
import { getBorrowedBooks } from "@/lib/apis/queries";
import { redirect } from "next/navigation";
import nProgress from "nprogress";

export default async function ProfilePage() {

    const session = await auth();

    if (!session) redirect('/sign-in');

    const borrowedBookList = await getBorrowedBooks(session?.user?.id!);

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
                        isInProfile={true}
                    />
                ) : (
                    <div
                        className="text-center text-lg text-light-100 p-10"
                    >
                        No books borrowed yet!
                    </div>
                )
            }
        </>
    )
}
