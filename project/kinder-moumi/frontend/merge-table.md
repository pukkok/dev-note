---
title: react-merge-table 적용 사례
---

# MergeTable 적용 사례

`react-merge-table`은 병합 셀 기능을 갖춘 커스텀 테이블 컴포넌트 라이브러리로, <br/>
**유치원모으미** 프로젝트 내 정보공시 항목 UI 구현에 실제로 적용되었습니다.

---

## 하드코딩으로 시작했던 테이블

이 테이블은 처음 작업할 당시, HTML `<table>` 구조로 <span style={{ color: '#e67e22' }}>직접 병합 셀을 조합해 만든 구조</span>였습니다.

당시에는 빠르게 보여지는 결과를 만드는 것이 목적이었기 때문에,

* `<th rowSpan>`과 `<td colSpan>`을 직접 작성했고
* 계층 구조를 눈으로 맞추며 작성하다 보니, 행의 순서나 열 구조가 바뀌면 **전체 구조가 망가질 위험이 컸습니다.**

그렇게 한번 만든 이후, **오랜 시간이 지나 다시 코드를 확인하게 되었고**
이전에 직접 만들었던 `react-merge-table` 라이브러리를 여기에 시험 삼아 적용해보자는 생각이 들었습니다.

---

## 테스트 적용 → 실 적용으로

단순히 테스트 목적으로 시작했지만, 실제로 적용해보니

* 병합 처리(`~`, `$`)가 **훨씬 명시적이고 직관적**이었고
* 데이터 구조가 `rows` 배열 형태로 분리되면서 **UI와 로직이 분리되었고**
* 수정 및 추가 작업도 굉장히 **유지보수하기 쉬운 형태**가 되었기 때문에

결국 테스트만이 아니라 실제 서비스 화면에도 적용해 사용하게 되었습니다.

---

## 적용 배경

* 유치원 공시 항목은 각 항목별로 병합된 표 형태가 필요했고,
* HTML `<table>`의 `rowSpan`/`colSpan`을 수작업으로 다루기엔 유지보수가 어려웠습니다.
* 이에 따라, 병합처리를 로직화한 `react-merge-table`을 도입하게 되었습니다.

## 구현 방식 요약

* 데이터는 2차원 배열 `rows` 형태로 정의
* 병합 처리 기호:

  * `~` : 좌우 병합(colSpan)
  * `$` : 상하 병합(rowSpan)
* `columnRenderers`를 통해 배열 데이터 처리도 지원

---

## 기존 문제점 vs 개선점

| 항목       | 기존 (하드코딩)             | 개선 후 (MergeTable)     |
| -------- | --------------------- | --------------------- |
| 병합 처리 방식 | 직접 rowSpan/colSpan 입력 | `~`, `$` 기호로 처리       |
| 유지보수     | 매우 어렵고 반복적 수정 필요      | 구조만 수정하면 일괄 반영 가능     |
| 데이터와 UI  | 혼합되어 있음               | 완전히 분리되어 관리됨          |
| 가독성/재사용  | 낮음                    | 높음 (다른 테이블도 쉽게 적용 가능) |

---

## 적용 결과

아래는 실제 서비스에 적용된 테이블 UI입니다:

![공시항목 테이블 예시](/img/kinder-moumi/table-01.JPG)

---

## 적용 코드 일부

```jsx
<TableBody
  rows={rows}
  columnRenderers={{
    0: cell => <th>{cell.content.label}</th>,
    4: cell => cell.hasMultiple
      ? <td>{cell.contents.map(content => <p key={content.key}>{content.label}</p>)}</td>
      : <td>{cell.content.label}</td>
  }}
/>
```

---

## 정리

이번 작업은 단순히 “내가 만든 라이브러리를 적용했다”는 것이 아니라,
과거에 하드코딩 방식으로 구현했던 테이블을 구조적이고 유지보수 가능한 형태로 바꾸면서,

> <span style={{ color : '#e67e22' }}>**react-merge-table의 실전 적용 가능성과 설계 가치를 확인하고 증명한 경험**</span>이 되었습니다.

앞으로도 비슷한 표 구조가 필요한 상황에서 계속 활용할 수 있는 기반을 만들었다는 점에서 의미 있는 전환이었습니다.
