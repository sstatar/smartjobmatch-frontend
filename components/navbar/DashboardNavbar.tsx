import { API_BASE_URL } from "@/lib/api-config";
import { cookies } from "next/headers";
import DashboardNavbarClient from "./DashboardNavbar.client";

export type DashboardTab = "jobs" | "bookmarked" | "applied";

// สร้างฟังก์ชันสำหรับดึงข้อมูลจาก Backend
async function getTabCounts(token: string) {
    try {
        const res = await fetch(
            `${API_BASE_URL}/users/me/bookmarked-and-applied-count`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                // cache: 'no-store' // ใส่ถ้าต้องการให้ข้อมูลอัปเดตใหม่ตลอดเวลา
            },
        );

        if (!res.ok) return { bookmarked: 0, applied: 0 };
        const resJson = await res.json();
        return {
            bookmarked: resJson.bookmarkedCount,
            applied: resJson.appliedCount,
        };
        // return { bookmarked: 0, applied: 0 };
    } catch (error) {
        console.error("Failed to fetch tab counts", error);
        return { bookmarked: 0, applied: 0 };
    }
}

async function getProfilePictureUrl(token: string): Promise<string | null> {
    try {
        const res = await fetch(`${API_BASE_URL}/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });
        if (!res.ok) return null;
        const user = (await res.json()) as { profilePictureUrl?: string | null };
        return user.profilePictureUrl ?? null;
    } catch (error) {
        console.error("Failed to fetch user profile picture", error);
        return null;
    }
}

// เปลี่ยนเป็น async function
export default async function DashboardNavbar() {
    // 1. ดึง Token จาก Cookie อย่างปลอดภัยบน Server (รองรับ Next.js 15)
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    // 2. ดึงข้อมูลจาก Backend โดยใช้ Token
    // ถ้าไม่มี token ให้ใช้ค่า default ไปก่อน (แม้ Middleware จะกันไว้แล้วก็ตาม)
    let eachTabCount = { bookmarked: 0, applied: 0 };
    let profilePictureUrl: string | null = null;
    if (token) {
        [eachTabCount, profilePictureUrl] = await Promise.all([
            getTabCounts(token),
            getProfilePictureUrl(token),
        ]);
    }

    return (
        <DashboardNavbarClient
            eachTabCount={eachTabCount}
            profilePictureUrl={profilePictureUrl}
        />
    );
}
