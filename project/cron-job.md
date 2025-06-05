---
title: 공휴일 자동 수집(cron)
---

# 공휴일 자동 수집 API

공공데이터 포털에서 제공하는 **공휴일 API**를 활용해 연도별 공휴일 정보를 가져와 <br/>
**MongoDB에 자동 저장**하고, 필요 시 언제든지 조회할 수 있도록 만든 **백엔드 중심 서비스**입니다.

이 프로젝트는 Vercel의 <span style={{ color: '#e67e22' }}><strong>cron 작업</strong></span>, 그리고 
<span style={{ color: '#e67e22' }}><strong>Express + Mongoose 기반 구조 설계</strong></span>를 실습하기 위해 제작되었습니다.

---

## 주요 기능

* `GET /holiday-update` : 연도별 공휴일 정보 저장 또는 업데이트
* `GET /holiday-list` : DB에 저장된 연도별 공휴일 정보 조회
* `GET /holiday-list?year=2024` 등 쿼리 파라미터로 특정 연도 요청 가능
* MongoDB Atlas 연동 및 연도 단위로 중복 없이 저장 (`unique` 필드 사용)

---

## 자동화 구성

```json title="vercel.json"
"crons": [
  {
    "path": "/holiday-update",
    "schedule": "54 15 * * *"
  }
]
```

* \*\*매일 오후 3시 54분(KST)\*\*에 `/holiday-update`가 자동 호출됨
* Vercel Serverless 환경에서 실행되어 별도 서버 없이 동작
* 작업 결과는 Vercel Functions 로그 또는 `/holiday-list` 응답으로 확인 가능

---

## 기술 스택

* Node.js + Express
* MongoDB (with Mongoose ODM)
* Public API 연동 (`/getRestDeInfo`)
* Vercel Serverless Functions (`api/` 경로)
* Cron 자동화 (via `vercel.json`)

---

## 코드 설계 요약

* `getApiUrl(year)` 유틸을 통해 연도별 API URL 생성
* API 응답을 가공하여 DB 스키마에 맞게 저장 (`Holiday` 모델)
* 연도 단위 중복 방지 → `base_year` 필드에 `unique: true`
* 오류 발생 시 4xx/5xx 코드로 분기 처리 및 로깅

---

## 학습 포인트

* **서버리스 환경에서 주기적인 데이터 수집이 어떻게 이루어지는지** 체감
* 외부 API → 데이터 정제 → MongoDB 저장까지의 흐름을 직접 설계
* 프론트엔드 없이도 유용한 데이터를 구조화해 서비스할 수 있다는 경험 확보

> 이 프로젝트는 단순한 실습을 넘어, 실제로 돌아가는 자동화 백엔드 구조를 처음으로 만들었다는 점에서 의미가 컸습니다.
> 지금까지는 직접 호출해야 하던 API 요청을 cron으로 전환함으로써,
> **CI/CD와 자동화의 개념을 백엔드 구성과 함께 체험할 수 있었습니다.**
