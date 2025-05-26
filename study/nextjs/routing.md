Next.js는 React 위에서 동작하는 프레임워크로, **파일 기반 라우팅 시스템**을 제공한다. 
URL 경로는 파일 및 폴더 구조에 따라 자동으로 생성되며, `pages/` 또는 `app/` 디렉토리로 구성할 수 있다.

---

## `pages/` 디렉토리 기반 (기존 방식)
`pages/` 폴더에 있는 파일은 자동으로 URL로 연결된다.

| 파일 경로               | 생성되는 URL |
|------------------------|--------------|
| `pages/index.js`       | `/`          |
| `pages/about.js`       | `/about`     |
| `pages/blog/[id].js`   | `/blog/123`  |
| `pages/docs/[...slug].js` | `/docs/a/b/c` |

> `[]`는 동적 라우팅 (Dynamic Routing), `[...slug]`는 캐치 올 라우팅 (Catch-all Routing)

---

## `app/` 디렉토리 기반 (Next.js 13+ App Router)
`app/` 폴더 구조는 더 선언적이고 유연한 라우팅을 지원한다.

| 폴더/파일 경로           | URL 경로 |
|--------------------------|----------|
| `app/page.jsx`           | `/`      |
| `app/about/page.jsx`     | `/about` |
| `app/blog/[id]/page.jsx` | `/blog/123` |

> `app/`은 **서버 컴포넌트**, **중첩 레이아웃**, **loading/error 상태 처리** 같은 기능이 기본 제공된다.

---

## 중첩 라우트 & 레이아웃
`app/` 구조에서는 **중첩 레이아웃**을 통해 반복되는 UI를 분리할 수 있다.

```bash
app/
├─ layout.jsx       # 모든 페이지 공통 레이아웃
├─ page.jsx         # 메인 홈
├─ blog/
│  ├─ layout.jsx    # 블로그 전용 레이아웃
│  └─ [id]/page.jsx # 개별 글
```

> 이렇게 하면 `layout.jsx` 안에서 `<Outlet />` 처럼 중첩되는 구조로 동작함.

---

## 참고: client vs server component
`app/` 구조에선 **기본이 서버 컴포넌트**이고, 클라이언트 측 상태가 필요한 경우 파일 상단에 `'use client'`를 선언한다.

```js
'use client';
export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

---

## 정리
| 구분 | pages 디렉토리 | app 디렉토리 (App Router) |
|------|----------------|----------------------------|
| 사용 시기 | 기본 제공 | Next.js 13 이상만 사용 가능 |
| 라우팅 방식 | 파일 자동 연결 | 중첩 라우팅/레이아웃 중심 |
| 서버 컴포넌트 | ❌ 없음 | ✅ 기본 제공 |
| 로딩/에러 처리 | 수동 구현 | `loading.jsx`, `error.jsx` 자동 처리 |

개발 초기에는 `pages/`로 시작해도 좋지만, 중장기적으로는 `app/` 구조가 더 추천된다.