// components/navbar/DashboardNavbar.tsx

import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";

export default function DashboardNavbar() {
  return (
    <>
      {/* Left */}
      <div className="flex-1 items-center gap-4">
        {/* Sidebar toggle icon */}
        <Logo />
      </div>

      {/* Center - Search */}
      <div className="flex-1 flex justify-center">
        
          <Button>Jobs</Button>
          <Button>saved</Button>
          <Button>applied</Button>
        </div>
    

      {/* Right */}
      <div className="flex-1 items-center flex justify-end gap-4">
        {/* Notification Icon */}
        <Button variant="secondary">Post Job</Button>
        {/* Avatar */}
      </div>
    </>
  );
}
