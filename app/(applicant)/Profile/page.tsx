import Navbar from "@/components/navbar/Navbar";
import ProfileContent from "./(ProfileSectionDisplay)/ProfileContent";
import Sidebar from "@/components/sideBar/Sidebar";
import { cookies } from "next/headers";
import { API_BASE_URL } from "@/lib/api-config";

export default async function page() {
    // 1. ล้วงมือเข้าไปหยิบ Token จากกระเป๋า Cookie (ฝั่ง Server ทำได้สบายๆ)
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        // ถ้าไม่มี Token แปลว่ายังไม่ล็อกอิน โยนกลับไปหน้า Login ได้เลย
        return <div>กรุณาล็อกอินก่อนเข้าใช้งาน</div>;
    }

    let profileData = null;

    try {
        // 2. ใช้ fetch ของเซิร์ฟเวอร์ยิงไปหา Backend พร้อมแนบ Token ไปใน Header
        const res = await fetch(`${API_BASE_URL}/profiles/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // 💡 แนบ Token ตรงนี้!
            },
            cache: "no-store", // สั่งให้ดึงข้อมูลใหม่เสมอ ไม่ต้องจำของเก่า
        });

        if (res.ok) {
            profileData = await res.json();
        } else {
            console.error("ดึงข้อมูลไม่สำเร็จ Status:", res.status);
        }
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการต่อ API:", error);
    }

    // 3. ถ้า API ล่ม หรือหาข้อมูลไม่เจอ
    if (!profileData) {
        return <div>ไม่พบข้อมูลโปรไฟล์ หรือ เซิร์ฟเวอร์มีปัญหา</div>;
    }

    return (
        <div className="h-screen flex flex-col">
            <Navbar variant="dashboard" />
            <div className="flex flex-1 overflow-hidden gap-4 justify-center px-8">
                <Sidebar />

                <div className="flex flex-1 flex-col mt-2.5 width-full overflow-hidden">
                    <div>
                        <h1 className=" text-heading-200 font-(--weight-heading) text-accent mx-10 mb-1.5">
                            Profile
                        </h1>
                    </div>
                    <ProfileContent
                        userData={profileData.personal || {}}
                        educationData={profileData.education || []}
                        workData={profileData.workExperience || []}
                        skills={profileData.skills || []}
                    />
                </div>
            </div>
        </div>
    );
}
