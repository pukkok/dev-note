---
title: '라우팅 가드'
---

## 🔐 인증 기반 페이지 접근 제어

Streamo는 회원제로 운영되며, <br/> 
로그인하지 않은 사용자가 특정 주소에 직접 접근하는 것을 방지하기 위해 
<span style={{ color: '#e67e22' }}><strong>라우팅 가드(Routing guard)</strong></span>를 구현하였습니다.

### ✅ 구현 목적

* 비인가 사용자의 `/admin` 등 관리자 페이지 접근 차단
* 토큰이 만료되었거나 존재하지 않는 경우 자동 리디렉션 처리
* 로그인 상태에 따라 페이지 노출 여부 결정

---

### RootGuard: 최상위 라우팅 보호

`RootGuard`는 클라이언트 앱 전체에서 사용자 인증 상태를 기준으로 초기 라우팅을 제어합니다.

#### 주요 기능

* `localStorage`에서 `accessToken` 및 사용자 정보 복원
* 토큰 만료 여부 판단 (JWT `exp` 기반)
* 로그인 여부에 따라 메인 페이지 또는 루트로 리다이렉트

```jsx
if (!isAuthenticated && !isLoginPage) {
  return router.replace('/')
}

if (isAuthenticated && isLoginPage) {
  router.replace('/main')
}
```

> 상태 복원이 끝날 때까지는 화면을 렌더링하지 않아 깜빡임이 없음 (`return null`)

---

### AdminLayout: 관리자 권한 전용 라우팅 보호

관리자 전용 레이아웃에서는 `userInfo.role` 값을 기반으로 접근 권한을 추가적으로 확인합니다.

#### 주요 기능

* `userInfo`가 없으면 `/`로 리다이렉트
* `role !== 'ADMIN'`이면 `/main`으로 우회
* `/admin` 루트에 직접 접근 시 `/admin/users`로 리다이렉트

```jsx
if (!userInfo) return router.replace('/')
if (userInfo.role !== 'ADMIN') return router.replace('/main')
if (pathname === '/admin') {
  router.replace('/admin/users')
}
```

#### 추가 UX 처리

* 모바일 사이드바 열림 상태에서 스크롤 방지 (`overflow: hidden` 처리)
* 라우트에 따라 현재 탭 라벨을 Sidebar와 상단 Header에 동기화

---

### 🚧 인증 상태 유지 방법

* 로그인 성공 시 accessToken을 `localStorage`에 저장
* `RootGuard`가 마운트되며 토큰 파싱 및 유효성 검사
* 토큰이 유효하면 `usePublicUserStore.hydrateUserInfo()`로 사용자 정보 복원
* `safeRequest` 사용 시 401 응답이 오면 자동 로그아웃 및 메인 리다이렉트 처리

---

### 🔒 보호 대상 경로 예시

| 보호 경로           | 설명                               |
| --------------- | -------------------------------- |
| `/admin/*`      | 관리자 기능 전체 (유저, 비디오, 메뉴, 공지 관리 등) |
| `/notice/edit`  | 공지 수정 페이지                        |
| `/video/upload` | 비디오 업로드 전용 라우트                   |

---

이러한 접근 제어 로직을 통해 Streamo는 로그인 상태 기반으로 동작하는 보안성과 안정성을 동시에 확보하였습니다.
