import DynamicNavbar from "@/components/layout/navbar/DynamicNavbar";
import Navbar from "@/components/layout/navbar/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <Navbar variant="employer"></Navbar>
            <div className="mt-30">{children}</div>
        </section>
    );
}
