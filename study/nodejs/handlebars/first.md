---
title: 서버 템플릿 이해(1)
---

# Handlebars 서버 템플릿 제작 (실패)

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
  └── index.js
/src
  └── fileReader
      ├── Extender.js
      ├── FileReader.js
      └── UrlChecker.js
server.js
package.json
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

* GET 요청만 처리
* 요청 시 `FileReader`를 통해 파일 전송
* 서버 실행 시 `child_process.exec`으로 브라우저 자동 실행

---

### ❌ 중간 실패 포인트: Handlebars 사용 실패

#### index.html

```html
<script src="../node_modules/handlebars/dist/handlebars.js"></script>
```

* Node.js 환경에서 직접 접근한 node\_modules 경로는 **정적 서버로 노출되지 않아 실패**
* CDN 방식으로도 경로 오류 또는 브라우저 import 호환성 문제 발생

#### index.js

```js
import Handlebars from "handlebars" // 실패 원인
```

* 브라우저 환경에서 Node.js용 import 구문은 작동하지 않음
* type="module" 설정해도 브라우저는 npm 기반 import를 해석하지 못함

#### 결론

* Handlebars는 브라우저에서 직접 import하는 방 식이 어려움
* **템플릿은 서버에서 컴파일 후 완성된 HTML을 클라이언트에 전달해야 함 → SSR 방식 필요**

---

### 🧠 CSR vs SSR 비교

#### CSR (Client Side Rendering)

```html
<div id="root">Loading...</div>
```

* 클라이언트에서 데이터를 받아 JavaScript로 DOM 렌더링
* React, Vue 등에서 일반적인 방식

#### SSR (Server Side Rendering)

```html
<div id="root">
  <h1>Hello SSR!</h1>
</div>
```

* 서버에서 HTML을 미리 완성해 응답
* 초기 렌더 속도 빠름, SEO에 유리

---

### ✍️ 정리 및 통찰

* CSR 방식으로 템플릿을 직접 브라우저에서 적용하려 했으나, 브라우저 import 제한 및 파일 접근 경로 제약으로 실패
* 이 과정에서 SSR의 필요성을 체감함
* 서버가 템플릿을 렌더링하고 HTML을 완성해 보내는 구조를 실습해볼 필요성 도출

> 이 실험은 단순한 실패가 아닌 서버-클라이언트 구조의 차이를 이해하는 계기가 되었고, 템플릿 렌더링 위치의 중요성을 인식한 의미 있는 학습이었다.
