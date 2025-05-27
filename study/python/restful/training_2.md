---
title: 연습 2
---
### 0. 시작하기전

* 브라우저 : 보여주는 화면(HTML, GUI)
* 클라이언트 : 사용하는 이용자
* 서버 : 인터넷을 통해서 웹 서비스를 제공해 주는 곳

### 1. post 테스트

* 우리는 요청 헤더를 통해 데이터를 받는 경우가 생긴다.
* data를 받는 방법을 알아보자.

```python
from flask import Flask, request, jsonify
```

* `request`를 import에 추가 해주자

```python
@app.route("/post_test", methods=['POST'])
def post_test():
    params = request.get_json()
    print(request.headers["Authorization"])
    print(params)
    response = {
        "result": "받기 성공"
    }

    return jsonify(response)
```

* request.body의 데이터를 `request.get_json()`으로 받아올 수 있다.
* `request.headers["Authorization"]`으로 요청헤더 authorization의 값을 받아 온다.
* 브라우저에서 “안녕하세요”라는 데이터를 request.body로 보낸다.

```ts
const postTestAction = async () => {
  const data = await useFetch('/post-test', 'POST', '안녕하세요')
  console.log(data)
}
```

![image.png](/img/python/restful-2-3.png)

* 요청 헤더의 값과 바디의 데이터를 받은 것을 확인 할 수 있다.

### 2. json데이터 가져와서 보내주기

* import 부분을 추가한다

```python
import json # json파일을 읽을 때 사용

from utils.list_helpers import union_list, count_dictionary # 함수 파일
from services.preference_service import extract_top_5_list # 함수 파일
```

* `json.load()`

  * `json.load(file)`는 JSON 파일의 내용을 파싱하여 Python 딕셔너리로 반환 한다.
  * 여기서는 "./test\_data/movie-information.json" 파일에서 데이터를 읽어온다.

* 현재 DB가 없으니 json파일을 사용하여 데이터를 전달해주는 방식을 구현하겠다.

```python
@app.route('/user-info', methods=["GET"])
def get_user_info():
    option = request.args.get('option') # all과 top_5로 받을것

    with open("./test_data/movie-information.json", "r", encoding="utf-8") as f:
        datas = json.load(f)
        users = datas["users"]

        twenties_like_list = [] # 20대의 like 리스트들의 배열의 값을 넣는다.
        twenties_like_dictionary = {}

        for user in users :            
            if "age" in user : # dictionary의 key값을 가지고 있는지 확인
                if 20 <= user["age"] < 30 : # 20대의 인원
                    
                    if "preferences" in user : # 선호도값을 가지고 있다면
                        user_pref_list = user["preferences"]
                        if "like" in user_pref_list : #like를 가지고 있다면
                            twenties_like_list = union_list(twenties_like_list, user_pref_list["like"])

                            for item in user_pref_list["like"]:
                                count_dictionary(twenties_like_dictionary, item)
        
        top_5 = extract_top_5_list(twenties_like_dictionary)
        print(twenties_like_list)

        if option == 'all' :
            return jsonify(twenties_like_list)
        else :
            return jsonify(top_5)
```

* `request.args.get(’option’)`

  * 쿼리스트링으로 전달 받은 데이터를 불러올 수 있다.
  * ex) localhost:8080/user-info?option=all
* `users = datas["users"]`

  * 딕셔너리(객체)의 값을 가져올 때 파이썬에선 대괄호\[]를 사용하여 키 값을 불러온다.
* `for A in B`

  * B 딕셔너리 안의 A(키 값)을 기준으로 하는 반복문
  * 리스트(배열)에선 `range(len(list))`을 사용하여 반복문을 돌릴 수 있다.
* `if A in B`

  * B 딕셔너리 안에 A의 키 값을 가지고 있는지 확인한다.

### 3-1. with open

* 파이썬의 with...as 구문은 파일 스트림을 다루는데 있어서 파이썬에서 제공하는 강력한 기능 중 하나다.
* 파이썬에선 파일을 다루는 처리를 할때는 필수적으로 파일 오픈(open) 파일 닫기(close) 과정을 거치게 된다.
* **`with` 문을 사용하여 안전하게 파일을 열고 작업 후 자동으로 닫히도록 하는 것이 가장 권장되는 사용법이다.**

### 3-2. 예제

### ex1. 텍스트 파일 열고 읽기

```python
with open('test.txt', 'r', encoding='utf-8') as file:
    content = file.read()  # 파일 전체 내용을 읽음
```

* `with` 문을 사용하면 파일을 열고 작업 후 자동으로 닫히기 때문에 더 안전하게 파일을 다룰 수 있다.

### ex2. 파일 닫기

* 파일을 열고 작업이 끝나면 파일을 닫아 시스템 리소스를 반환해야 한다.
* `with` 문을 사용하면 Python이 **자동으로 파일을 닫아준다**.
* `with` 문을 사용하지 않는 경우 `.close()` 메서드로 명시적으로 파일을 닫아야 한다.

```python
file = open('test.txt', 'r')
# 파일 작업 수행
file.close()  # 작업 후 파일 닫기
```

### 4-1. open() 함수

```python
open(file, mode='r', buffering=-1, encoding=None, errors=None, newline=None, closefd=True, opener=None)
```

* **file**: 파일 경로와 이름을 나타내는 문자열로, 절대 경로나 상대 경로를 사용할 수 있다.
* **파일 모드(`mode`) 옵션**

  * `mode` 매개변수는 파일을 읽고, 쓰고, 덧붙이고, 새로 만들 때 어떤 방식으로 열지 지정한다.
  * 기본값은 `'r'`(읽기)

