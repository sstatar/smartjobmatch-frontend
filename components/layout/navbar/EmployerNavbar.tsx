"use client";

import { User } from "@/lib/api/endpoints/usersApi";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import Logo from "../../ui/Logo";
import NavSimpleItem from "../../ui/NavSimpleItem";
import IconProfile from "@/public/svgs/iconProfile.svg";
import { logout } from "@/app/actions/auth";

export interface EmployerNavbarProps {
    user: User | null;
}

export default function EmployerNavbar({ user }: EmployerNavbarProps) {
    if (!user || user.role !== "EMPLOYER") {
        redirect("/login");
    }
    const pathname = usePathname();

    return (
        <>
            <div className="flex-1">
                <Logo />
            </div>
            <div className="flex-1 flex justify-end items-center gap-8">
                {user.companyId ? (
                    <>
                        <Link href={`/dashboard`}>
                            <NavSimpleItem
                                label="Dashboard"
                                isActived={pathname === "/dashboard"}
                            />
                        </Link>
                        <Link href={`/jobs/create`}>
                            <NavSimpleItem
                                label="Create Job Post"
                                isActived={pathname === "/jobs/create"}
                            />
                        </Link>
                        <Link href={`/company/me`}>
                            <NavSimpleItem
                                label="My Company"
                                isActived={pathname === "/company/me"}
                            />
                        </Link>
                    </>
                ) : (
                    <Link href={`/company/create`}>
                        <NavSimpleItem
                            label="Create Company"
                            isActived={pathname === "/company/create"}
                        />
                    </Link>
                )}
                <button
                    className="cursor-pointer"
                    onClick={async () => logout()}
                >
                    <NavSimpleItem label="Log out" />
                </button>
            </div>
        </>
    );
}
