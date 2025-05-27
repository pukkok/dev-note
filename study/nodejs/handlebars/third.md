---
title: 서버 템플릿 이해(3)
---

# Handlebars 서버 템플릿 제작

이 문서는 Handlebars.js를 통해 서버 템플릿 렌더링 방식과 CSR/SSR 개념을 비교하며 학습한 과정을 정리한 것이다. Node.js 기반 서버 구성과 템플릿 시스템의 실험적 적용 과정을 포함한다.

---

### ✅ 시작 전 개요

* **목표**: Handlebars.js를 사용하여 템플릿 시스템 구현
* **목적**: 템플릿 공장 개념과 서버 기반 렌더링 구조를 이해
* **보조 학습**: 클래스 설계와 은닉화(#), 모듈 분리 연습

---

### 📌 학습 접근 흐름

1. 예시 코드 따라하기 → 기능만 확인
2. 감 잡힌 뒤 직접 적용해보기
3. 최소 구조로 나만의 스켈레톤 만들기 → 확장 아이디어 도출
4. 실험을 레퍼런스화하고, 지식으로 정리함
5. 이후 다양한 템플릿 엔진 비교로 발전 가능

---

### 🧱 폴더 구조 계획

```
/node_modules
/public
  ├── index.html
  ├── index.js
  └── style.css
/src
  ├── server.js
  ├── fileWriter
  │   └── fileWriter.js
  ├── fileReader
  │   ├── Extender.js
  │   ├── FileReader.js
  │   └── UrlChecker.js
  └── template
      ├── buildTemplate.js
      ├── TemplateMaker.js
      ├── HTML.js
      ├── Head.js
      ├── Body.js
      └── Body
          ├── Header.js
          ├── Main.js
          └── Footer.js
```

---

### 🔍 클래스 모듈 요약

#### 1. `UrlChecker`

* 문자열 형식의 URL만 허용
* 경로를 `path.normalize()`로 정리 후 `/public` 기준으로 절대경로 반환

#### 2. `Extender`

* 확장자를 기준으로 Content-Type 반환
* 미리 정의된 타입 맵을 사용한 MIME 매칭

#### 3. `FileReader`

* 요청된 URL을 기반으로 파일을 읽고 응답
* `fs.access`로 존재 여부 검증, 상태코드와 Content-Type 설정

#### 4. `server.js`

* 서버 실행 시 HTML 파일을 템플릿으로 생성
* GET 요청에 따라 정적 파일 응답 처리
* `child_process.exec`으로 브라우저 자동 실행

---

### ✅ SSR 렌더링 및 정적 자원 처리 추가 (3단계 실습)

#### head.js 수정

```html
<link rel="stylesheet" href="style.css">
```

* HTML 파일이 생성된 이후 `style.css`를 추가로 요청할 수 있도록 head에 링크 추가

#### style.css 작성

```css
* {
  margin: 0;
  padding: 0;
}
html { scroll-behavior: smooth; }
header { position: fixed; ... }
...
```

* 간단한 레이아웃 및 색상, 타이포그래피 스타일 정의

#### 결과 확인

* 서버 실행 후 요청 경로에 따라 `style.css`가 정상적으로 응답됨
* 정적 파일이 분리된 후에도 SSR 결과가 예상대로 렌더링됨

---

### ❌ 중간 실패 포인트: Handlebars 브라우저 import 실패

#### index.html

```html
<script src="../node_modules/handlebars/dist/handlebars.js"></script>
```

* Node.js 환경에서 직접 접근한 node\_modules 경로는 정적 서버로 노출되지 않아 실패

#### index.js

```js
import Handlebars from "handlebars" // 실패 원인
```

* 브라우저 환경에서 Node.js용 import 구문은 작동하지 않음

#### 결론

* 템플릿은 브라우저에서가 아니라 서버에서 렌더링하여 HTML로 완성된 후 응답해야 함 → SSR 필요

---

### 🧠 CSR vs SSR 비교

#### CSR (Client Side Rendering)

```html
<div id="root">Loading...</div>
```

* JS 실행 후 동적으로 데이터 fetch → 렌더링

#### SSR (Server Side Rendering)

```html
<div id="root">
  <h1>Hello SSR!</h1>
</div>
```

* HTML 자체가 서버에서 완성되어 클라이언트에 전달됨

---

### ✍️ 정리 및 통찰

* SSR 구조로 완성된 템플릿을 파일로 저장하고, 정적 자원을 요청하여 클라이언트에 완성된 웹페이지를 전달하는 구조를 구현함
* CSR 방식의 한계를 실험을 통해 체감하고 SSR의 흐름으로 자연스럽게 넘어감

> Handlebars로 구성한 템플릿 SSR 구조를 통해 브라우저와 서버의 역할 분리, 정적 자원 처리, 템플릿 모듈화까지 실전적인 흐름을 익힐 수 있었다.
