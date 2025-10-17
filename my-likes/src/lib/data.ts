// src/lib/data.ts
export type Post = {
    id: string;
    title: string;
    content: string;
    likes: number;
};

export const posts: Post[] = [
    { id: "nextjs",         title: "Next.js 소개",       content: "Next.js는 React 기반의 풀스택 프레임워크입니다.", likes: 5 },
    { id: "routing",        title: "App Router 알아보기", content: "Next.js 13부터는 App Router가 도입되었습니다.", likes: 3 },
    { id: "ssr-ssg",        title: "SSR vs SSG",          content: "서버사이드 렌더링과 정적 사이트 생성의 차이.",   likes: 0 },
    { id: "dynamic-routes", title: "동적 라우팅",         content: "Next.js에서 [slug]를 활용한 다이나믹 라우팅.",  likes: 0 }
];
