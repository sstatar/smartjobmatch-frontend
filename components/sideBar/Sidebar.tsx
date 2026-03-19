"use client"; // ย้ายความรับผิดชอบเรื่องการคลิกมาไว้ที่นี่

import ButtonMenu from "@/components/ui/ButtonMenu";
import Profile from "@/public/svgs/profile.svg";
import { useRouter, usePathname } from "next/navigation";

const menuItems = [
    { id: "profile", text: "Profile", icon: Profile, path: "/profile" },
    { id: "resume", text: "Resume", icon: Profile, path: "/profile/resume" },
    {
        id: "account",
        text: "Account Setting",
        icon: Profile,
        path: "/profile/accountSetting",
    },
];

export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();

    const handleNavigation = (path: string) => {
        console.log(`Navigating to ${path}`);
        // 💡 แล้วค่อยเรียกใช้ router.push ตรงนี้ครับ
        router.push(path);
    };

    return (
        <div className="flex flex-col mt-21 mx-3.5 w-full max-w-70 gap-1 shrink-0">
            {menuItems.map((item) => {
                const isCurrentlyActive = pathname === item.path;

                return (
                    <ButtonMenu
                        key={item.id}
                        text={item.text}
                        icon={item.icon}
                        isActive={isCurrentlyActive} // 💡 4. ส่งค่าไปให้ปุ่มของคุณ
                        onClick={() => handleNavigation(item.path)}
                    />
                );
            })}
        </div>
    );
}
