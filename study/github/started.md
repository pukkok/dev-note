---
title: 기본 사용법
---

# 기본 사용법 정리

### 1. 기본 설정 및 초기화

먼저, Git이 설치된 후 아래 명령어로 사용자 정보를 설정한다.

```bash
# 사용자 이름과 이메일 설정
git config --global user.name "name"
git config --global user.email "email@domain.com"
```

---

### 2. 새로운 Git 저장소 만들기

새로운 프로젝트를 시작하거나 기존 프로젝트를 Git으로 관리할 때 사용한다.

```bash
# 프로젝트 폴더로 이동
cd project

# Git 저장소 초기화
git init
```

---

### 3. 파일 추가 및 커밋

저장소에 파일을 추가하고 커밋한다.

```bash
# 변경된 모든 파일을 스테이징 영역에 추가
git add .

# 커밋하기
git commit -m "커밋할 내용"
```

* `git add .` : 현재 디렉토리의 모든 파일을 스테이징 영역에 추가
* `git commit -m "메시지"` : 변경 사항을 저장하고 설명 메시지를 남김

---

### 4. GitHub에 원격 저장소 추가 (리포지토리 생성)

1. GitHub에서 새로운 저장소(repository)를 생성
2. 아래 명령어를 사용하여 원격 저장소를 연결

```bash
# 원격 저장소 추가
git remote add origin https://github.com/username/repository.git

# 원격 저장소 확인
git remote -v
```

---

### 5. 코드 푸시 (Push)

로컬 코드를 GitHub에 업로드하는 명령어

```bash
git push -u origin main
```

* 최초 1회 `-u` 옵션으로 기본 브랜치를 설정해두면 이후 `git push`만으로도 사용 가능함

---

### 6. 변경 사항 가져오기 및 병합

다른 사람이 푸시한 내용을 가져오거나, 최신 상태를 반영할 때 사용한다.

```bash
# 변경 사항 가져오기
git pull origin main

# 프로젝트 복사하기 (최초 clone)
git clone https://github.com/username/repository.git
```

---

### 7. 브랜치 사용하기

새로운 기능 개발 등을 위해 브랜치를 생성하여 작업한다.

```bash
# 새로운 브랜치 생성
git branch new-branch

# 브랜치로 전환
git checkout new-branch

# 브랜치를 생성하고 바로 전환
git checkout -b new-branch
```

* 브랜치를 활용해 기능 단위 개발을 독립적으로 진행 가능

---

### 8. 브랜치 병합하기

작업한 브랜치를 메인 브랜치에 병합하는 과정이다.

```bash
# main 브랜치로 전환
git checkout main

# 브랜치 병합
git merge new-branch

# 병합 완료 후 브랜치 삭제
git branch -d new-branch
```

* 병합 순서:

  1. 병합될 브랜치(main)로 전환
  2. 작업한 브랜치(예: new-branch)를 병합
  3. 병합이 완료되면 필요에 따라 브랜치 삭제
