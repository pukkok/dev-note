---
title: TypeScript 세팅
---

# React + TypeScript 프로젝트 직접 구성하기 (2025 기준 최신)

---

### 1. 초기화

```bash
md react-ts-app
cd react-ts-app
npm init -y
```

---

### 2. React 및 React-DOM 설치

```bash
npm install react react-dom
```

---

### 3. CSS 로더 설치 (선택적)

```bash
npm install --save-dev style-loader css-loader
```

* `import './style.css'` 방식으로 CSS 파일을 JS에 포함시키고자 할 때 사용
* `<link>` 태그만 사용할 경우 생략 가능

---

### 4. TypeScript 및 타입 선언 설치

```bash
npm install --save-dev typescript @types/react @types/react-dom
```

---

### 5. Webpack + Babel 설치

```bash
npm install --save-dev webpack webpack-cli webpack-dev-server
npm install --save-dev babel-loader @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript
```

---

### 6. HTML Webpack 플러그인 설치

```bash
npm install --save-dev html-webpack-plugin
```

---

### 7. TypeScript 설정 (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "es6",
    "moduleResolution": "node",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

---

### 8. Babel 설정 (`.babelrc`)

```json
{
  "presets": [
    "@babel/preset-env",
    ["@babel/preset-react", { "runtime": "automatic" }],
    "@babel/preset-typescript"
  ]
}
```

---

### 9. Webpack 설정 (`webpack.config.js`)

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    })
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000
  },
  mode: 'development'
}
```

---

### 10-1. HTML 템플릿 (`public/index.html`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>React TypeScript App</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

---

### 10-2. React 엔트리 파일 (`src/index.tsx`)

```tsx
import ReactDOM from 'react-dom/client'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<App />)
```

---

### 10-3. App 컴포넌트 (`src/App.tsx`)

```tsx
const App: React.FC = () => {
  return (
    <div className="App">
      <h1>React TypeScript App Setup Complete</h1>
    </div>
  )
}

export default App
```

---

### 11. package.json 스크립트 추가

```json
"scripts": {
  "start": "webpack serve --open",
  "build": "webpack"
}
```

---

### 실행 방법

```bash
npm start
```

> ✅ 최신 Webpack, Babel, TypeScript 설정을 기반으로 CRA 없이 React + TS 프로젝트를 구성할 수 있음.
