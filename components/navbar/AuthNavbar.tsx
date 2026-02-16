import Logo from "../ui/Logo";
import Button from "../ui/Button";

export default function AuthNavbar() {
  return (
    <>
      <div className="flex-1">
        <Logo />
      </div>

      <div className="flex-1 flex justify-end">
        <Button variant="primary">LOG OUT</Button>
      </div>
    </>
  );
}
