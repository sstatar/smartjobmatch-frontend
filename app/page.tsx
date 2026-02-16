import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import Navbar from "@/components/navbar/Navbar";

export default function page() {
  return (
    <div>
      <h1>Home</h1>
      <Button >JOIN NOW</Button>
      <Button variant="secondary" count={2} >saved</Button>
      <Button variant="tertiary" >applied</Button>
      <Logo></Logo>
      <Navbar></Navbar>
      <Navbar variant="auth"></Navbar>
      <Navbar variant="dashboard"></Navbar>
    </div>
  );
}