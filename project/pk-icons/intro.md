---
title: 시작하기
---

### 👉 [바로가기](https://pukkok.github.io/pk-icons)

`pk-icons`는 **React 기반 커스텀 SVG 아이콘 라이브러리**로, 프로젝트에서 일관된 스타일의 아이콘을 재사용하기 위해 개발했습니다.

* **개인 프로젝트 최적화**
* **크기(size), 스타일(className), 동작 상태(isActive, direction 등) 지원**
* **가벼운 구조 & 타입 지원(index.d.ts 포함)**

> npm 배포를 없이 사용하려 했으나, (`yarn add github:pukkok/pk-icons`) <br /> 
> 사용시 Next.js에서 jsx파일을 읽지 못하는 오류로 기본 config 설정없이 사용할 수 없어 npm 배포후 사용중입니다. <br/>
> 이 라이브러리는 개인 목적이지만, 구조적으로 범용화되어 있어 다른 프로젝트에서도 사용 가능하도록 구성되어 있습니다.

---

## 설치

```bash
yarn add pk-icons
# 또는
npm install pk-icons
```

## 사용 예시

```jsx
import { UndoIcon } from 'pk-icons'

const Example = () => {
  return <UndoIcon size={24} className="text-gray-800" />
}
```

`isActive`, `direction` 등의 추가 prop은 각 아이콘의 유형에 따라 선택적으로 사용할 수 있습니다.

---

## 아이콘 분류

현재 아이콘은 다음과 같이 3가지 분류로 나뉩니다:

* **Active 아이콘**: `isActive` 여부에 따라 채워짐 여부가 바뀌는 아이콘
* **Directional 아이콘**: 방향(direction) prop을 받아 회전하거나 방향을 바꿀 수 있는 아이콘
* **Basic 아이콘**: 상태/방향 없이 정적인 기본 아이콘들

각 분류에 따라 지원하는 prop이 조금씩 다르며, 데모 페이지에서 확인할 수 있습니다.

---

## 호환성

* React 17 이상 권장
* 모든 주요 브라우저의 SVG 지원 기반 (Chrome, Firefox, Safari, Edge 등)
* ESM 환경에서 사용 권장
