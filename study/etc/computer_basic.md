---
title: 컴퓨터 구조 기초
---

# 컴퓨터 구조 기초 이해

개발자가 알아야 할 컴퓨터의 기본 구조와 개념을 간단히 정리합니다.
코드가 실행될 때 내부적으로 어떤 흐름이 일어나는지를 감각적으로 이해하는 데 도움이 됩니다.

---

### 1. 주요 구성 요소

| 구성 요소             | 설명                                            |
| ----------------- | --------------------------------------------- |
| **CPU** (중앙처리장치)  | 프로그램 명령어를 해석하고 실행하는 핵심 처리 장치. 모든 연산의 중심.      |
| **GPU** (그래픽처리장치) | 주로 그래픽, 영상 처리 담당. 머신러닝 계산 등에도 사용됨.            |
| **RAM** (메모리)     | 실행 중인 프로그램의 데이터를 임시로 저장. 빠르지만 휘발성(전원 끄면 사라짐). |
| **HDD / SSD**     | 영구 저장 장치. 데이터, 코드, 파일 등을 저장함.                 |
| **PSU** (파워서플라이)  | 전원 공급 장치. 모든 컴퓨터 부품에 전기를 전달함.                 |

---

### 2. 실행과 적재 (load)

* **프로그램이 실행되면** HDD/SSD에 저장된 파일이 RAM으로 **load(적재)** 됩니다.
* 이후 **CPU가 RAM에 적재된 명령어를 읽고 실행**합니다.
* 이 전체 과정은 **함수 실행 흐름**과도 연결됩니다:

```js
function run() {
  console.log("코드 실행");
}

run();
```

> 위 코드를 실행하면, JS 인터프리터가 코드를 읽고 메모리에 적재한 뒤, CPU가 명령을 수행합니다.

---

### 3. 왜 RAM이 필요한가?

* HDD에서 직접 실행하면 너무 느림 (속도 차이: RAM > SSD > HDD)
* RAM은 일종의 **작업 공간 (작업대)** 역할을 함
* 코드를 실행하거나 데이터를 연산할 때는 반드시 RAM에 올려야 빠르게 처리 가능

---

### 4. 기억할 개념 정리

* 컴퓨터는 전기를 기반으로 동작한다.
* 모든 명령어는 0과 1로 구성된 이진수(binary) 신호
* 실행 = 적재(load) + 처리(execute)
* RAM은 휘발성, HDD는 비휘발성

---

### 마무리

프로그래밍을 할 때, 내부적으로 컴퓨터가 어떻게 동작하는지를 감각적으로 이해하면 디버깅이나 성능 최적화에 매우 유리합니다.

이 문서는 JavaScript 함수 실행과 연결되는 개념 흐름의 기반이 되는 컴퓨터 구조를 간략히 정리한 문서입니다.
