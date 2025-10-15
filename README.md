# 송유현 202130411

---

## 📘 Next.js 실습 프로젝트 정리

이 저장소는 2025년 Next.js 수업에서 진행한 실습 내용을 정리한 자료입니다.

---

## 📘 Next.js 수업 내용

### 10월 15일(7주차)
- 중간고사

### 10월 1일 (6주차)

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
