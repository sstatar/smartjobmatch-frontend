// app/jobs/page.tsx
import JobQueryInput from "@/components/applicant/JobQueryInput";
import JobsList from "@/components/shared/JobsList/JobList.server";
import Navbar from "@/components/layout/navbar/Navbar";

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
        location?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || "";
    const location = searchParams?.location || "";
    const currentPage = Number(searchParams?.page) || 1; // แปลงเป็นตัวเลข ถ้าไม่มีให้เริ่มที่ 1

    return (
        <>
            <div className="page flex flex-col gap-8 mt-16 m-12">
                <JobQueryInput />

                {/* ส่ง currentPage ไปยิง API เพื่อดึง data และ totalPages */}
                <JobsList
                    queryType="applied"
                    query={query}
                    page={currentPage}
                />
            </div>
        </>
    );
}
