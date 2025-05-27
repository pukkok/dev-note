---
title: 예제
---

# 함수 훈련 예제: 요리 기계 함수

### 1. 목적

이 예제는 함수에 대한 이해도를 높이기 위한 **실전 훈련**으로,

* 매개변수 사용
* 조건문 활용
* 반복문과 문자열 조립
* 반환(return) 값 생성
* JSDoc을 통한 명세화

을 모두 포함한 “요리 기계” 시뮬레이션입니다.

---

### 2. JavaScript 구현

```js
const explains = [
  "맛있습니다.", "어중간합니다.", "맛없습니다.", "색다릅니다.", "재밌는 맛입니다."
]

/**
 * @param {string} mainFeatString
 * @param {array} subFeatArray
 * @param {string} tagName
 * @param {string} explainString
 *
 * @description 이 함수는 요리 기계입니다.
 */
function fourth (
  mainFeatString = "된장",
  subFeatArray = ["두부", "버섯", "애호박", "차돌박이"],
  tagName = "div",
  explainString = "찌개에 들어간 다른 재료들은, 다음과 같습니다.: "
) {
  if (mainFeatString === '된장') {
    let ddoock = ""

    for (let idx = 0; idx < subFeatArray.length; idx++) {
      ddoock += subFeatArray[idx] + ', '
    }

    const result = `<${tagName}>${mainFeatString}${explainString}${ddoock}</${tagName}>`
    return result
  } else {
    console.log('요리가 아닙니다.')
  }
}

for (let i = 0; i < explains.length; i++) {
  const denjangjjigae = fourth("된장", ["애호박", "차돌", "두부", "버섯"], "p", explains[i])
  console.log(denjangjjigae)
}
```

📌 조건에 따라 `return` 여부가 결정되며, `for` 루프와 문자열 누적을 통해 가공된 HTML 형식의 문자열이 반환됩니다.

---

### 3. Python 참고 구현 (비교용)

```python
explains = ["맛있습니다.", "어중간합니다.", "맛없습니다.", "색다릅니다.", "재밌는 맛입니다."]
ingredients = ['두부', '버섯', '애호박', '차돌']

def fourth(mainFeatString, subFeatArray, tagName, explainString):
    """
    @param {string} mainFeatString
    @param {array} subFeatArray
    @param {string} tagName
    @param {string} explainString

    @description 이 함수는 요리 기계입니다.
    """
    if mainFeatString == '된장':
        ddoock = ''
        for item in subFeatArray:
            ddoock += item + ', '
        result = f"<{tagName}>{mainFeatString}{explainString}{ddoock}</{tagName}>"
        return result
    else:
        print('요리가 아닙니다.')

for i in range(len(explains)):
    jjigae = fourth('된장', ingredients, 'p', explains[i])
    print(jjigae)
```

---

### 4. 요약 포인트

| 항목        | 사용 방식                                 |
| --------- | ------------------------------------- |
| 함수 매개변수   | 기본값 포함 여러 개 설정                        |
| 조건문       | `if (조건)`으로 흐름 분기                     |
| 반복문       | `for`로 배열 순회하며 문자열 조합                 |
| 반환        | 문자열을 반환하거나, 조건 불만족 시 `console.log` 출력 |
| JSDoc 명세화 | 인자 타입과 함수 설명 제공                       |

---

### 마무리

이 훈련 예제는 실전에서 많이 사용되는

* **매개변수 조합**,
* **조건 분기**,
* **문자열 구성**,
* **JSDoc 활용**
  을 모두 담은 좋은 연습입니다.

이후에는 해당 패턴을 모듈화하거나 사용자 입력에 따라 동적으로 호출하는 구조로 확장해볼 수 있습니다.
