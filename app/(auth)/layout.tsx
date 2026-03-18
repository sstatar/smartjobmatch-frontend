// app/(auth)/layout.tsx
import Navbar from "@/components/navbar/Navbar"; // เปลี่ยน path ให้ตรงกับของคุณ

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            {/* 💡 เรียกใช้ Navbar แบบที่ต้องการสำหรับหน้า Auth */}
            <Navbar variant="default" /> 
            
            {/* children คือเนื้อหาของหน้า page.tsx (Login หรือ Register) */}
            <main className="flex-grow flex items-center justify-center p-4">
                {children}
            </main>
        </div>
    );
}