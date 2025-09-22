# Citiz Frontend

실시간 채팅과 포스팅 기능을 제공하는 커뮤니티 플랫폼의 프론트엔드 애플리케이션입니다.

## 🚀 주요 기능

### 📱 현재 구현된 기능
- **사용자 인증**: 로그인/로그아웃 시스템
- **실시간 채팅**: WebSocket을 통한 실시간 메시지 송수신
- **채팅방 관리**: 채팅방 생성, 입장, 퇴장
- **메시지 히스토리**: 과거 채팅 기록 조회
- **참여자 관리**: 온라인 사용자 표시, 입장/퇴장 알림
- **반응형 디자인**: 모바일/데스크톱 지원

### 🔄 개발 예정 기능
- **포스팅 시스템**: 게시글 작성, 수정, 삭제
- **소셜 기능**: 좋아요, 댓글, 공유
- **프로필 관리**: 사용자 프로필 편집
- **알림 시스템**: 실시간 알림
- **파일 업로드**: 이미지, 파일 첨부

## 🛠️ 기술 스택

- **React 18**: UI 라이브러리
- **Vite**: 빌드 도구 및 개발 서버
- **Tailwind CSS**: 스타일링
- **Zustand**: 상태 관리
- **React Router**: 라우팅
- **STOMP.js**: WebSocket 통신
- **SockJS**: WebSocket fallback

## 📦 설치 및 실행

### 필수 요구사항
- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치
```bash
# 저장소 클론
git clone <repository-url>
cd citiz-frontend

# 의존성 설치
npm install
# 또는
yarn install
```

### 개발 서버 실행
```bash
npm run dev
# 또는
yarn dev
```

개발 서버가 `http://localhost:3000`에서 실행됩니다.

### 빌드
```bash
npm run build
# 또는
yarn build
```

## 🔧 환경 설정

### 환경 변수
`.env` 파일을 생성하여 다음 환경 변수를 설정하세요:

```env
# 백엔드 API URL (개발환경)
VITE_API_BASE_URL=http://localhost:8080/api

# WebSocket URL (개발환경)
VITE_WS_BASE_URL=http://localhost:8080/ws/chat

# 프로덕션 환경의 경우
VITE_API_BASE_URL=https://your-backend-domain.com/api
VITE_WS_BASE_URL=https://your-backend-domain.com/ws/chat
```

### 백엔드 연동
이 프론트엔드는 Spring Boot 백엔드와 연동됩니다:
- REST API: `/api/chat/*` 엔드포인트
- WebSocket: `/ws/chat` 엔드포인트
- Redis Streams를 통한 메시지 처리

## 📱 사용법

### 로그인
1. 애플리케이션 접속
2. 사용자명과 비밀번호 입력 (현재 테스트용 - 임의 값 입력 가능)
3. 로그인 성공 후 메인 페이지로 이동

### 채팅 사용
1. 상단 네비게이션에서 "채팅" 클릭
2. 기존 채팅방 입장 또는 새 채팅방 생성
3. 실시간으로 메시지 송수신

### 주요 단축키
- `Enter`: 메시지 전송
- `Shift + Enter`: 줄바꿈

## 🚀 배포

### Vercel 배포
1. Vercel 계정 연결
2. 저장소 import
3. 환경 변수 설정
4. 자동 배포

```bash
# Vercel CLI 사용
npm i -g vercel
vercel --prod
```

### 기타 플랫폼
- **Netlify**: `dist` 폴더 업로드
- **GitHub Pages**: GitHub Actions 사용
- **Firebase Hosting**: Firebase CLI 사용

## 🏗️ 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   └── Navigation.jsx   # 네비게이션 바
├── pages/              # 페이지 컴포넌트
│   ├── LoginPage.jsx   # 로그인 페이지
│   ├── MainPage.jsx    # 메인 페이지
│   ├── ChatListPage.jsx # 채팅방 목록
│   └── ChatPage.jsx    # 채팅 페이지
├── services/           # API 및 서비스
│   ├── apiService.js   # REST API 호출
│   └── websocketService.js # WebSocket 통신
├── stores/             # 상태 관리 (Zustand)
│   ├── authStore.js    # 인증 상태
│   └── chatStore.js    # 채팅 상태
├── styles/             # 스타일 파일
│   └── globals.css     # 전역 스타일
└── App.jsx            # 메인 앱 컴포넌트
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 🐛 버그 리포트 & 기능 요청

[GitHub Issues](https://github.com/your-repo/citiz-frontend/issues)를 통해 버그 리포트나 기능 요청을 해주세요.

## 📞 연락처

- 프로젝트 링크: [https://github.com/your-repo/citiz-frontend](https://github.com/your-repo/citiz-frontend)
- 이메일: your-email@example.com

---

Made with ❤️ by Citiz Team