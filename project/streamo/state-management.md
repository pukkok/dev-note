---
title: API 구조 및 상태관리
---

# Streamo API 구조 및 상태 통합 정리

### API 요청 처리 구조 (`safeRequest`)

Streamo의 모든 API 요청은 `safeRequest` 유틸 함수로 감싸서 다음 기능을 통일적으로 적용합니다:

* ✅ 로딩 메시지 출력 (`toast.loading`)
* ✅ 최소 로딩 시간 보장 (UX 안정화)
* ✅ 성공 메시지 출력 및 지속 시간 설정
* ✅ 에러 발생 시 토스트 + 콘솔 출력
* ✅ 인증 만료(401) 시 자동 로그아웃 및 리디렉션

```js
// 예시
const { result, error } = await safeRequest(getNotices(), {
  loadingMessage: '공지사항 불러오는 중...',
  successMessage: '불러오기 완료!'
})
```

> `onError`, `silent`, `successDuration`, `minLoadingDuration` 등의 옵션으로 세부 제어 가능

---

### API 모듈 구성

API 요청은 기능별로 다음과 같이 모듈화되어 있습니다:

| 파일명            | 설명                           |
| -------------- | ---------------------------- |
| `auth.js`      | 로그인, 로그아웃, 토큰 검증 등 인증 관련 API |
| `instances.js` | axios 인스턴스 및 인터셉터 설정         |
| `member.js`    | 사용자/관리자 정보 조회 및 수정 API       |
| `menu.js`      | 메뉴 구조 조회 및 관리 API            |
| `notice.js`    | 공지사항 목록, 등록, 수정, 삭제 API      |
| `require.js`   | 요청글 생성, 목록, 상태변경 등 API       |
| `video.js`     | 비디오 업로드, 목록 조회, 삭제 등 API     |

---

### Zustand Store 구성

역할에 따라 `admin`, `public`, `main` 등으로 상태를 분리 관리합니다:

| 파일명                        | 설명                               |
| -------------------------- | -------------------------------- |
| `useAdminCategoryStore.js` | 관리자 카테고리 목록 및 생성/삭제/수정 관리        |
| `useAdminMenuStore.js`     | 관리자 페이지 내 메뉴 구조 및 선택 항목 관리       |
| `useAdminNoticeStore.js`   | 공지사항 목록, 상세보기, 페이지네이션 등 상태 관리    |
| `useAdminRequestStore.js`  | 요청글 목록, 업로드 대상 요청 ID, 상태 변경 등 관리 |
| `useAdminUserStore.js`     | 관리자 유저 목록 및 권한 설정 상태 관리          |
| `useAdminVideoStore.js`    | 관리자 영상 목록, 정렬/검색/삭제 관련 상태 관리     |
| `useMainVideoStore.js`     | 메인 페이지 영상 로딩 상태 및 캐시 관리          |
| `usePublicAuthStore.js`    | 로그인 여부, 사용자 인증 상태 관리             |
| `usePublicMenuStore.js`    | 사용자 메뉴 상태 관리 (모바일 메뉴 등 포함)       |
| `usePublicNoticeStore.js`  | 사용자 공지사항 리스트 및 페이지별 캐시 관리        |
| `usePublicRequestStore.js` | 사용자 요청글 작성 및 리스트 상태 관리           |
| `usePublicUserStore.js`    | 사용자 프로필, 토큰, 로그아웃 등 사용자 상태 관리    |
| `useSearchVideoStore.js`   | 검색창 입력값, 검색 결과 리스트 상태 관리         |
| `useViewVideoStore.js`     | 영상 상세 페이지 상태 (비디오 ID, 데이터 등) 관리  |

---

현재 구조를 통해 Streamo는 다음과 같은 이점을 가집니다:

* ✅ 일관된 API 처리 UX 제공 (로딩, 에러, 성공 메시지)
* ✅ 상태 분리 및 유지보수 용이
* ✅ 권한 문제 발생 시 즉시 대응 가능
* ✅ 사용자/관리자 기능 구분 명확
