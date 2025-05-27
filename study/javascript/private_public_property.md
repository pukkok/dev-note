---
title: public vs private
---

# 객체 속성의 접근 제한: public vs private

### 0. 시작하기 전

JavaScript는 원래 **접근 제한자(private, public)** 개념이 없는 언어였지만,
현대 JS에서는 다양한 방식으로 \*\*속성의 은닉(캡슐화)\*\*을 구현할 수 있게 되었습니다.

> 클래스를 설계할 때, 외부에서 접근 가능한 것과 그렇지 않은 것을 구분하는 것이 중요합니다.

---

### 1. Public 속성

```js
class User {
  constructor(name) {
    this.name = name // public 속성
  }
}

const u = new User('민석')
console.log(u.name) // '민석'
```

* `this.name`은 public → 외부에서 읽고 쓸 수 있음

---

### 2. 관례적 private 속성: `_` 접두어

```js
class User {
  constructor(name) {
    this._name = name // 관례적 private
  }
}

const u = new User('민지')
console.log(u._name) // 가능은 하지만, 사용 자제 요청 의미
```

* `_name`은 자바스크립트 문법적으로는 private가 아니지만
* \*\*“외부에서 직접 접근하지 마세요”\*\*라는 관례적 표현
* TypeScript나 ESLint 등에서 `_`로 시작하면 접근 제한 경고를 줄 수 있음

---

### 3. 진짜 private 속성: `#` (ES2022+)

```js
class Person {
  #ssn // private 속성

  constructor(name, ssn) {
    this.name = name
    this.#ssn = ssn
  }

  getMaskedSSN() {
    return `***-**-${this.#ssn.slice(-4)}`
  }
}

const p = new Person('서민석', '123456789')
console.log(p.name) // '서민석'
console.log(p.getMaskedSSN()) // '***-**-6789'
console.log(p.#ssn) // ❌ SyntaxError: Private field '#ssn' must be declared
```

* `#ssn`은 완전히 **외부에서 접근 불가능한 진짜 private field**
* 클래스 내부에서만 읽기/쓰기 가능
* ES2022 이상에서 정식 지원됨 (최신 브라우저와 Node.js 필요)

---

### 4. Getter/Setter와 private 활용

```js
class BankAccount {
  #balance = 0

  deposit(amount) {
    if (amount > 0) this.#balance += amount
  }

  get balance() {
    return this.#balance
  }
}

const acc = new BankAccount()
acc.deposit(5000)
console.log(acc.balance) // 5000
```

* `get balance()`는 읽기 전용 게터
* `#balance`는 외부에서 직접 접근이 불가능함
* **클래스 외부에서는 인터페이스만 제공하고 내부 구조는 숨김 → 캡슐화**

---

### 5. 요약 정리

| 방식      | 접근 가능      | 의미/용도                  |
| ------- | ---------- | ---------------------- |
| public  | O          | 누구나 접근 가능 (기본)         |
| `_prop` | O (관례적 제한) | 외부 접근은 가능하지만 자제 요청     |
| `#prop` | ❌          | 진짜 private (ES2022 이후) |

---

### 마무리

* JavaScript에서도 **객체 속성의 은닉/보호**가 점점 중요해지고 있습니다
* 캡슐화는 복잡한 프로그램에서 **실수 방지, 유지보수성 향상, 의도 전달**을 위해 필수입니다
* 최신 문법 (`#`, `get`, `set`)에 익숙해질수록 **더 강한 구조화**가 가능해집니다
