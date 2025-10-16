import React, { useState } from 'react'
import { useAuthStore } from '../stores/authStore'
import HeroSection from '../components/HeroSection'
import StatsSection from '../components/StatsSection'
import PostCard from '../components/PostCard'
import Sidebar from '../components/Sidebar'
import PostDetail from '../components/PostDetail'

const MainPage = () => {
  const { user } = useAuthStore()
  const [selectedPost, setSelectedPost] = useState(null)
  const [commentsList, setCommentsList] = useState({
    1: [
      { id: 1, author: '홍길동', avatar: 'https://ui-avatars.com/api/?name=홍길동&background=random', content: '여기 정말 좋아요! 저도 다녀왔는데 강추합니다 👍', timestamp: '1시간 전', likes: 5 },
      { id: 2, author: '이영희', avatar: 'https://ui-avatars.com/api/?name=이영희&background=random', content: '주말에 가볼게요. 사진 감사합니다!', timestamp: '30분 전', likes: 2 }
    ],
    2: [
      { id: 1, author: '박철수', avatar: 'https://ui-avatars.com/api/?name=박철수&background=random', content: '카페 이름 알 수 있을까요?', timestamp: '2시간 전', likes: 3 }
    ],
    3: [],
    4: []
  })

  const [posts, setPosts] = useState([
    {
      id: 1,
      author: { 
        name: '김민지', 
        avatar: 'https://ui-avatars.com/api/?name=김민지&background=3b82f6&color=fff' 
      },
      title: '한강공원 피크닉 스팟 추천',
      content: '날씨 좋은 날 친구들과 피크닉하기 완벽한 장소를 발견했어요! 뷰도 좋고 그늘도 많아서 하루 종일 머물기 좋았습니다. 🌳\n\n이곳은 한강공원 중에서도 특히 조용하고 한적한 곳이에요. 주변에 편의점도 가까워서 필요한 것들을 바로 구매할 수 있고, 자전거 대여소도 근처에 있어서 라이딩도 즐길 수 있답니다.\n\n특히 해질녘의 노을이 정말 아름다워요. 친구들이나 연인과 함께 방문하기 딱 좋은 곳입니다!',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop&crop=center',
      images: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=600&fit=crop'
      ],
      location: '서울 한강공원',
      category: '야외공간',
      timestamp: '2시간 전',
      likes: 24,
      comments: 8,
      bookmarks: 12,
      views: 156,
      liked: false,
      bookmarked: true,
      rating: 4.8,
      tags: ['피크닉', '한강', '뷰맛집', '데이트'],
      address: '서울시 영등포구 여의동로 330',
      openingHours: '24시간',
      facilities: ['주차장', '화장실', '편의점', '자전거대여'],
      tips: '주말에는 사람이 많으니 평일 오전을 추천드려요!'
    },
    {
      id: 2,
      author: { 
        name: '이준호', 
        avatar: 'https://ui-avatars.com/api/?name=이준호&background=f59e0b&color=fff' 
      },
      title: '성수동 감성 카페 숨은 옥상',
      content: '성수동에 숨어있는 작은 카페의 옥상 테라스가 정말 예뻐요. 서울숲 뷰와 함께 여유로운 시간을 보낼 수 있는 공간입니다 ☕️\n\n커피도 맛있고 디저트도 정성스럽게 만들어주세요. 특히 시그니처 라떼가 일품입니다!',
      thumbnail: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&h=300&fit=crop&crop=center',
      images: [
        'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop'
      ],
      location: '서울 성수동',
      category: '카페',
      timestamp: '4시간 전',
      likes: 31,
      comments: 12,
      bookmarks: 18,
      views: 243,
      liked: true,
      bookmarked: false,
      rating: 4.6,
      tags: ['카페', '옥상', '성수동', '뷰'],
      address: '서울시 성동구 연무장길 74',
      openingHours: '10:00 - 22:00',
      facilities: ['와이파이', '콘센트', '반려동물동반'],
      tips: '루프탑은 날씨 좋은 날 추천!'
    },
    {
      id: 3,
      author: { 
        name: '박서연', 
        avatar: 'https://ui-avatars.com/api/?name=박서연&background=ef4444&color=fff' 
      },
      title: '홍대 루프탑 바 추천',
      content: '홍대에서 일몰을 보며 칵테일을 즐길 수 있는 루프탑 바를 찾았어요! 분위기 좋고 사진 찍기도 완벽한 곳이에요 🍸✨\n\n다양한 칵테일 메뉴와 함께 맛있는 안주도 준비되어 있어요.',
      thumbnail: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&h=300&fit=crop&crop=center',
      images: [
        'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&h=600&fit=crop'
      ],
      location: '서울 홍대',
      category: '바',
      timestamp: '6시간 전',
      likes: 45,
      comments: 15,
      bookmarks: 28,
      views: 389,
      liked: false,
      bookmarked: true,
      rating: 4.9,
      tags: ['루프탑', '칵테일', '일몰', '홍대'],
      address: '서울시 마포구 와우산로 29길 20',
      openingHours: '17:00 - 02:00',
      facilities: ['예약가능', '단체석', '주차'],
      tips: '일몰 시간 1시간 전 방문 추천!'
    },
    {
      id: 4,
      author: { 
        name: '최다영', 
        avatar: 'https://ui-avatars.com/api/?name=최다영&background=10b981&color=fff' 
      },
      title: '북촌 한옥 갤러리 카페',
      content: '전통과 현대가 만나는 특별한 공간이에요. 한옥의 고즈넉함과 모던한 인테리어가 조화롭게 어우러진 곳입니다 🏮\n\n전통차와 디저트를 즐기며 여유로운 시간을 보낼 수 있어요.',
      thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop&crop=center',
      images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
      ],
      location: '서울 북촌',
      category: '문화공간',
      timestamp: '8시간 전',
      likes: 38,
      comments: 9,
      bookmarks: 22,
      views: 267,
      liked: true,
      bookmarked: false,
      rating: 4.7,
      tags: ['한옥', '갤러리', '전통', '포토존'],
      address: '서울시 종로구 북촌로 11길 20',
      openingHours: '11:00 - 20:00',
      facilities: ['갤러리', '포토존', '전통차'],
      tips: '주말엔 웨이팅이 있을 수 있어요'
    }
  ])

  const handlePostClick = (post) => {
    setSelectedPost(post)
    setPosts(posts.map(p => 
      p.id === post.id ? { ...p, views: p.views + 1 } : p
    ))
  }

  const handleLike = (postId) => {
    const updatedPosts = posts.map(p => 
      p.id === postId 
        ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
        : p
    )
    setPosts(updatedPosts)
    
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(updatedPosts.find(p => p.id === postId))
    }
  }

  const handleBookmark = (postId) => {
    const updatedPosts = posts.map(p => 
      p.id === postId 
        ? { ...p, bookmarked: !p.bookmarked, bookmarks: p.bookmarked ? p.bookmarks - 1 : p.bookmarks + 1 }
        : p
    )
    setPosts(updatedPosts)
    
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(updatedPosts.find(p => p.id === postId))
    }
  }

  const handleAddComment = (content) => {
    if (!selectedPost) return

    const newComment = {
      id: Date.now(),
      author: '현재사용자',
      avatar: 'https://ui-avatars.com/api/?name=현재사용자&background=random',
      content: content,
      timestamp: '방금 전',
      likes: 0
    }
    
    setCommentsList({
      ...commentsList,
      [selectedPost.id]: [...(commentsList[selectedPost.id] || []), newComment]
    })
    
    const updatedPosts = posts.map(p => 
      p.id === selectedPost.id 
        ? { ...p, comments: p.comments + 1 }
        : p
    )
    setPosts(updatedPosts)
    setSelectedPost(updatedPosts.find(p => p.id === selectedPost.id))
  }

  // 상세 페이지 렌더링
  if (selectedPost) {
    return (
      <PostDetail
        post={selectedPost}
        onBack={() => setSelectedPost(null)}
        onLike={handleLike}
        onBookmark={handleBookmark}
        comments={commentsList[selectedPost.id] || []}
        onAddComment={handleAddComment}
        otherPosts={posts}
        onPostClick={handlePostClick}
      />
    )
  }

  // 메인 페이지 렌더링
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection userName={user?.name} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <StatsSection />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content - Posts */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">최근 공유된 공간</h2>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium">최신순</button>
                <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">인기순</button>
                <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">거리순</button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onPostClick={handlePostClick}
                  onLike={handleLike}
                  onBookmark={handleBookmark}
                />
              ))}
            </div>
            
            <div className="text-center mt-8">
              <button className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-600 rounded-xl font-medium transition duration-200">
                더 많은 공간 보기
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </div>
    </div>
  )
}

export default MainPage