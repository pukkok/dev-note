---
title: 기초
---

# 함수 구조와 리턴, 주석 명세, 조건문

### 0. 시작하기 전

함수는 매우 넓은 개념입니다.
그래서 용도에 따라 세분화해 이해하면 효율적입니다:

* **실행 함수**: 어떤 동작을 수행만 함 (`.exe`)
* **리턴 함수**: 계산 후 결과값을 반환함
* **컨트롤러 함수**: 여러 조건, 흐름을 판단하고 조작함
* **모델링 함수**: 데이터를 가공하거나 연산함

---

### 1. `return`이란?

* 함수의 **최종 결과**를 외부로 전달
* 함수 실행을 중단하고 값을 반환함

```js
function add(a, b) {
  return a + b
}
```

📌 `return`은 **예약어** (언어 자체에서 특별한 의미를 갖는 키워드 → 변수명 불가)

---

### 2. JSDoc 주석 처리

JSDoc은 함수의 **의도, 입력값, 출력값을 명시적으로 표현**하기 위한 주석입니다.

```js
/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 * @description 두 정수 a와 b를 더한 값을 반환합니다.
 */
function add(a, b) {
  return a + b
}
```

* 코드 실행 없이도 함수 구조를 유추할 수 있게 해줌
* 협업에서 의사소통 수단으로 매우 중요

---

### 3. 매개변수 (parameters) vs 인수 (arguments)

```js
function greet(name) { // parameter
  console.log('Hello, ' + name)
}

greet('민석') // argument
```

* **parameter (매개변수)**: 함수를 정의할 때 설정하는 변수
* **argument (인수)**: 함수를 호출할 때 전달하는 실제 값

📌 `arguments` 객체는 일반 `function`에서만 사용 가능, **화살표 함수는 사용 불가**

```js
function sum() {
  console.log(arguments)
}
```

---

### 4. 연산자 정리

* `=`: 할당 연산자 (값을 저장)
* `==`: 느슨한 비교 (타입 변환 O, 사용 지양)
* `===`: 엄격한 비교 (타입과 값 모두 비교)
* `+`: 숫자 덧셈 / 문자열 결합
* `-`, `/`, `*`, `%`, `**`: 수학 연산자

---

### 5. 블록 스코프와 변수 범위

```js
{
  let x = 1 // 블록 스코프
}
console.log(x) // ReferenceError
```

* `{}` 안에서 선언한 변수는 바깥에서 접근 불가
* `let`, `const`는 블록 스코프 / `var`는 함수 스코프

#### 스코프 종류

| 유형     | 특징            |
| ------ | ------------- |
| 전역 스코프 | 어디서든 접근 가능    |
| 블록 스코프 | `{}` 내부에서만 유효 |

> `var`는 예외적으로 블록을 무시하고 함수 범위로 올라감 → 사용 지양

---

### 6. 변수 네이밍 규칙

* `ALL_CAPS`: 절대 건드리면 안 되는 상수
* `camelCase`: 일반 변수, 함수 (`userName`)
* `PascalCase`: 클래스, 생성자 함수 (`UserProfile`)

---

### 7. 리터럴이란?

* 코드에 **직접 쓰인 값** 자체를 의미함

```js
const age = 32 // 숫자 리터럴
const name = "민석" // 문자열 리터럴
```

---

### 8. 제어문과 조건

제어문은 컴퓨터를 **똑똑하게 만드는 핵심 도구**입니다.
조건에 따라 다른 흐름을 실행하거나 반복을 유도합니다.

* 조건문: `if`, `switch`
* 반복문: `for`, `while`, `for...in`, `for...of`

---

### 9. Iterator와 Generator (심화 예고)

| 용어           | 설명                                |
| ------------ | --------------------------------- |
| Iterator     | 수동 반복 제어 (`next()`, `done`)       |
| Generator    | `function*`으로 정의, `yield`로 단계별 실행 |
| Lazy Loading | 한 번에 모두가 아닌, 필요할 때 하나씩 불러오는 방식    |

```js
function* gen() {
  yield 1
  yield 2
}

const g = gen()
console.log(g.next()) // { value: 1, done: false }
```

---

### 마무리

* 함수는 **값을 다루고 전달하는 기본 단위**이며, 그 안에서

  * 매개변수/인수
  * return
  * 조건
  * 연산
  * 스코프
  * 명세 (JSDoc)

  이 모든 요소가 유기적으로 결합되어 하나의 동작을 구성합니다.

> 코드를 쓴다는 건 결국 **조건과 흐름을 제어하고, 원하는 값을 얻어내는 함수 만들기**입니다.
