---
title: v0.1.0 업데이트
description: padding과 bleed 기능 도입, 이미지 분할 개선
---

### 2025.06.02

이미지 분할 기능을 실사용(인쇄/출력) 환경에 맞게 개선하기 위해 
<span style={{ color: '#e67e22' }}><strong>padding(여백)</strong></span> 및 
<span style={{ color: '#e67e22' }}><strong>bleed(재단 여유)</strong></span> 개념을 도입하였습니다.  
또한 이미지 저장 해상도와 비율 간 충돌 문제를 해결하여, 원본 해상도를 활용하면서 **출력 비율을 유지**할 수 있도록 수정했습니다.

---

## 주요 기능 추가

### padding 및 bleed 설정
| 옵션 | 설명 |
|------|------|
| `padding` | 각 이미지 조각의 외곽 여백 (단위: mm). |
| `bleed`   | 재단 오차를 줄이기 위해 인접 조각과 겹치는 여유 영역 (단위: mm). |

> 예: 3x3 분할 시, 중앙 조각은 bleed를 양쪽에 적용하며 여백은 제거됨.  
> 반면 가장자리 조각은 bleed 없이 padding이 적용됩니다.

---

## 개발 중 겪었던 어려움

### 1. DPI 개념과 브라우저 환경의 충돌
- 인쇄를 위해 mm → px 환산 시 `DPI = 300` 등 고정값을 쓰면 이미지 용량이 너무 커지고, 브라우저에서 다루기 어려워졌습니다.
- **해결:** DPI 고정 대신, 이미지 원본 해상도를 기준으로 비율 기반 `pxPerMm`를 계산하여 실용적 해상도를 유지했습니다.

### 2. padding과 bleed가 겹치는 영역 처리
- bleed와 padding이 동시에 존재하면 중첩 계산이 복잡해졌습니다.
- **해결:** 다음과 같이 edge 조각에서는 `padding`, 내부 조각에서는 `bleed`만 적용되도록 조건 분기 처리했습니다.

---

## 주요 코드 변경

```js
// padding 계산 (edge에만 적용)
const padTop = Math.max(row === 0 ? padding : padding - bleed, 0)
const padBottom = Math.max(row === rows - 1 ? padding : padding - bleed, 0)
const padLeft = Math.max(col === 0 ? padding : padding - bleed, 0)
const padRight = Math.max(col === cols - 1 ? padding : padding - bleed, 0)

// bleed 계산 (중간 조각에만 적용)
const bleedTop = row === 0 ? 0 : bleed
const bleedBottom = row === rows - 1 ? 0 : bleed
const bleedLeft = col === 0 ? 0 : bleed
const bleedRight = col === cols - 1 ? 0 : bleed

// 이미지 자를 영역 계산 (비율 기반)
const sx = (col * cropW - bleedLeft) * (originalWidth / scaledWidth)
const sy = (row * cropH - bleedTop) * (originalHeight / scaledHeight)
const sw = (cropW + bleedLeft + bleedRight) * (originalWidth / scaledWidth)
const sh = (cropH + bleedTop + bleedBottom) * (originalHeight / scaledHeight)
