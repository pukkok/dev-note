---
title: 심화
---

# DOM 활용: 태그 생성 및 렌더링 실습

### 1. 목표

이 예제는 **함수의 실전 활용**을 웹페이지에서 직접 구현하는 것으로,

* DOM API(`document.createElement`, `append`) 활용
* 조건문 기반 태그 필터링
* 반복문과 `map()` 활용
* JSDoc을 통한 함수 설명 작성

을 포함하는 **연구 단계의 함수 사용 훈련**입니다.

---

### 2. HTML 구조 (index.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="root"></div>
  <script src="index.js"></script>
</body>
</html>
```

📌 `#root`라는 div에 자바스크립트로 생성한 태그들을 삽입함

---

### 3. JavaScript 코드 (index.js)

```js
const root = document.getElementById('root')

/**
 * @param {string} tagName
 * @returns {HTMLElement}
 * @description 태그 이름을 받아 해당 태그를 생성하여 반환
 */
function createNewTag(tagName) {
  return document.createElement(tagName)
}

/**
 * @param {string} tagName
 * @param {string} msg
 * @returns {HTMLElement}
 *
 * @description
 * 허용된 태그 중 하나를 받아 그 태그에 메시지를 넣어 반환합니다.
 * 허용된 태그가 아닌 경우 p 태그로 대체됩니다.
 */
function createTagInMsg(tagName = 'p', msg = '넣지 않은 메세지') {
  const possibleTag = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'div', 'p']
  const name = possibleTag.includes(tagName) ? tagName : 'p'

  const newTag = createNewTag(name)
  newTag.innerText = msg
  return newTag
}

const newTagMsg = createTagInMsg('h1', '메세지를 넣어 보세요!!')

const tagAndmsgs = [
  { tag: 'h2', msg: '넣었어요!!' },
  { tag: 'h3', msg: '넣었어요!' },
  { tag: 'h4', msg: '넣었어요.' },
  { tag: 'h5', msg: '넣었어요..' },
  { tag: 'h6', msg: '넣었어요...' },
]

const tagInMsgs = tagAndmsgs.map(item => {
  const { tag, msg } = item
  return createTagInMsg(tag, msg)
})

/**
 * @description
 * DOM에 여러 태그 요소를 한 번에 삽입하는 함수입니다.
 * `arguments`를 활용하여 유연하게 전달 가능
 */
function buildTag() {
  root.append(...arguments)
}

buildTag(newTagMsg, ...tagInMsgs)
```

---

### 4. 요약 포인트

* DOM 조작은 `document.createElement`, `innerText`, `append`의 조합으로 가능
* `arguments`를 활용한 함수 유연성 강화
* `map()`을 사용한 반복적 처리
* JSDoc으로 함수 목적과 입력값을 명시 → 협업/유지보수에 유리

---

### 마무리

이 실습은 함수 설계, 반복 처리, 조건 분기, DOM 조작, 문서화까지 통합적으로 학습하는 과정입니다.

> 직접 태그를 만들고, 조건에 따라 가공하고, JSDoc으로 설명해보는 경험은 JS 함수 활용의 좋은 훈련입니다.
