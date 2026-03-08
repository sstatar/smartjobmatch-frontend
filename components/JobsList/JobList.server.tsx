import { API_BASE_URL } from "@/lib/api-config";
import { cookies } from "next/headers";
import JobAppliedClient from "./JobAppliedList.client";
import JobListClient from "./JobsList.client";
import Pagination from "../Pagination";

export type QueryType = "all" | "bookmarked" | "applied";

export default async function JobsList({
    queryType = "all",
    query = "",
    page = 1,
}: {
    queryType?: QueryType;
    query?: string;
    page?: number;
}) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const queryUrls = {
        all: `${API_BASE_URL}/job-posts?query=${query}&page=${page}`,
        bookmarked: `${API_BASE_URL}/job-posts/bookmarked`,
        applied: `${API_BASE_URL}/applications/mine?query=${query}&page=${page}`,
    };

    const responseData = await fetch(queryUrls[queryType], {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .catch(console.error);

    // ป้องกันแอปพัง: เช็คว่ามี .data ไหม ถ้าไม่มีให้มองว่า responseData คือ Array เลย
    const jobs = responseData?.data || responseData || [];

    // ป้องกันแอปพัง: ใช้ Optional Chaining (?.) เช็คว่ามี .meta ไหม ถ้าไม่มีให้หน้าทั้งหมดมีแค่ 1 หน้า
    const totalPages = responseData?.meta?.totalPages || 1;

    const JobClient = {
        all: <JobListClient key={`${query}-${page}`} jobs={jobs} />,
        bookmarked: <JobListClient key={`${query}-${page}`} jobs={jobs} />,
        applied: <JobAppliedClient key={`${query}-${page}`} jobs={jobs} />,
    };
    return (
        <>
            {/* 2. นำ Total Pages ไปสร้างปุ่มเปลี่ยนหน้า */}
            {totalPages > 1 && <Pagination totalPages={totalPages} />}

            {JobClient[queryType]}
        </>
    );
}
