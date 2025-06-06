---
title: __init__.py & __pycache__
---

# __init__.py 와 __pycache__폴더

### 1-1. **`__init__.py`**

- `__init__.py`는 **폴더를 파이썬 패키지로 인식하게 하는 파일**이다.
- 이 파일이 있는 폴더는 모듈을 포함하는 패키지로 간주되므로, 다른 모듈이나 파일에서 폴더를 임포트할 수 있게 된다.

### 1-2. 주요 역할과 사용법

- **패키지로 인식**: 파이썬 3.3 이후에는 패키지로 인식시키기 위해 반드시 필요하지는 않지만, 
`__init__.py`가 있으면 **명시적으로 패키지임을 나타내는 역할**을 한다.
- **모듈 초기화 코드 작성**: `__init__.py`에 코드나 설정을 추가해 패키지가 import될 때 초기화 작업을 실행할 수 있다.
- **객체, 함수 관리**: `__init__.py`에 특정 함수, 클래스, 변수 등을 임포트해서 다른 파일에서 쉽게 접근하도록 할 수 있다.

### 2-1. **`__pycache__` 폴더**

- `__pycache__`는 **파이썬 인터프리터가 컴파일한 바이트코드 파일을 저장하는 폴더**다.
- 파이썬 코드를 한 번 실행하면 인터프리터는 `.py` 파일을 `.pyc` 파일로 컴파일하여 저장하고, 
`__pycache__` 폴더에 위치시킨다.

<aside>
💡

### 인터프린터와 컴파일 언어

인터프리터(interpreter, 문화어: 해석기)는 **프로그래밍 언어의 소스 코드를 바로 실행하는 컴퓨터 프로그램 또는 환경**이다.

컴파일 언어(compiled language)는 **코드가 실행되기 전 컴파일러를 거쳐서 기계어로 모두 변환되어 실행되는 프로그래밍 언어**이다.

</aside>

- 이 파일들은 개발자가 **수동으로 관리할 필요**는 없다.
    - 자동으로 폴더가 생성된다.
    - `.gitignore`에 추가하여 소스 코드 저장소에 포함하지 않는 것이 일반적이다.

### 2-2. 생성 이유

- **속도 향상**: 한 번 컴파일한 `.pyc` 파일을 `__pycache__` 폴더에 저장하면, 동일한 코드를 다시 실행할 때 속도가 빨라진다. 인터프리터가 `.py` 파일을 다시 컴파일할 필요 없이 바로 바이트코드를 로드하기 때문에 실행 시간이 단축된다.
- **자동 관리**: 파이썬이 자동으로 생성하고 관리하며, 코드가 변경되면 해당 파일을 최신 상태로 갱신한다.

### 3-1. 리액트의 index.js와 비교하기

- 최상단의 index.js가 아닌 폴더에서 index.js로 관리할 때를 의미한다.

### 3-2. 공통점

- **모듈 초기화**: `__init__.py`나 `index.js` 모두 폴더를 모듈로 간주하게 하며, 
그 폴더가 가져야 할 초기화 작업을 실행할 수 있는 진입 파일로 사용한다.
- **내보내기**: `__init__.py` 파일에서 특정 객체나 함수, 클래스를 import하고 이를 다른 모듈에서 쉽게 접근할 수 있게 설정할 수 있는 것처럼, `index.js` 파일에서도 `module.exports`나 `export`를 사용해 폴더 내 모듈들을 하나의 엔트리로 내보낼 수 있다.

### 차이점

- **필수 여부**: `__init__.py`는 파이썬 패키지에선 선택 사항이지만,
`index.js`는 특정 목적이 없다면 폴더에 자동으로 생성되지는 않는다.
- 파이썬에서는 `__init__.py`가 패키지의 일부로 동작하지만, 
자바스크립트에서는 `index.js`가 그저 엔트리 파일일 뿐 폴더를 특별히 '패키지'로 지정하지는 않는다.

### 3-2. 예시

**파이썬 (`__init__.py`)**

```python
# app/routers/__init__.py
from .user_router import user_bp
from .product_router import product_bp

__all__ = ["user_bp", "product_bp"]
```

**자바스크립트 (`index.js`)**

```jsx
// routers/index.js
const userRouter = require('./user_router')
const productRouter = require('./product_router')

module.exports = { userRouter, productRouter }
```