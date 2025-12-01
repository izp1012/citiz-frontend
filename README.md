# 🌍 Citiz - 공간 공유 플랫폼

> 특별한 공간을 발견하고 공유하는 커뮤니티 플랫폼

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.6-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 📖 프로젝트 소개

Citiz는 **좋은 공간을 공유**하는 것을 핵심 가치로 하는 커뮤니티 플랫폼입니다. 사용자들이 발견한 멋진 카페, 아름다운 야외공간, 특별한 문화공간 등을 다른 사람들과 나누며 함께 더 나은 공간 경험을 만들어갑니다.

### 🎯 MVP 기능 (공간 공유 중심)

- **🏞️ 공간 발견 및 공유**: 숨겨진 보석 같은 장소들을 발견하고 공유
- **📸 비주얼 스토리텔링**: 아름다운 썸네일과 이미지로 공간의 매력 전달
- **🗺️ 위치 기반 서비스**: 내 주변의 멋진 공간들을 쉽게 찾기
- **⭐ 평점 및 리뷰**: 실제 방문자들의 생생한 후기와 평점
- **🏷️ 카테고리별 분류**: 카페, 야외공간, 문화공간, 바 등 다양한 카테고리
- **💬 실시간 커뮤니케이션**: 공간에 대한 궁금한 점을 바로 물어볼 수 있는 채팅

### ✨ 주요 특징

- 🎨 **모던하고 직관적인 UI/UX**: 공간의 아름다움을 극대화하는 디자인
- 📱 **완벽한 반응형**: 모바일/태블릿/데스크톱 모든 환경에서 최적화
- 🚀 **빠른 성능**: Vite 기반의 최적화된 빌드로 빠른 로딩
- 🔍 **스마트 검색**: 위치, 카테고리, 키워드로 원하는 공간을 쉽게 찾기
- 💾 **북마크 기능**: 관심 있는 공간을 저장하고 나중에 방문하기
- 🌟 **개인화된 추천**: 사용자 취향에 맞는 공간 추천

## 🛠️ 기술 스택

### Frontend Core
- **React 18**: 사용자 인터페이스 라이브러리
- **Vite**: 빠른 빌드 도구 및 개발 서버
- **Tailwind CSS**: 유틸리티 기반 CSS 프레임워크
- **Zustand**: 가벼운 상태 관리 라이브러리
- **React Router**: SPA 라우팅 솔루션

### 실시간 통신
- **STOMP.js**: WebSocket 프로토콜 구현
- **SockJS**: WebSocket fallback 지원
- **Fetch API**: REST API 통신

### 디자인 시스템
- **Lucide React**: 아이콘 라이브러리
- **Unsplash**: 고품질 이미지 소스
- **CSS 애니메이션**: 부드럽고 매력적인 인터랙션

## 📱 주요 화면

### 🏠 메인 페이지
- **Hero Section**: 브랜드 스토리와 CTA가 돋보이는 메인 영역
- **공간 피드**: 최근 공유된 공간들을 카드 형태로 표시
- **통계 대시보드**: 플랫폼 활동 현황 및 인사이트
- **카테고리별 분류**: 공간 타입별 쉬운 탐색
- **트렌딩 지역**: 인기 급상승 지역 정보

### 🔍 공간 상세 페이지
- **이미지 갤러리**: 공간의 아름다움을 보여주는 고품질 이미지들
- **상세 정보**: 위치, 연락처, 운영시간, 편의시설 등 종합 정보
- **사용자 리뷰**: 실제 방문자들의 솔직한 후기와 평점
- **방문 팁**: 더 나은 경험을 위한 실용적인 조언들
- **위치 정보**: 지도 연동 및 교통편 안내

### 💬 실시간 채팅
- **커뮤니티 채팅**: 공간에 대한 질문과 답변
- **실시간 알림**: 새로운 메시지 즉시 알림
- **참여자 관리**: 온라인 사용자 및 입장/퇴장 알림

