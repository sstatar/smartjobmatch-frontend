"use client";

import { useState } from "react";
import Link from "next/link";
import { Route } from "next";
import Logo from "../../ui/Logo";
import Button from "../../ui/Button";
import IconProfile from "@/public/svgs/iconProfile.svg";
import { DashboardTab } from "./DashboardNavbar";

type DashboardNavbarClientProps = {
    activedTab?: DashboardTab;
    eachTabCount: { bookmarked: number; applied: number };
};

export default function DashboardNavbarClient({
    activedTab,
    eachTabCount,
}: DashboardNavbarClientProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // ย้ายแก๊งค์ปุ่มเมนูมาไว้ตรงนี้ เพื่อให้เรียกใช้ซ้ำได้ทั้งจอคอมและมือถือ
    const navButtons = (
        <>
            <Link
                href={"/home" as Route}
                onClick={() => setIsMobileMenuOpen(false)}
            >
                <Button
                    variant={activedTab === "jobs" ? "primary" : "tertiary"}
                >
                    Jobs
                </Button>
            </Link>
            <Link
                href={"/bookmark" as Route}
                onClick={() => setIsMobileMenuOpen(false)}
            >
                <Button
                    variant={
                        activedTab === "bookmarked" ? "primary" : "tertiary"
                    }
                    count={
                        activedTab === "bookmarked"
                            ? undefined
                            : eachTabCount.bookmarked
                    }
                >
                    Bookmarked
                </Button>
            </Link>
            <Link
                href={"/applied" as Route}
                onClick={() => setIsMobileMenuOpen(false)}
            >
                <Button
                    variant={activedTab === "applied" ? "primary" : "tertiary"}
                    count={
                        activedTab === "applied"
                            ? undefined
                            : eachTabCount.applied
                    }
                >
                    Applied
                </Button>
            </Link>
        </>
    );

    return (
        <div className="w-full flex items-center justify-between">
            {/* 📁 ฝั่งซ้าย: โลโก้ */}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-md focus:outline-none md:hidden"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        {isMobileMenuOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>

                <div className="flex-shrink-0">
                    <Logo />
                </div>
            </div>

            {/* 💻 หน้าจอ Desktop: โชว์เมนูตรงกลาง (ซ่อนบนมือถือด้วย md:hidden) */}
            <div className="hidden md:flex flex-1 justify-center gap-4 lg:gap-6">
                {navButtons}
            </div>

            {/* 📁 ฝั่งขวา: โปรไฟล์ (บนจอคอม) และ ปุ่ม Hamburger (บนมือถือ) */}
            <div className="flex items-center gap-4">
                {/* ปุ่มโปรไฟล์โชว์บนจอคอมปกติ แต่บนมือถือจะเอาไปซ่อนไว้ในเมนูแทนก็ได้ หรือจะโชว์คู่กันแบบนี้ก็สวยครับ */}
                <Link href="/profile" className=" md:block">
                    <button className="cursor-pointer flex items-center">
                        <IconProfile className="w-9 h-9" />
                    </button>
                </Link>
            </div>

            {/* 📱 หน้าจอ Mobile: Dropdown เมนูตกลงมาเมื่อกดเปิด */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white border-b border-accent-2 shadow-lg flex flex-col p-4 gap-4 md:hidden z-50 animate-in fade-in slide-in-from-top-5 duration-200">
                    <div className="flex flex-col gap-3">{navButtons}</div>
                    <hr className="border-gray-100" />
                </div>
            )}
        </div>
    );
}
