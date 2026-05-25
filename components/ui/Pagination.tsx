// components/Pagination.tsx
"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination({ totalPages }: { totalPages: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    // ฟังก์ชันนี้จะดึง Query Params เดิม (เช่น ?query=dev) มาผสมกับ page ใหม่
    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    return (
        <div className="flex justify-center items-center gap-4">
            {/* ปุ่ม Previous */}
            <Link
                href={createPageURL(currentPage - 1)}
                className={`px-4 py-2 border rounded-md ${
                    currentPage <= 1
                        ? "pointer-events-none opacity-50 bg-gray-100"
                        : "hover:bg-blue-50"
                }`}
                aria-disabled={currentPage <= 1}
            >
                Previous
            </Link>

            {/* แสดงข้อความบอกหน้าปัจจุบัน */}
            <span className="text-sm font-medium">
                Page {currentPage} of {totalPages}
            </span>

            {/* ปุ่ม Next */}
            <Link
                href={createPageURL(currentPage + 1)}
                className={`px-4 py-2 border rounded-md ${
                    currentPage >= totalPages
                        ? "pointer-events-none opacity-50 bg-gray-100"
                        : "hover:bg-blue-50"
                }`}
                aria-disabled={currentPage >= totalPages}
            >
                Next
            </Link>
        </div>
    );
}
