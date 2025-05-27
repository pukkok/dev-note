---
title: 객체 이해하기
---

# 객체 개념과 메서드 구조화 연습

### 0. 시작하기 전

* 객체는 **추상화의 도구**이다.
* 복잡한 데이터를 **의미 단위로 묶어** 표현하고 다룬다.

---

### 1. 변수의 선언과 할당

```js
const person = {
  name: '서민석',
  age: 32,
} // 정적 할당

const personTwo = {}
personTwo.name = '배성빈'
personTwo.age = 36 // 동적 할당
```

| 구분  | 설명                      |
| --- | ----------------------- |
| 선언  | 변수 공간만 만들기 (`let x`)    |
| 할당  | 값을 변수에 넣기 (`x = 5`)     |
| 초기화 | 선언 + 할당 (`const x = 5`) |

* `const`는 선언과 동시에 반드시 할당 필요
* `let`, `var`는 선언만 하고 나중에 할당 가능
* 자바스크립트에서 변수 선언은 **메모리 공간 확보를 의미**함

---

### 2. 메서드란 무엇인가

* 객체 안에 포함된 함수 = **메서드(method)**
* 메서드는 **행동**, 즉 객체가 할 수 있는 기능을 정의한다

```js
const minStone = {}

minStone.smile = function () {
  console.log(' () ()')
  console.log('( ^.^ )')
  console.log('( > < )')
  console.log('  u u ')
}

minStone.smile()
```

* `console.dir(minStone)` 결과:

```js
{ smile: [Function (anonymous)] }
```

* `anonymous`는 익명 함수라는 뜻
* 메서드는 **건물 짓기와 비슷**: 구조를 설계하고, 필요할 때 추가/확장 가능

---

### 객체는 어디에나 있다

* HTML은 DOM 객체다: `<div>` = `document.createElement('div')`
* CSS도 객체다: 속성(key)-값(value) 구조
* 자바스크립트 세계에서 **객체는 중심 개념**이다

[MDN 공식 문서 참고](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object)

---

### 2-1. 연습: 학교 객체 구성

```js
const samhundred = {
  schoolName: '그린컴퓨터'
}

samhundred.schoolStudents = ['민석', '민지', '유진', '호영']
samhundred.firstStudent = function () {
  console.log(samhundred.schoolStudents[0])
}

samhundred.firstStudent() // 민석
```

#### 생성자 함수로 전환해보기

```js
function SamHundred(schoolName) {
  this.schoolName = schoolName
  this.schoolStudents = []
  this.firstStudent = function () {
    console.log(this.schoolStudents[0])
  }
}
```

---

### 2-2. 예시: 손 객체 구조화

```js
const 손가락구성요소 = ['마디', '손톱', '뼈']

const 손 = {
  is사람: true,
  피: ['Fe', 'Hb', 'H2O'],
  구성요소: {
    손바닥: ['주름', '뼈'],
    손가락: [
      { '엄지': 손가락구성요소 },
      { '검지': 손가락구성요소 },
      { '중지': 손가락구성요소 },
      { '약지': 손가락구성요소 },
      { '소지': 손가락구성요소 }
    ],
    is육손: false
  }
}
```

> 코드 문법은 정답이 없지만, **객체 설계는 감각과 추상화의 훈련**이다.

---

### 마무리

* 객체는 단순한 데이터 구조를 넘어, **현실 세계를 코드로 표현하는 핵심 개념**
* key-value 기반의 구조 + 동적 확장성 덕분에 모든 현대 프레임워크가 객체를 중심으로 설계됨
* 메서드, 생성자 함수, 중첩 구조 등 다양한 패턴을 이해하고 익숙해질수록
  **구조적 사고력**도 함께 성장한다

💡 *예습 숙제: 생성자 함수 패턴을 기반으로 유틸 객체/라이브러리 만들기*
