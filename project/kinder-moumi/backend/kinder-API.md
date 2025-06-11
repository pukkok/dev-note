---
title : 3. API
---

# 유치원 홈페이지 API

`kinder-moumi` 프로젝트에서는 생성된 유치원 홈페이지 URL을 기준으로 실제 페이지에 접근하거나, 데이터를 조회하는 API 흐름이 존재합니다. <br /> 
이 흐름은 **페이지 생성 → 게시 → 외부 접근 → 데이터 다운로드**의 구조로 구성되어 있습니다.

---

## ✅ 주요 역할

* 유치원 코드 기반 홈페이지 URL 생성 및 저장
* 게시 여부 관리 (`openPage`)
* 유치원 페이지 데이터 조회 및 검증
* 커스터마이징 데이터 다운로드 제공
* 공공 API 연동으로 유치원 목록 검색 지원

---

## 1. 유치원 URL 등록 (`/platform/newpage`)

```js
const newKinder = new Kinder({
  kinderCode: req.user.kinderCode,
  originUrl: req.body.createdUrl,
  data: {
    logoPath: '', addBgList: [], containerSize: '1240', ...
  }
})
await newKinder.save()
```

* 같은 `kinderCode`나 `originUrl`이 이미 존재할 경우 등록 실패
* URL은 나중에 프론트에서 홈페이지 주소로 활용됨

---

## 2. 게시 상태 전환 (`/platform/startpage`)

```js
kinder.openPage = true
await kinder.save()
```

* `openPage`가 `true`일 경우 사용자 접근 허용
* `/user/openKinder/:kinderCode`를 통해 게시 여부 확인 가능

---

## 3. 사용자 접근 시 API 흐름

### (1) 게시 여부 확인 (`/user/openKinder/:kinderCode`)

```js
Kinder.findOne({ kinderCode, openPage: true })
```

* `openPage: false`면 404 반환
* 게시된 경우 originUrl 전달

### (2) 유치원 데이터 조회 (`/user/kinderData/:url`)

```js
Kinder.findOne({ originUrl: req.params.url })
```

* 게시 여부 확인 후 `kinder.data` 반환
* 게시되지 않았다면 400 또는 404 응답

---

## 4. 커스터마이징 데이터 다운로드 API (`/kinder/download/...`)

> 관리자 로그인 상태에서 사용됨

### `/kinder/download/data`

* 커스터마이징 전체 데이터 (`kinder.data`) 반환

### `/kinder/download/menu`

* 메뉴 옵션 설정 데이터 (`Menu`) 반환

### `/kinder/download/menu-table`

* 월별 식단표 (`MonthMenuTable`) 반환
* 요청 시 `selectMonth` 필요

---

## 5. 공공 유치원 정보 조회 (`/api/kinder`)

```js
GET /api/kinder?sidoCode=XX&sggCode=YY
```

* 교육청 open API를 호출하여 해당 지역 유치원 목록 조회
* 실패 시 404 반환

---

## 정리

* 유치원 홈페이지는 `originUrl` 기반으로 생성 및 접근됨
* `openPage`가 true일 때만 외부 접근 가능
* 관리자와 사용자 요청을 분리하여 보안성과 기능성을 모두 확보함
* 공공 API 연동으로 유치원 목록 자동화 검색 지원

이 흐름을 통해 **사용자 친화적이며 보안이 고려된 유치원 홈페이지 생성 및 접근 구조**를 구현하였습니다.
