---
title: githubActions (gh-pages CI/CD)
---

#  GitHub Pages 배포 실패 → 성공
> Docusaurus를 예시로 사용합니다.

---

## 상세 문제 기록 및 해결 과정

### 1. 배포 준비 단계에서 겪은 첫 번째 에러: Git 커밋 작성자 정보 없음
- 에러 메시지:
```sql
Author identity unknown
*** Please tell me who you are.
fatal: empty ident name (...) not allowed
```

- 상황: 
  - GitHub Actions 워크플로우에서 자동으로 `git commit` 명령을 실행했는데, <br/>
  기본 커밋 작성자 **이름**과 **이메일**이 설정되어 있지 않아 실패함.

- 원인: 
  - Git은 커밋을 만들 때 반드시 사용자 **이름과 이메일**을 알아야 한다.
  - 워크플로우 환경에서는 기본값이 없기 때문에 직접 설정해줘야 한다.

- 해결 방법: 
  - 워크플로우 스크립트에 다음 명령을 추가해서 Git config 설정을 명확히 해줌.
```bash
git config --global user.name "pukkok"
git config --global user.email "krystalgggg@gmail.com"
```

- 효과: 
  - 이 설정 후 커밋 명령이 정상 작동하여 커밋 실패가 없어짐.

<br/>

### 2. HTTPS 인증 관련 문제와 혼란
- 에러 메시지:
```sql
fatal: could not read Password for 'https://pukkok@github.com': No such device or address
```

- 상황: 
  - 자동 배포 시 `git push` 단계에서 인증 실패로 푸시가 막힘.

- 원인: 
  - GitHub Actions에서 HTTPS 방식으로 `git push` 할 때 인증 토큰이 없거나 올바르게 전달되지 않으면 이런 문제가 생긴다.
  - GitHub Secrets에 토큰을 등록할 때, `GITHUB_TOKEN` 같은 이름을 쓰면 GitHub 보안 정책 때문에 등록이 막힌다.
  - 또, 기존에 생성한 토큰을 복사해서 쓰면 권한이 맞지 않거나 설정이 꼬일 수 있음.

- 시도한 조치:
  - 토큰 이름을 `DEPLOY_TOKEN` 등으로 변경해 Secrets에 등록
  - 워크플로우 환경변수로 `GITHUB_TOKEN: ${{ secrets.DEPLOY_TOKEN }}` 설정
  - 그러나 여전히 같은 인증 오류 발생

<br/>

### 3. SSH 키 인증 방식으로 전환
- 상황 :
  - HTTPS 인증 문제 때문에 SSH 방식으로 전환하기로 결정함.

- SSH 키 생성 과정:
```bash
ssh-keygen -t ed25519 -C "krystalgggg@gmail.com"
```

- 출력 내용 주요 포인트:
  - 개인키는 `~/.ssh/id_ed25519`에 저장됨
  - 공개키는 `~/.ssh/id_ed25519.pub`에 저장됨

> `The key fingerprint is:` 이후 내용은 키 지문이며 참고용 <br/>
> cli 환경에서 파일 경로로 들어가면 **키의 정보**를 확인할 수 있다. 
> 전체를 복사해서 사용하면 된다.

- GitHub 등록:
  - 공개키(id_ed25519.pub) 내용을 복사해서 GitHub 레포지토리 Settings > Deploy keys 또는 SSH and GPG keys에 붙여넣음
  - 개인키(`id_ed25519`) 전체 내용을 GitHub Secrets에 `ACTIONS_DEPLOY_KEY`라는 이름으로 등록함

- 워크플로우 변경:
  - `webfactory/ssh-agent@v0.8.1` 액션 추가하여 Secrets의 개인키를 로드해 SSH 에이전트에 등록
  - `Git config`는 이전과 동일하게 유지
  - deploy 스크립트는 **SSH 키 인증**으로 `git push` 수행

- 효과:
  - 이제 git push 시 SSH 인증으로 원활히 동작
  - 이전 HTTPS 방식에서 겪던 비밀번호 읽기 실패 문제 완전히 해결

<br/>

### 4. GitHub Actions 워크플로우 예시

```yaml
name: Deploy Docusaurus

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Configure Git
        run: |
          git config --global user.name "pukkok"
          git config --global user.email "krystalgggg@gmail.com"

      - name: Setup SSH
        run: |
          mkdir -p ~/.ssh
          echo "${{ secrets.ACTIONS_DEPLOY_KEY }}" > ~/.ssh/id_ed25519
          chmod 600 ~/.ssh/id_ed25519
          ssh-keyscan github.com >> ~/.ssh/known_hosts

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        run: yarn install --frozen-lockfile

      - name: Build and Deploy
        env:
          USE_SSH: true
        run: yarn auto-deploy
```

<br/>

### 5. 추가 팁 및 주의사항

- 토큰 방식 배포 시:
  - 토큰 권한에 repo scope가 반드시 포함돼야 함
  - GitHub에서 `GITHUB_TOKEN` 이름으로 등록하는 토큰은 자동으로 세팅되지만, <br/> 
    직접 만든 토큰을 쓸 땐 `GITHUB_` 접두어가 붙으면 등록이 안 됨
- SSH 키 방식은 초기 등록만 잘 해놓으면 이후에 비교적 문제 없이 배포 가능
- **개인키(비밀키)는 절대 공개하지 말고** `GitHub Secrets`에 안전하게 저장할 것
- 공개키는 레포지토리 설정(`Deploy keys`)에 등록해야만 권한이 생김
  - title은 크게 문제없다.

---

### 6. 마무리
이 문서는 직접 겪은 문제들과 시도했던 해결책, 그리고 **최종 성공한 과정**을 전부 작성함.