import Navbar from "@/components/layout/navbar/Navbar";

export default function ApplicantMainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            {/* 💡 เรียกใช้ Dashboard Navbar ตัวหลัก */}
            <Navbar variant="dashboard" />

            <main className="grow px-0 lg:px-6 pt-0">{children}</main>
        </div>
    );
}
