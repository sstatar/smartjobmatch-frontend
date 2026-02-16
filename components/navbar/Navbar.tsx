// components/navbar/Navbar.tsx

import DefaultNavbar from "./DefaultNavbar";
import AuthNavbar from "./AuthNavbar";
import DashboardNavbar from "./DashboardNavbar";

export type NavbarVariant = "default" | "auth" | "dashboard";

type NavbarProps = {
  variant?: NavbarVariant;
};

export default function Navbar({ variant = "default" }: NavbarProps) {
  const variants = {
    default: <DefaultNavbar />,
    auth: <AuthNavbar />,
    dashboard: <DashboardNavbar />,
  };

  return (
    <nav className="w-full h-[72px] flex items-center px-6 border-b border-accent-2">
      {variants[variant]}
    </nav>
  );
}