## 🚀 시작하기

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
```

3. **환경 변수 설정**
```bash
cp .env.example .env
```

`.env` 파일을 편집하여 백엔드 서버 정보를 설정하세요:
```env
VITE_IMG_BASE_URL=http://localhost:8080
VITE_API_BASE_URL=http://localhost:8080/api
VITE_WS_BASE_URL=http://localhost:8080/ws/chat
```

4. **개발 서버 실행**
```bash
npm run dev
```

5. **브라우저에서 확인**
```
http://localhost:3000
https://citiz-frontend-rf7qs9k1e-thddls0221s-projects.vercel.app/
```

## 📁 프로젝트 구조

```
citiz-frontend/
├── public/                    # 정적 파일
├── src/
│   ├── components/            # 재사용 가능한 컴포넌트
│   │   └── Navigation.jsx     # 네비게이션 바
│   │   ├── HeroSection.jsx    # 메인 페이지 히어로 섹션
│   │   ├── StatsSection.jsx   # 통계 카드 섹션
│   │   ├── PostCard.jsx       # 게시글 카드 컴포넌트
│   │   ├── Sidebar.jsx        # 사이드바 (빠른 액세스, 카테고리 등)
│   │   ├── PostDetail.jsx     # 게시글 상세 페이지
│   │   └── CommentSection.jsx # 댓글 섹션
│   ├── pages/                 # 페이지 컴포넌트
│   │   ├── LoginPage.jsx      # 로그인 페이지
│   │   ├── MainPage.jsx       # 메인 대시보드 (공간 피드)
│   │   ├── SpaceDetailPage.jsx# 공간 상세 정보 (추후 구현예)
│   │   ├── ChatListPage.jsx   # 채팅방 목록
│   │   └── ChatPage.jsx       # 실시간 채팅
│   ├── services/              # 외부 서비스 연동
│   │   ├── apiService.js      # REST API 클라이언트
│   │   └── websocketService.js# WebSocket 관리
│   ├── stores/                # 상태 관리 (Zustand)
│   │   ├── authStore.js       # 인증 상태
│   │   └── chatStore.js       # 채팅 상태
│   ├── styles/                # 스타일 파일
│   │   └── globals.css        # 전역 스타일 및 애니메이션
│   ├── App.jsx               # 메인 앱 컴포넌트
│   └── main.jsx              # 애플리케이션 진입점
├── .env.example              # 환경 변수 템플릿
├── index.html                # HTML 템플릿
├── package.json              # 프로젝트 설정
├── tailwind.config.js        # Tailwind CSS 설정
├── vite.config.js            # Vite 설정
└── vercel.json              # Vercel 배포 설정
```

## 🎨 디자인 컨셉

### 색상 팔레트
- **Primary**: Blue-Purple Gradient (`#3b82f6` → `#8b5cf6`)
- **Secondary**: 카테고리별 컬러 시스템
- **Neutral**: 깔끔한 그레이 톤으로 콘텐츠 집중

### 타이포그래피
- **Font**: Inter (Google Fonts)
- **Weight**: 300-700 범위의 다양한 굵기
- **Scale**: 모바일 우선 반응형 타이포그래피

### 레이아웃 시스템
- **Grid**: CSS Grid & Flexbox 조합
- **Spacing**: Tailwind의 일관된 간격 시스템
- **Breakpoint**: 모바일 퍼스트 반응형 디자인

## 📊 주요 기능 상세

### 🏞️ 공간 공유 시스템
```javascript
// 공간 데이터 구조 예시
{
  id: 1,
  title: "한강공원 피크닉 스팟",
  description: "날씨 좋은 날 친구들과 피크닉하기 완벽한 장소...",
  images: ["thumbnail1.jpg", "image2.jpg", ...],
  location: {
    address: "서울특별시 영등포구 여의도동",
    coordinates: { lat: 37.5279, lng: 126.9343 }
  },
  category: "야외공간",
  rating: 4.8,
  tags: ["피크닉", "한강", "뷰맛집"],
  amenities: ["주차가능", "화장실", "편의점"]
}
```

### ⭐ 평점 및 리뷰 시스템
- **5점 척도**: 직관적인 별점 시스템
- **다중 기준**: 분위기, 접근성, 가성비 등 세부 평가
- **사진 리뷰**: 텍스트와 이미지를 함께 업로드
- **도움이 되는 리뷰**: 커뮤니티 투표 기능

### 🗺️ 위치 기반 서비스
- **현재 위치 기반**: GPS를 활용한 주변 공간 추천
- **거리 계산**: 사용자 위치에서의 거리 표시
- **교통편 안내**: 대중교통 및 도보 경로 정보
- **지역별 트렌드**: 인기 급상승 지역 분석

## 🌐 배포 및 운영

### Vercel 배포
```bash
# Vercel CLI 설치
npm i -g vercel

# 배포 실행
vercel --prod
```

### 환경 변수 관리
```bash
# 개발 환경
VITE_API_BASE_URL=http://localhost:8080/api
VITE_WS_BASE_URL=http://localhost:8080/ws/chat

# 프로덕션 환경
VITE_API_BASE_URL=https://api.citiz.com/api
VITE_WS_BASE_URL=https://api.citiz.com/ws/chat
```

## 🔮 로드맵

### Phase 1: 공간 공유 MVP (현재)
- [x] 공간 피드 및 상세 페이지
- [x] 기본 사용자 인증
- [x] 실시간 채팅 시스템
- [x] 반응형 디자인

