---
title: 배열과 객체
---

# 배열, 객체, 복사의 개념 정리

### 0. 시작하기 전

* 배열을 **초기화한다** = 배열을 만든다
* 배열 = 리스트 = 나열 (JS에서는 `array`, Python에서는 `list`)
* 반복은 컴퓨팅의 핵심이며, 나열은 그 시작이다

---

### 1. 배열은 왜 쓸까?

* 많은 값을 변수로 하나하나 선언하면 비효율적 → 하나로 묶는 **포장** 필요
* 이때 필요한 것이 배열. 배열은 **순서(index)** 를 가진 데이터 묶음

#### 인덱스는 왜 0부터 시작할까?

* 인덱스를 1부터 시작하면 실제 크기보다 숫자 표현이 커짐 (ex: 10 = 두 자리)
* 컴퓨터는 **메모리 주소의 offset이 0부터 시작** → 기술적 효율 때문

#### 추상화

* 많은 데이터를 **대표값**으로 묶는 것 = 추상화 (abstraction)
* 배열은 데이터를 묶고, **인덱스를 이용해 접근**할 수 있음

---

### 2. 객체는 왜 쓸까?

* 배열이 **순서 기반**이라면, 객체는 **이름 기반(라벨 기반)**
* 관계성, 의미, 구조를 부여하려면 객체가 유리함
* 객체는 태깅/라벨링을 기반으로 데이터 표현

```js
const arr = ["원소", 1, true]

const obj = {
  name: '원소',
  count: 1,
  isContain: true
}

obj["name"] // or obj.name
```

> 객체의 각 속성은 key-value 쌍으로 구성

---

### 3. 접근 방식 차이

| 데이터 구조 | 접근 방식  | 주 용도        |
| ------ | ------ | ----------- |
| 배열     | 숫자 인덱스 | 순서 기반 나열    |
| 객체     | 문자열 키  | 항목 기반 속성 묶음 |

---

### 4. 깊은 복사 vs 얕은 복사

#### 깊은 복사 (Deep Copy)

```js
const obj = { name: '푹곡', age: 32, gender: 'male' }
const objDeepCopy = JSON.parse(JSON.stringify(obj))
objDeepCopy.age = 35
```

* `obj`와 `objDeepCopy`는 **완전히 다른 참조**
* 원본 변경되지 않음

#### 얕은 복사 (Shallow Copy)

```js
const obj = { name: '푹곡', age: 32, gender: 'male' }
const objShallowCopy = obj
objShallowCopy.gender = 'female'
```

* `objShallowCopy`는 `obj`를 참조함 → **원본도 변경됨**

#### 스프레드 복사

```js
const obj = { name: '푹곡', age: 32, gender: 'male' }
const objSpreadCopy = { ...obj }
objSpreadCopy.gender = 'female'
```

* 겉보기에는 깊은 복사 같지만 **중첩 객체나 배열은 여전히 얕은 복사**

```js
const obj = {
  name: '푹곡',
  like: ['lck', 'music']
}

const copy = { ...obj }
copy.like[0] = 'girlFriend'
```

* `obj.like[0]`도 변경됨 → 완전한 깊은 복사를 하려면 내부까지 스프레드 해야 함:

```js
const copy = {
  ...obj,
  like: [...obj.like]
}
```

---

### 5. 객체와 배열을 활용한 예시

#### 객체 (음표)

```js
const 음표 = {
  음: '도',
  박자: '4/4박자',
  쉼표인가: false,
  무엇이_붙는가: ['#', '스타카토']
}
```

#### 배열 (마디)

```js
const 마디 = [자리표, 박자, 음표, 음표, 음표]
```

> 구조적 데이터 구성 → 객체와 배열의 결합으로 모델링 가능

---

### 6. 요약

* **배열(array)**: 순서 있는 나열 구조
* **객체(object)**: 이름(label)을 가진 속성 묶음
* \*\*복사(copy)\*\*는 참조/메모리 개념과 연결됨

> 배열과 객체는 JavaScript 데이터 구조의 핵심이며,
> 메모리 구조와 참조 방식까지 이해하면 안정적이고 예측 가능한 코드 작성이 가능해진다.

---

### 예습 & 숙제 키워드

* 생성자 함수 (constructor)
* readOnly
* instanceOf
* JSON 구조 활용
* diff, deep merge, 데이터 동기화
