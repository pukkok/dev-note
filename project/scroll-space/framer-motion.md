---
title: Framer Motion Text
---

# Framer Motion을 활용한 텍스트 인터렉션

스크롤 진입 시 한 글자씩 순차적으로 나타나는 텍스트 애니메이션을 구현한 섹션입니다. <br/>
**Framer Motion의 `staggerChildren`과 `variants`를 활용**하여 자연스러운 등장 효과를 제공합니다.

---

## 구현 목적

* 각 글자가 부드럽게 아래에서 위로 올라오며 나타나는 효과
* 스크롤 인뷰(`whileInView`) 기반으로 한 번만 재생되도록 제어 가능
* 헤더, 인트로 등 임팩트 있는 텍스트 연출용으로 활용 가능

---

## 주요 구성 요소

* `motion.h1`: 전체 텍스트 래퍼, 자식(span)들의 애니메이션 순서를 제어
* `motion.span`: 각 글자를 애니메이션 처리하는 요소
* `variants`: hidden → visible 상태 전환을 통해 등장 효과 구현
* `staggerChildren`: 자식 요소들 간의 딜레이 조절
* `initial`, `whileInView`: 스크롤 진입 시 상태 전환 트리거

---

## 전체 코드

```jsx
import { motion } from "framer-motion"

const SlateSection = ({ children }) => {
  const letters = [...children] // 텍스트를 글자 단위로 쪼개기

  return (
    <section className="h-[160vh] bg-black text-white text-9xl flex items-center justify-center">
      <motion.h1
        className="flex"
        initial="hidden"
        whileInView="visible"
        // viewport={{ once: true }} // 반복 방지 시 사용
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.05,
            }
          }
        }}
      >
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.3 }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </motion.h1>
    </section>
  )
}

export default SlateSection
```

---

## 추가 설명

* 공백 문자 처리 시 ` ` (non-breaking space)를 사용하여 레이아웃 깨짐 방지
* 배경 높이는 `h-[160vh]`로 설정되어 있어 화면 진입 시점 제어에 유리함
* Tailwind CSS를 사용하여 레이아웃 구성 및 스타일링 수행
