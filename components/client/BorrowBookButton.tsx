'use client';

import { toast } from "@/hooks/use-toast";
import { borrowBookAction } from "@/lib/actions/book";
import Image from "next/image";
import { useRouter } from "next/navigation";
import nProgress from "nprogress";
import { useState } from "react";
import { Button } from "../ui/button";

interface Props {
    bookId: string;
    userId: string;
    borrowingEligiblity: {
        isEligible: boolean;
        message: string;
    }
}

export default function BorrowBookButton({ bookId, userId, borrowingEligiblity }: Props) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { isEligible, message } = borrowingEligiblity;

    const handleBorrowBook = async () => {
        if (!isEligible) {
            toast({
                title: "Error",
                description: message,
                variant: "destructive"
            })
        }

        nProgress.start()
        setLoading(true)
        try {
            const result = await borrowBookAction({
                bookId,
                userId
            })

            if (result?.success) {
                toast({
                    title: "Success",
                    description: "Book borrowed successfully!",
                })
                router.push('/profile')
            } else {
                toast({
                    title: "Error",
                    description: "An error occurred while borrowing the book!",
                    variant: "destructive"
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "An error occurred while borrowing the book!",
                variant: "destructive"
            })
        } finally {
            nProgress.done();
            setLoading(false);
        }
    }

    return (
        <Button
            className="book-overview_btn"
            size={'lg'}
            onClick={handleBorrowBook}
            loading={loading}
            icon={
                <Image
                    src={"/icons/book.svg"}
                    alt="book"
                    width={20}
                    height={20}
                />
            }
        >
            <p
                className=" font-bebas-neue text-base text-dark-100 uppercase"
            >
                Borrow Book
            </p>
        </Button>
    )
}
