---
title: 고급 사용법
---

# 고급 사용법 정리

### 1. git cherry-pick

`cherry-pick`은 특정 커밋 하나만 선택해서 현재 브랜치에 적용할 수 있는 명령어입니다.

```bash
# main 브랜치로 이동
git checkout main

# 특정 커밋을 cherry-pick
git cherry-pick <커밋 해시>
```

* `dev` 브랜치에 여러 커밋이 있을 때, 그중 하나만 `main` 브랜치에 적용 가능
* `git log`로 커밋 해시를 확인할 수 있음
* 브랜치를 병합하지 않고, 특정 커밋만 선택적으로 적용할 수 있음

---

### 2. git stash

`stash`는 변경사항을 임시로 저장하고, 워킹 디렉토리를 깨끗하게 초기화할 수 있게 해줍니다.

```bash
# 현재 작업 내용을 임시로 저장
git stash

# 저장된 stash 목록 보기
git stash list

# 저장된 내용 적용 (유지됨)
git stash apply

# 저장된 내용 적용 후 삭제
git stash pop
```

* 급히 브랜치를 전환해야 할 때 유용
* `apply`는 복구 후 stash 보존, `pop`은 복구 후 제거

---

### 3. git rebase

`rebase`는 커밋 히스토리를 깔끔하게 유지하고 싶을 때 사용합니다.

```bash
# feature 브랜치에서 main 브랜치 위로 커밋 재배치
git checkout feature
git rebase main
```

* `merge`와 달리 병합 커밋 없이 히스토리가 정리됨
* 충돌이 날 경우 수동으로 해결해야 함
* **주의**: 이미 원격에 푸시된 커밋을 `rebase`할 경우 팀원에게 혼란을 줄 수 있음

---

### 4. git reset

`reset`은 커밋을 이전 상태로 되돌리는 명령어입니다. 강력하지만 주의가 필요합니다.

```bash
# 커밋만 취소 (스테이징 유지)
git reset --soft HEAD~1

# 커밋 + 스테이징 취소 (파일은 유지)
git reset --mixed HEAD~1

# 커밋 + 스테이징 + 파일 변경 취소 (복구 불가)
git reset --hard HEAD~1
```

* `--soft`: 커밋만 취소
* `--mixed`: 커밋 + 스테이징 취소
* `--hard`: 모든 변경 사항 삭제 (주의)

---

### 5. git revert

`revert`는 커밋을 되돌리는 안전한 방법입니다. `reset`과 달리 기록을 유지한 채 무효화합니다.

```bash
# 특정 커밋 되돌리기
git revert <커밋 해시>
```

* 새로운 커밋을 만들어 변경 사항을 무효화
* 협업 중에도 안전하게 사용할 수 있음

---

### 6. git log 및 git diff

#### git log

```bash
# 그래프로 한 줄 로그 보기
git log --oneline --graph --all
```

* `q` 키를 눌러 로그에서 빠져나올 수 있음

#### git diff

```bash
# 워킹 디렉토리 변경사항 보기
git diff

# 스테이징된 변경사항 보기
git diff --staged
```

* 변경된 코드를 비교하고 리뷰하는 데 유용
