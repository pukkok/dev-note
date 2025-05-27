---
title: 기초
---

# window 객체

### 0. 시작하기 전

* 핵심 지식: `window`는 브라우저 환경에서의 **최상위 객체**다.
* 훈련 목표: `window` 객체에 익숙해지고, 다양한 속성과 메서드를 자유자재로 사용하는 것.
* 연구 방향: "내가 평소 쓰던 기능들이 사실은 `window` 소속이었구나"를 깨닫는 것부터 시작.

---

### 1. front end의 '최상급 객체' : `window`

* 자바스크립트의 브라우저 환경에서 가장 바깥에 있는 객체는 `window`이다.
* 별도로 명시하지 않아도 대부분의 전역 객체나 함수(`alert`, `setTimeout`, `document` 등)는 `window`의 속성으로 자동 참조된다.
* 그렇기 때문에 평소에 `window.alert()` 대신 `alert()`을 써도 문제가 없었던 것.

```js
window.alert('이것도 되고')
alert('이것도 된다') // window 생략된 것
```

---

### 2. HTML과 DOM은 결국 window 아래에 있다

* 우리가 작성한 `<html>` 태그는 브라우저가 열면서 자동으로 파싱되어 DOM 트리로 올라간다.
* 이 DOM 객체 역시 `window`의 하위 속성이다.
* 대표적인 예시:

```js
console.log(window.document) // => HTML 문서 전체
console.log(window.document.body) // => <body> 태그만 선택됨
```

* 즉, HTML은 단순히 시각적 마크업이 아니라 window 객체 내부의 데이터 구조로 재편되는 것이다.

---

### 3. window에서 DOM 선택하기 - `querySelector`

* `window.document.querySelector()`를 통해 원하는 요소를 선택할 수 있다.
* CSS 선택자 방식으로 동작한다. 예: `#id`, `.class`, `tag` 등

```js
const box = window.document.querySelector('.my-box')
box.textContent = '선택된 요소입니다'
```

* 사실 `document`도 window 생략이 가능하므로 보통은 이렇게 사용함:

```js
const box = document.querySelector('#title')
```

> 💡 참고: `document.getElementById`, `getElementsByClassName`, `getElementsByTagName` 등은 querySelector보다 제한적인 방식이다.

---

### 4. 왜 window를 이해해야 할까?

* 많은 초보 개발자들이 `alert`, `location`, `setTimeout`, `console` 등이 마치 어디선가 주어지는 듯 느끼지만,
  실은 전부 `window` 객체의 속성이다.

```js
console.log(window.location.href)
```

* window 객체를 이해하면, "브라우저 환경 안에서 내가 어디에 있는가"를 알 수 있고,
  JS와 DOM, 브라우저 간의 연결 고리를 이해하는 데 큰 도움이 된다.

---

### 5. 정리하며

* `window`는 front-end 개발자라면 반드시 이해하고 있어야 하는 개념이다.
* 익숙해지면 전역 환경에서의 동작, DOM 접근, 브라우저 정보 확인 등 많은 부분이 자연스럽게 연결된다.
* 단순히 "전역 객체다"라는 수준이 아니라, 우리가 일상적으로 사용하는 거의 모든 브라우저 기능들의 **출발점**임을 기억하자.
