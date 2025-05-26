---
title: 'API Proxy 가이드'
---

# API 프록시 구성 가이드

## 구조 개요

Next.js에서는 프론트엔드가 `/api/...` 경로로 모든 API 요청을 보냅니다.
`next.config.js`에서 요청 경로 및 HTTP 메서드를 기준으로 백엔드 서버로 프록시 분기할 수 있습니다.

---

## 요청 흐름 예시

| 요청 경로          | HTTP 메서드 | 프록시 대상 서버                          |
| -------------- | -------- | ---------------------------------- |
| `/api/video`   | `POST`   | `VIDEO_UPLOAD_API_URL` (영상 업로드 서버) |
| `/api/video`   | `GET`    | `API_URL` (일반 API 서버)              |
| `/api/video/*` | 모든       | `API_URL`                          |
| `/api/*`       | 모든       | `API_URL`                          |
| `/static/*`    | 모든       | `API_URL`                          |

---

## 환경변수 설정

`.env.development` (개발 환경):

```env
API_URL=http://localhost:8901
VIDEO_UPLOAD_API_URL=http://localhost:8901
```

`.env.production` (운영 환경):

```env
API_URL=https://example.devstat.app
VIDEO_UPLOAD_API_URL=https://example.devstat.app
```

> `API_URL`, `VIDEO_UPLOAD_API_URL`은 서버 전용 환경변수입니다.
> `NEXT_PUBLIC_` 접두어는 필요하지 않습니다.

---

## next.config.js 설정

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/video',
        has: [{ type: 'method', value: 'POST' }],
        destination: `${process.env.VIDEO_UPLOAD_API_URL}/api/video`,
      },
      {
        source: '/api/:path*',
        destination: `${process.env.API_URL}/api/:path*`,
      },
      {
        source: '/static/:path*',
        destination: `${process.env.API_URL}/static/:path*`,
      },
    ]
  },
}

export default nextConfig
```

---

## 클라이언트 코드 예시 (axios)

```js
// 업로드 요청 (POST → 업로드 서버)
await axios.post('/api/video', formData)

// 조회 요청 (GET → 일반 API 서버)
await axios.get('/api/video')

// 카테고리 조회
await axios.get('/api/video/category')
```

---

## 장점

* 프론트엔드에서 API 주소 하드코딩 제거
* `rewrite`를 통해 역할 분리 및 라우팅 명확화
* 개발/운영 환경 모두 `.env`로 자연스럽게 분기
* 보안성과 유지보수성이 뛰어난 구조
