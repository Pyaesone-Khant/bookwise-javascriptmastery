'use client'

import { toast } from "@/hooks/use-toast";
import { returnBookAction } from "@/lib/actions/book";
import { RotateCcw } from "lucide-react";
import { usePathname } from "next/navigation";
import nProgress from "nprogress";
import { useState } from "react";
import { Button } from "../ui/button";

export function ReturnBookButton({ bookId, userId }: BorrowBookParams) {

    const [loading, setLoading] = useState<boolean>(false);
    const pathname = usePathname();

    const handleReturnBook = async () => {
        nProgress.start();
        setLoading(true)
        try {
            const result = await returnBookAction({ bookId, userId, pathToRevalidate: pathname });

            if (result?.success) {
                toast({
                    title: "Success",
                    description: "Book returned successfully!",
                })
            } else {
                toast({
                    title: "Error",
                    description: "An error occurred while returning the book!",
                    variant: "destructive"
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "An error occurred while returning the book!",
                variant: "destructive"
            })
        } finally {
            setLoading(false)
            nProgress.done();
        }
    }

    return (
        <Button
            className="book-overview_btn"
            size={'lg'}
            onClick={handleReturnBook}
            loading={loading}
            icon={
                <RotateCcw
                    className="!size-5 -mt-0.5"
                />
            }
        >
            <p
                className=" font-bebas-neue text-lg text-dark-100 uppercase"
            >
                Rteurn Book
            </p>
        </Button>
    )
}
