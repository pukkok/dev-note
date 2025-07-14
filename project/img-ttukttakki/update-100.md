---
title: v1.0.0 업데이트
description: 이미지 병합 저장 기능 추가
---

### 2025.07.10

<span style={{ color: '#e67e22' }}><strong>배경 이미지</strong></span>를 배치하고 
그 위에 <span style={{ color: '#e67e22' }}><strong>다른 이미지</strong></span>를 배치하여 
<span style={{ color: '#e67e22' }}><strong>이미지를 병합</strong></span> 시킬 수 있는 기능을 도입하였습니다.

---

## 주요 기능 설명

### 배경 + 오버레이 이미지 병합
- 배경 이미지 위에 여러 이미지를 배치하고, 이동/확대/회전 등의 조작 후 병합 저장 가능.
- 각 이미지 객체의 속성(`left`, `top`, `scale`, `angle`, `skewX/Y`)을 유지하며 저장.

### CropBox 마스킹
- 병합 시 자르기(Crop)를 위한 `CropBox` UI 제공.
- 사용자가 선택한 영역 외 부분은 반투명 마스킹 처리됨.

---

## 기술적 개선 사항

### 안정적인 fabric.js 버전으로 다운그레이드
- 초기에는 최신 버전인 `fabric@6.x`를 사용했지만 다음과 같은 문제가 발생:
  - `preserveObjectStacking` 옵션 무시됨
  - `bringToFront`, `sendToBack`이 불안정하게 작동
  - 일부 객체가 예기치 않게 컨트롤러를 잃거나 이동 불가 상태 발생

- **해결:** 안정성이 검증된 `fabric@4.6.0` 버전으로 다운그레이드하여 렌더링 순서 및 객체 제어 문제 해결  
  → 이후 모든 객체는 `customType`을 기준으로 관리하며 `.bringToFront()` 명시적으로 호출

### 상태 관리: zustand 도입

- 기존에는 React `useState` 기반으로 모든 상태를 전달했지만,
  이미지 목록, 현재 작업 중인 이미지, Crop 영역 정보 등 복잡한 상태 전달이 어려워졌음
- **해결:** 상태 관리를 위한 `zustand` 도입
  - `useMergeCanvasStore` : 병합/크롭 관련 상태 전용
  - `useCommonStore` : 공통 이미지 목록 및 현재 인덱스 등 관리

> 전역 상태가 필요하지 않았던 초기 구조에선 `useState`로 충분했지만,  
> **Canvas 객체와 관련된 외부 참조값을 유지/동기화**하려면 store 기반 접근이 안정적이었음.

---

## 주요 코드 설명

### <span style={{ color: '#e67e22' }}><strong>배경 데이터 관리</strong></span>

* 각 이미지 객체의 속성 (`left`, `top`, `scale`, `angle`, `skewX/Y`) 을 유지하며 저장됨.

```js
useEffect(() => {
  const canvas = fabricCanvasRef.current
  if (!canvas) return

  const handleModified = (e) => {
    const obj = e.target
    if (obj?.get('customType') !== 'background') return

    setBackgroundImageInfo({
      width: obj.width * obj.scaleX,
      height: obj.height * obj.scaleY,
      left: obj.left,
      top: obj.top,
      rotation: obj.angle || 0,
      skewX: obj.skewX || 0,
      skewY: obj.skewY || 0,
    })
  }

  canvas.on('object:modified', handleModified)
  canvas.on('object:moving', handleModified)
  canvas.on('object:scaling', handleModified)
  canvas.on('object:rotating', handleModified)

  return () => {
    canvas.off('object:modified', handleModified)
    canvas.off('object:moving', handleModified)
    canvas.off('object:scaling', handleModified)
    canvas.off('object:rotating', handleModified)
  }
}, [])
```

---

### <span style={{ color: '#e67e22' }}><strong>CropBox 마스킹</strong></span>

* 병합 시 자르기(Crop)를 위한 **CropBox** UI 제공.
* 사용자가 선택한 영역 외 부분은 **반투명 마스킹**으로 처리.
* 마스크는 총 8개의 사각형으로 구성되며, cropBox의 위치/크기에 따라 실시간으로 위치 조정됨.
* `useCropBox` 훅에서 cropBox와 mask를 생성 및 갱신.

