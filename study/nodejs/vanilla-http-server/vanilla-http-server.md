---
title: 바닐라 HTTP 서버
---

Node.js의 `http` 모듈과 `fs` 모듈을 사용하여 라이브 서버 없이 정적인 HTML/CSS/JS 파일을 직접 서빙하는 실습을 진행했다.
이 작업은 브라우저 플러그인 없이도 웹 페이지를 띄우기 위한 환경 구성에 초점을 맞췄다.

## 🎯 목표

* Express 없이 Node.js 기본 모듈만으로 HTTP 서버 구성
* HTML, CSS, JS 파일을 Content-Type에 맞게 직접 서빙
* 서버 실행 시 브라우저 자동 열기 (Windows 환경 기준)

---

## 🧱 전체 코드 (`server.js`)

```js
const fs = require('fs')
const http = require('http')
const { exec } = require('child_process')

const fileReader = (res, url) => {
  if (url === '/') {
    fs.readFile('./public/index.html', (err, readFile) => {
      if (err) return console.error('index.html 불러오기 실패')
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(readFile)
    })
    return
  }

  const extender = url.split('.')[1]
  const fileContentType = extractContentType(extender)
  const path = '.' + url

  fs.readFile(path, (err, readFile) => {
    if (err) return console.error('파일 읽기 실패 :', path)
    res.writeHead(200, { 'Content-Type': fileContentType })
    res.end(readFile)
  })
}

function extractContentType(extender) {
  switch (extender) {
    case 'html': return 'text/html'
    case 'css': return 'text/css'
    case 'json': return 'application/json'
    case 'js': return 'application/javascript'
  }
}

const server = http.createServer((req, res) => {
  fileReader(res, req.url)
})

server.listen(5000, () => {
  console.log('서버동작 시작')

  // 브라우저 자동 열기 (Windows 기준)
  exec('start http://localhost:5000', (err) => {
    if (err) {
      console.log('브라우저 열기 실패:', err)
    }
  })
})
```

---

## 📌 실행 방법

```bash
node server.js
```

실행하면 `localhost:5000`에서 브라우저가 자동으로 열리며, `/public/index.html`이 로딩된다.

---

## 💬 느낀 점

* 라이브 서버 없이 직접 브라우저에 띄우는 과정을 통해 정적 파일 처리 흐름을 이해할 수 있었다.
* Content-Type 설정의 중요성을 실감했고, 브라우저 자동 실행도 작은 터치지만 편리함을 더해줬다.
