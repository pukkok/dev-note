---
title: Clip-path with Scroll
---


# 클립패스 + 스크롤 이벤트

스크롤 위치에 따라 요소의 `clip-path`를 변경해 **원형 마스크가 커지거나 작아지는 효과**를 구현한 섹션입니다.  
이 방식은 페이지 전환이나 연출 효과를 만들 때 유용하게 활용할 수 있습니다.

---

## 구현 목적

- 특정 영역(`Inner`)을 원형으로 마스킹
- 사용자가 스크롤할수록 원형 마스크의 반지름이 커짐
- 일정 스크롤 이상에서 `Cover` 컴포넌트를 고정(fixed)에서 `absolute`로 바꿔 스냅 느낌 제공

---

## 주요 구성 요소

- `Cover`: 마스크 아래에 깔리는 콘텐츠 (fixed/absolute 전환)
- `Inner`: 마스크 효과가 적용되는 콘텐츠
- `clip-path`: `circle(radius at position)` 형태로 변경
- `requestAnimationFrame`: 스크롤 이벤트 최적화
- `progress` : 스크롤 진행도(progress)에 따라 반지름을 선형 보간
```jsx
const progress = clamp((scrollY - sectionTop) / (sectionHeight- innerHeight), 0, 1)
```

---

## 전체 코드

```jsx
import { useEffect, useRef } from "react"
import Cover from "./Cover"
import Inner from "./Inner"

const HeroSection = () => {
  const sectionRef = useRef(null)
  const coverRef = useRef(null)
  const maskRef = useRef(null)
  const animationFrame = useRef(null)

  useEffect(() => {
    const clamp = (val, min, max) => Math.max(min, Math.min(val, max))
    const minRadius = 150
    if(maskRef.current) {
      maskRef.current.style.clipPath = `circle(${minRadius}px at right 10% top 50%)`
    }

    const onScroll = () => {
      if (animationFrame.current) return

      animationFrame.current = requestAnimationFrame(() => {
        const section = sectionRef.current
        const mask = maskRef.current
        if (!section || !mask) return

        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight

        const progress = clamp((scrollY - sectionTop) / (sectionHeight- innerHeight), 0, 1)

        const maxRadius = innerWidth
        const radius = minRadius + (maxRadius - minRadius) * progress

        if(progress > 0.8) {
          coverRef.current.style.position = 'absolute'
          coverRef.current.style.marginTop = '-100vh'
        } else {
          coverRef.current.style.position = 'fixed'
          coverRef.current.style.marginTop = 0
        }

        mask.style.clipPath = `circle(${radius}px at right 10% top 50%)`

        animationFrame.current = null
      })
    }

    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(animationFrame.current)
    }
  }, [])

  return (
    <div className="relative">
      <section 
        ref={sectionRef} 
        className="w-full h-[240vh] relative top-0 bg-black text-white"
        >
        <Cover ref={coverRef}/>
        <Inner ref={maskRef}/>
      </section>
    </div>
  )
}

export default HeroSection
```