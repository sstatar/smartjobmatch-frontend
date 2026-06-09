import Sidebar from "@/components/layout/sidebar/Sidebar";

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // 💡 1. เปลี่ยนจาก flex เฉยๆ เป็น flex-col (มือถือ) และ md:flex-row (คอม)
        <div className="flex flex-col lg:flex-row w-full max-w-screen-2xl mx-auto px-4 md:px-8 py-4 md:py-0 gap-4 md:gap-8">
            {/* 💡 เติม md:mt-[84px] หรือ md:mt-20 เข้าไป เพื่อกด Sidebar ลงมาให้ตรงกับขอบสีเทา */}
            <aside className="w-full md:w-64 flex-shrink-0 md:mt-[70px]">
                <Sidebar />
            </aside>

            <main className="flex-1 min-w-0">{children}</main>
        </div>
    );
}
