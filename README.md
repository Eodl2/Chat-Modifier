# 채팅창 팝업

치지직에서 라이브 채팅 팝업 기능을 추가하는 tampermonkey 사용자 스크립트입니다. 이 스크립트는 채팅 인터페이스를 사용자가 원하는 대로 맞춤 설정할 수 있는 유연성을 제공하여 사용자 경험을 향상시킵니다.

## 기능

- **동적 크기 조정:** 사용자가 라이브 채팅 컨테이너의 너비를 자신의 선호에 따라 설정하고 수정할 수 있습니다.
- **사용자 친화적 인터페이스:** 웹페이지에 간단한 입력 상자를 통합하여 빠르고 쉬운 너비 조정이 가능합니다.

## 설치 방법

1. **사전 요구 사항:**
   - 브라우저에 탬퍼몽키가 설치되어 있는지 확인하세요. 크롬, 파이어폭스 및 기타 브라우저용으로 제공됩니다.

2. **스크립트 설치:**
   - 브라우저 확장에서 Tampermonkey icon을 선택한 후, 대시보드에 들어가세요.
   - 오른쪽 상단의 '도구' 탭에 들어가세요
   - 하단의 Import from URL에 아래 스크립트 URL을 복사 붙여놓기 하세요.
   - https://raw.githubusercontent.com/Eodl2/Chat-Modifier/main/ChatModifier/LiveChatPopUp.js
   - Tampermonkey는 스크립트를 인식하고 설치를 요청합니다. `설치`를 선택하세요.

## 사용 방법

- 설치 후 스트리밍 플랫폼으로 이동하세요.
- 라이브 방송에 접속한 후 **새로고침**을 한 번 해야합니다.
- 페이지 상단 오른쪽에 '**채팅창 크기**'라고 표시된 입력 상자가, 오른쪽 하단에 채팅 버튼 왼쪽에 '**채팅 팝업**'이라는 버튼이 나타납니다.
- 채팅 컨테이너의 원하는 너비(픽셀 단위)를 입력하고 Enter를 누르세요. 채팅 컨테이너의 너비가 그에 따라 조정됩니다.

## 주의사항

-**채팅창을 팝업으로 보고 원래 채팅창을 보기 싫으시면 채팅창 접기 버튼을 누르는 대신 채팅창 크기 상자에 '1'을 입력하세요.**(아주 작은 크기로 채팅창이 열려있는 상태가 됨.)

-채팅창이 열려있는 상태여야 퍼포먼스가 좋습니다. (채팅창 접기 버튼을 눌러도 동작하도록 설계했지만 채팅 속도가 빠를 경우 놓치는 채팅이 생깁니다.)

-**방송은 보지 않고 채팅 팝업만 보시려면 라이브 방송 탭을 킨 상태로 모서리를 드래그해 사이즈를 줄이는 방법이 최선입니다.**

-라이브 방송 탭이 열려있는 상태여야 합니다. 1. 방송창 탭을 킨 상태로 최소화 버튼을 눌러 탭을 내리거나 2. 다른 탭으로 이동하면 팝업 창이 정상적으로 동작하지 않습니다. 

## 라이선스

이 스크립트는 MIT 라이선스하에 배포됩니다. 자세한 내용은 GitHub 리포지토리의 [라이선스](<GitHub 리포지토리의 LICENSE 파일 링크>) 파일을 참조하세요.
