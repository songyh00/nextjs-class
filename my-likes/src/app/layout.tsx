export const metadata = {
    title: "PROF25-REACT2",
    description: "Next.js App Router practice",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko">
        <body style={{ margin: 0, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
        {children}
        </body>
        </html>
    );
}
