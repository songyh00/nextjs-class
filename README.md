# 송유현 202130411

---

## 📘 Next.js 실습 프로젝트 정리

이 저장소는 2025년 Next.js 수업에서 진행한 실습 내용을 정리한 자료입니다.

---

## 📘 Next.js 수업 내용

### 11월 12일(12주차)
- 스트리밍 (Streaming)
  - 개념 요약
    - 스트리밍은 페이지의 HTML을 한 번에 렌더링하지 않고, 작은 블록 단위로 나누어 점진적으로 전송하는 방식입니다.
      - 초기 로딩 속도를 개선하고, 사용자에게 더 빠르게 콘텐츠를 보여줄 수 있음.
  - 전제 조건
    - cacheComponents_config 옵션이 활성화되어 있다고 가정.
    - Next.js 15 Canary 버전부터 지원.
    - latest는 안정 버전, canary는 최신 개발 버전.
  - 특징
    - 서버 컴포넌트에서 async/await 사용 시 Next.js는 동적 렌더링(Server Rendering) 선택.
    - 요청 시 서버에서 데이터를 가져와 렌더링.
    - 데이터 응답이 느릴 경우 전체 렌더링이 지연될 수 있으므로 스트리밍이 유용함.
  - 구현 방법
    - 방법1 - loading.tsx 파일 사용
      - 전체 페이지 로딩 중 상태를 보여줌.
      - 예: app/blog/page.tsx를 스트리밍하려면 → app/blog/loading.tsx 파일 생성.
        ```
        export default function Loading() {
          return <div>Loading...</div>
        } 
        ```
    - 방법2 - <Suspense> 사용
      - 페이지 일부만 스트리밍하고 싶을 때 사용.
      - <Suspense>로 감싼 부분 외의 콘텐츠는 즉시 표시.
      ```
      import { Suspense } from 'react';
      import BlogListSection from '@/components/BlogListSection';
      
      export default function BlogPage() {
        return (
          <Suspense fallback={<div>Loading posts...</div>}>
            <BlogListSection />
          </Suspense>
        );
      }
      ```
- 의미 있는 로딩 상태 (Instant Loading State)
  - 개념
    - 로딩 상태는 즉시(instant) 사용자에게 표시되는 대체 UI입니다.
    - loading.tsx를 만들어 폴더 내 모든 하위 페이지에 적용 가능.
  - 디자인 팁
    - 사용자가 로딩 상태를 이해하기 쉽게 “의미 있는 로딩 상태”를 설계.
      - 예) 스켈레톤(Skeleton), 스피너(Spinner)
        - 단순 로딩 아이콘보다는 컨텐츠 형태를 암시하는 UI가 좋음.
- 스켈레톤 vs 스피너
  - 스켈레톤 (Skeleton)
    - 실제 콘텐츠의 형태를 회색 블록 등으로 미리 보여주는 방식
  - 스피너 (Spinner)
    - 단순히 로딩 중임을 시각적으로 표시하는 회전 아이콘
  - 스켈레톤이 사용자 경험 면에서 더 나은 경우가 많음 (예: 게시글 목록, 썸네일 등).
- 데이터 Fetch 패턴
  - 순차적 Fetch (Sequential Fetch)
    - 트리 구조에서 상위 → 하위 순서로 데이터를 가져올 때 발생.
    - Playlists가 Artist의 artistID를 알아야 해서 Artist 데이터를 다 받아야 Playlists fetch 시작 가능.
    - 요청 간 의존성이 있음.
  - 병렬 Fetch (Parallel Fetch)
    - 경로 내 여러 데이터 요청이 동시에 발생.
    - 기본적으로 레이아웃(Layout) 과 페이지(Page) 는 병렬로 렌더링됨.
    - 한 컴포넌트 안의 여러 await 요청은 순서대로 처리될 수 있음.
  ```
  const [artist, albums] = await Promise.all([
    getArtist(username),
    getAlbums(username)
  ]);
  ```
