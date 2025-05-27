---
title: 기초
---

# for문 기초

### 0. 시작하기 전

* for 문의 종류를 알아보자

  * `for()` : 일반적인 카운터 기반 반복문
  * `for..in` : 객체의 key를 반복할 때 사용
  * `for..of` : 배열이나 iterable의 요소를 반복할 때 사용

```js
const travelBag = {
  pocket: {
    main: '옷',
    front: '여권',
    side: '충전기',
    secret: '비상금'
  }
}

for (let item in travelBag.pocket) {
  console.log(`${item}에는 ${travelBag.pocket[item]}이(가) 있습니다.`)
}

const packingList = ['치약', '칫솔', '수건', '선크림']

for (let item of packingList) {
  console.log(`${item} 챙겼나요?`)
}

for (let idx in packingList) {
  console.log(`${idx}`)
}
```

* `for...in`은 객체에서 key를 반복한다.
* `for...of`는 배열에서 실제 값을 반복한다.
* 배열도 객체이기 때문에 `for...in`으로 index(key)를 반복할 수 있다.
* 이 과정은 일종의 파싱 또는 type casting이다.

---

### 1. 객체의 for 사용

* `for...in`을 사용하여 객체의 key값을 순회할 수 있다.
* 이 문법은 객체의 구조를 선언적으로 탐색하는 방식이다.

```js
const person = { name: '민석', age: 29 }
for (let key in person) {
  console.log(`${key}: ${person[key]}`)
}
```

* `for` → 절차적
* `for...in` → 선언적

---

### 2. 배열의 for 사용

* 배열에서는 `for...of`로 값을 순회하고, `for...in`으로는 index를 순회할 수 있다.
* 배열은 사실상 index를 key로 갖는 특수한 객체다.

```js
const list = ['a', 'b', 'c']

for (let value of list) {
  console.log(value) // a, b, c
}

for (let index in list) {
  console.log(index) // 0, 1, 2
}
```

---

### 3. 불변성 함수를 만들기

* 객체를 리턴하는 함수를 사용하면 불변성(immutable)을 유지할 수 있다.
* 안에 있는 값을 직접 변경하지 않고, 가공을 통해 새로운 객체를 만들어내는 것이 핵심이다.

```js
function na () {
  return { name: '서민석' }
}

const callTest = na()
console.dir(callTest)

for (let item in callTest) {
  console.log('당신이 조회한 객체의 키는 :', item)
  console.log(callTest[item])
}
```

* 디버깅 팁:

  * `na()`는 선언된 시점에서 메모리에 올라가지만 호출되지 않으면 실행되지 않는다.
  * 브레이크 포인트는 실제 실행 위치에 따라 멈춘다.

---

### 4. 객체를 다루는 시사점

* HTML은 객체 구조를 조립하기 위한 도구다.
* 객체를 다룰 줄 알아야 DOM을 다룰 수 있다.
* 따라서 `for...in`, `for...of`, `Object.keys()`, `Object.entries()` 등의 활용법을 익혀야 한다.

---

### 5. 개발 방식에 대한 사고

* **귀납적 추론**

  * 데이터를 모으고 거기서 출발
  * 데이터 중심의 개발

* **연역적 추론**

  * 전체 틀을 잡고 점진적으로 채워나감
  * 설계 중심의 유연한 개발

* **거시적 시야**

  * 구조와 시스템을 본다
  * 나만의 설계와 규칙을 만든다

* **미시적 시야**

  * 작은 단위에서 에러를 관찰하고 학습
  * 에러를 즐기며 실험한다

> ✅ 하기 싫으면 억지로 하지 말고, 재밌는 방향으로 시도하자.
