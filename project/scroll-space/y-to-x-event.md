---
title: Y to X Scroll
---

# 세로 스크롤 → 가로 스크롤 변환

이 섹션은 **세로 스크롤을 가로 스크롤 애니메이션으로 전환**하는 기법을 사용합니다. <br/> 사용자가 아래로 스크롤하면 내부 콘텐츠가 왼쪽에서 오른쪽으로 이동하며 자연스럽게 나타납니다.

---

## 구현 목적

* 세로 스크롤만 지원되는 환경에서 가로 콘텐츠 스크롤 효과 구현
* nebula 이미지를 슬라이드 형식으로 순차 노출

---

## 주요 구성 요소

* `containerRef`: 전체 스크롤 가능한 영역 (`h-[1000vh]`)
* `horizontalRef`: 가로로 움직이는 콘텐츠 그룹
* `sticky`: 뷰포트 상단 고정 후 콘텐츠 이동
* `transform: translateX(...)`: 스크롤 진행도에 따른 수평 이동

---

## 핵심 로직 요약

* 전체 높이를 `1000vh`로 설정하여 충분한 세로 스크롤 확보
* `sticky` 섹션을 `top: 0`에 고정해 뷰포트에서 유지
* 스크롤 진행도(`progress`)를 계산해 수평 길이만큼 `translateX` 적용

```js
const progress = clamp(-containerTop / (containerHeight - window.innerHeight), 0, 1)
const maxTranslate = horizontalWidth - windowWidth
horizontal.style.transform = `translateX(-${progress * maxTranslate}px)`
```

---

## 전체 코드

```jsx
import { useEffect, useRef } from 'react'
import NextDescription from '../NextDescription'
import nebulaData from './nebulaData'

const HorizonSection = () => {
  const containerRef = useRef(null)
  const horizontalRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !horizontalRef.current) return

      const containerTop = containerRef.current.getBoundingClientRect().top
      const containerHeight = containerRef.current.offsetHeight
      const scrollRange = containerHeight - window.innerHeight

      const progress = Math.min(Math.max(-containerTop / scrollRange, 0), 1)
      const maxTranslate = horizontalRef.current.scrollWidth - window.innerWidth
      horizontalRef.current.style.transform = `translateX(-${progress * maxTranslate}px)`
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section ref={containerRef} className="relative h-[1000vh] bg-gradient-to-br from-black to-blue-950">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div
          ref={horizontalRef}
          className="flex gap-10 pl-20 pr-10 transition-transform duration-200 ease-out"
        >
          {nebulaData.map((nebula, idx) => (
            <div
              key={nebula.id}
              className="w-screen h-[80vh] flex items-center justify-center text-white relative overflow-hidden"
            >
              <img
                src={nebula.image}
                alt={nebula.name}
                className="inset-0 w-full h-full object-cover opacity-80"
              />
              <div className="absolute top-1/3 left-0 -translate-y-1/2 z-10 max-w-[600px] p-10 bg-black/30 backdrop-blur rounded-xl">
                <div className="text-4xl mb-2">{nebula.name}</div>
                <div className="text-xl opacity-80">{nebula.short}</div>
                <p className="text-sm opacity-60 mt-2">{nebula.description}</p>
              </div>

              {nebulaData.length - 1 === idx && (
                <article className="absolute right-0 bottom-0 p-10 items-end text-right bg-black/60 rounded-tl-xl">
                  <NextDescription 
                    first={'REACTIVE'}
                    second={'HALF SECTION'}
                    description={'스크롤에 따라 반응하는 좌우 분할 레이아웃'}
                  />
                </article>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HorizonSection
```

---

## 추가 설명

* `nebulaData`: 이미지와 설명을 담은 배열 형태의 데이터
* `NextDescription`: 섹션 종료 지점에서 다음 섹션 안내용 텍스트 카드
* `transition-transform`: 스크롤 위치가 바뀔 때 부드러운 이동 효과 적용

이 방식은 시각적으로 **임팩트 있는 갤러리형 섹션**이나 **프로젝트 소개**에 적합합니다.
