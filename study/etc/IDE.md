---
title: 통합개발환경
---

# 에디터와 개발 환경 기초 (VSCode)

### 1. 통합개발환경(IDE: Integrated Development Environment)

* **VSCode**: 텍스트 편집기 기반에서 출발했지만 다양한 기능을 **조립**할 수 있는 구조
* 기존의 무거운 개발 도구에 비해 가볍고 빠름
* 단점: 설정을 직접 해야 하고, 때때로 오류 발생
* 장점: 오류 찾기 쉬움, 확장성 뛰어남

#### 주요 IDE 예시

* VSCode (가볍고 확장성 우수)
* Visual Studio (무거우나 강력함)
* IntelliJ, PyCharm, WebStorm 등 (JetBrains 제품군)

---

### 2. VSCode의 프로젝트 단위 이해

* **프로젝트 = 디렉토리 = 폴더 = 서류철**
* VSCode에서는 "파일 열기"보다 \*\*"폴더 열기"\*\*가 기본

```text
단축키: Ctrl + K, O
```

* **CLI(명령줄)** 도구가 통합된 환경 제공 → VSCode 인기 요인 중 하나
* 터미널 내장: 단축키 \`Ctrl + \`\` (백틱)

#### 왜 에디터를 쓸까?

* **Line-by-Line** 명령어보다 **script 방식**(파일로 작성하고 실행)이 효율적이기 때문

---

### 3. VSCode 설정 팁 (기본 세팅)

#### ▸ 탭 사이즈 설정

* JS: 2칸
* Python: 4칸
* 설정 위치: `Settings > Editor: Tab Size`

#### ▸ 자동 줄바꿈 (Word Wrap)

* 긴 줄이 창 너머로 넘어가지 않게 함
* 설정 위치: `Settings > Editor: Word Wrap → on`

> 필요에 따라 다시 끌 수 있음 (긴 코드 읽기 불편할 경우)

---

### 요약

* 폴더 단위로 작업하고, CLI와 에디터를 결합해서 개발 환경 구성
* VSCode는 가볍고 유연하지만 설정이 필요함
* 초기 설정 (탭, 워드랩 등)만 잘 해도 사용성이 크게 향상됨
