---
title: 설문 변경사항 라우팅 가드
---

# 설문 변경사항 라우팅 가드
> 설문조사 작성 중 다른 탭으로 이동하거나 종료시 방어해주는 역할입니다.

### 이미지 미리보기
![라우팅 가드](/img/formtok/routing-guard.JPG)

### 1. ModalContainer.jsx
```js
'use client'

import React, { useEffect, useState, useCallback, useImperativeHandle } from 'react'
import ReactDOM from 'react-dom'
import useOutsideClick from '@/hooks/useOutsideClick'

const ModalContainer = ({ children, ref }) => {
  const [mounted, setMounted] = useState(false)
  const [modalRoot, setModalRoot] = useState(null)
  const [enableEscapeClose, setEnableEscapeClose] = useState(true) // ESC키 닫기 허용 여부

  const { isOpen, setIsOpen, ref: modalContentRefInternal } = useOutsideClick(false)

  useEffect(() => {
    setMounted(true)
    let modalRootEl = document.getElementById('modal-root')

    if (!modalRootEl) {
      modalRootEl = document.createElement('div')
      modalRootEl.setAttribute('id', 'modal-root')
      document.body.appendChild(modalRootEl)
    }
    setModalRoot(modalRootEl)
  }, [])

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    setEscapeEnabled: (enabled) => setEnableEscapeClose(enabled)
  }), [setIsOpen])

  const handleEscapeKey = useCallback(e => {
    if (e.key === 'Escape' && isOpen && enableEscapeClose) setIsOpen(false)
  }, [isOpen, setIsOpen, enableEscapeClose])

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleEscapeKey)
      if (modalContentRefInternal.current) {
        modalContentRefInternal.current.focus()
      }
    }
    return () => {
      window.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isOpen, handleEscapeKey, modalContentRefInternal])

  if (!mounted || !modalRoot || !isOpen) return null

  const childrenWithProps = React.Children.map(children, child =>
    React.isValidElement(child)
      ? React.cloneElement(child, { onClose: () => setIsOpen(false) })
      : child
  )

  const modalContent = (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/20 dark:bg-black/70 z-[1000]">
      <div
        ref={modalContentRefInternal}
        tabIndex={-1}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 outline-none"
      >
        {childrenWithProps}
      </div>
    </div>
  )

  return ReactDOM.createPortal(modalContent, modalRoot)
}

export default ModalContainer
```
#### 설명
- 모달의 기본 골격 컴포넌트
  - 화면 최상단에 **포탈**로 렌더링하며, 배경을 반투명으로 어둡게 처리해 모달 영역을 띄움
  - `useOutsideClick` 훅으로 외부 클릭 시 닫기, 열림 상태 관리
  - 부모 컴포넌트가 ref로 모달을 직접 열고 닫거나 ESC 키 닫기 허용 여부를 제어 가능
  - ESC키 눌렀을 때 닫기 기능 포함
  - 모달 내 포커스 강제 이동으로 접근성 향상
  - 자식 컴포넌트에게 onClose 프로퍼티를 자동 주입해 닫기 함수 공유

- 사용처
  - 다른 컴포넌트에서 공통 모달 UI로 재사용 가능
  - ref.open(), ref.close(), ref.setEscapeEnabled(bool) 호출해 제어

---

### 2. useRouteGuard.jsx
```js
'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useFormEditStore } from '@/stores/useFormEditStore'

const useRouteGuard = () => {
  const router = useRouter()
  const pathname = usePathname()
  const modalRef = useRef(null)
  const nextPath = useRef(null)

  const isModified = useFormEditStore(s => s.isModified)
  const resetOriginData = useFormEditStore(s => s.resetOriginData)

  const handleRouteChange = (path) => {
    if (!isModified()) {
      router.push(path)
      return false
    } else {
      nextPath.current = path
      modalRef.current?.open()
      return true
    }
  }

  const confirmNavigation = () => {
    if(!nextPath.current) {
      if(pathname?.startsWith('/my-form/edit')) {
        nextPath.current = '/my-form/manage'
      }
    }
    
    resetOriginData()
    router.push(nextPath.current)
    modalRef.current?.close()
    return nextPath.current
  }

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!isModified()) return
      e.preventDefault()
      e.returnValue = ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [isModified])

  useEffect(() => {
    const onPopState = () => {
      if (!isModified()) return router.push('/my-form/manage')
      modalRef.current?.open()
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [isModified, pathname])

  return {
    modalRef,
    handleRouteChange,
    confirmNavigation,
  }
}

export default useRouteGuard
```
#### 설명
- 저장되지 않은 변경사항이 있을 때 라우팅을 제어하는 훅
- `handleRouteChange(path)`
  - 변경사항 없으면 즉시 이동
  - 있으면 이동 예정 경로 저장 후 모달 열어 경고
- `confirmNavigation()`
  - 모달 확인 시 호출, 변경사항 초기화 후 실제 이동 수행
- 새로고침할 때 beforeunload 이벤트로 경고창 표시
- 브라우저 뒤로가기(팝스테이트) 시에도 변경사항 있으면 모달 띄움
- 모달 제어용 modalRef 반환하여, 모달 열기/닫기 호출 가능

---

### 3. Sidebar.jsx
```js
import SidebarWrapper from "./compoents/SideBarWrapper"
import SidebarHeader from "./compoents/SidebarHeader"
import UserInfoBox from "./compoents/UserInfoBox"
import SidebarNavs from "./compoents/SidebarNavs"
import useRouteGuard from "@/hooks/useRouteGuard"
import ModalContainer from "@/components/Modal/ModalContainer"
import UnSavedAlertModal from "./compoents/UnSavedAlertModal"
import { useScreenStore } from "@/stores/useScreenStore"
import { useEffect } from "react"
import { usePathname } from "next/navigation"

const Sidebar = () => {
  const pathname = usePathname()
  const { modalRef, handleRouteChange, confirmNavigation } = useRouteGuard()

  const setActiveTab = useScreenStore(s => s.setActiveTab) 

  const confirmAction = () => {
    const next = confirmNavigation()
    setActiveTab(next)
  }

  useEffect(() => {
    modalRef.current?.setEscapeEnabled(false)
    return () => modalRef.current?.setEscapeEnabled(true)
  }, [])

  useEffect(() => {
    setActiveTab(pathname)
  },[])

  return (
    <SidebarWrapper>
      <SidebarHeader />
      <SidebarNavs handleRouteChange={handleRouteChange}/>
      <footer className="mt-auto">
        <UserInfoBox />
      </footer>

      <ModalContainer ref={modalRef}>
        <UnSavedAlertModal onConfirm={confirmAction}/>
      </ModalContainer>
    </SidebarWrapper>
  )
}

export default Sidebar
```
#### 설명
- 사이드바 UI 컴포넌트로, 메뉴 내비게이션과 사용자 정보 표시 포함
- `useRouteGuard` 훅을 활용해 이동 시 변경사항 확인 모달 띄움
- `SidebarNavs`에 `handleRouteChange` 전달해 메뉴 클릭 시 경로 이동 제어
- 모달 열릴 때 ESC키 닫기 비활성화 (`setEscapeEnabled(false)`) — 중요!
- 모달 내 확인 시 `confirmAction` 실행, 실제 라우팅 및 탭 상태 변경
- `ModalContainer`와 경고 모달(`UnSavedAlertModal`) 포함

