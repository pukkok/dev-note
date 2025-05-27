---
title: MongoDB (use. PowerShell)
---

# 1. PowerShell에서 MongoDB 시작하기

---

### 1. mongod 실행 및 연결

MongoDB Atlas 클러스터에 PowerShell을 통해 접속하고, 데이터베이스와 컬렉션을 생성 및 조작하는 기본 예제다.

```powershell
PS C:\Program Files\MongoDB\Server\8.0\bin> mongosh "mongodb+srv://<ID>:<PASSWORD>@holiday.olrjq.mongodb.net/holiday?retryWrites=true&w=majority&appName=holiday"
```

* **mongosh**는 MongoDB Shell의 최신 버전
* `<ID>`와 `<PASSWORD>`는 본인의 Atlas 계정 정보로 대체

```powershell
Connecting to: mongodb+srv://<credentials>@holiday.olrjq.mongodb.net/holiday
Using MongoDB: 8.0.4
Using Mongosh: 2.3.4
```

---

### 2. 데이터베이스 및 컬렉션 사용

```shell
> use holiday
already on db holiday

> db
holiday

> use testdb
switched to db testdb
```

* `use <db>`: 해당 데이터베이스로 이동 또는 생성

---

### 3. 컬렉션 생성 및 데이터 삽입

```shell
> db.createCollection("testCollection")
{ ok: 1 }

> db.testCollection.insertOne({
  name: "민석",
  age: "32",
  city: "Sejong"
})
```

* `{ ok: 1 }`: 컬렉션이 정상적으로 생성됨을 의미
* `insertOne()`은 하나의 문서를 삽입하는 함수

---

### 4. 데이터 조회

```shell
> db.testCollection.find()
[
  {
    _id: ObjectId('675b7c46cc6005a9f8893bf8'),
    name: '민석',
    age: '32',
    city: 'Sejong'
  }
]
```

* `find()`는 컬렉션 내 모든 데이터를 배열 형태로 반환
* `_id`는 MongoDB에서 자동 생성하는 고유 식별자(ObjectId)

---

### 참고

* 공식 문서: [https://www.mongodb.com/docs/](https://www.mongodb.com/docs/)
* Shell 문법 참고: [https://www.mongodb.com/docs/mongodb-shell/](https://www.mongodb.com/docs/mongodb-shell/)

> ✅ 실제 MongoDB Atlas와 연결해서 데이터를 주고받는 흐름을 CLI 환경에서 익히는 것이 목적
