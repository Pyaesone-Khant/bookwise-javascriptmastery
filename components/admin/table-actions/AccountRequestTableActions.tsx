'use client';

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
import { UserStatus } from "@/constants/enum";
import { toast } from "@/hooks/use-toast";
import { updateUserStatusAction } from "@/lib/actions/user";
import { cn } from "@/lib/utils";
import nProgress from "nprogress";
import { useState } from "react";
import { Button } from "../../ui/button";

function UpdateUserStatus({ user }: { user: User }) {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [status, setStatus] = useState<UserStatus>(UserStatus.PENDING);
    const [loading, setLoading] = useState<boolean>(false);

    const handleUpdateUserStatus = async () => {
        nProgress.start();
        setLoading(true)
        try {
            const result = await updateUserStatusAction({
                userId: user.id,
                status: status as 'APPROVED' | 'REJECTED'
            })

            if (result?.success) {
                toast({
                    title: "Success",
                    description: result.message
                })
            } else {
                toast({
                    title: "Error",
                    description: "An error occurred while updating user status!",
                    variant: "destructive"
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "An error occurred while updating user status!",
                variant: "destructive"
            })
        } finally {
            setLoading(false);
            nProgress.done()
        }
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
                <div
                    className="space-x-2"
                >
                    {
                        Object.keys(UserStatus).map((status) => (
                            <DialogTrigger
                                key={status}
                                asChild
                                className={cn({
                                    "hidden": status === UserStatus.PENDING
                                })}
                            >
                                <Button
                                    onClick={() => {
                                        setStatus(status as UserStatus)
                                    }}
                                    size={'sm'}
                                    variant={status === UserStatus.APPROVED ? "default" : "destructive"}
                                    className={cn({
                                        "!bg-primary-admin hover:opacity-95 text-white": status === UserStatus.APPROVED,
                                    })}
                                >
                                    {status}
                                </Button>
                            </DialogTrigger>
                        ))
                    }
                </div>
                <DialogContent
                    className="w-full max-w-md"
                >
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription
                            className="text-neutral-600"
                        >
                            Are you sure you want to
                            <span
                                className={cn("lowercase font-semibold mx-1", {
                                    "text-primary-admin": status === UserStatus.APPROVED,
                                    "text-red-700": status === UserStatus.REJECTED,
                                })}
                            >
                                &quot;{status}&quot;
                            </span>
                            {user.fullName} to access BookWise?
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
                            variant={status === UserStatus.APPROVED ? "default" : "destructive"}
                            onClick={handleUpdateUserStatus}
                            className={cn({
                                "!bg-primary-admin hover:opacity-95 text-white": status === UserStatus.APPROVED,
                            })}
                            loading={loading}
                        >
                            Confirm
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </>
    )
}

export const AccountRequestTableActions = {
    Update: UpdateUserStatus
}