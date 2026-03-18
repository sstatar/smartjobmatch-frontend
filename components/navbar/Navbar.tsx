// components/navbar/Navbar.tsx

import { getMyInfo } from "@/app/actions/auth";
import AuthNavbar from "./AuthNavbar";
import DashboardNavbar, { DashboardTab } from "./DashboardNavbar";
import DefaultNavbar from "./DefaultNavbar";
import EmployerNavbar from "./EmployerNavbar";
import { JSX } from "react";

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

    // TODO: match variant with user

    let userVariant: JSX.Element | null = null;

    if (!user) {
        userVariant = variants.default;
    } else if (user.role === "APPLICANT") {
        userVariant = variants.dashboard;
    } else if (user.role === "EMPLOYER") {
        userVariant = variants.employer;
    }

    return (
        <nav className="w-full h-18 flex items-center px-6 border-b border-accent-2 fixed top-0 bg-white z-100">
            {userVariant ?? variants[variant]}
        </nav>
    );
}
