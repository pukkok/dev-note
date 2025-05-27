---
title: '404 리다이렉트'
---


# GitHub Pages에서 404.html 설정하기

GitHub Pages는 React, Vue, Docusaurus 같은 SPA(Single Page Application)를 배포할 때, 경로를 직접 새로고침하면 404 오류가 발생합니다. 이를 해결하기 위해 **404.html 파일을 루트에 두고 경로를 리디렉션하는 방식**을 사용합니다.

## 왜 404.html이 필요한가?

GitHub Pages는 서버가 없기 때문에 모든 경로를 `index.html`로 처리해주지 않습니다.
즉, 사용자가 직접 `/docs/some-page`로 이동하면 해당 경로의 실제 파일이 없으면 404가 발생합니다.

SPA는 클라이언트 사이드 라우팅을 사용하므로, 초기 진입점이 항상 `index.html`이 되어야 합니다.

## 해결 방법

`build/index.html` 파일을 `build/404.html`로 복사하면 됩니다.
Docusaurus를 사용하는 경우:

### package.json 예시

```json
"scripts": {
  "deploy": "docusaurus build && cp build/index.html build/404.html && docusaurus deploy"
}
```

이렇게 하면 `404.html`도 함께 배포되며, GitHub Pages에서 경로를 잘못 입력해도 SPA가 정상적으로 동작하게 됩니다.

> Windows 사용자라면 `cp` 대신 `copy` 명령어를 사용하거나 cross-platform 지원 도구(`cpx`, `shx` 등)를 설치하는 것도 좋습니다.

### 예시 (Windows 환경):

```json
"deploy": "docusaurus build && copy build\\index.html build\\404.html && docusaurus deploy"
```

---

## 테스트 방법

배포 후 GitHub Pages 주소에 존재하지 않는 경로로 직접 진입:

```
https://USERNAME.github.io/REPO_NAME/unknown-route
```

→ 정상적으로 SPA 진입점으로 리디렉션되면 성공입니다.

---

## 참고

* [https://docusaurus.io/docs/deployment](https://docusaurus.io/docs/deployment)
* [https://create-react-app.dev/docs/deployment/#serving-apps-with-client-side-routing](https://create-react-app.dev/docs/deployment/#serving-apps-with-client-side-routing)
