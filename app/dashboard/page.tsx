import { cookies } from "next/headers";
import { logout } from "@/app/actions/auth";
import { API_BASE_URL } from "@/lib/api-config";

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
        throw new Error("ไม่สามารถดึงข้อมูลผู้ใช้ได้");
    }
    return res.json();
}

export default async function DashboardPage() {
    const userData = await getProtectedData();

    return (
        <div>
            <h1>
                ยินดีต้อนรับ, {userData.id} {userData.email}
            </h1>
            <p>ข้อมูลโปรไฟล์ของคุณถูกดึงมาอย่างปลอดภัยบนเซิร์ฟเวอร์!</p>

            {/* สำหรับปุ่ม logout ที่ไม่ได้ทำอะไรซับซ้อน สามารถผูกตรงๆ ได้เลยแบบไม่มี error เพราะไม่ได้ return อะไร */}
            <form action={logout}>
                <button type="submit">ออกจากระบบ</button>
            </form>
        </div>
    );
}
