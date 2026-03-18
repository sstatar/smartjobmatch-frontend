import Navbar from "@/components/navbar/Navbar";

export interface EmployerNavbarLayoutProps {
    /**
     * TODO: try to access url
     */
    children: React.ReactNode;
    params: { slug: string };
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <Navbar variant="employer" />
            <div className="mt-16">{children}</div>
        </section>
    );
}
