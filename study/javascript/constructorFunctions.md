---
title: 생성자 함수
---

# 생성자 함수 (Constructor Functions) 기초 정리

### 0. 시작하기 전

* 객체를 반복적으로 만들어야 할 때, 생성자 함수가 유용합니다.
* 클래스가 도입되기 전까지는 생성자 함수가 객체 생성의 대표 방식이었습니다.
* `new` 키워드와 함께 사용하며, **템플릿처럼 객체를 찍어내는 도구**입니다.

---

### 1. 기본 구조

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.introduce = function () {
    console.log(`안녕하세요, 제 이름은 ${this.name}이고 나이는 ${this.age}입니다.`)
  }
}

const p1 = new Person('민석', 32)
const p2 = new Person('민지', 28)

p1.introduce() // 안녕하세요, 제 이름은 민석이고 나이는 32입니다.
```

* `this`는 생성될 인스턴스를 가리킴
* `new`를 붙여야 실제 인스턴스가 생성됨
* `introduce()`는 각 인스턴스의 메서드로 동작

---

### 2. 생성자 함수 vs 일반 함수

| 구분        | 생성자 함수         | 일반 함수                                |
| --------- | -------------- | ------------------------------------ |
| 호출 방식     | `new Person()` | `person()`                           |
| 목적        | 객체 인스턴스 생성     | 작업 실행 or 값 반환                        |
| 내부에서 this | 새로 만들어질 객체     | 전역(window) 또는 undefined(strict mode) |

* 생성자 함수는 \*\*PascalCase(대문자 시작)\*\*로 이름을 짓는 것이 관례입니다: `Person`, `Car`, `User` 등

---

### 3. 동적 객체 생성의 장점

```js
function Dog(name, breed) {
  this.name = name
  this.breed = breed
  this.bark = function () {
    console.log(`${this.name}가 멍멍 짖습니다!`)
  }
}

const dog1 = new Dog('초코', '푸들')
dog1.bark()
```

* 구조화된 객체를 필요할 때마다 손쉽게 생성 가능
* 반복되는 속성과 메서드를 **공통 템플릿으로 묶어 표현**할 수 있음

---

### 4. 생성자 함수의 단점과 개선 방향

#### 문제

* 메서드도 `this`로 선언하면 **모든 인스턴스가 메서드를 중복 보유** → 비효율적

```js
const user1 = new Person('철수', 30)
const user2 = new Person('영희', 25)
user1.introduce === user2.introduce // false (다른 함수 참조)
```

#### ✅ 해결: `prototype` 사용

```js
function User(name) {
  this.name = name
}

User.prototype.sayHello = function () {
  console.log(`Hi, I'm ${this.name}`)
}

const u1 = new User('민석')
const u2 = new User('민지')
u1.sayHello()
u2.sayHello()
```

* 프로토타입에 선언된 메서드는 모든 인스턴스가 **공유**함 (메모리 효율 ↑)
* `u1.sayHello === u2.sayHello` → `true`

---

### 5. 클래스 문법 비교 (ES6+)

```js
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  introduce() {
    console.log(`${this.name}입니다. ${this.age}살이에요.`)
  }
}

const p = new Person('유진', 22)
p.introduce()
```

* 클래스는 생성자 함수보다 문법이 더 깔끔하고 명확
* 내부적으로는 여전히 프로토타입 기반으로 동작함

---

### 마무리 정리

* 생성자 함수는 **객체를 반복 생성하는 템플릿**
* `this`와 `new`를 기반으로 동작
* 메서드 효율을 위해 `prototype` 사용 권장
* 현대에는 `class` 문법으로 더 직관적이고 깔끔하게 작성 가능

💡 하지만 생성자 함수는 여전히 **JavaScript 동작 원리를 이해하는 핵심 포인트** 중 하나입니다.
