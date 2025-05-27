---
title: 연습 1
---

### 0. 시작하기전

```powershell
pip install flask flask_cors
```

- 패키지 2개를 설치하고 시작한다.
- flask : restful API를 구현하기 위한 서버
- flask_cors : cors설정

### 1. 서버 구현 시작(main.py)

```python
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    insa = '안녕하세요.'
    return jsonify(insa)

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=8080)
```

### 2. from import 방식

- 파이썬은 import 방식은 리액트와 반대로 되어있었다.
- 찾아오는 방식은 동일하지만 from을 앞에 써서 사용한다.

### 3. app = Flask(__name__)

- `express.js`에서 사용할 때를 예로들면 app으로 서버를 만드는 것과 같다.

```jsx
const express = require('express')
const app = express()
```

- `Flask(__name__)`는 Flask 애플리케이션 인스턴스를 생성한다.
- `__name__`은 애플리케이션이 시작될 때 모듈의 이름을 전달한다.
    - 주로 Flask가 애플리케이션 경로를 설정하는 데 사용한다.
    - ex) 템플릿 파일이나 정적 파일의 위치를 찾는 데 활용
- 이 인스턴스를 통해 애플리케이션의 엔드포인트(라우트), 설정, 기능 등을 추가하고 서버를 실행할 수 있다.

<aside>
💡

### 인스턴스란?

- 객체 지향 프로그래밍(Object Oriented Programming)에서 class에 소속된 개별적인 객체를 말한다.
- app = flask(__name__)을 예시로 살펴보면
    - app 은 **인스턴스**
        - 만들어진 결과물
    - flask(__name__)는 **클래스**, **구조체**
        - 설계도, 틀 같은 역할이다.
    - app = flask(__name__) 가 **인스턴스화** 이다.
</aside>

### 4. CORS(app)

- `CORS(app)`는 **Cross-Origin Resource Sharing(CORS)**를 활성화하기 위해 사용한다.
- **CORS**는 웹 애플리케이션이 자신과 다른 출처(origin, 도메인)의 자원에 접근할 수 있도록 허용하는 보안 설정이다. 웹 브라우저는 보안 상의 이유로 동일 출처 정책(Same-Origin Policy)을 적용하므로, 다른 도메인에 있는 자원(예: API)으로부터 데이터를 가져오는 것이 기본적으로 제한된다.
- `CORS(app)`로 CORS 설정을 활성화하면 브라우저에서 다른 출처의 요청을 허용할 수 있다.
    - 예를 들어, `localhost:8080`에서 실행 중인 서버에 `localhost:3000`과 `localhost:4000`에서 접근할 수 있도록 허용해 준다고 한다면 아래와 같이 사용한다.
    
    ```jsx
    CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "http://localhost:4000"]}})
    ```
    
    - 물론 resources를 분리해서 사용해도 된다.
    
    ```jsx
    option = {
        r"/*" : {
            "origins": [
                "http://localhost:3000", 
                "http://localhost:4000"
            ]
        }
    }
    CORS(app, resources=option)
    ```
    
- `resources={r"/*": {"origins": "*"}}` 옵션은 모든 엔드포인트에서 모든 도메인의 요청을 허용하는 설정이다.

### 5. jsonify

- Flask에서 **JSON 형식의 응답**을 쉽게 생성할 수 있도록 하는 함수
- Python의 기본 데이터 타입(**문자열, 딕셔너리(객체), 리스트(배열)** 등)을 
JSON 형식으로 변환하여 HTTP 응답으로 반환한다.
- JSON : 주로 웹 API에서 데이터를 전달하는 데 사용되며, 클라이언트 측에서 쉽게 다룰 수 있는 표준 형식

### 6. 라우트(엔드포인트 설정)

- `@app.route('/')`
    - 아무 옵션을 설정하지 않았을 때 모든 html 메서드를 받는다.
        - express.js에서 app.use(’/’)으로 설정하는 것과 동일하다.
    - route안에 엔드포인트를 설정하여 경로를 지정할 수 있다.
    - `@app.route("/post-method", methods=['POST'])` 처럼 html 메서드를 지정해서 받을 수도 있다.

### 7. 서버 연결

