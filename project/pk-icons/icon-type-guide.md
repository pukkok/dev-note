---
title: 아이콘 타입 및 Props 가이드
---

`pk-icons`는 타입스크립트 기반이 아닌 JavaScript 프로젝트지만, 타입 지원을 위해 `index.d.ts` 파일을 함께 제공하고 있습니다. 이를 통해 TypeScript 환경에서도 **정확한 props 타입 추론**과 **IDE 자동완성**을 활용할 수 있습니다.

---

## 공통 타입 정의

```ts
import { FC, SVGProps, CSSProperties } from 'react'

type CommonIconProps = {
  size?: number
  style?: CSSProperties
  className?: string
} & SVGProps<SVGSVGElement>
```

모든 아이콘은 공통적으로 `CommonIconProps`를 기본으로 받습니다:

| Prop        | 타입              | 설명                      |
| ----------- | --------------- | ----------------------- |
| `size`      | `number`        | 아이콘의 크기(px)             |
| `style`     | `CSSProperties` | 인라인 스타일 지정              |
| `className` | `string`        | Tailwind 또는 사용자 지정 클래스명 |

---

## 추가적인 Props

### ✅ Active 아이콘

```ts
type ActiveIconProps = CommonIconProps & {
  isActive?: boolean
}
```

* `isActive`: 상태에 따라 색상이 바뀌는 아이콘에서 사용 (예: 북마크, 하트)

### 🔁 방향 지원 아이콘

```ts
direction?: 'up' | 'down' | 'left' | 'right'
```

* 회전 가능한 아이콘 (예: `ArrowIcon`, `ChevronIcon`)에 사용
* 일부 아이콘은 `'left' | 'right'`만 지원함 (`DoubleChevronIcon`)

---

## 전체 타입 선언 예시 (`index.d.ts`)

```ts
declare module 'pk-icons' {
  export const ArrowIcon: FC<CommonIconProps & { direction?: 'up' | 'down' | 'left' | 'right' }>
  export const BookmarkIcon: FC<ActiveIconProps>
  export const ChevronIcon: FC<CommonIconProps & { direction?: 'up' | 'down' | 'left' | 'right' }>
  export const DoubleChevronIcon: FC<CommonIconProps & { direction?: 'left' | 'right' }>
  export const HamburgerToggleIcon: FC<ActiveIconProps>
  export const HeartIcon: FC<ActiveIconProps>
  export const MoreVerticalIcon: FC<CommonIconProps>
  export const RedoIcon: FC<CommonIconProps>
  export const SearchIcon: FC<CommonIconProps>
  export const UndoIcon: FC<CommonIconProps>
  // ...
}
```

---

## 사용 예시

```tsx
import { HeartIcon } from 'pk-icons'

<HeartIcon size={28} isActive className="text-red-500" />
```

```tsx
import { ChevronIcon } from 'pk-icons'

<ChevronIcon direction="down" size={20} />
```

---

아이콘마다 어떤 prop을 받는지 혼동이 생길 경우에는 위 타입 선언을 참고하거나, IDE 자동완성을 활용해 확인하면 됩니다.
