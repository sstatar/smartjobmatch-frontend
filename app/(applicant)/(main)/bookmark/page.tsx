import JobQueryInput from "@/components/applicant/JobQueryInput";
import JobsList from "@/components/shared/JobsList/JobList.server";

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
            {/* 💡 ปรับ gap และ margin ให้ Responsive: 
                - มือถือ: ขอบน้อยๆ (mx-4), ระยะห่างน้อยๆ (gap-6, mt-8)
                - จอคอม (md:, lg:): ขอบเยอะขึ้น (mx-8, lg:mx-12) ตามความกว้างจอ 
            */}
            <div className="page flex flex-col gap-6 md:gap-8 mx-4 md:mx-8 lg:mx-12 mb-8 md:mb-12 mt-4 md:mt-6">
                <JobQueryInput />

                {/* ส่ง currentPage ไปยิง API เพื่อดึง data และ totalPages */}
                <JobsList
                    queryType="bookmarked"
                    query={query}
                    page={currentPage}
                />
            </div>
        </>
    );
}
