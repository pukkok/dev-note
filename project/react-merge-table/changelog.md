---
title : 업데이트 이력
---

# 업데이트 이력

## \[1.1.2] - 2025-06-11

### 변경 사항

* `<MergeTable>`의 `defaultStyle` prop 제거 <br/>
  → 기본적으로 `border-collapse: collapse`와 `width: 100%` 스타일이 항상 적용됩니다.
* `<MergeTable>`은 `<table>`을 감싸는 얇은 래퍼임을 문서에 명시
* `<TableHeader>`, `<TableBody>`는 여전히 `defaultStyle={false}` 사용 가능하며, 해당 내용 문서에 추가

---

## \[1.1.1] - 2025-06-11

### 버그 수정

* `v1.1.0`에서 빌드 결과물이 누락된 문제로 인해 다시 배포
  → 이 패치 버전에는 정상적인 `dist/` 폴더가 포함되어 있습니다.

---

## \[1.1.0] - 2025-06-11

### 추가 기능

* `columnRenderers`에서 `<td>` 또는 `<th>`를 직접 반환할 수 있도록 지원
* 커스텀 셀 렌더링 사용 예제를 문서에 추가

### 변경 사항

* 내부 `TableCell` 로직이 raw table 요소(`<td>`, `<th>`)를 감지하여 자동으로 래핑하지 않도록 개선

---

## \[1.0.0] - 2025-06-01

* `react-merge-table` 초기 릴리스
* `$`, `~` 기호를 이용한 자동 셀 병합 기능 지원
* `columnRenderers`, `defaultStyle`, 다양한 `CellValue`/`Row` 형식 지원
* 시맨틱 HTML 렌더링 지원 (`<table>`, `<thead>`, `<tbody>`, `<td>` 등)
