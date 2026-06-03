"use client";

import { User } from "@/lib/api/endpoints/usersApi";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "../../ui/Logo";
import NavSimpleItem from "../../ui/NavSimpleItem";
import { logout } from "@/app/actions/auth";

export interface EmployerNavbarProps {
    user: User | null;
}

export default function EmployerNavbar({ user }: EmployerNavbarProps) {
    if (!user || user.role !== "EMPLOYER") {
        redirect("/login");
    }
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // 💡 แยกชิ้นส่วนเมนูออกจากกัน เพื่อให้จัดวางสลับตำแหน่งบนจอคอม/มือถือได้อิสระ
    const companyLink = user.companyId ? (
        <Link href={`/company/me`} onClick={() => setIsMobileMenuOpen(false)}>
            <NavSimpleItem label="My Company" isActived={pathname === "/company/me"} />
        </Link>
    ) : (
        <Link href={`/company/create`} onClick={() => setIsMobileMenuOpen(false)}>
            <NavSimpleItem label="Create Company" isActived={pathname === "/company/create"} />
        </Link>
    );

    const dashboardLink = user.companyId && (
        <Link href={`/dashboard`} onClick={() => setIsMobileMenuOpen(false)}>
            <NavSimpleItem label="Dashboard" isActived={pathname === "/dashboard"} />
        </Link>
    );

    const createJobLink = user.companyId && (
        <Link href={`/jobs/create`} onClick={() => setIsMobileMenuOpen(false)}>
            <NavSimpleItem label="Create Job Post" isActived={pathname === "/jobs/create"} />
        </Link>
    );

    const logoutBtn = (
        <button
            className="cursor-pointer text-left lg:text-center w-full lg:w-auto"
            onClick={async () => {
                setIsMobileMenuOpen(false);
                logout();
            }}
        >
            <NavSimpleItem label="Log out" />
        </button>
    );

    return (
        <div className="w-full flex items-center justify-between">
            
            {/* 📁 ฝั่งซ้าย: โลโก้ และ ปุ่ม Hamburger */}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-md focus:outline-none lg:hidden"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
                <div className="flex-shrink-0">
                    <Logo />
                </div>
            </div>

            {/* 📱 โหมด Mobile: โชว์ My Company ไว้ฝั่งขวาสุด (ซ่อนบนจอคอมด้วย lg:hidden) */}
            {/* ใส่ scale-90 เพื่อแอบลดขนาดลงนิดนึง ป้องกันตัวหนังสือไปชนกับโลโก้บนจอมือถือเล็กๆ */}
            <div className="flex items-center lg:hidden scale-90 origin-right whitespace-nowrap">
                {companyLink}
            </div>

            {/* 💻 โหมด Desktop: โชว์เมนูเรียงแนวนอนฝั่งขวาครบทุกอัน */}
            <div className="hidden lg:flex flex-1 justify-end items-center gap-8">
                {dashboardLink}
                {createJobLink}
                {companyLink}
                {logoutBtn}
            </div>
            

            {/* 📱 โหมด Mobile: Dropdown เมนูที่ตกลงมาตอนกดปุ่ม */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white border-b border-accent-2 shadow-lg flex flex-col p-4 gap-4 lg:hidden z-50 animate-in fade-in slide-in-from-top-5 duration-200">
                    {/* 💡 ไม่เอา companyLink มาใส่ตรงนี้แล้ว เพราะย้ายไปอยู่บน Navbar แทน */}
                    {dashboardLink}
                    {createJobLink}
                    {/* ขีดเส้นคั่นให้ปุ่ม Log out ดูแยกส่วนชัดเจน */}
                    <hr className="border-gray-100" />
                    {logoutBtn}
                </div>
            )}
        </div>
    );
}