- Flask 애플리케이션을 실행할 때 `if __name__ == "__main__":` 구문을 사용하여 앱을 시작한다.
- 이 구문은 파이썬 스크립트가 직접 실행될 때만 특정 코드가 실행되도록 하는 조건이다.
1. **`__name__` 변수**
    - 파이썬에서 모든 모듈(파일)은 실행 시 `__name__`이라는 특별한 변수를 가진다.
        - 이 변수는 모듈의 이름을 나타내며, 모듈이 어떻게 실행되었는지에 따라 값이 달라진다.
        - **직접 실행**될 때: 만약 해당 파일이 직접 실행되는 **메인 프로그램**이라면, 
        `__name__` 변수는 `"__main__"`으로 설정된다.
        - 우리는 개발환경에서 서버를 실행 할 때 `py main.py`로 실행시킬 것이다.
            - express.js를 앱을 실행시킬 때 `node index.js`와 같다.
        - **모듈로 임포트**될 때: 다른 모듈에서 import할 경우, 
        `__name__` 변수는 해당 모듈의 파일 이름(또는 모듈의 이름)으로 설정된다.

b.  `__main__` 이란?

- `__main__`은 파이썬에서 직접 실행되는 파일을 의미한다.
- 즉, 스크립트가 직접 실행될 때만 `__name__`의 값이 `"__main__"`으로 설정된다.
- 반대로, 해당 파일이 다른 곳에서 import된 경우 `__name__` 값은 `"__main__"`이 아니게 됩니다.

### 3. `if __name__ == "__main__":` 의 역할

- 모듈이 **직접 실행될 때**만 특정 코드를 실행하도록 한다.
- 예를 들어, Flask 서버를 실행하는 코드가 여기에 포함되면, 
해당 파일을 **직접 실행할 때**는 서버가 구동 되지만, 
다른 파일에서 이 모듈을 import할 때는 서버 실행 코드를 건너뛴다.
- `if __name__ == "__main__":` 구문은 파일이 직접 실행될 때에만 특정 코드를 실행하도록 제어한다.

```python
if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=8080)
```

- 이 코드는 `app.run()`을 호출하여 Flask 서버를 시작한다.
- `debug=True`는 Flask 디버그 모드를 활성화하여 코드를 수정할 때마다 서버가 자동으로 다시 시작되도록 한다.
    - nodemon라이브러리를 사용할 때와 같은 느낌
- `host='0.0.0.0'`은 서버가 네트워크의 모든 IP에서 접속을 허용하도록 설정한다.
- `port=8080`은 서버가 `8080`번 포트에서 실행되도록 한다.

### 6. 데이터 받아보기

- python 서버가 구동 중이라고 가정한다.
    - 구동 중이 아니라면 구동 후 다시 진행 `py main.py`
- 여기선 react를 사용해서 브라우저를 구현하겠다.

**a. useFetch.ts**

- 경로를 입력해서 데이터를 받아온다.
- baseurl은 배포한다면 환경 변수로 변경한다.

```tsx
/**
 * @param {string} path
 * @param {method} string
 * @param {any} body
 * @param {string} token
 * 
 * @description
 * 경로를 입력합니다.
 */

const useFetch = async (path: string, method: string='GET', body: any='', token: string='') :Promise<any> => {
  const baseServerUrl = 'http://127.0.0.1:8080'
  let req : RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      'Authorization' : `Bearer ${token}`
    },
    body : JSON.stringify(body)
  }
  if(method === 'GET') req = { method }
  const res = await fetch(baseServerUrl+path, req)
  return res.json()
}

export default useFetch
```

**b. App.tsx**

```jsx
import { useState } from 'react';
import useFetch from './hook/useFetch';

const App = () => {

  const [result, setResult] = useState<string | null>(null)

  const helloAction = async () => {
    const data = await useFetch('/')
    setResult(data)
  }
  
  return (
    <div className="App">
      <h1>파이썬 데이터 결과 보기</h1>
      <button type='button' onClick={helloAction}>안녕 버튼</button>
      <hr/>
      <div>
        <p>{result}</p>
      </div>
    </div>
  )
}

export default App
```

- 안녕 버튼을 클릭한 경우 인사의 데이터를 받아 올 수 있다.

![image.png](/img/python/restful-1-1.png)