# Streamo 소개

**Streamo**는 영상 콘텐츠 업로드, 분류, 관리 및 사용자 시청 이력을 통합 관리할 수 있는 **웹 기반 스트리밍 플랫폼**입니다.
관리자와 사용자 양쪽을 고려한 설계를 바탕으로, 다음과 같은 주요 목적을 가지고 개발되었습니다:

* 요청 기반의 **영상 업로드 처리 및 상태 관리**
* **카테고리 기반 분류**와 시청등급 설정
* 영상별 **태그, 썸네일, 자막** 등 메타데이터 관리
* 사용자 시청 이력 기반 기록 저장
* 반응형 UI와 검색 기능을 통한 **사용자 접근성 향상**

## 🛠️ 사용 기술 스택

### Frontend

* **React 19**
* **Next.js 15 (Turbopack 사용)**
* **Zustand** – 클라이언트 상태 관리
* **Tailwind CSS v4** – 유틸리티 기반 스타일링
* **Sonner** – 알림 처리
* **Swiper** – 슬라이드 UI 구현
* **react-easy-crop** – 이미지 크롭 기능
* **hls.js** – HLS 스트리밍 지원
* **tus-js-client** – 대용량 파일 업로드 처리
* **axios**, **jwt-decode** – 네트워크 통신 및 인증 처리

### 개발 환경

* ESLint + `eslint-config-next`
* Tailwind Merge
* PostCSS (Tailwind 통합용)

---

## 주요 화면 미리보기

### 1. 로그인 화면

![로그인 화면](/img/streamo/root.JPG)

### 2. 메인 화면

![메인 페이지](/img/streamo/main.JPG)

### 3. 영상 요청 목록

![영상 요청 페이지](/img/streamo/require.JPG)

### 4. 공지사항 목록 

![공지사항 목록](/img/streamo/notice.JPG)

### 4-1. 공지사항 상세

![공지사항 상세 페이지](/img/streamo/notice_detail.JPG)

### 5. 사용자 관리 (관리자)

![유저 관리 페이지](/img/streamo/admin_users.JPG)

### 6. 영상 관리 (관리자)

![비디오 관리 페이지](/img/streamo/admin_videos.JPG)

### 7. 메뉴 관리 (관리자)

![메뉴 관리 페이지](/img/streamo/admin_menus.JPG)

### 8. 공지사항 관리 (관리자)

![공지사항 관리 페이지](/img/streamo/admin_notices.JPG)
