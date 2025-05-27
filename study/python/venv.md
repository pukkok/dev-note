---
title: 가상환경 설정
---

### 0. 시작하기 전

- 왜 사용하는가?
    - 다양한 프로젝트를 충돌 없이 사용하기 위해 사용한다.
- 본 기능은 윈도우와 맥의 코드가 다르다.
- PowerShell을 사용하자.
    - cmd창에서 하다가 안되서 봤더니 PowerShell에서 작동되는 것이었다.

### 1. 생성하기

```powershell
python -m venv [가상환경명] # window
python3 -m venv [가상환경명] # Linux/Mac
```

- 여기선 가상환경명을 **myenv**라고 하겠다.

### 2. 가상 환경 활성화

```powershell
.\myenv\Scripts\activate # window
source myenv/bin/activate # Linux/Mac
```

→ 에러 처리

- 처음 생성한다면 아래와 같은 권한 오류가 생길 것이다.
- PowerShell 실행 정책이 막혀 있는 경우이다.

![image.png](/img/python/venv-1.png)

→ 해결(Power Shell 관리자 모드에서만 사용 가능하다.)

```powershell
Set-ExecutionPolicy RemoteSigned

// 이후 다시실행
.\myenv\Scripts\activate
```

### 2-1. **PowerShell 실행 정책의 목적**

- 실행 정책은 주로 악성 코드가 실행되지 않도록 제한하는 역할을 한다.
- 예를 들어, 인터넷에서 다운로드한 스크립트가 경고 없이 실행되는 것을 방지하기 위해 설정된다.
- 실행 정책은 **스크립트 실행에 대한 기본적인 보안 장치**일 뿐, 전반적인 시스템 보안은 아니다.

### **2-2. 보안 관리문제**

- **PowerShell 실행 정책 문제**
    - `Set-ExecutionPolicy` 명령어로 실행 정책을 변경하려 했으나, 
    권한 문제 및 재정의로 인해 실패할 수도 있다.
    - 실패한다면 리스트를 확인해보자.
    - 현재 설정된 정책을 확인하려면 `Get-ExecutionPolicy -List` 명령어를 사용한다.
        
        ![image.png](/img/python/venv-2.png)
        
- **보안 해제 시 위험성**
    - 실행 정책을 `Unrestricted`로 설정하면 보안 위험이 증가한다. 
    악성 스크립트가 경고 없이 실행될 수 있어 시스템이 공격에 노출될 수 있다.
    - 보안을 해제한 후에는 신뢰할 수 있는 소스의 스크립트만 실행해야 하며, 
    필요시 정책을 원래 상태로 복구해야 한다.
- **보안 설정 복구 방법**
    - 기본 보안 설정으로 복구하려면 관리자 권한으로 PowerShell을 실행하고 
    `Set-ExecutionPolicy Restricted` 명령어를 실행한다.
    - 다른 옵션으로 `RemoteSigned`나 `AllSigned`를 사용할 수도 있다.
    - 실행 정책을 특정 사용자나 세션에만 적용하고 싶다면 `-Scope CurrentUser` 또는 `-Scope Process`를 사용할 수 있다.
- **정책 설정이 재정의되는 이유**
    - 그룹 정책(`MachinePolicy`, `UserPolicy`)에 의해 실행 정책이 강제 될 수 있다. 이 경우, 관리자 권한이 필요하며 그룹 정책을 수정해야 한다.
- **문제 해결 방법**
    - `CurrentUser`나 `Process` 범위에서 실행 정책을 설정하여 그룹 정책의 영향을 받지 않고 문제를 우회 할 수 있다.
    - 그룹 정책에 의해 실행 정책이 적용된 경우, 시스템 관리자의 도움을 받아야 한다.

### 2-2. **각 실행 정책의 의미**

- **Restricted (기본값)**: PowerShell은 스크립트 실행을 차단한다. 대화형 명령만 실행할 수 있다.
- **AllSigned**: 실행하는 모든 스크립트가 신뢰할 수 있는 발급자가 디지털 서명한 경우에만 실행된다. 보안이 매우 강력하지만, 모든 스크립트가 서명되어 있어야 하므로 번거로울 수 있다.
- **RemoteSigned**: 인터넷에서 다운로드한 스크립트는 서명된 경우에만 실행할 수 있다. 로컬에서 작성한 스크립트는 서명 없이 실행할 수 있다. 이 설정은 보안과 사용 편의성 사이의 균형이 좋다.
- **Unrestricted**: 모든 스크립트를 실행할 수 있으며, 인터넷에서 다운로드한 스크립트도 경고만 표시되고 실행된다. 보안상 가장 위험하다.

### 3. 패키지 설치

- 예시 : matplotlib

```powershell
pip install matplotlib
```

- 가상 환경이 활성화된 상태에서 패키지를 설치하면, `myenv` 디렉터리 내부에 해당 패키지가 설치된다.
- 이미 컴퓨터에 설치되어 있는 파이썬 실행 환경이나 다른 파이썬 프로젝트에 아무 영향을 주지 않는다.

### 4. 가상환경 내 패키지 목록 저장

```powershell
pip freeze > requirements.txt
```

- `pip freeze`명령어는 현재 내 환경에 pip로 설치되어 있는 라이브러리들을 모두 출력해 준다.
requirements.txt에 담겠다는 뜻이다.
    
    ```powershell
    pip freeze
    ```
    
- `npm`의 `package.json` 같은 역할을 한다.

### 5. vscode 설정

- 단축키 : Ctrl + Shift + P
- Python: Select Interpreter 클릭 후 가상 환경 선택 (venv)

![image.png](/img/python/venv-3.png)

### 6. 가상 환경 비활성화

```powershell
deactivate
```

### 7. 가상 환경 폴더 삭제

```powershell
rmdir myenv // 또는
rm myenv
```

- 가상 환경을 삭제하는 것은 결국 폴더 형태로 저장된 파일을 삭제하는 것이기 때문에, 
해당 폴더를 삭제하면 가상 환경도 함께 삭제된다.

### 8. vscode 설정 해제

- 단축키 : Ctrl + Shift + P
- Python: Select Interpreter 클릭 후 기존 환경 선택 (글로벌)

![image.png](/img/python/venv-4.png)

### 9. 공용 공간 패키지 + 가상 환경 생성

```powershell
python -m venv myenv --system-site-packages
```

### 10. 패키지 설치

```powershell
pip install -r requirements.txt
```

- requirements.txt 파일로부터 패키지들을 다운로드 받는다.
- `npm install` 과 같은 역할

### 11. 가상 환경 내 패키지 목록 조회

```powershell
pip list --local
pip list myenv
pip list
```

- 선택해서 사용