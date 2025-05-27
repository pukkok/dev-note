---
title: html 템플릿 제작
---

### 0. 시작하기 전

* 이 문서는 **Node.js 환경에서 HTML 템플릿을 파일로 출력**하는 기초 예제를 설명한다.
* 자바스크립트를 사용하지만, 우리가 사용하는 많은 기능은 **DOM API가 아닌 Node.js 내장 API**이다.
* 브라우저에서의 최상위 객체는 `window`, Node.js의 최상위 객체는 `global`
* 모르는 것이 있다면 [Node.js 공식 문서](https://nodejs.org/docs/latest/api/)를 참조하자.

---

### 1. browser ↔ node.js는 같은 것인가?

* 전혀 다르다. 단지 \*\*같은 언어(Javascript)\*\*를 채택했을 뿐이다.
* 브라우저에서는 HTML/DOM과 상호작용을 위한 JS가 실행된다.
* Node.js는 브라우저가 아닌 **서버 측에서 자바스크립트를 실행할 수 있도록 만든 런타임 환경**이다.
* 같은 문법을 사용하지만, 제공하는 API나 동작 방식은 다르다.

---

### 2. HTML 템플릿 제작 (기초 예제)

```js
const fs = require('fs')

let titleName = "123123"
let rootId = "root"
let liTag = `<li>abcdefg</li>`

let head =
`<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${titleName}</title>
</head>`

let body =
`<body>
  <div id="${rootId}">
    ${liTag}
  </div>
</body>`

const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
${head}
${body}
</html>`

fs.writeFile("newHtml.html", htmlTemplate, "utf-8", (err) => {
  if(err) return console.error('고장났어')
})
```

---

### 구조 의존성 분석 (개발자스럽게)

* `htmlTemplate`는 `head`와 `body`에 의존한다.
* `head`는 `titleName`을 의존한다.
* `body`는 `rootId`와 `liTag`를 의존한다.
* 이처럼 템플릿을 구성할 때는 **어떤 변수에 어떤 데이터가 주입되는지**를 명확히 해야 한다.

---

### 문제 해결 사고방식

* **유효한가? 무효한가? (validation)**

  * 단순히 작성한 코드가 실행된다고 끝이 아님
  * 원하는 결과를 **정확히 낼 수 있는지**가 중요

* **구조화된 문제**

  * 공식 문서, 작성법 등을 통해 쉽게 해결 가능

* **비구조화된 문제**

  * 낯선 상황이나 조합에서는 해결 난이도가 매우 달라진다
  * 이때 필요한 것이 디버깅 습관, 로직 시각화, 경험적 접근

> Tip: fs, path, os 등 Node.js 내장 모듈을 직접 사용해보며 CLI 도구 제작에 익숙해지자
