export default function BarLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <header>=== Bar Layout ===</header>
            <main>{children}</main>
            <footer>=== Bar Layout ===</footer>
        </>
    );
}
