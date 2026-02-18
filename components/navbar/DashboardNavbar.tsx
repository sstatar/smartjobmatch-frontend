// components/navbar/DashboardNavbar.tsx

import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";

export type DashboardTab = "jobs" | "saved" | "applied";

export default function DashboardNavbar({
    activedTab,
}: {
    activedTab?: DashboardTab;
}) {
    return (
        <>
            {/* Left */}
            <div className="flex-1 items-center gap-4">
                {/* Sidebar toggle icon */}
                <Logo />
            </div>

            {/* Center - Search */}
            <div className="flex-1 flex justify-center gap-6">
                <Button
                    variant={activedTab === "jobs" ? "primary" : "tertiary"}
                >
                    Jobs
                </Button>
                <Button
                    variant={activedTab === "saved" ? "primary" : "tertiary"}
                >
                    saved
                </Button>
                <Button
                    variant={activedTab === "applied" ? "primary" : "tertiary"}
                >
                    applied
                </Button>
            </div>

            {/* Right */}
            <div className="flex-1 items-center flex justify-end gap-4">
                {/* Notification Icon */}
                {/* <Button variant="secondary">Post Job</Button> */}
                search |{/* Avatar */} avatar
            </div>
        </>
    );
}
