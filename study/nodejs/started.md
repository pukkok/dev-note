---
title: 시작과 설계
---

# Node.js 프로젝트 시작과 설계 마인드셋

### 0. 시작하기 전

* **디버거 단축키**: `Ctrl + Shift + D`
* Node.js에서 프로젝트를 구성할 때 가장 먼저 필요한 건 **파일을 나누는 감각**입니다.
* 프로그래밍은 `반복 + 조립 + 모듈화`의 예술입니다.

---

### 1. import와 export의 이해 (CommonJS 기준)

Node.js는 기본적으로 **CommonJS (cjs)** 방식의 모듈 시스템을 사용합니다.

```js
// 불러오기
const name = require('./static/name')
const { age } = require('./static/age')
const first = require('./model/model')

// 내보내기
module.exports = value
```

* `require()`로 불러오고, `module.exports`로 내보냄
* 설정을 통해 ESModule(import/export) 방식으로도 사용 가능하지만 기본은 cjs

---

### 2. 모듈화 구조 그리기

모든 코드는 "하나의 덩어리"로 작성하지 않고 **쪼개서 분리**해야 관리가 쉬워집니다.

#### 모듈 구조 예시

```js
// index.js (entry point)
const first = require('./model/model')
const name = require('./static/name')
const { age } = require('./static/age')

function second(obj, objValue) {
  let result = objValue
  for (let item in obj) {
    result[item] = obj[item]
  }
  return result
}

let test = second(first(name), age)
console.log(test)
```

```js
// static/age.js
const age = { age: 32 }
module.exports = { age }
```

```js
// static/name.js
const name = { name: '서민석' }
module.exports = name
```

```js
// model/model.js
function first(objValue) {
  return objValue
}
module.exports = first
```

📌 여기서 `index.js`는 진입점(entry point)이며, 전체 구조를 관장합니다.

> 의존성(Dependency)을 명확히 분리하고, 각 파일은 하나의 역할만 하도록 구성합니다.

---

### 3. 모듈화 설계 마인드

* 코드는 **읽기 쉬워야 유지보수가 쉽다**
* 함수 하나, 상수 하나라도 **별도 파일로 나누는 습관**을 들이자
* 50줄 이상을 넘기지 말자. 읽기 힘들다
* 디렉터리를 자유롭게 쪼개고, 구조화하는 것을 두려워하지 말자
* 모듈이 많아져도 VSCode의 \*\*파일 탐색 단축키 (`Ctrl + P`)\*\*를 활용하면 불편함이 없다

---

### 4. JSON이란 무엇인가?

* **JSON** = JavaScript Object Notation
* JS의 객체 표기법을 기반으로 한 데이터 **포맷(형식)**
* 전 세계적으로 사용되는 가장 보편적인 구조화된 데이터 포맷
* `fs.writeFileSync('data.json', JSON.stringify(data))`처럼 파일로 쉽게 저장 가능

> JSON은 프론트와 백엔드, 혹은 API 서버 간의 데이터 교환 포맷으로 널리 사용됨

---

### 5. 에러를 대하는 태도

* "되겠지"라는 태도로 코드를 쓰면 안 됨 → 반드시 실험하고, 결과를 확인해야 함
* 에러는 **반드시 뜯어보고, 이해하고, 정리**해야 실력이 늘어남

#### 에러 메시지 예시:

```
The "data" argument must be of type string or an instance of Buffer, TypedArray, or DataView.
Received an instance of Object
```

* 타입(type), 인스턴스(instance of), Buffer, TypedArray 등의 단어는 반드시 정리하고 이해
* 검색을 잘하는 습관이 결국 실력을 좌우함

---

### 마무리

Node.js는 단순히 서버를 만드는 툴이 아닙니다.
**모듈화, 설계, 파일 시스템 감각, 디버깅 태도까지 포함한 개발 철학**을 함께 키우는 도구입니다.

처음부터 깔끔한 구조로, 의미 있는 에러를 만나고, 그걸 정리하는 방식으로 시작해보세요.

> **읽히는 코드, 나누어진 구조, 그리고 검색하는 습관이 실력이다.**
