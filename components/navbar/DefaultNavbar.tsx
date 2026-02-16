// components/navbar/DefaultNavbar.tsx

import Logo from "../ui/Logo";
import Button from "../ui/Button";


export default function DefaultNavbar() {
  return (
    <>
      <div className="flex-1">
        <Logo />
      </div>

      <div className="flex-1 flex justify-end gap-4">
        <Button variant="tertiary">SIGN IN</Button>
        <Button variant="primary">JOIN NOW</Button>
      </div>
    </>
  );
}
