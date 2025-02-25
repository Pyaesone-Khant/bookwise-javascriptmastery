'use client';

import { adminSideBarLinks } from "@/constants";
import { cn, getNameInitials } from "@/lib/utils";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "../ui/avatar";

export function Sidebar({ session }: { session: Session }) {

    const pathname = usePathname();

    return (
        <section
            className="admin-sidebar"
        >
            <div>
                <div
                    className="logo"
                >
                    <Image
                        src={'/icons/admin/logo.svg'}
                        alt="Logo"
                        height={36}
                        width={36}
                    />
                    <h1>
                        BookWise
                    </h1>
                </div>

                <div
                    className="mt-10 flex flex-col gap-4"
                >
                    {
                        adminSideBarLinks.map(link => {
                            const isSelected = (link.route !== '/admin' && pathname.includes(link.route) && link.route.length > -1) || pathname === link.route;

                            return (
                                <Link
                                    href={link.route}
                                    key={link.route}
                                >
                                    <div
                                        className={cn('link border border-transparent duration-200', {
                                            "bg-primary-admin shadow-sm": isSelected,
                                            "hover:border-neutral-200 hover:bg-neutral-50": !isSelected
                                        })}
                                    >
                                        <div
                                            className="relative size-5"
                                        >
                                            <Image
                                                src={link.img}
                                                alt="Icon"
                                                fill
                                                className={cn('object-contain', {
                                                    'brightness-0 invert': isSelected,
                                                })}
                                            />
                                        </div>
                                        <p
                                            className={cn('text-dark-100', {
                                                'text-white': isSelected,
                                            })}
                                        >
                                            {link.text}
                                        </p>

                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>

            <div
                className="user"
            >
                <Avatar>
                    <AvatarFallback
                        className="bg-amber-200/80"
                    >
                        {getNameInitials(session?.user?.name ?? 'ADMIN')}
                    </AvatarFallback>
                </Avatar>

                <div
                    className="flex flex-col max-md:hidden"
                >
                    <p
                        className="font-semibold text-dark-200"
                    >
                        {session?.user?.name ?? 'ADMIN'}
                    </p>
                    <p
                        className="text-xs text-light-500"
                    >
                        {session?.user?.email ?? 'admin@example.com'}
                    </p>
                </div>
            </div>
        </section>
    )
}
