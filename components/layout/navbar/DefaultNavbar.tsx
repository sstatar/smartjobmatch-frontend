// components/navbar/DefaultNavbar.tsx

import Logo from "../../ui/Logo";
import Button from "../../ui/Button";
import Link from "next/link";

export default function DefaultNavbar() {
    return (
        <>
            <div className="flex-1">
                <Logo />
            </div>

            <div className="flex-1 flex justify-end gap-4">
                <Link href="/login">
                    <Button variant="tertiary">SIGN IN</Button>
                </Link>

                <Link href="/register">
                    <Button variant="primary">JOIN NOW</Button>
                </Link>
            </div>
        </>
    );
}
