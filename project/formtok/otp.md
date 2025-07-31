---
title: 이메일 OTP 인증 API
--------------------

# 이메일 OTP 인증 API

이 문서는 `Express.js` 기반의 이메일 인증(OTP) API 구현 내용을 설명합니다. 사용자는 이메일로 일회용 인증번호(OTP)를 수신하고, 이를 검증하여 인증을 수행할 수 있습니다.

---

## 🔧 주요 의존성

```bash
npm install express nodemailer crypto jsonwebtoken express-async-handler dayjs
```

* `express`: 웹 서버 프레임워크
* `nodemailer`: 이메일 발송 라이브러리
* `crypto`: 보안용 랜덤 OTP 생성
* `jsonwebtoken`: 토큰 생성 (현재 사용되지 않음)
* `express-async-handler`: async 함수 에러 핸들링
* `dayjs`: 날짜 및 시간 처리

---

## 🔐 인증 흐름

1. 사용자가 이메일 입력 → `/send-otp` 요청
2. 서버가 OTP 생성 → 이메일 전송
3. 사용자가 OTP 입력 → `/verify-otp` 요청
4. 서버가 OTP 유효성 검사 및 인증 처리

---

## 📬 POST `/send-otp`

OTP를 이메일로 발송합니다.

### 요청 바디

```json
{
  "email": "example@example.com"
}
```

### 응답 예시

성공:

```json
{ "code": 200, "msg": "OTP 전송 성공" }
```

실패:

```json
{ "code": 500, "msg": "OTP 전송 실패", "error": ... }
```

### 동작 설명

* `generateOtp()`를 통해 8자리 숫자 OTP 생성
* `otpStore[email] = { otp, expiresIn }`에 저장 (유효기간: 5분)
* `nodemailer`로 Naver SMTP 사용하여 이메일 전송

> ⚠️ `config.js` 파일에 이메일 ID, 비밀번호 저장 필요

```js
module.exports = {
  EMAIL_ID: 'your_email@naver.com',
  EMAIL_PW: 'your_password'
}
```

---

## ✅ POST `/verify-otp`

입력된 OTP의 유효성을 검증합니다.

### 요청 바디

```json
{
  "email": "example@example.com",
  "otp": "12345678"
}
```

### 응답 예시

성공:

```json
{ "code": 200, "msg": "유효한 OTP 입니다." }
```

실패:

```json
{ "code": 400, "msg": "유효하지 않은 OTP 입니다." }
```

### 동작 설명

1. `otpStore[email]` 값 확인
2. `expiresIn`이 현재 시간보다 과거인지 검사 (만료 시 삭제)
3. `storedOtp === Number(otp)` 비교
4. 일치 시 OTP 삭제 후 성공 응답 반환

---

## 🧠 기타 참고사항

* `otpStore`는 서버 메모리 기반 → 재시작 시 초기화됨

  * 실제 운영 환경에서는 Redis 등 외부 저장소 사용 권장
* OTP 유효시간은 5분으로 제한됨
* 이메일 전송 실패 시 500 응답 반환

---

## 🖼️ 이메일 템플릿 예시

```html
<div style="font-family: Arial;">
  <h2 style="color: #7E37ED;">FormTok OTP 인증</h2>
  <p>FormTok 서비스 본인 인증을 위해 아래 코드를 입력해 주세요.</p>
  <div style="padding: 20px; background: #fff; border-radius: 8px; text-align: center;">
    <span style="font-size: 24px; font-weight: bold; color: #7E37ED;">12345678</span>
  </div>
  <p style="color: #999; font-size: 14px; margin-top: 20px;">
    이 코드는 5분간 유효합니다. 본인이 요청하지 않은 경우 무시하세요.
  </p>
</div>
```

---

## 전체 코드

```js
const express = require('express')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const expressAsyncHandler = require('express-async-handler')
const dayjs = require('dayjs')
const config = require('../../config')

const router = express.Router()

let otpStore = {}

const generateOtp = () => {
    const otp = crypto.randomInt(10000000, 99999999)
    return otp
}

// 이메일 전송 설정
const transporter = nodemailer.createTransport({
    service: 'naver', // 이메일 서비스
    host: 'smtp.naver.com',
    auth: {
      user: config.EMAIL_ID,  // 본인의 이메일
      pass: config.EMAIL_PW    // 본인의 이메일 비밀번호
    }
})


// OTP 전송 API
router.post('/send-otp', expressAsyncHandler( async (req, res, next) => {

    const email = req.body.email

    // OTP 생성 및 저장

    const otp = generateOtp()

    otpStore[email] = {

        otp,

        expiresIn : dayjs() + 1000 * 60 * 5

    }

    // 이메일 전송

    try{

        await transporter.sendMail({

            from: "Form OTP" <${config.EMAIL_ID}>,

            to : email,

            subject : 'FormTok 인증 코드입니다.',

            html: 

            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; color: #333;">

                <h2 style="color: #7E37ED;">FormTok OTP 인증</h2>

                <p style="font-size: 16px;">안녕하세요,</p>

                <p style="font-size: 16px;">FormTok 서비스의 본인 인증을 위해 아래의 OTP 코드를 입력해 주세요.</p>

                <div style="text-align: center; padding: 20px; background-color: white; border-radius: 8px;">

                    <span style="font-size: 24px; font-weight: bold; color: #7E37ED;">${otp}</span>

                </div>

                <p style="font-size: 14px; color: #999; margin-top: 20px;">

                    이 코드는 5분간 유효합니다. 만약 본인이 요청하지 않은 경우, 해당 이메일로 회신 부탁드립니다.

                </p>

                <p style="font-size: 16px;">감사합니다,<br/>FormTok</p>

            </div>
        })
        res.json({ code: 200, msg: 'OTP 전송 성공'})
    }catch (error){
        res.json({ code: 500, msg: 'OTP 전송 실패', error: error})
    }

}))


// OTP 인증 API
router.post('/verify-otp', (req, res) => {

    const { email, otp } = req.body

    // OTP 유효성 검사

    if (!otpStore[email]) {

      return res.json({ code: 400, msg: '유효하지 않은 이메일 입니다.' })

    }  

    const { otp: storedOtp, expiresIn } = otpStore[email] 

    // OTP 만료 확인

    if (dayjs() > expiresIn) {

      delete otpStore[email] // 만료된 OTP 삭제

      return res.json({ code: 400, msg: '기간이 만료되었습니다.' })

    }  

    // OTP 일치 확인

    if (storedOtp === Number(otp)) {

      delete otpStore[email] // 성공 시 OTP 삭제

      return res.json({ code: 200, msg: '유효한 OTP 입니다.' })

    } 

    return res.json({ code: 400, msg: '유효하지 않은 OTP 입니다.' })

  })

  module.exports = router
```


---

## 📌 요약

* 이메일을 통한 OTP 인증 기능 구현
* Naver SMTP를 통한 이메일 전송
* 서버 메모리 기반 OTP 저장 (5분간 유효)
* `/send-otp`, `/verify-otp` API 제공
