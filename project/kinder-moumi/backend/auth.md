---
title: 1. 인증과 권한
---

# 인증과 권한 (Authentication & Authorization)

`kinder-moumi` 프로젝트에서는 JWT 기반의 인증 시스템을 도입하여 사용자 로그인 상태를 안전하게 유지하고, 관리자 전용 기능에 대한 접근을 제어합니다.

---

## ✅ 주요 기술 스택

* **JWT (JSON Web Token)**: 사용자 인증 정보 토큰화
* **express-validator**: 입력값 유효성 검증
* **미들웨어 패턴**: 인증 및 권한 검증 흐름 구성

---

## 1. JWT 토큰 발급 (`auth.js`)

사용자 로그인 성공 시 서버는 다음 정보를 포함한 JWT 토큰을 발급합니다.

```js
const generateToken = (user) => {
  return jwt.sign({
    _id: user._id,
    organization: user.organization,
    kinderCode: user.kinderCode,
    name: user.name,
    userId: user.userId,
    createdAt: user.createdAt,
    isAdmin: user.isAdmin
  }, config.JWT_SECRET, {
    expiresIn: '1d',
    issuer: '푹곡좌'
  })
}
```

### 사용자가 로그인 시

* `teachers.js`의 `/login` 라우트를 통해 `userId`와 `password`로 인증
* 성공 시 JWT 토큰을 반환하며, 이후 모든 API 요청의 `Authorization` 헤더에 토큰 포함

---

## 2. 인증 미들웨어 (`isAuth`)

사용자가 보낸 JWT 토큰을 검증하고, 유효할 경우 사용자 정보를 `req.user`에 저장합니다.

```js
const isAuth = (req, res, next) => {
  const bearerToken = req.headers.authorization
  if (!bearerToken) {
    return res.status(401).json({ code: 401, msg: '토큰이 없습니다.' })
  }
  const token = bearerToken.slice(7)
  jwt.verify(token, config.JWT_SECRET, (err, userInfo) => {
    if (err && err.name === 'TokenExpiredError') {
      return res.status(419).json({ code: 419, msg: '토큰이 만료되었습니다.' })
    } else if (err) {
      return res.status(401).json({ code: 401, msg: '유효한 토큰이 아닙니다.' })
    }
    req.user = userInfo
    next()
  })
}
```

### 적용 예시:

```js
app.use('/platform', isAuth, isAdmin, uploader)
```

---

## 3. 관리자 권한 미들웨어 (`isAdmin`)

사용자가 관리자 권한(`isAdmin: true`)을 가지고 있는지 확인합니다.

```js
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    return res.status(401).json({ code: 401, msg: '당신은 관리자가 아니었습니다!' })
  }
}
```

---

## 4. 회원가입 유효성 검사 (`validator.js`)

회원가입 시 입력값에 대해 정규식 기반의 유효성 검사를 수행합니다.

### 예: 사용자 ID 검증

```js
const validateUserId = () => {
  return check('userId')
    .notEmpty()
    .isLength({ min: 2, max: 20 })
    .matches(/[a-zA-Z]/)
    .matches(/[0-9]/)
    .withMessage('아이디는 영문과 숫자를 포함해야 합니다.')
}
```

### 예: 패스워드 검증

```js
const validateUserPassword = () => {
  return body('password')
    .isLength({ min: 7, max: 15 })
    .matches(/[!@#$%^&*]/)
    .withMessage('특수문자를 포함해야 합니다.')
    .custom((value, { req }) => value === req.body.confirmPassword)
    .withMessage('패스워드가 일치하지 않습니다.')
}
```

---

## 정리

* 로그인 시 JWT 발급 및 프론트 전달
* 모든 인증이 필요한 API는 `isAuth`를 통해 보호됨
* 관리자 전용 API는 `isAdmin`을 추가로 사용
* 사용자 입력은 `express-validator`로 사전 검증

---

이 구조는 **비로그인 사용 권한 제한**, **관리자 기능 구분**, **입력값 유효성 보장**을 동시에 달성할 수 있도록 설계되었습니다.
