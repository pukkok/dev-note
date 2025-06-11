---
title: 문제 해결 및 경험
---

# 프론트엔드 문제 해결 경험 정리

> 이 문서는 유치원 모으미 프로젝트 개발 중 실제로 마주친 문제와 그에 대한 해결 과정을 정리한 기록입니다. 단순한 기능 구현을 넘어, 다양한 환경에서 발생한 문제를 어떻게 해결했는지를 중심으로 정리했습니다.

---

## 1. Kakao Map API 연동 및 배포 이슈

* **기능 구현**: Kakao Map API를 처음 연동하여, 주소명 기반으로 지도를 렌더링하고 마커와 핀네임을 지정하는 기능을 구현했습니다.
* **문제 상황**: 로컬에서는 정상 동작하던 지도가 Vercel 배포 후 로딩되지 않는 문제가 발생했습니다.
* **원인 및 해결**:

  * Kakao 개발자 콘솔에서 도메인 등록을 하지 않아 발생한 문제
  * 배포 주소를 등록함으로써 정상적으로 지도 연동 완료
* **사용 기술**: Kakao Map API, React, Vite, Vercel

---

## 2. 비동기 데이터 요청 최적화

* **배경**: 전국 유치원 데이터를 시/도, 시/군/구 단위로 유치원알리미 API에서 각각 받아야 하는 구조
* **문제 상황**: `Promise.all`을 사용해 한 번에 모든 요청을 보낼 경우 Gateway Timeout(5초 초과)이 발생함
* **해결**: 요청을 40개씩 chunk 단위로 나누어 순차적으로 처리하는 구조로 변경

  ```js
  const chunkSize = 40;
  for (const chunk of chunks) {
    await Promise.all(chunk.map(...))
  }
  ```
* **효과**: 응답 실패율이 줄고, 데이터 안정적으로 수집 가능
* **사용 기술**: JavaScript (async/await, Promise.all), axios

---

## 3. 검색 및 필터 상태 관리 개선

* **문제 상황**: 필터 체크박스를 클릭할 때마다 state가 변경되어 불필요한 렌더링과 요청 발생
* **해결**: `useRef`를 통해 클릭된 값을 임시 저장하고, ‘검색’ 버튼 클릭 시 한꺼번에 state에 반영
* **핵심 코드**:

  ```js
  const checkedValuesRef = useRef([])
  const handleSearch = () => {
    setSelectedItems(checkedValuesRef.current)
  }
  ```
* **효과**: UX 개선 및 API 요청 절감
* **사용 기술**: React, useRef, useState

---

## 4. 커스텀 UI 컴포넌트 제작 경험

### (1) 달력 컴포넌트

* 기존 FullCalendar 사용 시 원하는 기능(사이드바, 하단 옵션 등) 미지원
* CSS Grid 기반 2중 배열 렌더링으로 달력을 직접 제작함

### (2) 드래그 가능한 알레르기표

* 기본 drag-and-drop 시 고스트 이미지가 남는 문제 발생

* `setDragImage`를 사용해 투명 이미지로 대체해 문제 해결

  ```js
  const img = new Image()
  img.src = ''
  e.dataTransfer.setDragImage(img, 0, 0)
  ```

* **사용 기술**: React, drag event, custom UI 구현

---

## 5. Vercel 배포 문제 해결 경험

* 프론트는 배포 시 `vercel.json`만 작성하면 문제가 없음.

* **문제 1: API 구조 요구사항**

  * Vercel의 serverless 구조에 맞게 `/api/index.js` 형태로 구조 조정

* **문제 2: Multer static 파일 저장 실패**

  * Serverless 환경에서는 로컬 파일 저장 불가 → AWS S3로 전환

* **문제 3: 응답 지연**

  * Vercel 기본 지역이 미국 → `vercel.json`에 `regions: icn1`(서울) 설정

* **문제 4: CORS 에러**

  * `vercel.json`의 headers 항목에 CORS 설정 추가

```json
"headers": [
  { "key": "Access-Control-Allow-Origin", "value": "*" },
  { "key": "Access-Control-Allow-Methods", "value": "GET,POST,PUT,DELETE" },
  { "key": "Access-Control-Allow-Headers", "value": "Content-Type" }
]
```

* **사용 기술**: Vercel, AWS S3, vercel.json 설정, Serverless 이해

---

> 이 문서는 단순한 기능 나열이 아닌, 실제로 마주친 문제 상황에 대한 분석과 해결 방식을 통해 프론트엔드 실무 대응 역량을 보여주기 위해 작성되었습니다.
