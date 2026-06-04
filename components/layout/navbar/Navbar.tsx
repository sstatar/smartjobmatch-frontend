// components/navbar/Navbar.tsx

import { getMyInfo } from "@/app/actions/auth";
import AuthNavbar from "./AuthNavbar";
import DashboardNavbar, { DashboardTab } from "./DashboardNavbar";
import DefaultNavbar from "./DefaultNavbar";
import EmployerNavbar from "./EmployerNavbar";

export type NavbarVariant = "default" | "auth" | "dashboard" | "employer";

type NavbarProps = {
    variant?: NavbarVariant;
    activedTab?: DashboardTab;
};

export default async function Navbar({
    variant = "default",
    activedTab,
}: NavbarProps) {
    const user = await getMyInfo();

    const variants = {
        default: <DefaultNavbar />,
        auth: <AuthNavbar />,
        dashboard: <DashboardNavbar activedTab={activedTab as DashboardTab} />,
        employer: <EmployerNavbar user={user} />,
    };


    return (
        <nav className="w-full h-18 flex items-center px-4 md:px-8 lg:px-20 border-b border-accent-2 sticky top-0 bg-white z-100">
            {variants[variant]}
        </nav>
    );
}