- 코드 구성 요약
  - 필수 함수
    - getArtist(username) → users 테이블에서 id, name 반환.
    - getArtistPlaylists(artistID) → albums 테이블에서 {id, name} 배열 반환.
  - 참고 사항
    - page.tsx 내부에서 await 사용 가능 (Next.js 서버 환경).
    - URL 세그먼트: /artist/[username]
    - RootLayout, PageLayout 구성 필요.

### 11월 05일(11주차)
- 서버 컴포넌트에서 데이터 가져오기
  - 서버 컴포넌트는 fetch() 함수를 이용해 데이터를 가져올 수 있다.
    1. fetch API 직접 사용
    2. ORM 또는 데이터베이스 사용
```
export default async function Page() {
  const data = await fetch('https://api.vercel.app/blog');
  const posts = await data.json();
  return <div>{posts.map(p => <li key={p.id}>{p.title}</li>)}</div>;
}
```
- Fetch 함수의 기본 이해
  - fetch(url).then(res => res.json()) 형태로 자주 사용됨.
  - 기본적으로 GET 요청을 수행.
  - 반환값은 Promise<Response> 객체.
  - 네트워크 요청이 성공하면 resolve, 실패하면 reject.
  - 단, HTTP 오류(404, 500 등) 는 자동 reject되지 않음 → 직접 예외 처리 필요.
```
function getPosts() {
  return fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json());
}
```
- Promise 기본 개념
  - new Promise()를 통해 비동기 작업을 처리.
  - resolve: 성공 시 호출, reject: 실패 시 호출.
```
const promise = new Promise((resolve, reject) => {
  if (성공) resolve('성공 결과');
  else reject('에러 메시지');
});
```
- Suspense Component
  - 비동기 작업 중 UI 일부를 임시로 대체 UI(fallback)로 보여주는 React 기능.
  - 데이터 로딩 중일 때 로딩 UI를 표시하고, 완료되면 실제 UI로 자동 전환.
  - 여러 비동기 컴포넌트를 독립적으로 관리 가능.
```
import { Suspense } from 'react';

<Suspense fallback={<div>Loading...</div>}>
  <Posts />
</Suspense>
```
- use Hook을 사용한 Fetch
  - 서버에서 데이터를 클라이언트로 스트리밍하는 예제.
  - fetch()에 await을 쓰지 말고 그대로 Promise로 넘겨야 함.
```
const posts = fetch('https://jsonplaceholder.typicode.com/posts');
```
- getPosts() 함수를 분리하는 방법
  - 재사용성을 위해 src/lib/getPosts.ts 파일에 분리.
```
export async function getPosts(url: string) {
  const res = await fetch(url);
  const json = await res.json();
  return json;
}
```
- 제네릭(Generic) 타입 지정
  - useSWR<T>에서 T 타입을 명시하면 데이터 구조가 명확해짐.
  - Optional Chaining(?.)을 사용하여 undefined 안전하게 처리.
  - 타입을 명시하면 data.post.id, data.post.title 등의 속성 자동 완성 가능.
```
const fetcher = (url: string) => fetch(url).then(r => r.json());

const { data, error, isLoading } = useSWR<{ id: string; title: string }[]>(
  'https://jsonplaceholder.typicode.com/photos',
  fetcher
);
```
- 중복된 요청 제거 및 데이터 캐시
  - Next.js의 데이터 캐시(Data Cache) 기능을 사용하면 동일한 fetch 요청이 여러 번 발생하는 것을 방지할 수 있다.
  - fetch() 옵션에 cache: 'force-cache'를 설정하면, 이미 요청된 데이터를 재사용하여 불필요한 네트워크 호출을 줄인다.
  - 이렇게 하면 렌더 패스(Render Pass) 간에도 동일한 데이터가 공유됨.
```
const posts = await fetch('https://example.com/posts', { cache: 'force-cache' });
```

### 10월 29일(10주차)
- Context Provider (컨텍스트 제공자)
  - Props 없이도 전역 상태(theme, 언어 등)를 트리 전체에 공유.
  - Provider를 Server Component에서 감싸면, Client Component들이 같은 Context 사용 가능.
