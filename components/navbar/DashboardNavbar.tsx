// components/navbar/DashboardNavbar.tsx

import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";

export type DashboardTab = "jobs" | "saved" | "applied";

// TODO: count of each tab, e.g. saved jobs, applied jobs is from backend
const eachTabCount = {
    // jobs: 10,
    saved: 6,
    applied: 7,
};

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
                    count={
                        activedTab == "saved" ? undefined : eachTabCount.saved
                    }
                >
                    saved
                </Button>
                <Button
                    variant={activedTab === "applied" ? "primary" : "tertiary"}
                    count={
                        activedTab == "applied"
                            ? undefined
                            : eachTabCount.applied
                    }
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
