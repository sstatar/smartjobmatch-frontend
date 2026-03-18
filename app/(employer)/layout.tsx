
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
            <div>{children}</div>
        </section>
    );
}
