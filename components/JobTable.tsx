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
            <table className="w-full text-left">
                {/* หัวตาราง */}
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-medium">
                    <tr>
                        <th className="py-4 px-6">Job posting</th>
                        <th className="py-4 px-6 text-center">Candidate</th>
                        <th className="py-4 px-6 text-center">
                            Find matching candidate
                        </th>
                    </tr>
                </thead>

                {/* ตัวตาราง (ตรงนี้แหละที่เราจะวนลูป .map) */}
                <tbody className="divide-y divide-gray-200">
                    {/* ถ้าไม่มีข้อมูลให้โชว์ข้อความนี้ */}
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
                        // ถ้ามีข้อมูล ให้วนลูปสร้าง <tr> ทีละบรรทัด
                        jobs.map((job) => (
                            <tr
                                key={job.id}
                                className="cursor-pointer hover:bg-gray-50 transition-colors "
                                onClick={() => {
                                    // สั่งคนขับรถให้พาไปหน้าที่ต้องการ (แก้ Path ให้ตรงกับโปรเจกต์ของคุณนะ)
                                    router.push(`/jobs/${job.id}`);
                                }}
                            >
                                {/* คอลัมน์ที่ 1: ชื่องาน + วันที่ + ป้ายสถานะ */}
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
                                            className={`text-xs px-2 py-0.5 rounded-full border ${
                                                job.isActive
                                                    ? "border-green-500 text-green-700 bg-green-50"
                                                    : "border-gray-400 text-gray-600 bg-gray-100"
                                            }`}
                                        >
                                            {job.isActive ? "Active" : "closed"}
                                        </span>
                                    </div>
                                </td>

                                {/* คอลัมน์ที่ 2: จำนวนผู้สมัคร */}
                                <td className="py-4 px-6 text-center text-xl font-bold text-gray-900">
                                    {job.applications?.length || 0}
                                </td>

                                {/* คอลัมน์ที่ 3: ปุ่มกด */}
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
