"use client";

import { JobPost } from "@/lib/api/endpoints/companiesApi";
import { useRouter } from "next/navigation";

interface JobTableProps {
    jobs: JobPost[];
}

export default function JobTable({ jobs }: JobTableProps) {
    const router = useRouter();
    return (
        <div className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            {/* 📱 1. มุมมองแบบการ์ด (แสดงบนมือถือ, ซ่อนบนจอ md ขึ้นไป) */}
            <div className="md:hidden divide-y divide-gray-200">
                {jobs.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        ไม่พบข้อมูลงานที่ค้นหา
                    </div>
                ) : (
                    jobs.map((job) => (
                        <div
                            key={job.id}
                            className="p-4 flex flex-col gap-3 cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => router.push(`/jobs/${job.id}`)}
                        >
                            {/* ชื่องานและป้ายสถานะ */}
                            <div className="flex justify-between items-start gap-2">
                                <p className="font-bold text-gray-900 line-clamp-2 flex-grow">
                                    {job.title}
                                </p>
                                <span
                                    className={`text-xs px-2 py-0.5 rounded-full border whitespace-nowrap ${job.isActive ? "border-green-500 text-green-700 bg-green-50" : "border-gray-400 text-gray-600 bg-gray-100"}`}
                                >
                                    {job.isActive ? "Active" : "Closed"}
                                </span>
                            </div>

                            {/* วันที่และจำนวนผู้สมัคร */}
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">
                                    Date{" "}
                                    {job.postedAt
                                        ? new Date(
                                              job.postedAt,
                                          ).toLocaleDateString("en-US", {
                                              year: "numeric",
                                              month: "short",
                                              day: "numeric",
                                          })
                                        : "-"}
                                </span>
                                <span className="font-medium text-gray-900">
                                    Candidates:{" "}
                                    <span className="font-bold text-lg">
                                        {job.applications?.length || 0}
                                    </span>
                                </span>
                            </div>

                            {/* ปุ่มกด */}
                            <button
                                className="w-full bg-primary text-white font-medium px-4 py-2 rounded-md hover:bg-blue-800 transition-colors mt-2"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    router.push(`/jobs/${job.id}/candidates`);
                                }}
                            >
                                Find Matching Candidates
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* 💻 2. มุมมองแบบตาราง (ซ่อนบนมือถือ, แสดงบนจอ md ขึ้นไป) */}
            {/* (โค้ดตารางเดิมของคุณ ยกเว้นบรรทัด <table> ที่เติมคลาส hidden md:table) */}
            <table className="hidden md:table w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-medium">
                    <tr>
                        <th className="py-4 px-6">Job posting</th>
                        <th className="py-4 px-6 text-center">Candidate</th>
                        <th className="py-4 px-6 text-center">
                            Find matching candidate
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {jobs.length === 0 ? (
                        <tr>
                            <td
                                colSpan={3}
                                className="py-8 text-center text-gray-500"
                            >
                                ไม่พบข้อมูลงานที่ค้นหา
                            </td>
                        </tr>
                    ) : (
                        jobs.map((job) => (
                            <tr
                                key={job.id}
                                className="cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => router.push(`/jobs/${job.id}`)}
                            >
                                <td className="py-4 px-6">
                                    <p className="font-bold text-gray-900 line-clamp-2">
                                        {job.title}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-sm text-gray-500">
                                            Date{" "}
                                            {job.postedAt
                                                ? new Date(
                                                      job.postedAt,
                                                  ).toLocaleDateString(
                                                      "en-US",
                                                      {
                                                          year: "numeric",
                                                          month: "short",
                                                          day: "numeric",
                                                      },
                                                  )
                                                : "-"}
                                        </span>
                                        <span
                                            className={`text-xs px-2 py-0.5 rounded-full border ${job.isActive ? "border-green-500 text-green-700 bg-green-50" : "border-gray-400 text-gray-600 bg-gray-100"}`}
                                        >
                                            {job.isActive ? "Active" : "Closed"}
                                        </span>
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-center text-xl font-bold text-gray-900">
                                    {job.applications?.length || 0}
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <button
                                        className="bg-primary text-white font-medium px-4 py-2 rounded-md hover:bg-blue-800 transition-colors cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            router.push(
                                                `/jobs/${job.id}/candidates`,
                                            );
                                        }}
                                    >
                                        Find Matching Candidates
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
