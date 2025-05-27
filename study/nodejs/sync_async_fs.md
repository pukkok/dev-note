---
title : sync vs async
---

# 동기와 비동기 방식(fs)

### 0. 시작하기 전

* 차이점 구분하기
* 영어부터 확인하자.

  * 동기 : **sync**hronous
  * 비동기 : **async**hronous
  * 간단하게 생각하면 Sync가 있다면 **동기적**, 없다면 **비동기적**으로 작동한다.
* `readFile`과 `readFileSync`의 차이
* `writeFile`과 `writeFileSync`의 차이

---

### 1. write, readFile (비동기 방식)

```js
const fs = require('fs')
fs.readFile( fileName(filePath), options(content), callback )
// 콜백함수는 파일 전체를 읽은 후 실행될 함수이다.
```

```js
fs.readFile('input.txt', 'utf8', (err, data) => {
  if (err) {
    // 파일을 읽는 중에 오류가 발생하면 `err` 인자로 에러 객체가 전달된다.
    console.error(err);
    return;
  }
  // 파일 읽기에 성공하면 `data` 로 파일의 내용이 전달된다.
  console.log(data);
})
```

---

### 2. write, readFileSync (동기 방식)

```js
const fs = require('fs')
fs.readFileSync(fileName(filePath), option)
// 콜백함수가 존재하지 않는다.
```

```js
const fs = require('fs');

const names = ['김민지', '서민석', '박우재']

function buildNewPage (names, idx) {
  function err (error) {
    console.log(error)
  }

  const fileWork = 'index'+names[idx]
  const fileName = fileWork + '.html'
  const headPart = `<head></head>`
  const bodyPart = `<body>${names[idx]}</body>`
  const htmlFile = `<html>${headPart}${bodyPart}</html>`

  fs.writeFile(fileName, htmlFile, err)
}

for(let i=0; i<names.length; i++){
  buildNewPage(names, i)
}
```

---

### 3. Node.js를 사용한다면 최대한 비동기적인 방법을 사용하자

1. 비동기를 쓰는 이유부터 생각해보자
2. 자바스크립트는 싱글 쓰레드이기 때문에 1번에 1가지 일밖에 처리하지 못한다.
3. 만약의 경우 readFileSync나 writeFileSync를 사용하였을 때 오래 걸리는 작업이라면 다른 작업에 지장을 줄 수 있기 때문이다.
4. 그러므로 비동기로 만들어 놓고 동기적인 행동이 필요하다면 핸들링 해서 사용하자.

   * 그리고 비동기 처리를 해보면 알겠지만, 보통 에러 처리를 기본으로 사용한다.
