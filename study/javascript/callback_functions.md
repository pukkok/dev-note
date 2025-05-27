---
title: 콜백 함수
---

# JavaScript - 콜백 함수 (Callback Functions)

---

### 0. 시작하기 전

* **Visual Thinking**: 디버거를 통해 콜백 함수의 동작을 시각적으로 이해하자

  * 디버깅은 개발 실력의 지표
  * 복잡한 흐름일수록 디버깅의 효과는 극대화됨
  * 코드 주변의 흐름을 시각적으로 확인할 수 있음

* **정적 함수 선언**

  * 고정된 동작을 수행하며 불변성이 있어 관리가 쉬움
  * 단점: 재사용 목적이 없을 경우에도 무조건 선언해야 함

* **동적 함수 선언 (콜백함수)**

  * 필요할 때 한 번만 사용할 함수를 그 자리에서 직접 선언 가능
  * 선언의 반복을 줄이고, 재사용이 필요 없는 경우에 적합

---

### 1. 콜백 함수 연습하기

```js
function add(a, b) {
  let result = a - b // 잘못된 로직 의도적으로 넣은 예시
  return result
}

function dynamicCalc(a, b, func) {
  let result = func(a, b)
  return result
}

console.log(dynamicCalc(1, 2, add))
// 이 경우는 콜백 함수는 아니며, 단순히 '함수 전달 및 호출' 예시
```

---

```js
function dynamicCalc(a, b, callback) {
  return callback(a, b)
}

console.log(dynamicCalc(1, 2, function(a, b) {
  let result = a + b
  return result
}))
```

* 콜백 함수의 특징:

  * 매개변수 자리에 직접 함수를 선언
  * 실행 시점에서 즉석으로 로직을 정의할 수 있음

---

### 2. 사칙연산 예제: 콜백으로 동작을 유동적으로

```js
function sachic(a, b, callback) {
  return callback(a, b)
}

const sum = sachic(1, 2, (a, b) => a + b)
const subtract = sachic(1, 2, (a, b) => a - b)
const multiply = sachic(1, 2, (a, b) => a * b)
const devide = sachic(1, 2, (a, b) => a / b)

console.log(sum, subtract, multiply, devide)
```

* `sachic` 함수는 어떤 연산이 들어와도 그것을 실행만 해주는 중개 역할
* 콜백 함수의 유연성과 실용성을 보여주는 예시

---

### 3. 객체 가공 예제

```js
function me(name, age, callback) {
  let result = {
    name, age,
    another: {}
  }
  return callback(result)
}

me('민석', 32, (e) => {
  console.log(e)
})
```

* `addEventListener`처럼 동작이 끝난 후 호출될 동작을 콜백으로 지정하는 형태
* 이벤트 리스너 내부 구조가 어떻게 구성되어 있는지 유추할 수 있음

---

### 요약

* 콜백 함수는 JS에서 동작의 순서, 조건, 시점을 유연하게 설정하는 강력한 도구
* 코드의 재사용성을 높이면서 동시에 유연성을 제공
* 디버깅, 디버거 활용을 통해 흐름 파악 훈련이 매우 중요함

> 🔍 콜백은 단순한 함수 전달이 아닌 **동작 위임**의 패턴으로 이해하자
