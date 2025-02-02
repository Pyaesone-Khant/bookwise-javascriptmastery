'use client';

import { cn, getNameInitials } from "@/lib/utils";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function Header({
    session
}: {
    session: Session
}) {

    const pathname = usePathname();

    return (
        <header
            className="my-10 flex justify-between gap-5"
        >
            <Link
                href={'/'}
            >
                <Image
                    src={"/icons/logo.svg"}
                    alt="logo"
                    width={40}
                    height={40}
                />
            </Link>

            <ul
                className="flex flex-row items-center gap-8"
            >
                <li>
                    <Link
                        href={'/library'}
                        className={cn(
                            "text-base cursor-pointer capitalize text-lime-100",
                            {
                                "text-light-200": pathname === "/library"
                            }
                        )}
                    >
                        Library
                    </Link>
                </li>

                <li>
                    <Link
                        href={'/profile'}
                    >
                        <Avatar>
                            <AvatarImage
                                src={session?.user?.image!}
                                alt={session?.user?.name!}
                            />
                            <AvatarFallback>
                                {getNameInitials(session?.user?.name ?? 'User')}
                            </AvatarFallback>
                        </Avatar>
                    </Link>
                </li>
            </ul>
        </header >
    )
}
