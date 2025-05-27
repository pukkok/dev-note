---
title: 훈련
---


# window 객체 훈련

이번 실습은 `window.document`를 통해 DOM 요소에 직접 접근하고, 속성과 내용을 동적으로 설정하는 훈련이다.

---

### 1. 사전 조건

HTML 문서에는 다음과 같은 기본 구조만 존재한다:

```html
<div id="root"></div>
```

---

### 2. 실습 코드

```js
const elStyle = (target, { width, height, backgroundColor }) => {
  target.style.width = width
  target.style.height = height
  target.style.backgroundColor = backgroundColor
}

const inputText = (target, text) => {
  target.textContent = text
}

const rootStyle = {
  width : "100vw",
  height : "100vh",
  backgroundColor: "cadetblue",
  textContent: "서민석"
}
const newDivStyle = {
  width : "50vw",
  height : "50vh",
  backgroundColor: "red",
  textContent: "김민지"
}

elStyle(document.getElementById('root'), rootStyle)
inputText(document.getElementById('root'), rootStyle.textContent)

const newDiv = document.createElement('div')
document.getElementById('root').appendChild(newDiv)
elStyle(newDiv, newDivStyle)
inputText(newDiv, newDivStyle.textContent)
```

---

### 3. 해설

* `elStyle` 함수는 DOM 요소에 대해 스타일 속성을 객체 형태로 받아 적용한다.
* `inputText` 함수는 해당 요소의 내부 텍스트를 설정한다.
* `document.getElementById()`를 통해 `#root` 요소를 가져오고, 동적으로 스타일과 내용을 설정한다.
* `document.createElement()`로 새 div 요소를 만들고, DOM에 추가한 후 동일하게 스타일링한다.

---

### 4. 목표

* `window.document`를 통해 요소에 접근하는 기본기를 익힌다.
* 객체로 스타일을 넘기고 동적으로 적용하는 방식에 익숙해진다.
* HTML 구조가 간단하더라도 자바스크립트만으로 전체 구성을 제어할 수 있음을 체험한다.

> 💡 이 훈련을 반복하면서 DOM 조작 감각을 익히는 것이 중요하다.
