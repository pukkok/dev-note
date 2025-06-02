---
title: 구현 방식
---

# 구현 방식

## 기술 스택 및 환경

* **HTML/CSS/JavaScript (Vanilla JS)** 기반 구현
* 외부 라이브러리: `Swiper.js` (메인 슬라이드 구현용)
* 개발/배포: GitHub Pages + Docusaurus 문서화
* 전체 DOM 구조를 자바스크립트로 직접 생성 및 제어 (HTML 하드코딩 없음)

---

## 구조 설계 흐름

### 1. 컴포넌트 역할의 분리 구현 (비공식적인 방식)

React를 사용하지 않았기 때문에 컴포넌트 구조가 존재하지는 않지만, **파일 단위로 역할을 분리**하여 다음과 같은 구조로 나누어 관리했습니다:

| 파일                           | 역할                             |
| ---------------------------- | ------------------------------ |
| `header.js`                  | depth1\~3 네비게이션 전체 구성 및 이벤트 처리 |
| `section1.js`                | 메인 슬라이드(텍스트+이미지) 동적 생성         |
| `section2.js`, `section3.js` | 콘텐츠 섹션 추가 구성                   |
| `contact.js`                 | Contact 영역 카드 UI 렌더링           |
| `footer.js`                  | 페이지 하단 구조 구성                   |

이처럼 기능을 중심으로 파일을 나누고 `app.js`에서 초기 호출/조립하는 구조로 구성했습니다.

---

### 2. HTML 없이 동적 UI 구성

* 모든 DOM 요소는 `document.createElement`로 생성
* 각 노드에 className/속성 지정 후 `append()`로 트리 구조 조립
* 반복 요소(카드, 메뉴 등)는 배열을 map처럼 반복하여 생성
* depth3 메뉴는 외부 JSON(`category.json`)을 fetch하여 비동기로 생성

---

### 3. 페이지 간 이동 및 데이터 전달

* 페이지 간 이동 시 새로고침 없이 `queryString` 기반 데이터 전달 구현
* `LoadAddress()` 생성자를 만들어 `absoluteLocation()`과 `queryString()` 함수로 나누어 처리
* 선택한 메뉴에 따라 동적으로 상품 리스트만 바뀌도록 설계

예:

```js
window.location.href = `${absoluteLocation}/product.html?category=${category}&part=${part}&content=${content}`
```

---

### 4. 반응형 처리

* `window.innerWidth` 기준으로 1024px 미만일 경우 모바일/태블릿 대응
* `.small-size`, `.middle-size`, `.tablet` 등의 클래스를 동적으로 추가/제거하여 스타일 전환
* 메뉴 구조도 데스크탑/모바일에서 UI 방식 분리하여 구현 (hover vs click)

---

### 5. 슬라이드 구성 (Swiper.js)

* 메인 빌보드 영역에 `Swiper.js`를 활용해 슬라이드 구현
* 슬라이드는 `autoplay`, `pagination`, `prev/next 버튼`, `pause/play` 토글 기능 포함
* 슬라이드 내부 텍스트와 버튼도 자바스크립트로 함께 생성되도록 구성

---

### 6. HTML 파일 구조 및 역할 분리

이 프로젝트는 `index.html`(메인 페이지)과 `product.html`(상품 목록 페이지)로 구성되며, 각 파일은 필요한 모듈만 선택적으로 불러옵니다.

| 파일             | 역할                                |
| -------------- | --------------------------------- |
| `index.html`   | 전체 브랜드 소개, 슬라이드, Contact 등을 포함    |
| `product.html` | 상품 목록만을 구성하며, queryString에 따라 필터링 |

공통되는 구조는 header/footer 모듈로 분리해 재사용했고, 각 섹션도 독립된 JS 파일에서 처리하여 유지보수성과 가독성을 높였습니다.

---

### 7. React 없이 구현한 SPA 스타일

* 두 HTML 파일은 명확히 분리되어 있지만, 실제 동작은 React 없이도 **SPA처럼 깜빡임 없이 페이지 전환을 경험할 수 있도록 구성**했습니다.
* `product.html`에서는 `queryString`을 기반으로 필요한 콘텐츠만 동적으로 렌더링함으로써 불필요한 전체 리렌더링을 방지했습니다.