### Phase 2: 사용자 경험 향상 (2025 Q3)
- [ ] 공간 등록 및 수정 기능
- [ ] 고급 검색 및 필터링
- [ ] 사용자 프로필 및 팔로우 시스템
- [ ] 북마크 및 위시리스트

### Phase 3: 커뮤니티 기능 강화 (2025 Q4)
- [ ] 공간 리뷰 및 평점 시스템
- [ ] 이벤트 및 모임 기능
- [ ] 포인트 및 리워드 시스템
- [ ] 소셜 공유 기능

### Phase 4: 고급 기능 (2026 Q1)
- [ ] AI 기반 개인화 추천
- [ ] 지도 통합 및 AR 기능
- [ ] 모바일 앱 개발
- [ ] 파트너십 및 예약 시스템

## 🤝 기여하기

공간 공유 플랫폼 Citiz 개발에 참여해주세요!

### 기여 방법
1. 저장소를 Fork 합니다
2. Feature 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 Push 합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

### 기여 가이드라인
- **UI/UX**: 공간의 아름다움을 극대화하는 디자인
- **성능**: 빠른 로딩과 부드러운 인터랙션
- **접근성**: 모든 사용자를 위한 포용적 디자인
- **모바일**: 모바일 우선 반응형 개발

## 📄 라이선스

이 프로젝트는 [MIT License](LICENSE) 하에 배포됩니다.

## 📞 문의 및 지원