```js
const updateMask = () => {
  const canvas = fabricCanvasRef.current
  const cropBox = cropCanvasRef.current
  const masks = maskRefs.current
  if (!canvas || !cropBox) return

  const { left, top, width, height, scaleX, scaleY, originX, originY } = cropBox
  
  const actualWidth = width * scaleX
  const actualHeight = height * scaleY

  const boxLeft = originX === 'center' ? left - actualWidth / 2 : left
  const boxTop = originY === 'center' ? top - actualHeight / 2 : top
  const boxRight = boxLeft + actualWidth
  const boxBottom = boxTop + actualHeight

  const canvasWidth = canvas.getWidth()
  const canvasHeight = canvas.getHeight()

  // 좌상단
  masks.topLeft.set({
    left: 0, top: 0, width: boxLeft, height: boxTop,
  })

  // 상단 중앙
  masks.top.set({
    left: boxLeft, top: 0, width: actualWidth, height: boxTop,
  })

  // 우상단
  masks.topRight.set({
    left: boxRight, top: 0, width: canvasWidth - boxRight, height: boxTop,
  })

  // 좌
  masks.left.set({
    left: 0, top: boxTop, width: boxLeft, height: actualHeight,
  })

  // 우
  masks.right.set({
    left: boxRight, top: boxTop, width: canvasWidth - boxRight, height: actualHeight,
  })

  // 좌하단
  masks.bottomLeft.set({
    left: 0, top: boxBottom, width: boxLeft, height: canvasHeight - boxBottom,
  })

  // 하단 중앙
  masks.bottom.set({
    left: boxLeft, top: boxBottom, width: actualWidth, height: canvasHeight - boxBottom,
  })

  // 우하단
  masks.bottomRight.set({
    left: boxRight, top: boxBottom, width: canvasWidth - boxRight, height: canvasHeight - boxBottom,
  })

  bringCropBoxToFront()
  setCropBoxInfo({
    left, top,
    width: actualWidth, height: actualHeight
  })
  canvas.requestRenderAll()
}
```

---

### <span style={{ color: '#e67e22' }}><strong>오버레이 이미지 관리</strong></span>

* 오버레이 이미지는 배열안에서 여러 이미지를 관리하지만 하나씩 불러서 사용함.
* 이미지는 불러올 때 기존 정보를 다시 사용할 수 있도록 fabric의 **clone** 기능을 사용함.

