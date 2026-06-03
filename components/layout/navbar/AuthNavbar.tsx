"use client"; // 💡 1. ต้องเติมบรรทัดนี้ เพราะเรามีการใช้ Event Listener (onClick)

import Logo from "../../ui/Logo";
import Button from "../../ui/Button";
import { logout } from "@/app/actions/auth";

export default function AuthNavbar() {
    return (
        <div className="w-full flex items-center justify-between">
            {/* โลโก้ */}
            <div className="flex-shrink-0">
                <Logo />
            </div>

            {/* ปุ่ม Log out ฝั่งขวา */}
            <div className="flex items-center justify-end">
                <Button variant="tertiary" onClick={async () => logout()}>
                    LOG OUT
                </Button>
            </div>
            
        </div>
    );
}