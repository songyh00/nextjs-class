import Link from "next/link";
import { posts, type Post } from "@/lib/data"; // ← 네 경로에 맞춤
import LikeButton from "@/app/components/LikeButton"; // ← 아래 파일

type Props = { params: { id: string } };

export default function PostDetailPage({ params }: Props) {
    const post = posts.find((p: Post) => p.id === params.id);

    if (!post) {
        return <main style={{ padding: 24 }}>해당 글을 찾을 수 없습니다.</main>;
    }

    return (
        <main style={{ padding: 24 }}>
            <Link href="/" style={{ display: "inline-block", marginBottom: 16 }}>
                ← 목록으로
            </Link>

            <h2 style={{ marginTop: 0 }}>{post.title}</h2>
            <p style={{ fontSize: 16, lineHeight: 1.6 }}>{post.content}</p>

            {/* 👍 좋아요 버튼은 클라이언트 컴포넌트 */}
            <LikeButton initial={post.likes} />
        </main>
    );
}

// (선택) 정적 경로 미리 생성
export async function generateStaticParams() {
    return posts.map((p) => ({ id: p.id }));
}
