# 문제점과 해결 방안

이 문서는 **‘이미지 뚝딱기’** 앱을 개발하면서 마주친 주요 기술적 문제들과 그에 대한 해결 과정을 정리한 문서입니다.

---

## 1. 도형 마스킹의 정밀 제어

* **문제**: 다양한 도형(특히 하트)을 캔버스에 정확하게 그리는 것 자체가 복잡했고, 곡선의 흐름과 좌우 대칭을 수학적으로 조정하는 데 시간이 많이 걸렸음. 특히 하트는 중심점을 기준으로 완전한 대칭을 유지하며 자연스러운 곡률을 만들어야 했기 때문에 bezier 곡선 함수 조정이 매우 까다로웠음.

* **해결**: `getShapePath()` 함수 내부에 하트 도형 전용 분기 로직을 구현하고, `Path2D` 객체를 사용해 정중앙을 기준으로 곡선을 두 번 나누어 그리도록 구성함. `bezierCurveTo()` 함수로 좌우 곡률을 정밀하게 튜닝함&#x20;


  예시:

  ```js
  const hr = r * 1.4
  const offsetY = hr * 0.35
  const cy = y + offsetY

  path.moveTo(x, cy + hr * 0.3)
  path.bezierCurveTo(x + hr, cy - hr * 0.05, x + hr * 0.75, cy - hr * 1.35, x, cy - hr * 0.75)
  path.bezierCurveTo(x - hr * 0.75, cy - hr * 1.35, x - hr, cy - hr * 0.05, x, cy + hr * 0.3)
  path.closePath()
  ```

---

## 2. 비율 기반 자르기와 확대/축소

* **문제**: 도형의 비율(aspectRatio)에 따라 확대/축소된 이미지의 잘라낼 영역을 정확히 계산하는 것이 까다로웠음. 특히 offset과 scale이 결합되었을 때 실제 잘라야 할 영역을 정확히 추정하는 것이 쉽지 않았고, 캔버스 내 마스크 영역과 원본 이미지 좌표계를 일치시키는 것도 까다로운 부분이었음.

* **해결**: `getMaskedCanvas()`에서 다음과 같은 방식으로 해결함:

  * 자르기 기준이 되는 정사각형 영역을 `size / scale`로 계산해 실제로 보이는 이미지 영역을 파악
  * `offset`을 이용해 이미지 내부에서 어느 좌표를 중심으로 자를지 계산
  * `drawImage()`를 이용해 이미지의 잘라낼 영역(cropX, cropY 등)을 구한 뒤, 캔버스에 출력할 영역(0, 0 → outputSize)과 정확히 맞춤
  * 클리핑 처리는 `getShapePath()`를 통해 받은 `Path2D`를 기준으로 설정하고, 출력 전에 `ctx.clip()`으로 마스크 적용

  전체 구조 예시:

  ```js
  const visibleW = size / scale
  const visibleH = size / scale
  const cropX = -offset.x / scale
  const cropY = -offset.y / scale

  const cropW = Math.min(imgW - cropX, visibleW)
  const cropH = Math.min(imgH - cropY, visibleH)
  const outputSize = Math.min(cropW, cropH)

  const canvas = document.createElement('canvas')
  canvas.width = outputSize
  canvas.height = outputSize
  const ctx = canvas.getContext('2d')

  ctx.save();
  const shapePath = getShapePath(shape, outputSize, shapeOptions)
  ctx.clip(shapePath)

  ctx.drawImage(
    img,
    cropX, cropY, outputSize, outputSize,
    0, 0, outputSize, outputSize
  )
  ctx.restore()
  ```

---

## 3. 분할 출력의 종이 크기 대응

* **문제**: 이미지 분할 시 인쇄용 종이(A4 등)의 크기와 방향을 반영해 정확한 분할 기준을 맞춰야 했음.
* **해결**: `PAPER_SIZES` 값을 바탕으로 가로/세로 mm 단위를 기준 삼아 분할 비율과 미리보기를 정확히 일치시킴.