```js
import { useEffect } from 'react'
import { fabric } from 'fabric'
import { useCommonStore } from '../../../stores/useCommonStore'

export const useOverlayImage = (fabricCanvasRef, overlayImageRef, onLoaded) => {
  const images = useCommonStore(s => s.images)
  const getCurrentIndex = useCommonStore(s => s.getCurrentIndex)

  const currentIndex = getCurrentIndex()
  const currentImage = images[currentIndex] || null

  useEffect(() => {
    const canvas = fabricCanvasRef.current
    if (!canvas) return

    const handleModified = (e) => {
      const obj = e.target
      if (!obj || obj.customType !== 'overlay' || !currentImage?.id) return

      const ref = overlayImageRef.current[currentImage.id]
      if (!ref) return

      ref.left = obj.left
      ref.top = obj.top
      ref.width = obj.width * obj.scaleX
      ref.height = obj.height * obj.scaleY
      ref.angle = obj.angle || 0
      ref.skewX = obj.skewX || 0
      ref.skewY = obj.skewY || 0
    }

    canvas.on('object:modified', handleModified)
    canvas.on('object:moving', handleModified)
    canvas.on('object:scaling', handleModified)
    canvas.on('object:rotating', handleModified)

    return () => {
      canvas.off('object:modified', handleModified)
      canvas.off('object:moving', handleModified)
      canvas.off('object:scaling', handleModified)
      canvas.off('object:rotating', handleModified)
    }
  }, [currentImage?.id])

  useEffect(() => {
    const canvas = fabricCanvasRef.current
    if (!canvas || !currentImage?.url) return

    // INFO: 기존 overlay 제거
    // TODO: 한번에 한장의 image만 불러와서 사용한다.
    canvas.getObjects().forEach(obj => {
      if (obj.customType === 'overlay') {
        canvas.remove(obj)
      }
    })

    const canvasWidth = canvas.getWidth()
    const canvasHeight = canvas.getHeight()
    const saved = overlayImageRef.current[currentImage.id]

    // TODO: 초기 이미지를 불러온다.
    const initializeOverlayImage = (img) => {
      const maxHeight = (canvasHeight * 2) / 3
      const scale = Math.min(1, maxHeight / img.height)

      const scaledWidth = img.width * scale
      const scaledHeight = img.height * scale
      const left = canvasWidth / 2 - scaledWidth / 2
      const top = canvasHeight / 2 - scaledHeight / 2

      img.set({
        left,
        top,
        width: img.width,
        height: img.height,
        scaleX: scale,
        scaleY: scale,
        angle: 0,
        skewX: 0,
        skewY: 0,
        selectable: true,
        evented: true,
        hasControls: true,
        cornerStyle: 'circle',
        customType: 'overlay',
      })

      overlayImageRef.current[currentImage.id] = {
        left,
        top,
        width: img.width * scale,
        height: img.height * scale,
        angle: 0,
        skewX: 0,
        skewY: 0,
        img,
      }

      canvas.add(img)
      canvas.setActiveObject(img)

      const bgObj = canvas.getObjects().find(obj => obj.customType === 'background')
      if (bgObj) canvas.sendToBack(bgObj)

      if (typeof onLoaded === 'function') onLoaded()
    }

    // INFO: 클론이기 때문에 scale값을 되돌려서 다시 사용한다.
    // TODO : 복사하여 다시 가져온다. 계속 객체를 만드는 행위 제거
    const restoreOverlayImage = (img) => {
      const { left, top, width, height, angle, skewX, skewY } = saved
      const scaleX = width / img.width
      const scaleY = height / img.height

      img.set({
        left,
        top,
        scaleX,
        scaleY,
        angle,
        skewX,
        skewY,
        cornerStyle: 'circle',
        selectable: true,
        evented: true,
        hasControls: true,
        customType: 'overlay',
      })

      saved.img = img

      canvas.add(img)
      canvas.setActiveObject(img)

      const bgObj = canvas.getObjects().find(obj => obj.customType === 'background')
      if (bgObj) canvas.sendToBack(bgObj)

      if (typeof onLoaded === 'function') onLoaded()
    }

    const loadImage = async () => {
      try {
        if (saved?.img) {
          saved.img.clone(clone => restoreOverlayImage(clone))
        } else {
          // INFO: 새로운 이미지 객체를 불러온다.
          fabric.Image.fromURL(currentImage.url, img => {
            if (img) initializeOverlayImage(img)
            else console.error('Image load error')
          })
        }
      } catch (err) {
        console.error('작업 이미지 불러오기 실패:', err)
      }
    }

    loadImage()
  }, [currentImage])
}

```

---

### <span style={{ color: '#e67e22' }}><strong>크롭박스 상시 업데이트</strong></span>

* 크롭박스의 `bringToFront` 함수를 return 하여 외부에서도 사용할 수 있도록 구현.
* 사용처에선 onLoaded로 전달받아 **callBack** 형태로 작업이 끝난 후에 동작하도록 구현.

```js
const bringCropBoxToFront = () => {
  const canvas = fabricCanvasRef.current
  const cropBox = cropCanvasRef.current
  if (!canvas || !cropBox) return

  Object.values(maskRefs.current).forEach(mask => {
    canvas.bringToFront(mask)
  })
  canvas.bringToFront(cropBox)
}

// 사용처 일부
const MergeCanvasEditor = ({ fabricCanvasRef, overlayImageRef, cropCanvasRef }) => {
  const canvasRef = useRef(null)

  useSetupCanvas(canvasRef, fabricCanvasRef)
  const { bringCropBoxToFront } = useCropBox(fabricCanvasRef, cropCanvasRef)
  useBackgroundImage(fabricCanvasRef, bringCropBoxToFront)
  useOverlayImage(fabricCanvasRef, overlayImageRef, bringCropBoxToFront)

  return <canvas ref={canvasRef} />
}

export default MergeCanvasEditor

```

이러한 훅 구조를 통해 <span style={{ color: '#e67e22' }}><strong>배경 이미지, 오버레이 이미지, 크롭 박스</strong></span> 간의 상태 및 상호작용을 유연하게 구성하였으며, <br/> 
<span style={{ color: '#e67e22' }}><strong>Zustand 기반 상태관리</strong></span>와 함께 안정적인 렌더링 동기화를 구현했습니다.
