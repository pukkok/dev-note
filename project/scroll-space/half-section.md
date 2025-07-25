---
title: 스택 및 스크롤 위치 기반
---

# 별자리 반응형 플립카드 섹션
* 이 컴포넌트는 스크롤 위치에 따라 좌우 분할된 별자리 데이터 중 오른쪽 플립카드를 활성화시키는 기능을 구현합니다.
* 왼쪽에는 별자리 정보가 길게 세로 배치되며, **스택**이 쌓이는 모양을 하며, <br/> 
오른쪽에는 해당 별자리 좌표와 요약을 담은 플립카드가 고정 위치에 차례대로 나타납니다.

---

## 구현 목적
* 스크롤 위치 기반으로 좌우 콘텐츠를 연동해 보여주기
* 화면 왼쪽 세로로 긴 각 별자리 섹션이 뷰포트 일정 구간에 걸리면
* 오른쪽의 플립카드가 해당 별자리를 강조하도록 상태 동기화

---

## 주요 구성 요소
* `activeIndex`: 현재 스크롤 기준 활성화된 별자리 인덱스 상태
* `sectionRefs`: 각 별자리 정보 섹션 DOM 참조 배열
* `useEffect` 내부 `handleScroll`: 각 섹션이 뷰포트 특정 범위에 들어오는지 판단해 activeIndex 갱신
* `FlipCard`: 좌우 섹션 오른쪽에 표시할 플립 카드 컴포넌트
* `NextDescription`: 마지막 섹션 하단에 나타나는 안내 텍스트 카드

---

## 핵심 로직 요약
```js
sectionRefs.current.forEach((ref, i) => {
  if (!ref) return
  const rect = ref.getBoundingClientRect()
  const isHalfVisible = rect.top < window.innerHeight * 0.4 && rect.bottom > window.innerHeight * 0.5
  if (isHalfVisible) setActiveIndex(i)
})
```
1. 각 섹션의 뷰포트 상대 위치(rect.top, rect.bottom)를 체크한다
2. 화면 중간 영역(상단 40%, 하단 50% 사이)에 들어올 때 activeIndex를 갱신한다
3. 이 인덱스에 따라 오른쪽 플립카드의 flipped 상태가 변한다

---

## 전체 코드

```jsx
import { useEffect, useRef, useState } from 'react'
import constellationData from './constellationData'
import FlipCard from './FilpCard'
import NextDescription from '../NextDescription'

const HalfSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRefs = useRef([])

  useEffect(() => {
    const handleScroll = () => {
      sectionRefs.current.forEach((ref, i) => {
        if (!ref) return
        const rect = ref.getBoundingClientRect()
        const isHalfVisible = rect.top < window.innerHeight * 0.4 && rect.bottom > window.innerHeight * 0.5
        if (isHalfVisible) {
          setActiveIndex(i)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // 초기 상태 설정
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="w-full bg-black text-white flex px-20">
      <div className="w-2/3">
        {constellationData.map((c, i) => (
          <div
            key={c.id}
            ref={el => (sectionRefs.current[i] = el)}
            className={`h-[120vh] flex items-start gap-2 sticky top-0 bg-black pt-[25%]`}
          >
            <article className="w-full flex justify-between relative">
              <div className="w-2/3 max-w-[500px]">
                <h2 className="text-4xl font-bold text-emerald-400">{c.koreanName}</h2>
                <p className="text-lg mt-2 text-white/80">{c.summary}</p>
                <p className="mt-4 text-sm text-emerald-300">
                  {c.season} | {c.months.join('월, ')}월
                </p>
              </div>
              <div className="w-1/3 flex justify-start">
                <div className="w-48 h-48 rounded-full border-2 border-emerald-400 flex items-center justify-center">
                  <span className="text-2xl text-emerald-300">{c.name}</span>
                </div>
              </div>
            </article>

            {constellationData.length - 1 === i && (
              <div className="absolute bottom-15">
                <NextDescription 
                  first={'ACCEL FILM'}
                  second={'USE SCROLL'}
                  description={'스크롤로 움직임을 가속합니다'}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="w-1/3 flex flex-col items-center">
        {constellationData.map((c, i) => (
          <div key={i} className="text-white flex items-center sticky top-1/7 pb-[80%]">
            <FlipCard 
              prevX={constellationData[i > 1 ? i - 1 : 0].x}
              prevY={constellationData[i > 1 ? i - 1 : 0].y}
              flipped={activeIndex === i}
              name={c.name}
              koreanName={c.koreanName}
              summary={c.summary}
              x={c.x}
              y={c.y}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default HalfSection
```

---

## 추가 설명
* 각 별자리 섹션(h-[120vh] sticky top-0)은 화면에 고정되어 스크롤 시 겹치듯 전환됨
* 오른쪽 플립카드는 sticky top-1/7로 스크롤 중 고정되어 순차적으로 내용이 바뀜
* activeIndex 동기화로 스크롤에 따른 시각적 연계 표현
* 마지막 섹션에는 NextDescription으로 다음 섹션 힌트 제공

이 구조는 좌우 콘텐츠를 따로 배치하되, 스크롤 위치에 따라 우측 콘텐츠가 반응하는 UI를 쉽게 구현할 때 적합합니다.