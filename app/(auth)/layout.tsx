import Navbar from "@/components/layout/navbar/Navbar";

export default function UploadResumeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            {/* 💡 เรียกใช้ Navbar แบบที่ต้องการ (เช่น default หรือ auth) */}
            <Navbar variant="default" /> 
            
            <main className="flex-grow flex items-center justify-center p-4">
                {children}
            </main>
        </div>
    );
}