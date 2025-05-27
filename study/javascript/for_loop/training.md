---
title: 훈련
---

### 1. 훈련하기 - 객체 속성 순회와 문자 추출

이번 훈련에서는 DOM 요소(`document.getElementById`)를 통해 가져온 객체의 속성을 `for...in` 루프로 순회하고,
해당 속성 이름이 특정 문자로 시작하는지 확인하는 로직을 연습한다.

---

### 예제 코드

```js
const root = document.getElementById('root')
let length = 0
let sStart = 0

for (let item in root) {
  length++
  if (stringExtractor(item, 0, 's')) sStart++
}

/**
 * @param {string} item
 * @param {number} idx
 * @param {string} checkString
 * 
 * @description
 * 문자열의 특정 인덱스의 문자가 지정된 문자와 일치하는지 확인한다.
 */
function stringExtractor(item, idx, checkString) {
  return item[idx] === checkString
}

console.log(length)
console.log(sStart)
```

---

### 해설

* `for...in` 문은 `root` 객체의 모든 속성 이름(key)을 문자열로 순회한다.
* 각 속성 이름을 `stringExtractor` 함수에 넘겨서 첫 번째 문자가 `'s'`인지 검사한다.
* 검사 조건을 만족하는 개수를 `sStart`로 카운팅한다.

---

### 주요 개념

* **핸들러 변수 (`idx`)**

  * `stringExtractor`에서 특정 자리수를 다루기 위한 인덱스를 말함
  * 가변적으로 사용할 수 있으므로 테스트와 디버깅에 유용

* **startsWith vs 인덱스 검사**

  * `.startsWith('s')`는 문자열의 시작 여부만 확인할 수 있음
  * 그러나 특정 인덱스를 기준으로 문자를 검사하려면 직접 비교가 필요함 → `item[idx] === 's'`

* **타입 캐스팅 관점**

  * `for...in`을 통해 객체의 속성 목록을 문자열 배열처럼 다루고 있음
  * 이는 객체를 내부적으로 **key 목록을 가진 배열처럼 취급**하는 방식이며, 실제로는 객체 순회이지만 배열처럼 사용되는 사례

---

### 정리

* 자바스크립트 객체도 배열처럼 순회 가능하다는 개념을 체득하는 훈련이다.
* 문자 비교를 통해 속성의 패턴을 찾아내고, DOM 객체의 구조에 대한 감각을 키운다.
* 단순한 반복문 안에서도 `문자열 처리`, `조건 검사`, `카운팅` 같은 요소가 종합적으로 연습됨.

> 🔍 DOM 객체는 개발자 도구에서 직접 열어보고 `console.dir()`로 탐색하며 구조를 확인해보자.
