"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { removeBookAction } from "@/lib/admin/actions/book";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import nProgress from "nprogress";
import { useState } from "react";

function UpdateBook({ book }: { book: Book }) {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const onDialogOpenChange = (open: boolean) => {
        if (!loading) {
            setIsOpen(open)
        }
    }

    return (
        <div>BookTableActions</div>
    )
}

function RemoveBook({ book }: { book: Book }) {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleRemoveBook = async () => {
        nProgress.start();
        setLoading(true)
        const result = await removeBookAction(book.id);
        if (result?.success) {
            toast({
                title: 'Success',
                description: result.message ?? 'Book deleted successfully!',
            });
            setIsOpen(false)
        } else {
            toast({
                title: 'Error',
                description: result.message ?? 'Error while deleting book!',
                variant: 'destructive'
            });
        }
        setLoading(false);
        nProgress.done()
    }

    const onDialogOpenChange = (open: boolean) => {
        if (!loading) {
            setIsOpen(open)
        }
    }

    return (
        <>
            <Dialog
                open={isOpen}
                onOpenChange={onDialogOpenChange}
            >
                <DialogTrigger
                    asChild
                >
                    <Button
                        size={'icon'}
                        variant={"destructive"}
                        icon={<Trash2 />}
                    />
                </DialogTrigger>

                <DialogContent
                    className="w-full max-w-md"
                >
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription
                            className="text-neutral-600"
                        >
                            Are you sure you want to delete
                            <span
                                className={cn("font-semibold text-primary-admin mx-1")}
                            >
                                {book.title}
                            </span>
                            from  BookWise?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose
                            asChild
                        >
                            <Button
                                variant="outline"
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            variant={"destructive"}
                            onClick={handleRemoveBook}
                            loading={loading}
                        >
                            Confirm
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog >

        </>
    )
}

export const BookTableActions = {
    Update: UpdateBook,
    Remove: RemoveBook,
}