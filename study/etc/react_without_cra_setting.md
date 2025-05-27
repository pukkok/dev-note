---
title: without CRA 리액트 설치
---

# React 프로젝트 - CRA 없이 직접 설정하기 (etc)

---

### 1. 초기화

```powershell
md react-without-cra
cd react-without-cra
npm init -y // package.json 생성
```

---

### 2. CSS 로더 설치

```powershell
npm install --save-dev style-loader css-loader
```

* `import './style.css'` 방식의 CSS 사용을 위해 필요
* 만약 `<link>` 태그로 외부 CSS를 불러올 예정이라면 생략 가능

---

### 3. 주요 패키지 설치

```bash
npm i react react-dom
npm i -D @babel/core @babel/preset-env @babel/preset-react babel-loader webpack webpack-cli webpack-dev-server html-webpack-plugin
```

**설치 항목 설명**

* `@babel/core`: Babel의 핵심 모듈
* `@babel/preset-env`: 최신 JS 문법을 구형 JS로 변환
* `@babel/preset-react`: JSX 문법을 변환할 수 있게 해주는 Babel 프리셋
* `babel-loader`: Webpack에서 Babel을 연결시켜주는 역할
* `webpack`: 모듈 번들러
* `webpack-cli`: CLI로 Webpack을 제어
* `webpack-dev-server`: 개발 서버 및 HMR 지원
* `html-webpack-plugin`: 자동 HTML 생성

---

### 4. Babel 설정 (.babelrc)

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

* 프로젝트 루트에 `.babelrc` 파일 생성

---

### 5. Webpack 설정 (webpack.config.js)

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    })
  ],
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 3000
  }
}
```

---

### 6. HTML 파일 생성

* 경로: `public/index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

---

### 7. React 진입점 파일 생성

* `src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
```

* `src/App.js`

```jsx
import React from 'react';

const App = () => {
  return (
    <div className="App">
      <h1>create-react-app없는 리액트 완성</h1>
    </div>
  )
}

export default App
```

---

### 8. package.json 스크립트 설정

```json
"scripts": {
  "start": "webpack serve --mode development",
  "build": "webpack --mode production"
}
```

---

### 9. 실행하기

```bash
npm start
```

> ✅ CRA 없이도 원하는 구조로 React 앱을 구축할 수 있다.
> 환경에 대한 이해도를 높이고 커스터마이징이 가능해지는 장점이 있음.
