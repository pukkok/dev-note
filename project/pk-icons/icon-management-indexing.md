---
title: 아이콘 관리 및 자동 인덱싱
---

`pk-icons`는 아이콘을 `src/icons/` 폴더에 모듈 단위로 구성하고, `index.js`를 자동으로 생성하여 <br/>
<span style={{ color: '#e67e22' }}><strong>트리쉐이킹(Tree-shaking)이 가능한 구조</strong></span>를 유지합니다.

이는 프로젝트의 번들 크기를 줄이고, 사용되지 않는 아이콘이 최종 결과물에 포함되지 않도록 하기 위한 설계입니다.

---

## 자동 인덱싱 스크립트

아이콘을 새로 추가하거나 삭제할 때마다 `src/index.js`를 갱신해주는 자동 스크립트를 제공합니다.

### 📄 `scripts/generate-icon-index.js`

```js
const fs = require('fs')
const path = require('path')

const iconDir = path.join(__dirname, '../src/icons')
const files = fs.readdirSync(iconDir).filter(f => f.endsWith('.jsx'))

const content = files.map(f => {
  const name = path.basename(f, '.jsx')
  return `export { default as ${name} } from './icons/${name}'`
}).join('\n')

fs.writeFileSync(path.join(__dirname, '../src/index.js'), content)
```

### package.json 등록

```json
{
  "scripts": {
    // 다른 스크립트 생략
    "indexing": "node scripts/generate-icon-index.js"
  }
}
```

---

## 결과물 예시

스크립트 실행 시 생성되는 `src/index.js`는 다음과 같은 형태입니다:

```js
export { UndoIcon } from './icons/UndoIcon'
export { RedoIcon } from './icons/RedoIcon'
export { DownloadIcon } from './icons/DownloadIcon'
// ... 생략
```

> 아이콘을 수동으로 export 하지 않고도, 트리쉐이킹 가능한 구조를 자동으로 유지할 수 있습니다.

---

## 아이콘 추가 방법

1. `src/icons/` 폴더에 `MyNewIcon.jsx` 추가
2. `yarn indexing` 또는 `npm run indexing` 실행
3. 이제 `import { MyNewIcon } from 'pk-icons'`처럼 바로 사용할 수 있음

---

이 구조를 통해 유지보수와 확장성을 모두 고려한 아이콘 관리가 가능해집니다.
