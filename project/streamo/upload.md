# 영상 업로드 흐름

**Streamo**는 사용자 요청 기반의 콘텐츠 업로드 시스템을 운영합니다. 이 문서에서는 요청글 → 업로드 → 상태 전환까지의 전체 흐름과 관련 컴포넌트, 상태 관리를 설명합니다.

---

## 요청 기반 업로드 흐름

1. 사용자는 `/require` 페이지에서 업로드 요청글을 작성합니다.
2. 관리자는 요청글 목록에서 `업로드` 버튼을 클릭합니다.
3. 클릭 시 `/admin/video` 페이지로 이동하며, 내부적으로 해당 요청글 ID가 Zustand를 통해 전역 상태로 저장됩니다.

> ✅ 이 과정을 통해 요청글과 업로드 프로세스가 자연스럽게 연결됩니다.

---

## 업로드 페이지 구성 (`/admin/video`)

업로드 페이지는 다음과 같은 구성 요소로 이루어집니다:

* **TusUploader** : 영상, 썸네일, 와이드 썸네일, 자막 등을 각각 tus 업로드 방식으로 처리
* **TagInput** : 영상의 키워드 태그 입력 UI
* **VideoUploadModal** : 업로드 입력 전체를 감싸는 모달
* **RequestTooltip** : 현재 업로드 중인 요청글 정보를 툴팁 형태로 보여줌
* **ConfirmDiscardModal** : 업로드 중 모달을 닫으려 할 때 확인 모달 표시

업로드가 완료되면 상태를 `완료`로 전환하고, 업로드된 콘텐츠는 영상 목록에 등록됩니다.

---

## 상태 전환 흐름

Zustand 기반의 `useAdminRequestStore`에서 요청글 ID 상태를 전역으로 관리하며, 다음과 같은 흐름으로 작동합니다:

* `setUploadRequestId(id)` → 업로드 대상 요청글 설정
* `resetUploadRequestId()` → 업로드 종료 또는 취소 시 초기화
* `markAsUploaded(id)` → 업로드 완료 후 요청글 상태를 "완료"로 변경

---

## 관련 컴포넌트 정리

| 컴포넌트                  | 역할               |
| --------------------- | ---------------- |
| `TusUploader`         | tus 기반 파일 업로드 처리 |
| `TagInput`            | 태그 입력 기능         |
| `VideoUploadModal`    | 업로드 모달 UI        |
| `RequestTooltip`      | 요청글 정보 툴팁 표시     |
| `ConfirmDiscardModal` | 업로드 도중 모달 닫기 방지  |

---

## 미리보기

### 업로드 요청글 목록 화면

![업로드 요청 목록](/img/streamo/require.JPG)

### 업로드 실행 페이지

![업로드 실행 페이지](/img/streamo/admin_videos.JPG)

---

## 업로드 상세 화면 예시

### 영상 업로드 모달

![영상 업로드 모달](/img/streamo/upload_modal.JPG)

### 이미지 자르기 (크롭)

![이미지 크롭](/img/streamo/img_crop.JPG)

### 업로드 진행 중

![업로드 중 화면](/img/streamo/uploading.JPG)

### 업로드 미리보기

![업로드 미리보기](/img/streamo/preview.JPG)
