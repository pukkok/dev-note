---
title: Parallax
---

# 패럴랙스 구현
세로 스크롤 시 배경과 다수의 이미지들이 서로 다른 속도로 움직이며 깊이감 있는 패럴랙스 효과

## 주요 기능
* 배경 이미지 : 화면에 고정(`sticky`)되어 전체 섹션 배경 역할 수행
* 여러 이미지(imgCoords 데이터 기반) : 
  * 각각 X, Y 방향으로 서로 다른 속도로 움직이며 입체감 연출
  * 스크롤 위치(`offsetY`)에 따라 각 이미지 위치를 동적으로 `transform: translateX/Y`로 변경
* 하단 텍스트 "FINISH"를 믹스블렌드 모드로 오버레이

## 핵심 코드 요약
```js
const handleScroll = () => setOffsetY(window.scrollY - sectionRef.current.offsetTop)

window.addEventListener('scroll', handleScroll)
```
* 현재 섹션의 위치 찾기 : **현재 스크롤 값**(`scrollY`)에서 **타겟 섹션**의 `offsetTop`을 뺀 값을 저장해 스크롤 상대 위치를 계산
* 각 이미지의 속도(speedX, speedY)와 곱해져 이동 거리 산출

```js
style={{ transform: `translateX(${offsetY * item.speedX}px) translateY(${offsetY * item.speedY}px)` }}
```
* imgCoords 배열 내 각 이미지별 위치, 크기, 회전각과 함께 위치 보정값을 지정해 다채로운 움직임 표현

## imgCoords 예시

### 데이터

| 이름   | 이미지 |	위치 (top, left) | 속도X | 속도Y | 회전각 (deg) |	크기 (width)
|--------|-------|------------------|-------|------|--------------|-------------|
| 우주인1 |	astronaut |	90vh, 90% |	-0.6 |	-0.3 |	-55 |	32 |
| 로켓1   |	rocket | 40vh, 60% |	1.2 |	-0.8 |	30 | 48 |
| 달      |	moon |	40vh, 90% |	-1.6 |	1.6 |	0 |	20 |
| 메테오4 |	meteor |	-70vh, 83% |	-2.8 |	2 |	-30 (invert, hue) |	40 |

### 코드

```js
import astronaut from '@/assets/parallax/astronaut.png'

const imgCoords = [
  {
    name: '우주인1',
    img: astronaut,
    className: 'w-32 top-[90vh] left-[90%] z-10 rotate-[-55deg]',
    speedX: -0.6, speedY: -0.3
  },
  // ...
]
```

---
## 전체 코드
```jsx
'use client'

import { useEffect, useRef, useState } from 'react'

import bg from '@/assets/parallax/dark-space.png'
import imgCoords from './imgCoords'

const ParallaxSection = () => {
  const sectionRef = useRef(null)
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    console.log(sectionRef.current.offsetTop, window.scrollY)

    const handleScroll = () => setOffsetY(window.scrollY - sectionRef.current.offsetTop)
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section ref={sectionRef} className="w-full h-[350vh] relative top-0 bg-white">
      {/* 배경 */}
      <img
        src={bg}
        className='sticky w-full h-screen top-0 left-0 z-1'
        alt='배경'
      />
      <div className='w-full h-full absolute top-0 overflow-hidden'>
        {imgCoords.map(item => {
          return <img
            key={item.name}
            src={item.img} className={`absolute ${item.className}`}
            style={{ transform: `translateX(${offsetY * item.speedX}px) translateY(${offsetY * item.speedY}px)`}}
            alt={item.name}
          />
        })}
      </div>
      <div className='absolute bottom-0 w-full h-screen mix-blend-multiply bg-gray-600 text-white z-10 flex items-center justify-center'>
        <h1 className='text-[280px] font-bold'>FINISH</h1>
      </div>

    </section>
  )
}

export default ParallaxSection
```

---

## UI 구조
* section 태그 높이 `350vh`로 충분한 스크롤 영역 확보
* 배경 이미지는 `sticky` 속성으로 스크롤 고정
* 이미지들은 절대 위치로 배치돼 스크롤 위치에 따라 개별적으로 움직임
* 마지막 텍스트는 `mix-blend-multiply` 효과로 배경과 자연스럽게 섞임

이 패럴랙스 섹션은 우주 테마 등 **깊이감 있는 배경 연출**에 적합하며, 다수 오브젝트의 **독립적인 움직임 구현**에 참고하기 좋다.