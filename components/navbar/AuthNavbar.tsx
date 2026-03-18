import Logo from "../ui/Logo";
import Button from "../ui/Button";
import { logout } from "@/app/actions/auth";

export default function AuthNavbar() {
    return (
        <>
            <div className="flex-1">
                <Logo />
            </div>

            <div className="flex-1 flex justify-end">
                <Button variant="primary" onClick={logout}>
                    LOG OUT
                </Button>
            </div>
        </>
    );
}
