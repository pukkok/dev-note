---
title: 함수 이해 (기초)
---

# 함수 이해하기

### 0. 시작하기 전

함수는 어렵게 생각하지 않아도 됩니다.
함수란:

* **입력**을 받고
* 그 안에서 **처리**한 후
* 원하는 **출력**을 반환하는 것

비유하자면, 전자렌지처럼 **값을 넣고**, **돌리고**, **완성된 결과를 꺼내는 과정**입니다.

---

### 1. 엘리베이터로 함수 개념 이해하기

> 상황 설정: B1층부터 10층까지 있는 건물에 2개의 엘리베이터(A, B), 2개의 계단(C, D)이 있습니다.

* A 엘리베이터: 홀수 층만 운행
* B 엘리베이터: 짝수 층만 운행
* 계단은 아무 층이나 이용 가능

이 시스템을 JavaScript 함수로 생각해보면:

```js
const totalFloors = 11;

function checkOddOrEven(floor) {
  if (floor % 2 === 0) {
    return 'even';
  } else {
    return 'odd';
  }
}

function moveElevator(floor) {
  console.log(`${floor}층으로 이동합니다.`);
}

function elevator(name, floorType) {
  console.log(`${name} 엘리베이터 작동 시작`);
  for (let i = 1; i <= totalFloors; i++) {
    if (checkOddOrEven(i) === floorType) {
      moveElevator(i);
    }
  }
}

// A는 홀수층만, B는 짝수층만 운행
elevator('A', 'odd');
elevator('B', 'even');
```

📌 함수가 하는 일:

* **입력**: A or B, 층 유형
* **처리**: 반복문 + 조건 확인
* **출력**: 콘솔에 동작 결과 출력

---

### 2. 핸드폰 기능을 함수로 바꿔보기

핸드폰의 다양한 기능들도 모두 함수로 구성할 수 있습니다.
각 기능은 입력을 받아 동작하고, 어떤 결과를 반환하거나 수행합니다.

예:

```js
function makeCall(number) {
  console.log(`${number}로 전화를 겁니다.`);
}

function sendMessage(to, text) {
  console.log(`${to}에게 '${text}' 메시지를 보냅니다.`);
}

function useApp(appName) {
  console.log(`${appName} 앱을 실행합니다.`);
}

makeCall('010-1234-5678');
sendMessage('친구', '오늘 뭐해?');
useApp('YouTube');
```

더 복잡한 기능도 구성 가능합니다:

```js
function payWithNFC(amount) {
  console.log(`₩${amount}을 NFC로 결제했습니다.`);
}

function connectBluetooth(device) {
  console.log(`${device}에 블루투스를 연결했습니다.`);
}

payWithNFC(5000);
connectBluetooth('무선 이어폰');
```

---

### 3. 핵심 개념 요약

| 개념             | 설명                                    |
| -------------- | ------------------------------------- |
| **함수 정의**      | `function 함수이름(매개변수) { 실행내용 }`        |
| **호출(Call)**   | 정의한 함수를 사용하는 것 → `함수이름()`             |
| **매개변수**       | 함수에 전달하는 입력값 → `function greet(name)` |
| **반환(Return)** | 함수 실행 후 결과값을 반환 → `return 결과값;`       |

---

### 4. 결론

* 함수는 현실 세계의 **동작 단위**를 코드로 추상화한 것
* 좋은 함수는 **하나의 역할만** 수행하며, **재사용 가능**해야 한다
* 처음엔 개념보다 \*\*직관적인 비유(엘리베이터, 핸드폰)\*\*로 접근하면 훨씬 쉽다

---

이후 학습 방향:

* 함수 표현식 vs 선언식
* 매개변수 기본값
* 화살표 함수
* 콜백 함수
* 고차 함수(map, filter 등)

이 모든 것은 바로 이 기본 구조에서 시작합니다.
