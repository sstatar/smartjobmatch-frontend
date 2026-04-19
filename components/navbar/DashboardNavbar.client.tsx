"use client";

import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import PictureIcon from "@/components/ui/PictureIcon";
import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardNavbarClient({
    eachTabCount,
    profilePictureUrl,
}: {
    eachTabCount: { bookmarked: number; applied: number };
    profilePictureUrl?: string | null;
}) {
    const activedTab = usePathname();

    return (
        <>
            {/* Left */}
            <div className="flex-1 items-center gap-4">
                <Logo />
            </div>

            {/* Center - Search */}
            <div className="flex-1 flex justify-center gap-6">
                <Link href={"/home" as Route}>
                    <Button
                        variant={
                            activedTab === "/home" ? "primary" : "tertiary"
                        }
                    >
                        Jobs
                    </Button>
                </Link>
                <Link href={"/bookmark" as Route}>
                    <Button
                        variant={
                            activedTab === "/bookmark" ? "primary" : "tertiary"
                        }
                        count={
                            activedTab === "/bookmark"
                                ? undefined
                                : eachTabCount.bookmarked
                        }
                    >
                        Bookmarked
                    </Button>
                </Link>
                <Link href={"/applied" as Route}>
                    <Button
                        variant={
                            activedTab === "/applied" ? "primary" : "tertiary"
                        }
                        count={
                            activedTab === "/applied"
                                ? undefined
                                : eachTabCount.applied
                        }
                    >
                        Applied
                    </Button>
                </Link>
            </div>

            {/* Right */}
            <div className="flex-1 items-center flex justify-end gap-4">
                <Link href="/profile">
                    <button className="cursor-pointer">
                        <PictureIcon
                            src={profilePictureUrl ?? undefined}
                            alt="Profile"
                            width={36}
                            height={36}
                        />
                    </button>
                </Link>
            </div>
        </>
    );
}
