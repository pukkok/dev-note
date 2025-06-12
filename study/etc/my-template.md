---
title: 나만의 템플릿 생성 
---

# create-pk-app (CLI 도구 만들기)

## 제작 사유

Next.js, Vite, tailwind 처럼 자주쓰는 template을 사용할 때마다 세팅하는게 싫다. <br/>
터미널에서 실행 가능한 CLI를 제작 해야겠다.

---

## 필수 라이브러리
```bash
yarn add inquirer
```

## 사용한 라이브러리/내장 모듈

| 이름                                 | 설명                                            |
| ---------------------------------- | --------------------------------------------- |
| `inquirer`                         | 템플릿 선택지를 CLI에서 출력하고, 사용자 입력을 받기 위한 외부 라이브러리   |
| `fs`, `fs.cpSync`, `fs.renameSync` | 템플릿 디렉토리 복사 및 `.gitignore` 파일명 변경             |
| `path`, `fileURLToPath`            | ESM 환경에서 `__dirname`을 안전하게 처리하기 위한 Node 내장 모듈 |
| `child_process.execSync`           | yarn 명령어를 터미널에서 자동 실행 (동기 처리)                 |

---

## 전체 흐름 요약

1. 사용자로부터 템플릿 선택 받기 (`inquirer`)
2. 선택한 템플릿 디렉토리를 현재 작업 디렉토리로 복사
3. `.gitignore.template` → `.gitignore` 이름 변경
4. `yarn` 명령어 자동 실행
5. 설치 완료 메시지 출력

---

## 코드 분석 (한 줄씩)

```js
#!/usr/bin/env node
```

* 이 파일을 터미널에서 직접 실행 가능한 CLI 명령어로 사용하기 위한 shebang

```js
import inquirer from 'inquirer'
```

* CLI에서 템플릿 선택지를 보여주기 위해 사용
* `prompt([{ type: 'list', ... }])` 형식으로 사용자 인터랙션 제공

```js
import fs from 'fs'
import { cpSync } from 'fs'
```

* `cpSync()` → 디렉토리 전체를 복사
* `renameSync()` → 파일명을 `.gitignore.template` → `.gitignore`로 변경

```js
import { fileURLToPath } from 'url'
import path from 'path'
```

* ESM에서는 `__dirname`이 없기 때문에,
  현재 파일의 경로를 얻기 위해 `fileURLToPath(import.meta.url)` 사용
* `path.join()`으로 경로 안전하게 조합

```js
import { execSync } from 'child_process'
```

* `execSync('yarn')`을 통해 yarn install 명령을 터미널에서 실행
* `stdio: 'inherit'` 옵션을 주면 설치 로그가 콘솔에 그대로 출력됨

```js
const { template } = await inquirer.prompt([
  {
    type: 'list',
    name: 'template',
    message: '사용할 템플릿을 선택하세요:',
    choices: [
      { name: 'Next + Tailwind', value: 'next-tailwind'},
      { name: 'Next (기본)', value: 'next-basic'},
      { name: 'Vite + Tailwind', value: 'vite-tailwind' },
      { name: 'Vite (기본)', value: 'vite-basic' }
    ]
  }
])
```

* 사용자가 선택한 템플릿 값을 `template` 변수에 저장

```js
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const templateDir = path.join(__dirname, 'templates', template)
const targetDir = process.cwd()
```

* 현재 CLI 파일 기준으로 템플릿 경로를 추적
* 복사 대상 위치는 `현재 실행 디렉토리`

```js
cpSync(templateDir, targetDir, { recursive: true })
```

* 폴더 전체를 재귀적으로 복사
* `recursive: true` 없으면 디렉토리 자체가 복사되지 않음

```js
const ignorePath = path.join(targetDir, 'gitignore.template')
const finalIgnorePath = path.join(targetDir, '.gitignore')

if (fs.existsSync(ignorePath)) {
  fs.renameSync(ignorePath, finalIgnorePath)
}
```

* <span style={{ color : '#e67e22'}}> `.gitignore`는 Git이 템플릿에 포함하지 않으므로</span>
  임시로 `gitignore.template`으로 저장해둔 파일을 `.gitignore`로 변경

```js
execSync('yarn', { stdio: 'inherit' })
```

* 복사한 프로젝트 내에서 `yarn install`을 실행시켜 의존성 자동 설치

```js
console.log('템플릿 적용 및 설치 완료')
```

* 마무리 메시지 출력

---

## 📌 학습 포인트

* ESM에서는 `__dirname` 직접 사용할 수 없음 → `fileURLToPath()` 필수
* CLI 제작 시 사용자 선택 흐름은 `inquirer` 하나로 충분히 가능
* 템플릿을 복사할 때 `.gitignore`는 예외 처리 필요
* 자동 설치(`execSync`)는 편리하지만, async 대신 sync인 이유는 진행 중 상태를 바로 보여주기 위함

---

## 🛠 실행 방법

```bash
npx github:pukkok/create-pk-app
```

> 원하는 템플릿 선택 → 자동 복사 및 의존성 설치까지 완료!

---

### [👉 코드보기](https://github.com/pukkok/create-pk-app)
