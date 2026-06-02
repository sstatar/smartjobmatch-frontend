import Logo from "../../ui/Logo";
import Button from "../../ui/Button";
import Link from "next/link";

export default function DefaultNavbar() {
    return (
        // 💡 สร้างกล่อง w-full ครอบมันไว้ แล้วใช้ justify-between ดันโลโก้กับปุ่มไปคนละฝั่ง
        <div className="w-full flex items-center justify-between">
            {/* 💡 flex-shrink-0 ห้ามโลโก้โดนบีบ */}
            <div className="flex-shrink-0">
                <Logo />
            </div>

            {/* 💡 gap-2 สำหรับมือถือ gap-4 สำหรับจอใหญ่ */}
            <div className="flex items-center justify-end gap-2 md:gap-4">
                {/* 💡 เติม hidden sm:block คือ ซ่อนบนมือถือ และโชว์ตั้งแต่จอ sm ขึ้นไป */}
                <Link
                    href="/login"
                    className="hidden sm:block whitespace-nowrap"
                >
                    <Button variant="tertiary">SIGN IN</Button>
                </Link>

                <Link href="/register" className="whitespace-nowrap">
                    <Button variant="primary">JOIN NOW</Button>
                </Link>
            </div>
        </div>
    );
}
