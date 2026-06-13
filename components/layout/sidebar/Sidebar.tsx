"use client";

import ButtonMenu from "@/components/ui/ButtonMenu";
import { useRouter, usePathname } from "next/navigation";
import { User, FileText, Settings } from "lucide-react";

const menuItems = [
    { id: "profile", text: "Profile", icon: User, path: "/profile" },
    { id: "resume", text: "Resume", icon: FileText, path: "/profile/resume" },
    {
        id: "account",
        text: "Account Setting",
        icon: Settings, // 💡 เปลี่ยนไอคอนตรงนี้
        path: "/profile/accountSetting",
    },
];
export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    return (
        // 💡 1. เปลี่ยนคลาสตรงนี้!
        // - มือถือ: flex-row, เลื่อนแนวนอนได้ (overflow-x-auto), ไม่ให้ตัดบรรทัด (whitespace-nowrap)
        // - คอม (md): flex-col, กว้าง 100% (w-full) ของกล่องแม่
        <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 w-full no-scrollbar">
            {menuItems.map((item) => {
                const isCurrentlyActive = pathname === item.path;

                return (
                    // 💡 2. ครอบด้วย div ที่หดไม่ได้ (shrink-0) เพื่อให้บนมือถือปุ่มไม่โดนบีบจนเละ
                    <div key={item.id} className="shrink-0">
                        <ButtonMenu
                            text={item.text}
                            icon={item.icon}
                            isActive={isCurrentlyActive}
                            onClick={() => handleNavigation(item.path)}
                        />
                    </div>
                );
            })}
        </nav>
    );
}
