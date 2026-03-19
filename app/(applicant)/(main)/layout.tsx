import Navbar from "@/components/navbar/Navbar";

export default function ApplicantMainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            {/* 💡 เรียกใช้ Dashboard Navbar ตัวหลัก */}
            <Navbar variant="dashboard" /> 
            
            <main className="flex-grow p-6 pt-10">
                {children}
            </main>
        </div>
    );
}