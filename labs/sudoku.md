---

title: 스도쿠 게임 (Sudoku)

---

## 프로젝트의 시작

이 스도쿠 퍼즐은 제가 자바스크립트를 교육 받은 이후, <br/>
<span style={{ color: '#e67e22' }}><strong>“자바스크립트로 로직을 직접 구현할 수 있다면 무엇을 해볼 수 있을까?”</strong></span>라는 질문에서 시작된 프로젝트입니다.

처음엔 단순히 스도쿠 퍼즐을 풀 수 있게 만드는 게 목표였지만,
결국엔 완성된 퍼즐을 생성하고, 정답 검증, 난이도 조절, 모바일 대응, UI 전환까지 전부 스스로 구현하게 되었습니다.

**이 프로젝트는 단순한 퍼즐 앱이 아니라,
저에게 “프로그래밍은 문제를 해결하는 도구”라는 깨달음을 준 첫 번째 실험이었습니다.**

### [👉 바로가기](https://pukkok.github.io/sudoku)

![메인화면](/img/labs/sudoku.JPG)

---

## 핵심 로직 설명

이 스도쿠 앱은 단순히 퍼즐을 푸는 기능뿐만 아니라, **완성된 스도쿠 판을 직접 생성하는 알고리즘**을 포함합니다.

```js title="makeSudoku(board)"
function makeSudoku(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        shuffleArray(nums)  // 가능한 숫자를 랜덤 순서로 시도

        for (let i = 0; i < nums.length; i++) {
          const num = nums[i];
          if (isValidSudoku(board, row, col, num)) {
            board[row][col] = num;

            if (makeSudoku(board)) return true;  // 다음 셀로 재귀
            board[row][col] = 0; // 백트래킹
          }
        }
        return false; // 이 칸에 가능한 숫자가 없음
      }
    }
  }
  return true; // 모든 칸이 채워졌을 때 완료
}
```

### ✔️ 유효성 검사 함수

```js
function isValidSudoku(board, row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num) return false;
  }

  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = boxRow; i < boxRow + 3; i++) {
    for (let j = boxCol; j < boxCol + 3; j++) {
      if (board[i][j] === num) return false;
    }
  }

  return true;
}
```

---

## 구현 일지

### 🗓️ 2024-06-24

* 스도쿠 게임 알고리즘 구현

### 🗓️ 2024-06-25

* 난이도 기능 구현
* 반응형 UI 기획 및 모바일 키보드 대응 개선
* 모바일 세로모드 대응: 버튼 아래로 이동

### 🗓️ 2024-08-16

* 타이머 기능 구현
* 승리/패배 시 타이머 종료 처리
* 난이도 선택 시 타이머 초기화 보완
* 전체 기능 마무리
