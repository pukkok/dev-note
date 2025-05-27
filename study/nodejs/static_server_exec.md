---
title: live server 이해
---

# Node.js로 간단한 Static Server 만들기 (exec 포함)

이 문서는 라이브 서버 없이 Node.js로 HTML 파일을 직접 생성하고 서버로 실행하며 브라우저를 자동으로 여는 과정을 정리한 실습 기반 문서입니다.

---

### 1. 목표 정리

* HTML 문서를 동적으로 생성한다.
* Node.js의 `http` 모듈로 서버를 구성한다.
* 요청(request)에 따라 응답(response)을 처리한다.
* Express 없이 구성하며, `child_process.exec`으로 서버 실행 시 브라우저를 자동으로 연다.

---

### 2. 템플릿 생성 함수 (`Template`)

```js
const Template = (title = 'document') => {
  const addStyle = `<link rel="stylesheet" href="./public/style.css">`
  const addScript = `<script type="module" src="./public/app.js"></script>`

  const head = `
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    ${addStyle}
  </head>`

  const body = `
  <body>
    <div id="root">html 실행 확인</div>
    ${addScript}
  </body>`

  return `<!DOCTYPE html>
<html lang="ko">
${head}
${body}
</html>`
}
```

* title을 받아 동적으로 HTML 문서를 생성함
* id="root" 영역에 React-like 렌더링 예정 콘텐츠를 구성함

---

### 3. HTML 파일 쓰기

```js
fs.writeFile('public/index.html', Template('Wait React'), 'utf-8', (err) => {
  if (err) console.log(err)
})
```

---

### 4. HTTP 서버 생성 및 파일 응답 함수

```js
const fileReader = (res, url) => {
  if (url === '/') {
    fs.readFile('./public/index.html', (err, data) => {
      if (err) return console.error('index.html 불러오기 실패')
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(data)
    })
    return
  }

  const ext = url.split('.')[1]
  const contentType = extractContentType(ext)
  const filePath = '.' + url

  fs.readFile(filePath, (err, data) => {
    if (err) return console.error('파일 읽기 실패')
    res.writeHead(200, { 'Content-Type': contentType })
    res.end(data)
  })
}

const extractContentType = (ext) => {
  switch (ext) {
    case 'html': return 'text/html'
    case 'css': return 'text/css'
    case 'js': return 'application/javascript'
    case 'json': return 'application/json'
  }
}
```

---

### 5. 서버 구동 및 브라우저 자동 열기

```js
const server = http.createServer((req, res) => {
  fileReader(res, req.url)
})

server.listen(5000, () => {
  console.log('서버동작 시작')
  exec('start http://localhost:5000', (err) => {
    if (err) console.log('브라우저 열기 실패:', err)
  })
})
```

* 서버 실행 후 자동으로 브라우저가 열리도록 설정 (Windows 환경: `start` 사용)

---

### 6. 관련 정적 파일 구조 (예시)

#### ✅ `public/index.html`

HTML 템플릿 결과로 생성됨. `<div id="root">html 실행 확인</div>` 포함

#### ✅ `public/app.js`

`user.json`에서 데이터를 불러와 카드 UI로 구성하는 코드

#### ✅ `public/style.css`

배경색, 카드 스타일 등 시각 구성 담당

#### ✅ `public/user.json`

학생 데이터 배열이 들어있는 JSON 파일로, JS에서 import함

---

### 7. 핵심 개념 요약

* 라이브 서버 없이 HTML → Node.js → 브라우저의 흐름을 명확히 이해할 수 있음
* 정적 파일 요청을 직접 처리하며 Content-Type을 수동으로 매핑함
* `import`는 **모듈/서버 환경**에서만 동작하기 때문에 파일 시스템이 아닌 HTTP를 통해 요청해야 정상 작동함

---

> 📌 이 과정을 통해 실제 브라우저와의 통신 흐름, 서버 역할, 정적 자원의 요청-응답 방식을 체감할 수 있다.
> 단순한 라이브 서버 의존에서 벗어나 백엔드의 기본 구조를 직접 체험하는 데 목적이 있다.
