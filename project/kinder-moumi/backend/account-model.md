---
title: 4. 스키마 정의
---

# 사용자 및 유치원 관련 스키마 정의

`kinder-moumi` 프로젝트에서는 다양한 사용자의 역할을 고려하여 몽고DB 스키마를 설계하였습니다. <br /> 
**교사, 학부모, 아동, 인증서, 유치원 정보, 식단표** 등 여러 모델이 역할별로 구분되어 구성됩니다.

---

## ✅ 공통 사항

* 모든 모델은 `mongoose.Schema` 기반으로 정의
* `createdAt`, `lastModifiedAt` 필드를 통해 데이터 생성/수정 시점 추적

---

## 1. 교사 모델 (`Teacher.js`)

```js
const TeacherSchema = new Schema({
  name, organization, kinderCode, isDirector,
  isAdmin, email, phone, userId, password,
  createdAt, lastModifiedAt
})
```

* `isDirector`: 유치원 원장 여부
* `isAdmin`: 관리자 권한 여부 (원장일 경우 자동 true)
* `userId`: 중복 불가

---

## 2. 인증서 모델 (`Certificate.js`)

```js
const CertificateSchema = new Schema({
  key, password, name, organization, kinderCode, isDirector
})
```

* 회원가입 시 Step1에서 입력된 키·비밀번호로 인증 수행
* `kinderCode` 기준으로 중복 인증 방지
* 테스트용 인증서는 `buildCertificate.js`에서 자동 생성 가능

---

## 3. 학부모 모델 (`SchoolParent.js`)

```js
const SchoolParentSchema = new Schema({
  name, organization, email, phone,
  children: [ObjectId], userId, password, isKinderAdmin
})
```

* `children`: 아동 참조 관계 (`ref: 'Children'`)
* `isKinderAdmin`: 부모 계정이지만 관리자 권한을 가질 수 있음

---

## 4. 아동 모델 (`Children.js`)

```js
const ChildrenSchema = new Schema({
  organization, name, class, birth,
  parentName: [Object], createdAt, lastModifiedAt
})
```

* 아동의 부모 정보를 배열로 저장 (`parentName`)
* `class`, `birth` 등을 통해 학급 분류 가능

---

## 5. 유치원 모델 (`Kinder.js`)

```js
const KinderSchema = new Schema({
  kinderCode, originUrl, data, openPage, menu (ref)
})
```

* `originUrl`: 사용자 지정 홈페이지 주소
* `data`: 커스터마이징 정보 전체 저장 (JSON 형태)
* `openPage`: 게시 여부 (`true` 시 사용자 접근 허용)
* `menu`: 식단 옵션과 연결 (ObjectId)

---

## 6. 식단 모델 (`Menu.js`)

```js
const MenuSchema = new Schema({
  kinderCode, deleteYOIL, sideOptions, addAllergyList, ...
})
```

* `deleteYOIL`: 제외할 요일
* `sideOptions`: 반찬 종류 목록
* `addAllergyList`: 알레르기 직접 추가 목록

### 월별 식단표 (`MonthMenuTable`)

```js
const MonthMenuSchema = new Schema({
  kinderCode, month, menulist
})
```

* 한 유치원에 대해 월별로 식단표를 저장함
* 식단표 입력 시 날짜 기준으로 자동 분류됨

---

## 7. 알레르기 고정 목록 (`allergies.js`)

```js
const allergies = ['난류', '우유', '메밀', '땅콩', ...]
```

* 선택형 알레르기 목록
* 커스터마이징 항목으로 추가 가능 (`addAllergyList`)

---

## 정리

* 교사/학부모/아동/인증서 등 역할 기반 모델 설계
* 유치원 커스터마이징 정보는 `Kinder.data`에 구조화 저장
* 식단표는 `Menu`, `MonthMenuTable`로 분리 저장

이러한 구조를 통해 **사용자 역할별 데이터 분리**와 **기능별 확장성**을 확보할 수 있도록 모델을 설계하였습니다.
