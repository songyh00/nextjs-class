import Link from "next/link";
import { posts } from "./posts";

export default function BlogPage() {
    return (
        <div>
            <h1>Blog</h1>
            <ul>
                {posts.map((p) => (
                    <li key={p.slug}>
                        <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
