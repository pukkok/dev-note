---
title: 파일 생성 로직
---

# 파일 생성 로직 이해하기

### 0. 시작하기 전

* 지식: 파일 시스템이라는 개념이 있음을 알아야 함
* 훈련: 실제로 코드를 작성하여 파일을 생성해 보기
* 연구: 어떤 방식으로, 어디까지 활용 가능한지를 고민

> 반복적으로 파일을 생성하거나 텍스트를 다루는 일은 프로그래밍의 매우 핵심적인 부분입니다.

---

### 1. JavaScript(Node.js)로 파일 생성하기

Node.js에서는 `fs` 모듈을 사용하여 파일 시스템에 접근할 수 있습니다.

```js
const fs = require('fs')

function err (error) {
  console.log(error)
}

const names = ['김민지', '서민석', '박우재']

const fileWork = 'index' + 1
const fileName = fileWork + '.html'
const headPart = `<head></head>`
const bodyPart = `<body>민석</body>`
const htmlFile = `<html>${headPart}${bodyPart}</html>`

fs.writeFile(fileName, htmlFile, err)
```

* `fs.writeFile`은 파일을 생성하거나 덮어쓰기
* 에러 콜백을 통해 오류 처리를 할 수 있음

📌 반복문을 활용하면 여러 파일을 자동으로 생성 가능

---

### 2. Python으로 동일한 작업 구현하기

파이썬의 `open()` 함수는 파일을 생성하고 쓰는 데 자주 사용됩니다.

```python
names = ["Minseok", "Minji", "Woojae"]

def build_new_page(names, idx):
    fileWork = 'index' + names[idx]
    fileName = fileWork + '.html'
    headPart = '<head></head>'
    bodyPart = '<body>' + names[idx] + '</body>'
    htmlFile = '<html lang="ko">' + headPart + bodyPart + '</html>'
    with open(fileName, 'w') as f:
        f.write(htmlFile)

for idx in range(len(names)):
    build_new_page(names, idx)
```

* `with open(..., 'w')`는 파일을 쓰기 모드로 열고, 자동으로 닫아주는 안전한 방법
* 반복문으로 이름별 HTML 페이지 생성

---

### 3. 요약 비교

| 항목       | Node.js (`fs`)             | Python (`open`)        |
| -------- | -------------------------- | ---------------------- |
| 기본 모듈    | `fs`                       | 내장 `open()`            |
| 파일 열기 방법 | `fs.writeFile(path, data)` | `open(path, 'w')`      |
| 에러 처리    | 콜백 함수 사용                   | `try-except` 또는 `with` |
| 반복 처리 방식 | JS 반복문                     | Python 반복문             |

---

### 실무 응용 예시

* HTML 템플릿 다량 생성 (이메일 템플릿, 미니페이지)
* Markdown, JSON, CSV 파일 자동화
* 데이터를 기반으로 동적 웹파일 생성 (정적 사이트 빌더 역할)

---

### 마무리

Node.js와 Python 모두 파일을 생성하는 기본 문법은 간단하지만, 반복 + 조립의 사고방식을 통해 자동화된 문서 생성 작업이 가능합니다.

파일 시스템에 대한 감각을 익히는 것이 **프로그래밍 자동화의 첫걸음**입니다.
