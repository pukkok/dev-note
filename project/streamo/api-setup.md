---
title: API 개발 환경 구성
---

# API 연동을 위한 개발 환경 구성

Streamo 프로젝트에서 **프론트엔드 개발을 전담**하였으며, 백엔드는 협업자가 관리하였기 때문에 실제 API 서버와의 연동을 위해 로컬에서 테스트 가능한 환경을 직접 구성해야 했습니다. 이를 위해 다음과 같은 설정을 단계적으로 적용했습니다.

---

### 1단계: launch.json을 통한 백엔드 실행 자동화

백엔드(Spring Boot)가 VSCode에서 빠르게 실행되도록 다음과 같이 `launch.json`을 설정해두었습니다:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "java",
      "name": "MovieApplication",
      "request": "launch",
      "mainClass": "streamo.movie.MovieApplication",
      "projectName": "movie",
      "vmArgs": "-Dspring.profiles.active=local -Djasypt.encryptor.password=******"
    }
  ]
}
```

* `spring.profiles.active=local`로 로컬용 설정 파일을 사용
* `jasypt.encryptor.password`는 민감한 정보이므로 실제 포트폴리오에서는 마스킹 처리하거나 환경변수로 대체

> ✅ Run → Start Debugging(F5)으로 바로 백엔드 서버 실행 가능

---

### 2단계: 프론트엔드에서 API 요청을 위한 Proxy 설정

프론트엔드와 백엔드가 각기 다른 포트(localhost:3000 / localhost:8080)에서 동작했기 때문에, **CORS 이슈를 피하기 위해 proxy 설정이 필요**했습니다.

`next.config.js` 예시:

```js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/api/:path*'
      }
    ]
  }
}
```

* 개발 중에는 `/api/...`로 요청 시 자동으로 백엔드 서버로 프록시 전송됨
* 이 설정은 **개발 환경에서만 유효**하며, 실제 배포에서는 사용되지 않음

---

### 3단계: 환경 변수 분리 (.env)

API 주소와 같은 외부 설정값은 환경에 따라 달라지므로, `.env` 파일을 환경별로 나누어 관리했습니다.

예시:

```bash
# .env.development
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api

# .env.production
NEXT_PUBLIC_API_BASE_URL=https://api.streamo.app/api
```

프론트엔드 코드에서는 다음처럼 환경변수를 활용하여 API 요청 경로를 구성했습니다:

```js
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
```

> ~~.env 파일은 Git에 커밋되지 않도록 .gitignore 에 포함~~

---

이러한 개발 환경 세팅을 통해 Streamo 프로젝트에서는 **독립된 프론트엔드 개발 환경에서도 실제 API와 유사한 테스트가 가능**했고, 배포 시에도 환경 변수 기반으로 설정 충돌 없이 API 연동을 유지할 수 있었습니다.