```
// app/layout.tsx (Server Component)
import ThemeProvider from './theme-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```
```
// theme-provider.tsx (Client Component)
"use client";
import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.dataset.theme = theme;
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```
- CSS 적용 (Attribute Selector)
  - html[data-theme='light'] 형태로 테마를 구분.
  - 클래스(.class)보다 충돌 적고 전역 테마 관리에 적합.
```
html[data-theme='light'] {
  background-color: white;
  color: black;
}

html[data-theme='dark'] {
  background-color: black;
  color: white;
}
```
- useEffect Hook 설명
  - HTML 문서 전체에 theme를 적용하는 전형적인 패턴.
  - typeof window !== 'undefined'
    - 서버 사이드 렌더링(SSR) 환경에서는 window 객체가 없으므로,
      이 조건을 넣어 클라이언트에서만 실행되도록 함.
- Provider 구성 시 주의
  - ThemeProvider는 <html> 대신 {children}만 감싸야 함.
  - Provider는 트리에서 한 번만 사용 → 불필요한 렌더링 방지.
  - 이렇게 하면 Server Component의 정적 부분을 더 쉽게 최적화 가능.
- 환경 변수 노출 방지
  - JS 모듈은 server와 client 간 공유될 수 있으므로 주의.
  - 서버 전용 코드(process.env)는 client로 가져오면 안 됨.
```
// lib/data.ts
export async function getData() {
  const res = await fetch("https://external-service.com/data", {
    headers: {
      authorization: process.env.API_KEY,
    },
  });
  return res.json();
}
```
- 데이터 가져오기 (Fetching Data)
  - 서버 컴포넌트에서 데이터 가져오는 방법
    1. fetch API
    2. ORM 또는 데이터베이스 직접 접근
  - fetch 사용 시 컴포넌트를 비동기 함수로 선언해야 함.
```
// app/blog/page.tsx
export default async function Page() {
  const data = await fetch("https://api.vercel.app/blog");
  const posts = await data.json();

  return (
    <ul>
      {posts.map((post: any) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```
### 10월 22일(9주차)
- Server 및 Client Component Interleaving
  - 개념
    - Interleaving: 여러 데이터 블록을 섞어서 전송 → 오류 발생 시 영향을 최소화하는 기술.
    - Next.js에서의 의미:
      - Server Component와 Client Component가 섞여서(interleaved) 동작하는 구조.
  - 작동 원리
    1. Server Component가 서버에서 렌더링되어 HTML로 변환됨.
    2. 이 HTML이 Client Component의 children 자리에 삽입됨.
    3. 클라이언트에서는 Client Component만 hydration(JS 연결) 진행.
    4. 서버 데이터는 이미 들어와 있으므로, 이벤트(버튼 클릭 등)는 클라이언트에서 처리.
```
// components/ServerContent.tsx
export default async function ServerContent() {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts/1").then(r => r.json());
  return <div>{data.title}</div>;
}
```
```
// app/interleaved/page.tsx
import ClientLayout from "@/components/ClientLayout";
import ServerContent from "@/components/ServerContent";

export default function Page() {
  return (
    <ClientLayout>
      <ServerContent />
    </ClientLayout>
  );
}
```
- Context Provider (컨텍스트 제공자)
  - Provider Component를 Server Component(Layout 등)에서 감싸면,
앱 전체에서 모든 Client Component가 동일한 Context를 공유할 수 있음.
  - Props 없이도 전역적으로 theme, 언어, 설정 등을 전달 가능.
```
// app/layout.tsx (Server Component)
import ThemeProvider from './theme-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```
```
// theme-provider.tsx (Client Component)
import { createContext, useState } from "react";

export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <html data-theme={theme}>{children}</html>
    </ThemeContext.Provider>
  );
}
```
- CSS 적용 (Attribute Selector)
  - html[data-theme='light'] → 속성 선택자(Attribute Selector)
  - 클래스(.class) 대신 속성값을 기준으로 스타일 지정 가능.
  - 여러 class를 중첩하지 않아도 되므로 스타일 충돌을 줄임.