- **GitHub Issues**: [Issues 페이지](https://github.com/your-username/citiz-frontend/issues)
- **Email**: hello@citiz.com
- **커뮤니티**: [Discord](https://discord.gg/citiz)

## 🙏 Special Thanks

이 프로젝트는 다음 오픈소스와 서비스의 도움으로 만들어졌습니다:

- **[Unsplash](https://unsplash.com)**: 아름다운 공간 이미지 제공
- **[Lucide](https://lucide.dev)**: 깔끔하고 일관된 아이콘 세트
- **[Tailwind CSS](https://tailwindcss.com)**: 빠른 스타일링을 위한 유틸리티 프레임워크
- **커뮤니티**: 피드백과 아이디어를 제공해주신 모든 분들

---

<div align="center">
  <strong>🌍 더 나은 공간, 더 나은 경험을 함께 만들어가요</strong>
  <br><br>
  <sub>⭐ 이 프로젝트가 도움이 되었다면 스타를 눌러주세요!</sub>
  <br>
  <sub>Made with ❤️ by Citiz Team</sub>
</div>

## 🚀 빠른 데모

### 메인 페이지 미리보기
```bash
# 개발 서버 실행 후
open http://localhost:3000
```

### 주요 화면 Flow
1. **로그인** → 사용자 인증 및 프로필 생성
2. **메인 피드** → 공간들을 카드 형태로 탐색
3. **공간 상세** → 이미지, 정보, 리뷰 종합 뷰
4. **커뮤니티 채팅** → 실시간 소통 및 질문 답변

## 🎯 프로젝트 목표

### 비전
> **"모든 사람이 더 나은 공간을 발견하고 경험할 수 있는 세상"**

### 미션  
- 🔍 **발견**: 숨겨진 좋은 공간들을 쉽게 찾을 수 있게
- 🤝 **공유**: 개인의 특별한 경험을 커뮤니티와 나누기
- 💫 **연결**: 공간을 통해 사람과 사람을 연결하기
- 🌱 **성장**: 지역 상권과 문화 공간의 성장 도모

## 💡 MVP 검증 포인트

### 핵심 가치 제안
1. **시각적 매력**: 아름다운 이미지로 공간의 매력을 직관적으로 전달
2. **신뢰성**: 실제 방문자들의 생생한 후기와 평점
3. **편의성**: 위치, 연락처, 운영시간 등 필수 정보 원스톱 제공
4. **커뮤니티**: 궁금한 점을 바로 물어볼 수 있는 실시간 소통

### 측정 지표
- **참여도**: 일일 활성 사용자 수 (DAU)
- **만족도**: 평균 세션 시간 및 재방문율
- **확산**: 공간 공유 및 소셜 공유 횟수
- **전환**: 실제 공간 방문으로 이어지는 비율

## 🔧 개발자 가이드

### 로컬 개발 환경 세팅
```bash
# 1. 저장소 클론
git clone https://github.com/your-username/citiz-frontend.git
cd citiz-frontend

# 2. Node.js 버전 확인 (18.0.0 이상)
node --version

# 3. 의존성 설치
npm install

# 4. 환경 변수 설정
cp .env.example .env

# 5. 개발 서버 실행
npm run dev
```

### 코드 스타일 가이드
```javascript
// ✅ Good - 명확한 컴포넌트명과 props
const SpaceCard = ({ space, onLike, onBookmark }) => {
  return (
    
      {/* ... */}
    
  )
}

// ✅ Good - 일관된 상태 관리
const useSpaceStore = create((set) => ({
  spaces: [],
  loading: false,
  setSpaces: (spaces) => set({ spaces }),
  setLoading: (loading) => set({ loading })
}))
```

### 반응형 디자인 원칙
```css
/* 모바일 우선 접근법 */
.space-card {
  @apply w-full p-4;
}

/* 태블릿 */
@media (min-width: 768px) {
  .space-card {
    @apply w-1/2 p-6;
  }
}

/* 데스크톱 */
@media (min-width: 1024px) {
  .space-card {
    @apply w-1/3 p-8;
  }
}
```

## 📈 성능 최적화

### 이미지 최적화
- **Lazy Loading**: 뷰포트에 진입할 때만 이미지 로드
- **WebP Format**: 지원 브라우저에서 WebP 형식 사용
- **Responsive Images**: 화면 크기별 적절한 이미지 크기 제공

### 번들 최적화
- **Code Splitting**: 라우트별 청크 분할
- **Tree Shaking**: 사용하지 않는 코드 제거
- **Compression**: Gzip/Brotli 압축 적용

### 사용자 경험 최적화
- **Skeleton UI**: 로딩 중 콘텐츠 구조 미리보기
- **Progressive Loading**: 중요한 콘텐츠 우선 로드
- **Offline Support**: Service Worker를 통한 오프라인 지원

## 🧪 테스트 전략

### 단위 테스트
```javascript
// src/components/__tests__/SpaceCard.test.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import SpaceCard from '../SpaceCard'

test('좋아요 버튼 클릭 시 카운트가 증가한다', () => {
  const mockSpace = { id: 1, title: 'Test Space', likes: 10 }
  const mockOnLike = jest.fn()
  
  render()
  
  const likeButton = screen.getByRole('button', { name: /좋아요/i })
  fireEvent.click(likeButton)
  
  expect(mockOnLike).toHaveBeenCalledWith(mockSpace.id)
})
```

### E2E 테스트
```javascript
// cypress/e2e/space-sharing.cy.js
describe('공간 공유 플로우', () => {
  it('사용자가 공간을 탐색하고 상세 정보를 볼 수 있다', () => {
    cy.visit('/')
    cy.get('[data-testid="space-card"]').first().click()
    cy.url().should('include', '/space/')
    cy.get('[data-testid="space-title"]').should('be.visible')
    cy.get('[data-testid="space-images"]').should('be.visible')
  })
})
```

## 🔐 보안 및 프라이버시

### 데이터 보호
- **HTTPS 강제**: 모든 통신 암호화
- **CSP 헤더**: XSS 공격 방지
- **Input Sanitization**: 사용자 입력 데이터 검증

### 개인정보 처리
- **최소 수집 원칙**: 서비스 제공에 필요한 최소한의 정보만 수집
- **동의 기반**: 명시적 사용자 동의 하에 정보 수집
- **데이터 보관 기간**: 목적 달성 후 즉시 삭제 또는 익명화

## 🌐 국제화 및 접근성

### 다국어 지원 준비
```javascript
// src/i18n/ko.json
{
  "common": {
    "like": "좋아요",
    "share": "공유하기",
    "bookmark": "북마크"
  },
  "space": {
    "categories": {
      "cafe": "카페",
      "outdoor": "야외공간",
      "culture": "문화공간"
    }
  }
}
```

### 웹 접근성 (a11y)
- **Semantic HTML**: 의미있는 HTML 구조 사용
- **ARIA Labels**: 스크린 리더 지원
- **Keyboard Navigation**: 키보드만으로 모든 기능 사용 가능
- **Color Contrast**: WCAG 기준 준수

## 📱 모바일 최적화

### PWA 기능 (향후 추가 예정)
- **Service Worker**: 오프라인 지원 및 캐싱
- **Web App Manifest**: 홈 화면 추가 지원
- **Push Notifications**: 새로운 공간 알림

### 터치 최적화
- **Touch Target**: 44px 이상 터치 영역 확보
- **Swipe Gestures**: 이미지 갤러리 스와이프 지원
- **Pull to Refresh**: 새로고침 제스처 지원

---

**🎉 Citiz로 특별한 공간 여행을 시작해보세요!**

이 플랫폼을 통해 더 많은 사람들이 좋은 공간을 발견하고, 새로운 경험을 할 수 있기를 바랍니다. 여러분의 소중한 공간 이야기를 기다리고 있어요! 🌟
