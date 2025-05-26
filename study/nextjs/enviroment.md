## 개요
Next.js는 개발 환경과 배포 환경에 따라 **환경 변수를 자동으로 구분해서 사용할 수 있는 기능**을 제공한다. 
이는 API 주소, 기능 플래그, 디버깅 설정 등 상황에 따라 다른 값을 적용할 때 매우 유용하다.

---

## 환경별 적용 방식
Next.js는 `process.env.NODE_ENV` 값을 기준으로 아래와 같이 환경 변수를 자동 로딩한다:

| 실행 명령어                | 적용되는 .env 파일        | NODE_ENV 값 |
|---------------------------|----------------------------|--------------|
| `yarn dev` 또는 `npm run dev` | `.env.local` 또는 `.env.development` | development |
| `yarn build && yarn start`    | `.env.production`         | production   |

> `.env.local` 파일은 `.gitignore`에 기본 포함되어 있어서, **개인용 변수**를 지정할 때 유용하다.

---

## 브라우저에서 사용하는 변수
Next.js에서 클라이언트(브라우저)에서 사용 가능한 변수는 반드시 이름에 **`NEXT_PUBLIC_` 접두어**를 붙여야 한다.

```env
# .env.development
NEXT_PUBLIC_API_URL=http://localhost:8901
```

```env
# .env.production
NEXT_PUBLIC_API_URL=https://server.io/abc
```

JS 코드에서 접근할 때:
```js
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

> `NEXT_PUBLIC_`이 없는 변수는 서버 측에서만 접근 가능하다 (예: 데이터베이스 비밀번호 등).

---

## 팁: NODE_ENV 값 확인하기
```js
console.log("현재 환경:", process.env.NODE_ENV);
```
> 👉 개발 시엔 `development`, 배포 빌드 후에는 `production`이 출력된다.

---

## 보안 관련 주의사항
- `.env.production`에 **비밀 정보**는 넣어도 되지만,
- `NEXT_PUBLIC_` 변수는 **절대 비밀 정보로 사용하면 안 됨**
  - 이유: 이 변수는 **브라우저에도 노출**되기 때문

---

## 요약 정리
| 목적 | 변수명 예시 | 사용 위치 |
|------|-------------|------------|
| 브라우저 접근용 | `NEXT_PUBLIC_API_URL` | 클라이언트, 서버 모두 |
| 서버 전용 | `DATABASE_SECRET_KEY` | 서버 코드 내부만 |

---

## 정리
Next.js에서 환경 변수를 나누어 사용하는 것은 유지보수성과 보안성을 높이는 필수 전략이다. 
클라이언트에 노출될 값은 `NEXT_PUBLIC_`으로 구분하고, 서버에서만 쓸 민감 정보는 일반 변수로 구분하자.
