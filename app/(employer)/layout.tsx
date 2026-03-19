import DynamicNavbar from "@/components/navbar/DynamicNavbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <DynamicNavbar />
            <div className="mt-30">{children}</div>
        </section>
    );
}
