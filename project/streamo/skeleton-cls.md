---
title: CLS 방지(skeleton)
---

# CLS 방지와 Skeleton UI 적용

Streamo는 페이지 전환 및 API 호출 후 데이터 렌더링 시 
<span style={{ color: '#e67e22' }}><strong>CLS (Cumulative Layout Shift)</strong></span> 문제를 방지하기 위해 <br/>
**Skeleton UI**를 적극 활용했습니다.

### ⚠️ CLS란?

CLS는 화면 요소가 비동기적으로 로드되며 갑작스레 이동하거나 밀리는 현상을 뜻하며, 다음과 같은 UX 문제를 유발할 수 있습니다:

* 버튼 클릭 직전에 레이아웃이 밀려 다른 요소를 클릭함
* 페이지가 불안정하고 느리게 느껴짐

### ✅ Streamo에서의 해결 방법

#### 1. **Zustand와 Skeleton 병행 적용**

* 각 페이지 컴포넌트에서 Zustand store로부터 데이터를 가져오기 전까지 **Skeleton UI**로 공간을 고정함
* 데이터가 준비된 후 실제 콘텐츠를 렌더링하여 시각적 안정성 확보

```jsx title="예시"
{isLoading ? (
  <Skeleton height={200} />
) : (
  <VideoCard data={video} />
)}
```

또는 `videos.length === 0` 조건을 활용해 UI 구조 자체를 고정시킴:

```jsx title="실제 사용"
{videos.length === 0 ? (
  <HeroSkeleton />
) : (
  <Swiper>
    {videos.map((video) => (
      <SwiperSlide key={video.id}>
        <HeroSlide {...video} />
      </SwiperSlide>
    ))}
  </Swiper>
)}
```

#### 2. **페이지별 Skeleton 설계 기준**

| 페이지                | Skeleton 적용 위치               |
| ------------------ | ---------------------------- |
| `/admin/video`     | 비디오 카드, 업로드 버튼, 제목 필터 영역     |
| `/request`         | 요청글 리스트 테이블, 작성 폼 전환 시 영역 고정 |
| `/notice`          | 공지사항 목록 테이블, 페이지네이션 하단 영역    |
| `/video?query=...` | 검색 결과 카드 리스트                 |
| `/` (메인 페이지)       | Hero 슬라이드, 카테고리별 비디오 카드 리스트  |

### 상태 기반 Skeleton 제어 방식

Skeleton 여부는 대부분 다음과 같은 Zustand 상태를 통해 제어됩니다:

```js
const { videos, isLoading } = useAdminVideoStore()
```

또는 다음처럼 데이터 길이를 활용한 조건 분기도 사용합니다:

```js
const latestVideos = useMainVideoStore((s) => s.latestVideos)
const groupedVideos = useMainVideoStore((s) => s.groupedVideos)

useEffect(() => {
  fetchLatestVideos()
  fetchGroupedVideos()
}, [fetchLatestVideos, fetchGroupedVideos])

<HeroSection videos={latestVideos} />
{groupedVideos.length === 0 && <CategorySkeleton />}
```

---

### 실제 Skeleton UI 예시

다음은 `/video` 페이지의 로딩 상태에서 적용되는 Skeleton UI 예시입니다:

![Skeleton 예시](/img/streamo/skeleton.JPG)

> 카드 레이아웃, 버튼, 필터 등 모든 주요 요소가 로딩 상태에서도 동일한 공간을 유지하여 CLS를 방지합니다.

---

이처럼 Streamo는 **로딩 시점의 레이아웃 흔들림 없이 자연스럽고 안정적인 사용자 경험**을 제공하기 위해 Skeleton UI를 적극적으로 도입하였습니다.
