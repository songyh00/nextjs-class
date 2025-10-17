// src/app/page.tsx
import Link from "next/link";
import { posts, type Post } from "@/lib/data";

export default function Home() {
    return (
        <main style={{ padding: 24 }}>
            <h1>게시글 목록</h1>
            <ul style={{ listStyle: "none", padding: 0, marginTop: 16 }}>
                {posts.map((p: Post) => (
                    <li key={p.id} style={{ padding: "12px 0", borderBottom: "1px solid #eee" }}>
                        <h3 style={{ margin: "0 0 6px" }}>
                            <Link href={`/${p.id}`}>{p.title}</Link>
                        </h3>
                        <p style={{ margin: 0, color: "#555" }}>{p.content}</p>
                        <small style={{ color: "#888" }}>초기 좋아요: {p.likes}</small>
                    </li>
                ))}
            </ul>
        </main>
    );
}
