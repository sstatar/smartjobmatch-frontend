import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
// import { cookies } from "next/headers"; // นำเข้า cookies
import { API_BASE_URL } from "@/lib/api-config";
import Link from "next/link";
import { Route } from "next";
import IconProfile from "@/public/svgs/iconProfile.svg";
import { cookies } from "next/headers";

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

// เปลี่ยนเป็น async function
export default async function DashboardNavbar({
    activedTab,
}: {
    activedTab?: DashboardTab;
}) {
    // 1. ดึง Token จาก Cookie อย่างปลอดภัยบน Server (รองรับ Next.js 15)
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    // 2. ดึงข้อมูลจาก Backend โดยใช้ Token
    // ถ้าไม่มี token ให้ใช้ค่า default ไปก่อน (แม้ Middleware จะกันไว้แล้วก็ตาม)
    const eachTabCount = token
        ? await getTabCounts(token)
        : { bookmarked: 0, applied: 0 };
    // const eachTabCount = { bookmarked: 0, applied: 0 };

    return (
        <>
            {/* Left */}
            <div className="flex-1 items-center gap-4">
                <Logo />
            </div>

            {/* Center - Search */}
            <div className="flex-1 flex justify-center gap-6">
                <Link href={"/home" as Route}>
                    <Button
                        variant={activedTab === "jobs" ? "primary" : "tertiary"}
                    >
                        Jobs
                    </Button>
                </Link>
                <Link href={"/bookmark" as Route}>
                    <Button
                        variant={
                            activedTab === "bookmarked" ? "primary" : "tertiary"
                        }
                        count={
                            activedTab === "bookmarked"
                                ? undefined
                                : eachTabCount.bookmarked
                        }
                    >
                        Bookmarked
                    </Button>
                </Link>
                <Link href={"/applied" as Route}>
                    <Button
                        variant={
                            activedTab === "applied" ? "primary" : "tertiary"
                        }
                        count={
                            activedTab === "applied"
                                ? undefined
                                : eachTabCount.applied
                        }
                    >
                        Applied
                    </Button>
                </Link>
            </div>

            {/* Right */}
            <div className="flex-1 items-center flex justify-end gap-4">
                <Link href="/profile">
                    <button className="cursor-pointer">
                        <IconProfile className="w-9 h-9"></IconProfile>
                    </button>
                </Link>
            </div>
        </>
    );
}
