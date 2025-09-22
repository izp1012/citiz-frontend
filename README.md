# 🌟 Citiz Frontend

> 실시간 채팅과 포스팅을 지원하는 커뮤니티 플랫폼의 React 프론트엔드

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.6-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 📖 프로젝트 소개

Citiz는 실시간 채팅과 소셜 포스팅을 결합한 현대적인 커뮤니티 플랫폼입니다. Spring Boot 백엔드와 연동하여 WebSocket 기반의 실시간 통신과 Redis Streams를 활용한 메시지 처리를 지원합니다.

### ✨ 주요 특징

- 🚀 **실시간 채팅**: WebSocket(STOMP) 기반 즉시 메시징
- 📱 **반응형 디자인**: 모바일/태블릿/데스크톱 완벽 지원
- 🔄 **자동 재연결**: 네트워크 끊김 시 자동 복구
- 💬 **타이핑 표시**: 실시간 타이핑 상태 알림
- 👥 **참여자 관리**: 온라인 사용자 및 입장/퇴장 알림
- 🎨 **모던 UI**: Tailwind CSS 기반 아름다운 인터페이스
- ⚡ **빠른 성능**: Vite 기반 최적화된 빌드

## 🛠️ 기술 스택

### Frontend
- **React 18**: 사용자 인터페이스 라이브러리
- **Vite**: 빠른 빌드 도구 및 개발 서버
- **Tailwind CSS**: 유틸리티 기반 CSS 프레임워크
- **Zustand**: 가벼운 상태 관리 라이브러리
- **React Router**: SPA 라우팅 솔루션

### 통신
- **STOMP.js**: WebSocket 프로토콜 구현
- **SockJS**: WebSocket fallback 지원
- **Fetch API**: REST API 통신

### 개발 도구
- **ESLint**: 코드 품질 관리
- **PostCSS**: CSS 처리
- **Autoprefixer**: 브라우저 호환성

## 🚀 빠른 시작

### 필수 요구사항
- Node.js 18.0.0 이상
- npm 8.0.0 이상 또는 yarn 1.22.0 이상

### 설치 및 실행

1. **저장소 클론**
```bash
git clone https://github.com/your-username/citiz-frontend.git
cd citiz-frontend
```

2. **의존성 설치**
```bash
npm install
# 또는
yarn install
```

3. **환경 변수 설정**
```bash
cp .env.example .env
```

`.env` 파일을 편집하여 백엔드 서버 정보를 설정하세요:
```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_WS_BASE_URL=http://localhost:8080/ws/chat
```

4. **개발 서버 실행**
```bash
npm run dev
# 또는
yarn dev
```

5. **브라우저에서 확인**
```
http://localhost:3000
```

### 프로덕션 빌드
```bash
npm run build
# 또는
yarn build
```

## 📁 프로젝트 구조

```
citiz-frontend/
├── public/                 # 정적 파일
├── src/
│   ├── components/         # 재사용 가능한 컴포넌트
│   │   └── Navigation.jsx  # 네비게이션 바
│   ├── pages/             # 페이지 컴포넌트
│   │   ├── LoginPage.jsx  # 로그인 페이지
│   │   ├── MainPage.jsx   # 메인 대시보드
│   │   ├── ChatListPage.jsx # 채팅방 목록
│   │   └── ChatPage.jsx   # 채팅 인터페이스
│   ├── services/          # 외부 서비스 연동
│   │   ├── apiService.js  # REST API 클라이언트
│   │   └── websocketService.js # WebSocket 관리
│   ├── stores/            # 상태 관리 (Zustand)
│   │   ├── authStore.js   # 인증 상태
│   │   └── chatStore.js   # 채팅 상태
│   ├── styles/            # 스타일 파일
│   │   └── globals.css    # 전역 스타일
│   ├── App.jsx           # 메인 앱 컴포넌트
│   └── main.jsx          # 애플리케이션 진입점
├── .env.example          # 환경 변수 템플릿
├── .gitignore           # Git 무시 파일
├── index.html           # HTML 템플릿
├── package.json         # 프로젝트 설정
├── tailwind.config.js   # Tailwind 설정
├── vite.config.js       # Vite 설정
└── vercel.json          # Vercel 배포 설정
```

## 🔗 백엔드 연동

이 프론트엔드는 다음 백엔드 API와 연동됩니다:

### REST API 엔드포인트
- `POST /api/chat/rooms` - 채팅방 생성
- `GET /api/chat/rooms` - 채팅방 목록 조회
- `POST /api/chat/rooms/{roomId}/join` - 채팅방 입장
- `POST /api/chat/rooms/{roomId}/leave` - 채팅방 퇴장
- `GET /api/chat/rooms/{roomId}/messages` - 채팅 히스토리

