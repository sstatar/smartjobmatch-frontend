// app/jobs/page.tsx
import JobFilters from "@/components/JobFilters";
import JobQueryInput from "@/components/JobQueryInput";
import JobsList from "@/components/JobsList/JobList.server";
import { enumsApi } from "@/lib/api/endpoints/enumsApi";

function parseOptionalNonNegativeInt(
    raw: string | undefined,
): number | undefined {
    if (raw === undefined || raw === "") return undefined;
    const n = Number(raw);
    if (!Number.isFinite(n) || n < 0) return undefined;
    return Math.floor(n);
}

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
        location?: string;
        page?: string;
        workplaceType?: string;
        employmentType?: string;
        salaryMin?: string;
        salaryMax?: string;
        category?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || "";
    const location = searchParams?.location || "";
    const currentPage = Number(searchParams?.page) || 1; // แปลงเป็นตัวเลข ถ้าไม่มีให้เริ่มที่ 1
    const workplaceType = searchParams?.workplaceType?.trim() || undefined;
    const employmentType = searchParams?.employmentType?.trim() || undefined;
    const salaryMin = parseOptionalNonNegativeInt(searchParams?.salaryMin);
    const salaryMax = parseOptionalNonNegativeInt(searchParams?.salaryMax);
    const category = searchParams?.category?.trim() || undefined;

    let categories: Awaited<ReturnType<typeof enumsApi.getCategories>> = [];
    try {
        categories = await enumsApi.getCategories();
    } catch {
        categories = [];
    }

    return (
        <>
            <div className="page flex flex-col gap-8 mx-12 mb-12 mt-16">
                <JobQueryInput />
                <JobFilters categories={categories} />

                {/* ส่ง currentPage ไปยิง API เพื่อดึง data และ totalPages */}
                <JobsList
                    query={query}
                    location={location}
                    page={currentPage}
                    workplaceType={workplaceType}
                    employmentType={employmentType}
                    salaryMin={salaryMin}
                    salaryMax={salaryMax}
                    category={category}
                />
            </div>
        </>
    );
}
