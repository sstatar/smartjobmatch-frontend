"use client"; // ย้ายความรับผิดชอบเรื่องการคลิกมาไว้ที่นี่

import ButtonMenu from "@/components/ui/ButtonMenu";
import Profile from "@/public/svgs/profile.svg";

const menuItems = [
    { id: "profile", text: "Profile", icon: Profile, path: "/profile" },
    { id: "resume", text: "Resume", icon: Profile, path: "/resume" },
    { id: "account", text: "Account Setting", icon: Profile, path: "/settings" },
];

export default function Sidebar() {
    const handleNavigation = (path: string) => {
        console.log(`Navigating to ${path}`);
        // ในอนาคตจะใช้ useRouter().push(path) ตรงนี้ครับ
    };

    return (
        <div className="flex flex-col mt-21 mx-3.5 w-full max-w-70 gap-1 shrink-0">
            {menuItems.map((item) => (
                <ButtonMenu
                    key={item.id}
                    text={item.text}
                    icon={item.icon}
                    onClick={() => handleNavigation(item.path)}
                />
            ))}
        </div>
    );
}