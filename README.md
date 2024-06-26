## Features

### 로그인 관련
- `bcrypt`를 활용해 비밀번호 해싱으로 로그인 보안 강화 일반 로그인 (일반 로그인)
- JWT 대체로 `OAuth` 인증 방식을 채택하여 네이버 보안 체계를 활용 (네이버 로그인) 
- HTTPS 암호화 연결을 통한 중간자 공격으로부터 로그인 보안 강화 (네이버 로그인)
- 로그인 구분을 위해 'platform' 항목 추가, 일반 로그인과의 차별화 구현 (네이버 로그인)
- `SessionStorage`를 통한 로그인 상태 유지 (공통)
- SessionStorage 기반의 유저 데이터 관리 및 전역변수 활용 (공통)
- 로그인 통합 관리를 위해 'UID'를 공통 고유 식별자로 사용 (공통)

### 웹 관련
- 통합 운영을 위한 멀티 DB 활용
- 비동기적으로 저장후 즉각적으로 최신 데이터로 업데이트
- 페이지네이션 라이브러리로 게시글 표시 제한 구현
- 게시판 CRUD 기능 구현
- 게시글 제목 검색 기능 구현
- `WebSocket`을 활용한 실시간 관리자 응답 표시 ( 관리자 / 회원 구분 )

### 기능추가
- Redux 기능 구현( item12Customer.js ) _ 240420
- 자바스크립트를 타입스크립트로 변환 ( item12Customer.js → Userrecord.tsx ) _ 240422 
![redux_ex](https://github.com/oh-byung-rock/Caritas/assets/136219126/bd644db5-9e0c-4b8c-ad44-839a420deeee)