| 모드    | 설명                                         |
| ----- | ------------------------------------------ |
| `'r'` | 읽기 전용 모드로 파일 열기. 파일이 존재하지 않으면 오류를 발생한다.    |
| `'w'` | 쓰기 전용 모드로 파일 열기. 파일이 없으면 새로 만들고, 있으면 덮어쓴다. |
| `'a'` | 추가(append) 모드로 파일 열기. 파일이 없으면 새로 만든다.      |
| `'x'` | 배타적 쓰기 모드로 파일 열기. 파일이 이미 존재하면 오류를 발생시킨다.   |
| `'b'` | 바이너리 모드로 파일 열기. (텍스트 모드가 아닌 경우)            |
| `'t'` | 텍스트 모드로 파일 열기. (디폴트)                       |
| `'+'` | 읽기와 쓰기를 모두 할 수 있는 모드로 파일을 열기.              |

* **encoding**: 텍스트 파일의 인코딩을 지정하는 문자열
* **errors**: 인코딩 및 디코딩 중 오류를 처리하는 방법을 설정

  * `'ignore'`를 설정하면 오류가 발생해도 해당 오류를 무시하고 진행한다.
* **newline**: 텍스트 모드에서 줄바꿈 문자를 제어

  * 기본값은 `None`이며, 이 경우 OS 기본 설정이 사용 된다.

### 4-2. 예제

### ex1. 텍스트 파일 쓰기

```python
with open('test.txt', 'w', encoding='utf-8') as file:
    file.write("파이썬에서 글쓰기")
```

* `'w'` 모드를 사용하면 기존 파일의 내용을 지우고 새로운 내용을 기록

### ex2. 파일에 내용 추가하기

```python
with open('test.txt', 'a', encoding='utf-8') as file:
    file.write("\nAdditional line")
```

* `'a'` 모드를 사용하면 기존 파일의 내용은 유지하고, 파일 끝에 새로운 내용을 추가한다.

### ex3. 바이너리 파일 읽기

```python
with open('image.png', 'rb') as file:
    binary_data = file.read()  # 파일의 바이너리 데이터를 읽음
```

* 이미지 파일과 같이 바이너리 데이터를 읽을 때는 `'rb'` 모드를 사용

### 4-3. 기타 주요 속성

* `file.name`: 열려 있는 파일의 이름을 반환
* `file.mode`: 파일의 모드를 반환
* `file.closed`: 파일이 닫혀 있는지 여부를 반환

### 4-4. 예외 처리

파일 작업 도중 오류가 발생할 수 있으므로 `try-except` 구문을 사용하여 예외를 처리하는 것이 좋다.

```python
try:
    with open('test.txt', 'r') as file:
        content = file.read()
except FileNotFoundError:
    print("파일을 찾을 수 없습니다.")
```

### 5. list-helpers.py(custom)

```python
def union_list (listA, listB):
    setA = set(listA)
    setB = set(listB)
    # 결과를 list로 변환하여 반환
    return list(setA.union(setB))

def count_dictionary (dictA, item):
    if item in dictA:
        dictA[item] += 1
    else :
        dictA[item] = 1
```

* `set`

  * 자바스크립트의 set과 비슷한 역할을 한다.
  * 중복 항목을 제거하고 집합으로 변경해준다.
* `A.union(B)`

  * A와 B의 합집합을 구한다.
* `list`

  * list 형태로 변환 한다.
  * **집합(set) 상태로는 json형태를 만들지 못한다.**

### 6. preference\_serviece.py(custom)

```python
def extract_top_5_list(listA):
    """
    x:x[0] = key를 기준으로 정렬 
    x:x[1] = value를 기준으로 정렬
    x의 값은 어떤 값이 들어가도 상관 없다.
    """
    sorted_items = sorted(listA.items(), key=lambda x: x[1], reverse=True)
    result_list = []
    for item in sorted_items[:5]:
        typeCasting = {item[0]: item[1]}
        result_list.append(typeCasting)
    
    return result_list
```

* `listA`는 아이템을 `count_dictionary` 로 완성된 딕셔너리의 값을 받는다.
* 딕셔너리는 `{ 아이템 : 개수 }` 로 이루워져 있다.
* `sorted()`

  * `lambda`를 이용하여 딕셔너리를 값(`x[1]`) 기준으로 내림차순 정렬
  * `reverse=True` 내림차순으로 정렬

    * 값을 넣지 않는다면, 오름차순이 default
* 각 항목을 `{key: value}`형식의 딕셔너리로 변환

### 7. 결과 확인(browser)

```ts
const getTop5 = async () => {
    const data = await useFetch('/user-info?option=top_5')
    const newResult = data.map((item : Record<string, number>, idx : number) => {
      let text = ''
      for(let genre in item){
        text = (idx + 1) + "위 : " + genre + "는 " + item[genre] + "명이 선호합니다."
      }
      return text
    })
    setResult(newResult)
  }

  const getAllList = async () => {
    const data = await useFetch('/user-info?option=all')
    const text : string = 
    "20대가 선호하는 전체 리스트로는\n" +
    data.join(', ') +
    "\n등 이 있습니다.\n"
    setResult(text)
  }
```

* 20대 선호 장르 top5

![image.png](/img/python/restful-2-1.png)

* 20대 선호 장르 전체

![image.png](/img/python/restful-2-2.png)
