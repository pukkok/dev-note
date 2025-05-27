---
title: 403 Permission 에러
---

# GitHub 연동 시 403 Permission 에러 해결
### 문제

```text
remote: Permission to ...
fatal: Authentication failed for ...
```

GitHub에 푸시하려 할 때 403 오류 발생.
특히 **다른 컴퓨터에서 기존 계정이 Git에 등록되어 있을 때** 자주 발생한다.

---

### 원인

* `git config`에 등록된 사용자 계정이 실제 인증 정보와 맞지 않음
* 또는 **기존에 등록된 credential 캐시**가 꼬여 있을 가능성

---

### 시도했던 방법 (실패)

```bash
git config user.name "pukkok"
git config user.email "krystalgggg@gmail.com"
```

> 단순 사용자 정보만 변경했기 때문에 credential 인증 정보는 그대로 유지되어 오류가 해결되지 않음

---

### 해결 방법 (성공)

```bash
git config credential.username "pukkok"
git config credential.useremail "krystalgggg@gmail.com"
```

또는, 아래 명령어로 GitHub 자격 증명을 초기화 후 다시 입력:

```bash
git credential-cache exit
```

또는 (Windows 기준)

```bash
git credential-manager clear
```

그리고 다시 push 시도하면 GitHub 계정 정보를 새로 입력할 수 있음.

---

###  팁

* GitHub는 HTTPS 방식 인증 시 기본적으로 토큰을 요구
* **개인 액세스 토큰 (PAT)** 을 발급해 비밀번호 대신 사용해야 함
* 캐시된 credential을 전부 제거하고 재로그인 하면 해결되는 경우 많음

---

### 참고

* [https://docs.github.com/en/get-started/getting-started-with-git/caching-your-github-credentials](https://docs.github.com/en/get-started/getting-started-with-git/caching-your-github-credentials)
* [https://github.com/GitCredentialManager/git-credential-manager](https://github.com/GitCredentialManager/git-credential-manager)
