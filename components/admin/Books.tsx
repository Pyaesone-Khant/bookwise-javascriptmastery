'use client';

import { createColumns } from "@/lib/createColumns";
import { Eye } from "lucide-react";
import Link from "next/link";
import { DataTable } from "../common";
import { Button } from "../ui/button";

export function Books({ books }: { books: Book[] }) {

    const renderActions = (book: Book) => {
        return <>
            <Button
                asChild
                size={'icon'}
                variant={'ghost'}
                className="text-primary-admin"
            >
                <Link
                    href={`/admin/books/${book.id}`}
                >
                    <Eye />
                </Link>
            </Button>
        </>
    }

    const columns = createColumns<Book>(
        {
            id: 'ID',
            title: 'Title',
            author: 'Author',
            genre: 'Genre',
            totalCopies: 'Total Copies',
            availableCopies: 'Available Copies',
        },
        renderActions
    )

    return (
        <>
            <DataTable
                data={books}
                columns={columns}
            />
        </>
    )
}
