import { API_BASE_URL } from "@/lib/api-config";
import { cookies } from "next/headers";
import DashboardNavbarClient from "./DashboardNavbarClient"; // 💡 นำเข้าตัวแปลงร่างที่เราเพิ่งสร้าง

export type DashboardTab = "jobs" | "bookmarked" | "applied";

async function getTabCounts(token: string) {
    try {
        const res = await fetch(
            `${API_BASE_URL}/users/me/bookmarked-and-applied-count`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            },
        );

        if (!res.ok) return { bookmarked: 0, applied: 0 };
        const resJson = await res.json();
        return {
            bookmarked: resJson.bookmarkedCount,
            applied: resJson.appliedCount,
        };
    } catch (error) {
        console.error("Failed to fetch tab counts", error);
        return { bookmarked: 0, applied: 0 };
    }
}

export default async function DashboardNavbar({
    activedTab,
}: {
    activedTab?: DashboardTab;
}) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const eachTabCount = token
        ? await getTabCounts(token)
        : { bookmarked: 0, applied: 0 };

    // 💡 ส่งข้อมูลที่ดึงได้จาก Server ไปให้หน้าตาฝั่ง Client ทำงานต่อ
    return (
        <DashboardNavbarClient 
            activedTab={activedTab} 
            eachTabCount={eachTabCount} 
        />
    );
}