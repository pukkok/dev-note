---
title: 디자인 및 리뉴얼 방향
---

# 디자인 및 리뉴얼 방향

## 리뉴얼 컨셉 개요

기존 사이트의 레이아웃과 핵심 콘텐츠 구조는 유지하되, **가독성과 사용자 경험을 개선하는 방향**으로 리디자인을 진행했습니다. 특히, 밝은 배경과 중앙 정렬된 텍스트로 인해 시인성이 떨어지는 문제를 개선하고자 했습니다.

또한, 브랜드 이미지를 살리기 위해 **브랜드 컬러**를 적용하고, UI 구성은 **카드 스타일 레이아웃** 중심으로 구성했습니다.

---

## 시각적 개선 목표

### 1. 메인 슬라이드
* **문제점**: 텍스트가 이미지 중앙에 배치되어 가독성이 낮고, 슬라이드 멈춤 기능과 페이지 수 안내가 없음
* **개선점**: 텍스트 좌측 정렬, pause 버튼 및 페이지 네비게이션 추가로 시인성과 컨트롤성 개선

기존:
![기존 메인 슬라이드](/img/younglim-renewal/younglim-origin1.JPG)

리뉴얼:
![리뉴얼 메인 슬라이드](/img/younglim-renewal/younglim-renewal1.JPG)

### 2. 상품 탐색
* **문제점**: 드래그로만 슬라이드가 이동되며 시작과 끝에 대한 구분이 모호함
* **개선점**: 슬라이드를 제거하고 펼쳐보기 형식으로 변경해 명확하고 안정적인 탐색 구조 구현

기존:
![기존 상품 탐색 영역](/img/younglim-renewal/younglim-origin2.JPG)

리뉴얼:
![리뉴얼 상품 영역](/img/younglim-renewal/younglim-renewal2.JPG)

### 3. 서브 페이지 이동
* **문제점**: 기존에는 메뉴 클릭 시마다 전체 페이지가 새로고침되어 깜빡임이 발생
* **개선점**: 상품 리스트만 동적으로 갈아끼우는 방식으로 구성해 **페이지 전환 없이 부드러운 UX 제공**

![리뉴얼 서브 페이지](/img/younglim-renewal/younglim-renewal5.JPG)

### 4. Contact UI 개선
- **문제점**: 정보들이 산개되어 있어 시각적 그룹이 불명확하고, 정렬 기준이 일관되지 않아 시선 흐름이 단절됨. 클릭 유도력도 약함.
- **개선점**: 카드 형태로 정보를 묶고 정렬 기준을 통일하여 **시각적 균형과 클릭 유도력 강화**. 버튼과 텍스트 대비도 개선하여 명확한 전달 가능

기존:  
![기존 Contact 영역](/img/younglim-renewal/younglim-origin4.JPG)

리뉴얼:  
![리뉴얼 Contact 영역](/img/younglim-renewal/younglim-renewal4.JPG)

---

## 디자인 컨셉

* **브랜드 컬러 활용**
  Red (R218, G67, B37), Dark Gray (R98, G100, B105), Gray, Black 중심으로 디자인

* **카드 UI 적용**
  섹션마다 카드 스타일을 적용해 정보 시각화와 사용자 클릭 유도를 강화함

* **이미지 중심 배치**
  인테리어 제품 특성을 고려하여 고화질 이미지를 크게 활용함

* **일관된 폰트 크기 시스템**
  `34, 24, 20, 16, 14px` 기준으로 시각 계층 구조를 유지

* **반응형 레이아웃 구성**
  모바일/태블릿 환경에서도 UI가 유지되도록 비율 기반의 유연한 구조 구현

---

## 디자인 작업 순서 및 전략

1. 헤더/네비게이션 구조 정의 (depth1\~3)
2. 메인 섹션 슬라이드 및 텍스트 영역 시각화
3. 각 콘텐츠 영역을 섹션별로 분리 및 스타일링
4. 상품 리스트 레이아웃 카드 스타일로 구성
5. 전체 컨셉 유지하며 반응형 대응 및 시각 균형 조정