### WebSocket 엔드포인트
- `/ws/chat` - WebSocket 연결
- `/app/chat/send/{roomId}` - 메시지 전송
- `/topic/chat/{roomId}` - 메시지 구독

### 필요한 Headers
- `User-Id`: 사용자 ID
- `Authorization`: Bearer 토큰 (구현 예정)

## 🌐 배포

### Vercel 배포 (추천)

1. **Vercel CLI 설치**
```bash
npm i -g vercel
```

2. **배포 실행**
```bash
vercel --prod
```

3. **환경 변수 설정**
Vercel 대시보드에서 프로덕션 환경 변수를 설정하세요.

### 기타 배포 옵션
- **Netlify**: `npm run build` 후 `dist` 폴더 업로드
- **GitHub Pages**: GitHub Actions 워크플로우 사용
- **Firebase Hosting**: Firebase CLI 사용

## 📱 사용법

### 1. 로그인
- 사용자명과 비밀번호를 입력 (현재 테스트 모드)
- 자동으로 사용자 프로필 생성

### 2. 메인 대시보드
- 플랫폼 통계 확인
- 빠른 액세스 메뉴 이용
- 온라인 사용자 확인

### 3. 채팅 기능
- **새 채팅방 생성**: "새 채팅방" 버튼 클릭
- **채팅방 입장**: 목록에서 채팅방 선택
- **실시간 메시징**: 메시지 입력 후 Enter 키
- **파일 첨부**: 클립 아이콘 클릭 (개발 예정)

### 4. 단축키
- `Enter`: 메시지 전송
- `Shift + Enter`: 줄바꿈
- `Esc`: 모달 닫기

## 🔧 개발 가이드

### 코딩 스타일
- **ESLint**: 코드 품질 관리
- **Prettier**: 코드 포맷팅 (설정 권장)
- **Tailwind CSS**: 유틸리티 클래스 사용

### 상태 관리
- **authStore**: 사용자 인증 상태
- **chatStore**: 채팅 관련 상태
- 필요시 추가 store 생성

### 컴포넌트 구조
- **Pages**: 라우트별 페이지 컴포넌트
- **Components**: 재사용 가능한 UI 컴포넌트
- **Services**: 외부 API 및 WebSocket 관리

### 환경 분리
- **Development**: `localhost:8080` 백엔드
- **Production**: 실제 배포된 백엔드 URL

## 🐛 알려진 이슈

- [ ] 메시지 전송 실패 시 재시도 로직 개선 필요
- [ ] 이미지/파일 업로드 기능 미구현
- [ ] 모바일에서 키보드 올라올 때 스크롤 이슈

## 🚧 개발 예정 기능

### 단기 계획 (1-2주)
- [ ] 포스팅 시스템 구현
- [ ] 프로필 관리 기능
- [ ] 알림 시스템 추가
- [ ] 다크 모드 지원

### 중기 계획 (1-2개월)
- [ ] 파일 업로드/다운로드
- [ ] 검색 기능 강화
- [ ] 실시간 알림
- [ ] PWA 지원

### 장기 계획 (3-6개월)
- [ ] 모바일 앱 개발
- [ ] 음성/화상 채팅
- [ ] AI 챗봇 연동
- [ ] 다국어 지원

## 🤝 기여하기

프로젝트에 기여해주세요! 다음 단계를 따라주세요:

1. **Fork** 프로젝트
2. **Feature branch** 생성 (`git checkout -b feature/amazing-feature`)
3. **Commit** 변경사항 (`git commit -m 'Add amazing feature'`)
4. **Push** 브랜치 (`git push origin feature/amazing-feature`)
5. **Pull Request** 생성

### 기여 가이드라인
- 코드 스타일 준수
- 테스트 코드 작성
- 문서 업데이트
- 이슈 템플릿 사용

## 📄 라이선스

이 프로젝트는 [MIT License](LICENSE) 하에 배포됩니다.

## 👥 팀

- **Frontend Developer**: [@your-username](https://github.com/your-username)
- **Backend Developer**: [@backend-dev](https://github.com/backend-dev)
- **UI/UX Designer**: [@designer](https://github.com/designer)

## 📞 문의

- **GitHub Issues**: [Issues 페이지](https://github.com/your-username/citiz-frontend/issues)
- **Email**: citiz.support@example.com
- **Discord**: [Citiz 커뮤니티](https://discord.gg/citiz)

## 🙏 감사의 말

이 프로젝트는 다음 오픈소스 라이브러리들의 도움으로 만들어졌습니다:
- React Team for React
- Evan You for Vite
- Tailwind Labs for Tailwind CSS
- And many other contributors

---

<div align="center">
  <strong>Made with ❤️ by Citiz Team</strong>
  <br>
  <sub>⭐ 이 프로젝트가 도움이 되었다면 스타를 눌러주세요!</sub>
</div>