```
html[data-theme='light'] {
  background-color: white;
  color: black;
}

html[data-theme='dark'] {
  background-color: black;
  color: white;
}
```

### 10월 17일(7주차 보강)
- my-likes 프로젝트 생성
- Next.js Server & Client Component
  - 기본 개념
    - layout과 page는 기본적으로 Server Component
    - Server Component는 서버에서 데이터를 가져와 UI를 렌더링
      → 결과를 cache 후 client로 스트리밍 가능
    - 브라우저 API나 상호작용이 필요한 경우엔 Client Component 사용
      → 이벤트 처리, useEffect, 브라우저 API 등 포함
  - 언제 사용해야 하나?
    - Client Component 사용하는 경우
      - state나 event handler 필요 (onClick, onChange)
      - Lifecycle logic 필요 (useEffect)
      - 브라우저 전용 API 사용 (localStorage, window, navigator.geolocation)
      - 사용자 정의 Hook 사용 시
    - Server Component 사용하는 경우
      - 데이터 fetching (API 호출, DB 조회)
      - 보안 데이터 처리 (API key 등 노출 방지)
      - 브라우저 JS 전송 최소화로 성능 개선
      - 초기 렌더링 속도 향상 (FCP 개선) — 콘텐츠를 스트리밍
  - Pessimistic Update (비관적 업데이트)
    - 이벤트 발생 시 서버 요청 → 응답 성공 후에 UI 업데이트
    - 장점
      - 데이터 일관성 유지
      - 오류 발생 확률 낮음
    - 단점
      - 응답 대기 시간 길어짐 → UX 저하
      - 네트워크 환경 나쁠 경우 느림
  - Null 병합 연산자
    - null 또는 undefined면 오른쪽 값 사용, 아니면 그대로 반환
      → likes ?? 0 은 likes가 null/undefined일 때 0으로 대체
    - ||와의 차이점: ||는 false, 0, "" 등 falsy 값도 오른쪽으로 대체
  - Server Component의 작동
    - Next.js가 React의 API로 렌더링 조정
    - 렌더링은 라우팅 세그먼트별 청크 단위(layout, page)로 처리
    - Server Component → **RSC Payload (압축된 바이너리 형태)**로 전송
    - Client Component → HTML로 미리 렌더링 (pre-render)
    - RSC Payload: 서버에서 렌더링된 React 트리를 직렬화한 데이터
      → 클라이언트에서 DOM 업데이트 시 사용
  - Client Component의 작동 (첫 로드)
    - HTML은 미리 렌더링된 페이지를 즉시 보여줌
    - RSC Payload는 서버·클라이언트 트리 조정
    - JavaScript가 Hydration을 통해 HTML을 인터랙티브하게 만듦
    - Hydration:
      렌더된 HTML에 이벤트 핸들러를 연결해 인터랙티브한 페이지로 만드는 React 과정

### 10월 15일(8주차)
- 중간고사

### 10월 1일 (6주차)
- 결석

### 9월 24일 (5주차)
- 렌더링 방식 비교
  - 정적 렌더링 (SSG: Static Site Generation)
    - 빌드할 때 HTML 파일을 미리 생성해 두고, 사용자가 접속하면 그 파일을 그대로 제공  
    - 장점
      - 첫 로딩이 매우 빠름
      - CDN에 캐싱해 전 세계 어디서나 동일 속도 제공
      - 검색 엔진 친화적(SEO 최적화)
    - 단점
      - 빌드 이후 바뀐 데이터를 실시간으로 반영하기 어려움  
      - 콘텐츠가 자주 변하면 빌드 재배포 필요
  - 동적 렌더링 (SSR: Server Side Rendering)
    - 사용자가 페이지를 요청할 때마다 서버에서 최신 데이터를 가져와 HTML을 즉석 생성
    - 장점
      - 항상 최신 데이터 제공 가능
      - SEO 최적화 역시 가능
    - 단점
      - 요청마다 서버 연산이 발생 → 초기 로딩이 SSG보다 느릴 수 있음
      - 트래픽이 많을수록 서버 부하 증가
