import { Books } from "@/components/admin";
import { Button } from "@/components/ui/button";
import { getBookList } from "@/lib/apis/queries";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default async function AllBooks() {

    const books = await getBookList();


    return (
        <>
            <div
                className="flex items-center justify-between "
            >
                <h2
                    className="text-lg font-semibold"
                >
                    All Books
                </h2>

                <Button
                    asChild
                    className="bg-primary-admin hover:bg-primary-admin/90 duration-200"
                    icon={<PlusIcon
                        className="text-white"
                    />}
                >
                    <Link
                        href={`/admin/books/new`}
                        className="text-white"
                    >
                        New Book
                    </Link>
                </Button>
            </div>

            <div>
                <Books
                    books={books}
                />
            </div>

        </>
    )
}
