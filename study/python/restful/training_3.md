---
title: 연습 3
---

### 1. Router 분리하기

```python
from flask import Blueprint, jsonify

# Blueprint를 사용하여 라우터 이름 정의
# bp는 blueprint
test_bp = Blueprint('test', __name__, url_prefix='/api') # url 기본 엔드포인트를 설정한다.

@test_bp.route('/test', methods=['GET'])
def get_test():
    return jsonify({"code": 200, "msg": "테스트2번"})
```

- 테스트를 위해 routers/test_test.py를 만든다.
- flask에는 Blueprint 라우터를 정의해서 사용할 수 있는 함수가 있다.
- express.js의 express.Router()과 같은 역할을 한다.