---

## 4. 저장 로직의 안정성과 직관성

* **문제**: 여러 이미지를 동시에 저장하거나 압축(zip) 저장하는 과정에서 JSZip, Blob, Canvas 등 비동기 작업이 꼬일 가능성이 있었음. 특히 저장 과정에서 예외가 발생할 경우 파일 누락, 순서 오류, blob 처리 누락 등 여러 문제가 발생할 수 있었음.

* **해결**: 저장 흐름을 분리하고, JSZip과 Canvas의 비동기 API를 안전하게 순차 처리함. 특히 다음과 같은 방식으로 구현:

  * 각 이미지에 대해 `canvas.toBlob()`을 `Promise`로 래핑하여 순차 처리
  * 파일명을 가독성 있게 구성 (예: `image_001.png`, `image_name_shape.png` 등)
  * 저장 버튼을 클릭하면 로딩 상태를 표시하고, 완료 후 zip 파일을 저장함

  예시 코드:

  ```js
  const zip = new JSZip()

  for (const image of images) {
    const canvas = await getCanvas(image.id)
    if (!canvas) continue

    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'))
    const filename = `${image.name.replace(/\.[^/.]+$/, '')}_${shape}.png`
    zip.file(filename, blob)
  }

  const zipBlob = await zip.generateAsync({ type: 'blob' })
  saveAs(zipBlob, 'cropped_images.zip')
  ```

---

## 5. 도구 패널 UI의 일관성 확보

* **문제**: 도형 선택, 둥근 모서리, 확대/축소 등의 기능이 흩어져 있어 UX가 혼란스러웠음.
* **해결**: `EditorPanel`을 도입하여 모든 편집 도구를 하나의 패널에 통합하고 도형에 따라 관련 옵션을 동적으로 표시함.

---

## 6. 기능 선택 페이지의 직관성 부족

* **문제**: ‘자르기’와 ‘분할’ 기능의 차이를 사용자에게 명확히 전달하기 어려웠음.
* **해결**: `App.jsx`의 카드 버튼에 Canvas로 아이콘을 직접 그려, 기능을 시각적으로 명확히 구분하도록 구현함.

---

## 7. 배경 처리와 투명도 대응

* **문제**: 저장할 이미지의 배경 처리 기능을 고려했으나, 실제 구현 과정에서 필요성이 낮다고 판단하여 제거함.
* **해결**: 관련된 배경 설정 옵션과 로직(`background`, `fillStyle`, `clearRect`)을 모두 제거하고, 기본값(투명 배경)만 유지함.

---

## 8. fabric.js 6.x의 불안정성과 다운그레이드 결정

<span style={{ color: '#e67e22' }}><strong>문제</strong></span>: 최신 버전인 fabric@6.x에서 다음과 같은 문제점이 발생함
* preserveObjectStacking 옵션이 정상적으로 작동하지 않음
* bringToFront, sendToBack 명령이 객체에 따라 무시되거나 순서가 꼬이는 현상 발생
* 특정 객체가 예기치 않게 이동 불가 상태로 바뀌거나 선택 불가능해짐

<span style={{ color: '#e67e22' }}><strong>해결</strong></span>: 안정성이 검증된 fabric@4.6.0으로 다운그레이드
* 모든 객체는 customType을 기준으로 분기하여 z-index를 명시적으로 제어
* 의도한 순서대로 .bringToFront(), .sendToBack() 호출하여 렌더링 순서를 보장

```js
canvas.getObjects().forEach(obj => {
  if (obj.customType === 'crop') canvas.bringToFront(obj)
  if (obj.customType === 'background') canvas.sendToBack(obj)
})
```

---

> 이 문서는 지속적으로 개선 중이며, 새로운 문제나 리팩토링 과정이 생길 경우 추가로 정리할 예정입니다.
