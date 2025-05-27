---
title: 상속 구조 이해
---

# 상속 구조 이해: prototype, extends, instanceof

### 0. 시작하기 전

JavaScript는 클래스 기반 언어처럼 보이지만 **원래는 프로토타입 기반** 언어입니다.
객체 간의 상속과 관계는 모두 **prototype 체인**을 통해 이루어지며,
현대 문법에서는 `class`, `extends`, `instanceof`로 이 구조를 간결하게 표현할 수 있게 되었습니다.

---

### 1. `prototype`: 상속의 뼈대

모든 함수는 `prototype` 속성을 갖고 있으며,
이 안에 정의된 속성/메서드는 해당 함수로 생성된 인스턴스들이 공유하게 됩니다.

```js
function Animal() {}
Animal.prototype.sound = function () {
  console.log('동물이 소리를 냅니다')
}

const a = new Animal()
a.sound() // 동물이 소리를 냅니다
```

* `Animal.prototype.sound`는 `a` 인스턴스가 사용할 수 있는 **상속 메서드**
* 이때 `a.__proto__ === Animal.prototype` → true

`__proto__`는 인스턴스가 실제 참조하는 **prototype 객체**를 가리킵니다

```js
console.log(Object.getPrototypeOf(a) === Animal.prototype) // true
```

---

### 2. `extends`: 클래스 기반 상속 문법

ES6 이후, `class`와 `extends`를 사용해 **상속을 더 직관적으로 표현**할 수 있습니다.

```js
class Animal {
  speak() {
    console.log('동물입니다')
  }
}

class Dog extends Animal {
  bark() {
    console.log('멍멍')
  }
}

const d = new Dog()
d.speak() // 동물입니다
d.bark()  // 멍멍
```

* `Dog`는 `Animal`을 **상속**받습니다.
* 내부적으로는 여전히 `prototype` 체인을 구성함

```js
console.log(d.__proto__ === Dog.prototype)           // true
console.log(Object.getPrototypeOf(Dog.prototype) === Animal.prototype) // true
```

즉, 클래스도 결국은 `prototype` 기반으로 동작합니다.

---

### 3. `instanceof`: 객체가 어떤 생성자에서 파생되었는지 확인

```js
function Person() {}
const p = new Person()

console.log(p instanceof Person) // true
console.log(p instanceof Object) // true
```

* `instanceof`는 객체의 **prototype chain 상에 생성자의 prototype이 포함되어 있는지**를 확인

#### 클래스에서도 사용 가능

```js
class Vehicle {}
class Car extends Vehicle {}
const myCar = new Car()

console.log(myCar instanceof Car)     // true
console.log(myCar instanceof Vehicle) // true
```

#### 내장 객체에도 사용 가능

```js
console.log([] instanceof Array)   // true
console.log([] instanceof Object)  // true
```

---

### 4. 시각화 예시: 상속 구조 흐름도

```text
Dog 인스턴스
  ↓ (__proto__)
Dog.prototype
  ↓ (prototype chain)
Animal.prototype
  ↓
Object.prototype
  ↓
null
```

---

### 5. 정리 비교표

| 개념           | 설명                           | 예시                                 |
| ------------ | ---------------------------- | ---------------------------------- |
| `prototype`  | 함수에 존재하는 속성, 인스턴스의 공유 메서드 정의 | `Animal.prototype.sound()`         |
| `__proto__`  | 인스턴스가 참조하는 원형 객체             | `a.__proto__ === Animal.prototype` |
| `extends`    | 클래스 문법에서 상속을 표현              | `class Dog extends Animal`         |
| `instanceof` | 어떤 생성자에서 만들어졌는지 확인           | `a instanceof Animal`              |

---

### 마무리

* `prototype`은 JS 상속의 근간이자 구조의 뼈대입니다.
* `extends`는 클래스를 이용한 문법적 표현일 뿐, 내부는 여전히 프로토타입 체인입니다.
* `instanceof`는 인스턴스의 출처(상속 관계)를 확인하는 중요한 도구입니다.

이 세 가지를 이해하면 **JavaScript 객체 시스템과 클래스 구조를 깊이 있게 파악**할 수 있습니다.
