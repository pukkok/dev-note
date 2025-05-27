---
title: 서버 템플릿 이해(2)
---

# Handlebars를 활용한 SSR 템플릿 구성

이 문서는 Handlebars.js를 기반으로 서버 템플릿을 구성하고 SSR(Server Side Rendering) 방식으로 정적인 HTML 파일을 생성하여 클라이언트에 전달하는 과정을 정리한 것이다. 파일 작성, 요청 응답 처리, 템플릿 조립까지 구성되어 있다.

---

### 🔍 시작 전 정리

* CSR/SSR의 차이를 인식하며 템플릿 시스템을 SSR 방식으로 구성
* Node.js 환경에서 Handlebars를 서버 측 템플릿 엔진으로 활용
* `fs`를 이용해 HTML 파일을 서버 실행 시 동적으로 생성

---

### 📁 폴더 구조 설계

```
/public
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

### 🧱 주요 템플릿 구성 요소

#### ✅ TemplateMaker.js

* `Handlebars.compile(source)`를 통해 data와 함께 템플릿을 문자열로 반환

#### ✅ Header.js

* `#each` 문법을 사용하여 리스트 렌더링

#### ✅ Main.js

* `#each` + `#with`를 조합해 각 객체의 상세 정보를 반복 출력

#### ✅ Footer.js

* 단순 텍스트 데이터 바인딩 처리

#### ✅ Body.js

* Header, Main, Footer 템플릿을 병합하여 body 구성
* `{{{ }}}` 사용으로 HTML 문자열 이스케이프 방지

#### ✅ Head.js

* 메타 정보와 타이틀 포함, favicon 생략용 빈 링크 추가

#### ✅ HTML.js

* 전체 HTML 문서의 구조 정의, Head + Body 병합

#### ✅ buildTemplate.js

* 완성된 전체 HTML 문자열을 export

---

### 📄 fileWriter.js

* `buildTemplate.js`에서 완성된 HTML 문자열을 `public/index.html`로 저장
* `fs.writeFile`을 사용하여 실제 파일을 생성

---

### 🌐 server.js

* 서버 실행 시 템플릿 파일을 먼저 생성 (`fileWriter()` 호출)
* `GET` 요청이 들어오면 요청된 파일을 `FileReader` 클래스로 응답
* 서버 시작과 동시에 브라우저 자동 실행 (`exec('start ...')`)

---

### ✅ 최종 결과

* SSR 방식으로 Handlebars 템플릿을 조합한 index.html 파일 생성 완료
* 템플릿 파일은 서버 시작 시 자동 생성되어 클라이언트에 제공됨
* `localhost:8080`에서 완성된 HTML 확인 가능

---

### 📌 학습 포인트 요약

* CSR 방식에서 불가능했던 Handlebars import 문제를 SSR 방식으로 해결
* 템플릿 조립 → 파일 생성 → 서버 응답 흐름을 전체적으로 구성해봄
* 서버 기반 템플릿 처리에 대한 기본적인 실무 흐름 이해에 도움

> 이 방식은 React, Vue 등에서 사용하는 CSR과 대비해 SSR 구조를 직접 체험할 수 있도록 설계되었으며, 템플릿 엔진의 구조를 모듈화하는 설계 훈련으로도 효과적이다.
