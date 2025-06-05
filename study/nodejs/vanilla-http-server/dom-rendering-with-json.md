---
title: JSON 데이터 렌더링
---

# 바닐라 JS로 JSON 데이터를 렌더링하기

이 실습에서는 브라우저에서 JSON 데이터를 불러와 DOM에 동적으로 렌더링하는 과정을 진행했다. Node.js 서버로 HTML/JS 파일을 서빙하고, JS 내부에서 `.json`과 `.js` 모듈을 import하여 데이터를 출력하는 방식으로 구성하였다.

## 🎯 목표

* 브라우저에서 JSON 파일을 import 하여 활용
* `.map()`을 통해 배열 데이터를 HTML 문자열로 변환
* `innerHTML`로 DOM에 출력
* 외부 JS 모듈도 함께 불러와 사용

---

## 📁 JSON 데이터 (`public/user.json`)

```json
{
  "students": [
    { "prefixName": "홍길동", "type": "new", "uuid": "a1", "name": "길동이" },
    { "prefixName": "김철수", "type": "old", "uuid": "a2", "name": "철수" }
  ]
}
```

---

## 📁 외부 모듈 (`public/test.js`)

```js
export default '외부 모듈 테스트 데이터'
```

---

## 📁 JS 렌더링 코드 (`public/app.js`)

```js
const root = document.getElementById('root')

import data from "./user.json" with { type: "json" }
import testData from "./test.js"

function card () {
  const students = data.students
  const components = students.map(student => {
    const {prefixName, type, uuid, name} = student
    const component =
    `
    <div class="card">
      <h3>${prefixName}</h3>
      <p>${type === 'new' ? '뉴비' : '고인물'}</p>
      <p>고유ID : ${uuid}</p>
      <p>이름 : ${name}</p>
    </div>
    `
    return component
  })

  root.innerHTML = `
    <h1>KDT반 학생 목록 생성</h1>
    <div class="wrapper">
      ${components.join('\n')}
    </div>
  `
}

card()

console.log(testData)
console.log('app.js 동작 완료')
```

> 참고: `import ... with { type: 'json' }` 문법은 최신 브라우저에서만 동작하며, 서버에서 `Content-Type: application/json`을 명확히 설정해야 한다.

---

## 💬 느낀 점

* 브라우저 환경에서 JSON을 직접 import해서 사용하는 실습을 통해 모듈 시스템과 파일 타입 지정 방식에 익숙해질 수 있었다.
* `innerHTML` 방식의 DOM 조작은 간단하지만 XSS나 escape 처리에 주의가 필요하다는 점도 함께 느꼈다.
