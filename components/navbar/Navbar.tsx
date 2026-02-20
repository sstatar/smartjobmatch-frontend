// components/navbar/Navbar.tsx

import DefaultNavbar from "./DefaultNavbar";
import AuthNavbar from "./AuthNavbar";
import DashboardNavbar, { DashboardTab } from "./DashboardNavbar";

export type NavbarVariant = "default" | "auth" | "dashboard";

type NavbarProps = {
    variant?: NavbarVariant;
    activedTab?: DashboardTab;
};

export default async function Navbar({
    variant = "default",
    activedTab,
}: NavbarProps) {
    const variants = {
        default: <DefaultNavbar />,
        auth: <AuthNavbar />,
        dashboard: <DashboardNavbar activedTab={activedTab} />,
    };

    return (
        <nav className="w-full h-18 flex items-center px-6 border-b border-accent-2">
            {variants[variant]}
        </nav>
    );
}
