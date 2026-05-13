import DashboardClient from "./DashboardClient";
import { companiesApi,JobPost } from "@/lib/api/endpoints/companiesApi"; 
export default async function EmployerDashboardPage() {
    let myJobs: JobPost[] = [];
    let hasError = false;
    try {
        const companyData = await companiesApi.getMyCompany();
        myJobs = companyData.jobPosts;
        console.log(myJobs);
    } catch (error) {
        console.error("ดึงข้อมูลบริษัทไม่สำเร็จ:", error);
        hasError = true;
    }
    
    if (hasError) {
        return (
            <main className="max-w-7xl mx-auto px-4 py-8 text-center text-red-500">
                <h2>ไม่สามารถโหลดข้อมูลได้ กรุณาตรวจสอบการเข้าสู่ระบบ</h2>
            </main>
        );
    }

    return (
        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <DashboardClient initialJobs={myJobs}  />
        </main>
    );
}