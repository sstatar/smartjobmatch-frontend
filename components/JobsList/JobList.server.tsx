import { API_BASE_URL } from "@/lib/api-config";
import { cookies } from "next/headers";
import JobAppliedClient from "./JobAppliedList.client";
import JobListClient from "./JobsList.client";
import Pagination from "../Pagination";

export type QueryType = "all" | "bookmarked" | "applied";

function buildListQueryString(opts: {
    query: string;
    location: string;
    page: number;
    workplaceType?: string;
    employmentType?: string;
    salaryMin?: number;
    salaryMax?: number;
    category?: string;
}) {
    const params = new URLSearchParams();
    params.set("query", opts.query);
    if (opts.location) params.set("location", opts.location);
    params.set("page", String(opts.page));
    if (opts.workplaceType) params.set("workplaceType", opts.workplaceType);
    if (opts.employmentType)
        params.set("employmentType", opts.employmentType);
    if (opts.salaryMin != null && Number.isFinite(opts.salaryMin)) {
        params.set("salaryMin", String(opts.salaryMin));
    }
    if (opts.salaryMax != null && Number.isFinite(opts.salaryMax)) {
        params.set("salaryMax", String(opts.salaryMax));
    }
    if (opts.category) params.set("category", opts.category);
    return params.toString();
}

export default async function JobsList({
    queryType = "all",
    query = "",
    location = "",
    page = 1,
    workplaceType,
    employmentType,
    salaryMin,
    salaryMax,
    category,
}: {
    queryType?: QueryType;
    query?: string;
    location?: string;
    page?: number;
    workplaceType?: string;
    employmentType?: string;
    salaryMin?: number;
    salaryMax?: number;
    category?: string;
}) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const qs = buildListQueryString({
        query,
        location,
        page,
        workplaceType,
        employmentType,
        salaryMin,
        salaryMax,
        category,
    });

    const queryUrls = {
        all: `${API_BASE_URL}/job-posts?${qs}`,
        bookmarked: `${API_BASE_URL}/bookmarks/me?${qs}`,
        applied: `${API_BASE_URL}/applications/mine?${qs}`,
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

    const listKey = `${query}-${location}-${page}-${workplaceType ?? ""}-${employmentType ?? ""}-${salaryMin ?? ""}-${salaryMax ?? ""}-${category ?? ""}`;

    const JobClient = {
        all: <JobListClient key={listKey} jobs={jobs} />,
        bookmarked: <JobListClient key={listKey} jobs={jobs} />,
        applied: <JobAppliedClient key={listKey} jobs={jobs} />,
    };
    return (
        <>
            {/* 2. นำ Total Pages ไปสร้างปุ่มเปลี่ยนหน้า */}
            {totalPages > 1 && <Pagination totalPages={totalPages} />}

            {JobClient[queryType]}
        </>
    );
}
