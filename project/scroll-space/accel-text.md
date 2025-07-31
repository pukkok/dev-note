---
title: 가속 텍스트
---

# 스크롤을 이용한 텍스트 가속
화면 가로 전체를 가로지르며 텍스트가 연속적으로 흐르는 애니메이션 

---

## 주요 구성 요소(props)
* `texts`: 배열로 받은 여러 텍스트를 반복해서 좌우 방향으로 무한 루프 애니메이션
* `direction`: 텍스트 흐름 방향 (1이면 오른쪽에서 왼쪽, -1이면 반대)
* `tilt`: 텍스트가 약간 기울어지도록 CSS rotate 적용 (기본 3도)
* `selectType`: 배경 그라디언트 타입 선택 (a~f까지 6종)

---

## 핵심 로직 요약
* 내부 `countRef`로 애니메이션 위치를 관리하며 `requestAnimationFrame`으로 매 프레임마다 위치 갱신
* 텍스트가 자신의 절반 너비만큼 이동하면 위치 초기화해 무한 반복 효과
* 스크롤 이벤트(scroll)가 발생하면 위치를 급격히 더 이동해 스크롤에 반응하는 가속 효과 부여

```js
useEffect(() => {
  const animate = () => {
    countRef.current += 0.5
    if(countRef.current > targetRef.current.scrollWidth / 2) countRef.current = 0
    targetRef.current.style.transform = `translateX(${countRef.current * direction}px)`
    requestAnimationFrame(animate)
  }
  animate()

  const handleScroll = () => {
    countRef.current += 15
  }
  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [])
```
1. `animate` 함수는 계속 호출되며 `countRef`값을 바탕으로 텍스트 위치를 조절
2. 휠 이벤트 발생 시 `countRef`를 크게 증가시켜 텍스트 흐름 가속

---

## 전체 코드

```jsx
import { useRef, useEffect } from 'react'

const TextFilm = ({ texts = ['기본 텍스트'], direction = 1, tilt = 3, selectType="a" }) => {
  const countRef = useRef(0)
  const targetRef = useRef(null)

  const bgType = {
    a: 'bg-gradient-to-r from-purple-900 via-indigo-900 to-black',
    b: 'bg-gradient-to-r from-rose-900 via-pink-800 to-black',
    c: 'bg-gradient-to-r from-sky-800 via-blue-900 to-black',
    d: 'bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950',
    e: 'bg-gradient-to-r from-yellow-400 via-amber-600 to-purple-900',
    f: 'bg-gradient-to-r from-teal-400 via-cyan-700 to-indigo-900'
  }

  useEffect(() => {
    const animate = () => {
      countRef.current += 0.5
      if(countRef.current > targetRef.current.scrollWidth / 2) countRef.current = 0
      targetRef.current.style.transform = `translateX(${countRef.current * direction}px)` // right
      requestAnimationFrame(animate)
    }
    animate()

    const handleScroll = () => {
      countRef.current += 15
    }

    window.addEventListener('wheel', handleScroll)

    return () => {
      window.removeEventListener('wheel', handleScroll)
    }
  }, [])

  const innerText = [...texts, ...texts].map(text => `${text}\u00A0\u00A0\u00A0\u00A0`).join('')

  return (
    <div 
      className={`w-screen mt-40 flex text-white flex-nowrap ${bgType[selectType]}`}
      style={{rotate : `${tilt}deg`, justifyContent: direction > 0 ? 'flex-end' : 'flex-start'}}
    >
      <p 
        ref={targetRef}
        className='flex shrink-0 px-12 py-10 text-3xl'
      >{innerText}</p>
    </div>
  )
}

export default TextFilm
```

---

## 스타일링 포인트
* 텍스트는 `flex-nowrap`로 한 줄로 연속 배치
* 배경은 `bg-gradient-to-r`로 부드러운 그라디언트 적용
* 텍스트 컨테이너에 rotate CSS로 **기울기** 표현
* 텍스트 정렬은 방향에 따라 `flex-start` 혹은 `flex-end` 설정

---

## 텍스트 배열 예시

```js
export const constellationTexts = [
  'Orion - 오리온',
  'Cassiopeia - 카시오페아',
  'Ursa Major - 큰곰',
  'Ursa Minor - 작은곰',
  'Lyra - 거문고',
  'Cygnus - 백조',
  'Scorpius - 전갈',
  'Leo - 사자',
  'Gemini - 쌍둥이',
  'Taurus - 황소'
]
```