- 자바스크립트 비동기 처리
  - Promise
    - 비동기 작업의 *미래 결과*를 담는 객체
    - 상태 흐름
      - *대기 → 성공(resolve) → 실패(reject)* 
    - `.then()`, `.catch()`로 결과 처리 가능
  - async / await
    - async
      - 함수 앞에 붙여 *항상 Promise를 반환하는 함수*로 만듦
    - await
      - Promise가 처리될 때까지 기다렸다가 결과를 반환
      - 코드가 동기적으로 보이게 작성 가능 
      - await이 붙은 줄은 작업이 끝나야 다음 줄로 넘어감
      
### 9월 17일 (4주차)
- 중첩 라우트 만들기
  - 폴더 구조: Next.js App Router에서 /blog 경로를 만들려면 app/blog 폴더를 생성하고 page.tsx 파일을 추가.
  - page.tsx는 /blog URL로 접근할 때 보여줄 페이지.
- [slug] 동적 라우트 개념
  - /blog/[slug] 의 [slug]는 동적 세그먼트로, 데이터의 key(예: 글의 고유 식별자)를 의미.
  - 데이터에 반드시 slug 필드가 있어야 해당 경로에서 사용 가능.
  - /blog/nextjs 처럼 호출하면 slug 값이 nextjs로 전달됨.
- [slug] 코드 설명
  - export default async function Posts({ params }: { params: { slug: string } })
    - async: 함수 내에서 await 사용 가능.
    - params는 { slug: string } 형태의 객체로 전달.
  - const { slug } = await params;
    - params가 Promise일 수 있어 await로 실제 값을 꺼낸 뒤 구조 분해 할당.
- searchParams(검색 매개변수)
  - params vs searchParams
    - params: URL path 중 동적 세그먼트(/blog/[slug]) 값.
    - searchParams: ?key=value 형태의 쿼리스트링 값.
  - 사용 시점
    - 서버에서 데이터를 필터링해야 할 때 searchParams prop 사용.
    - 클라이언트 단에서만 필터링 시 useSearchParams() 사용.
    - 이벤트 핸들러에서 new URLSearchParams(window.location.search)로 직접 읽을 수도 있음.

### 9월 10일 (3주차)
- 병결

### 9월 3일 (2주차)
- my-app 프로젝트 생성
- my-pnpm 프로젝트 생성
- ESLint 설정 (Installation)
    - Strict (추천): Next.js 기본 ESLint 구성 + Core Web Vitals 규칙 세트 포함. 초보 개발자에게 권장.
    - Base: Next.js의 기본 ESLint 구성만 포함.
    - Strict/Base 선택 시: eslint, eslint-config-next 패키지가 자동 설치됨.
    - .eslintrc.json 파일 생성 후, next lint 실행하면 오류 자동 검출.
- 자동 생성되는 항목
    프로젝트 생성 시 자동으로 세팅되는 것들:
    - package.json (scripts 추가), public 디렉토리
    - 선택옵션
        - TypeScript: tsconfig.json 생성
        - ESLint: .eslintrc.json 대신 eslint.config.mjs 생성
        - Tailwind CSS
        - src 디렉토리 구조
        - App Router: app/layout.tsx, app/page.tsx
        - Turbopack
        - Import alias: tsconfig.json에 paths 생성
- .eslintrc.json vs eslint.config.mjs
    - .eslintrc.json
        - JSON 형식 → 주석/변수/조건문 불가능
        - 정적인 설정만 가능
    - eslint.config.mjs
        - JS 모듈(ESM) 방식 → 주석, 변수, 조건문, 동적 로딩 가능
        - 다른 설정 파일 import 가능 → 재사용 용이
        - 최신 ESLint 공식 권장 방식
- pnpm 설치
```
npm i -g pnpm@latest
```

### 8월 27일 (1주차)
- OT진행
- 기본 프로그램 설치 및 설정
- test1 프로젝트 생성 및 test코딩
