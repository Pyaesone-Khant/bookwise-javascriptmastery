import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function AllBooks() {
    return (
        <section
            className="p-6 rounded-md bg-white"
        >
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
                >
                    <Link
                        href={`/admin/books/new`}
                        className="text-white"
                    >
                        <PlusIcon /> New Book
                    </Link>
                </Button>
            </div>
        </section>
    )
}
