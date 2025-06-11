---
title: 2. 파일 업로드
---

# 파일 업로드 및 홈페이지 커스터마이징

`kinder-moumi`에서는 교사가 직접 **유치원 홈페이지를 제작하고 구성**할 수 있도록 다양한 커스터마이징 기능을 제공합니다. <br/> 
사용자는 로고, 배경 이미지, 메뉴 스타일 등을 S3에 업로드하고 DB에 저장할 수 있습니다.

---

## ✅ 주요 기술 스택

* **Multer + multer-s3**: 이미지 파일 업로드 처리
* **AWS S3**: 정적 자산 저장소
* **MongoDB**: 유치원별 커스터마이징 데이터 저장

---

## 1. 로고 및 배경 이미지 업로드

### 로고 업로드 (`/platform/upload/logo`)

```js
const uploadLogo = multer({
  storage: multerS3({
    s3,
    bucket: 'kindermoumi',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key(req, file, cb) {
      cb(null, `logo/${Date.now()}_${path.basename(file.originalname)}`)
    }
  }),
  fileFilter: imgFilter
})
```

* 이미지가 아닌 파일은 거부됨 (`file.mimetype` 검사)
* 업로드 후 해당 경로는 `Kinder.data.logoPath`에 저장됨

### 배경 이미지 업로드 (`/platform/upload/bg-list`)

```js
const uploadBg = multer({ ... bucket: 'kindermoumi', key: `bg/...` })
```

* 다중 이미지 업로드 (배경 테마로 활용)
* `data.addBgList` 배열에 누적 저장

### 배경 이미지 삭제 (`/platform/bg-data`, PUT)

* 사용자가 특정 배경 이미지를 제거하면 S3에서도 삭제 요청 수행
* `deleteObject` 사용으로 완전 제거

```js
const key = req.body.bgSrc.replace(S3_URL_PREFIX, '')
s3.deleteObject({ Bucket: 'kindermoumi', Key: key })
```

---

## 2. 홈페이지 데이터 저장 (`/platform/upload/data`)

```js
kinder.data = {
  ...kinder.data,
  headerHeight,
  logoWidth,
  navDepth1: [...navMainList],
  navDepth2: {...navSubList},
  selectBgSrc: newSelectBgSrc,
  zoneData: {...zoneData},
  contentsContainer: {...contentsContainer}
}
```

* 사용자가 커스터마이징한 값(헤더 높이, 로고 크기, 메뉴, 배경 등)을 통째로 저장
* `selectBgSrc`의 경우 `blob:` prefix 제거 처리 포함

---

## 3. 페이지 게시 요청 (`/platform/startpage`)

* `Kinder.openPage = true`로 전환 → 사용자 접근 허용
* 게시 전에는 `/user/openKinder/:kinderCode` 접근 시 404 반환

---

## 4. 메뉴 및 식단표 설정

### 메뉴 옵션 및 제외 요일 저장

```js
menu.deleteYOIL = [...req.body.deleteYOIL] // 제외 요일
menu.sideOptions = [...req.body.sideOptions] // 반찬 목록
```

### 월별 식단표 저장 (`/platform/menu/table`)

```js
const menus = req.body.menus
const monthArr = [...new Set(menus.map(obj => obj.date.slice(0, 7)))]
```

* 월별로 데이터를 분리하여 `MonthMenuTable`에 저장
* 기존 데이터가 있으면 업데이트, 없으면 새로 생성

---

## 정리

* 이미지 업로드는 `multer-s3`를 통해 AWS S3에 저장
* 커스터마이징 데이터는 MongoDB의 `Kinder` 모델에 구조화하여 저장
* 식단표는 월 단위로 분리하여 `MonthMenuTable`에 저장
* 사용자가 게시를 선택하면 실제 홈페이지가 외부에 노출됨

이 구조를 통해 **비전문가인 교사도 직관적으로 홈페이지를 제작하고 게시할 수 있는 경험**을 제공합니다.
