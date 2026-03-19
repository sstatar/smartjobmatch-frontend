// components/navbar/DynamicNavbar.tsx

import { getMyInfo } from "@/app/actions/auth";
import AuthNavbar from "./AuthNavbar";
import DashboardNavbar, { DashboardTab } from "./DashboardNavbar";
import DefaultNavbar from "./DefaultNavbar";
import EmployerNavbar from "./EmployerNavbar";

export type DynamicNavbarVariant =
    | "default"
    | "auth"
    | "dashboard"
    | "employer";

type NavbarProps = {
    variant?: DynamicNavbarVariant;
    activedTab?: DashboardTab;
};

export default async function DynamicNavbar({
    variant = "default",
    activedTab,
}: NavbarProps) {
    const user = await getMyInfo();

    let navVariantByUser: DynamicNavbarVariant = "default";

    if (!user) {
        navVariantByUser = "auth";
    } else if (user.role === "EMPLOYER") {
        navVariantByUser = "employer";
    } else if (user.role === "APPLICANT") {
        navVariantByUser = "dashboard";
    }

    const variants = {
        default: <DefaultNavbar />,
        auth: <AuthNavbar />,
        dashboard: <DashboardNavbar activedTab={activedTab as DashboardTab} />,
        employer: <EmployerNavbar user={user} />,
    };

    return (
        <nav className="w-full h-18 flex items-center px-20 border-b border-accent-2 fixed top-0 bg-white z-50">
            {variants[navVariantByUser]}
        </nav>
    );
}
