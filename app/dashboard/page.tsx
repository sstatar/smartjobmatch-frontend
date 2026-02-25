import { cookies } from "next/headers";
import { logout } from "@/app/actions/auth";
import { API_BASE_URL } from "@/lib/api-config";
import { redirect } from "next/navigation";

async function getProtectedData() {
    // แก้ไข: ใส่ await หน้า cookies()
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await fetch(`${API_BASE_URL}/users/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        console.log("ไม่สามารถดึงข้อมูลผู้ใช้ได้");
        redirect("/login");
    }
    return res.json();
}

export default async function DashboardPage() {
    const userData = await getProtectedData();

    return (
        <div className="mt-10 text-center">
            <h1>ยินดีต้อนรับ</h1>
            <h2>id: {userData.id},</h2>
            <h2>email: {userData.email},</h2>
            <h2>role: {userData.role}</h2>
            <p>ข้อมูลโปรไฟล์ของคุณถูกดึงมาอย่างปลอดภัยบนเซิร์ฟเวอร์!</p>
            {/* สำหรับปุ่ม logout ที่ไม่ได้ทำอะไรซับซ้อน สามารถผูกตรงๆ ได้เลยแบบไม่มี error เพราะไม่ได้ return อะไร */}
            <form action={logout}>
                <button
                    type="submit"
                    className="px-4 py-2 border border-gray-300 rounded-sm"
                >
                    ออกจากระบบ
                </button>
            </form>
        </div>
    );
}
