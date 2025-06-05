---
title: HTML 템플릿 동적 생성
---

이 실습에서는 Node.js의 `fs` 모듈을 사용하여 HTML 파일을 코드로 동적으로 생성해보았다.
정적인 `index.html`을 수동으로 만들지 않고, JS 코드 내에서 직접 작성해 저장하는 흐름을 학습했다.

## 🎯 목표

* `fs.writeFile`을 통해 HTML 파일을 동적으로 생성
* HTML 내부에 script, link 등의 요소 삽입 포함
* 브라우저 실행 시 해당 HTML 파일을 로드

---

## 🧱 HTML 생성 코드 (`server.js` 일부)

```js
const fs = require('fs')

const Template = (title = 'document') => {
  let result = ""

  const addStyle = `<link rel="stylesheet" href="./public/style.css">`
  const addScript = `<script type="module" src="./public/app.js"></script>`

  const DOCTYPE = `<!DOCTYPE html>`
  const space = "  "
  const html = (children) => {
    return '<html lang="ko">' + "\n" + children + "\n" + "</html>"
  }

  const head =
    "<head>" + "\n" +
    space + '<meta charset="UTF-8">' + "\n" +
    space + '<meta name="viewport" content="width=device-width, initial-scale=1.0">' + "\n" +
    space + `<title>${title}</title>` + "\n" +
    space + addStyle + "\n" +
    "</head>"

  const body =
    "<body>" + "\n" +
    space + `<div id="root">html 실행 확인</div>` + "\n" +
    space + addScript + "\n" +
    "</body>"

  result = DOCTYPE + "\n" + html(head + body)
  return result
}

const html = Template('Wait React')

fs.writeFile('public/index.html', html, 'utf-8', (err) => {
  if (err) return console.log(err)
})
```

---

## 📝 생성 결과 예시 (`public/index.html`)

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wait React</title>
  <link rel="stylesheet" href="./public/style.css">
</head>
<body>
  <div id="root">html 실행 확인</div>
  <script type="module" src="./public/app.js"></script>
</body>
</html>
```

---

## 💬 느낀 점

* HTML을 코드로 조립해서 생성하는 과정은 렌더링 서버나 템플릿 엔진의 원리를 이해하는 데 도움이 되었다.
* 텍스트를 조합해서 만드는 구조지만, DOM 생성과 다른 시점에서 작동한다는 점을 분명히 체감할 수 있었다.
