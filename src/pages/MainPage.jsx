
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import { 
  MessageSquare, 
  Users, 
  Plus, 
  TrendingUp, 
  Clock, 
  Heart, 
  MessageCircle as MessageIcon,
  MapPin,
  Star,
  Camera,
  Share2,
  Bookmark
} from 'lucide-react'
import apiService from '../services/apiService'

const MainPage = () => {
  const { user } = useAuthStore()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await apiService.getPosts()
        console.log('📦 서버 응답:', data)
  
        // ✅ posts가 배열인지 확인하고 안전하게 저장
        if (Array.isArray(data)) {
          setPosts(data)
        } else if (data?.data && Array.isArray(data.data)) {
          setPosts(data.data)
        } else {
          console.warn('⚠️ 예상치 못한 데이터 구조:', data)
          setPosts([]) // 안전하게 빈 배열
        }
      } catch (err) {
        console.error('게시글 불러오기 실패:', err)
        setError('게시글을 불러오는 중 문제가 발생했습니다.')
      } finally {
        setLoading(false)
      }
    }
  
    fetchPosts()
  }, [])
  
  // Mock data for space sharing posts
  // const [posts] = useState([
  //   {
  //     id: 1,
  //     author: { 
  //       name: '김민지', 
  //       avatar: 'https://ui-avatars.com/api/?name=김민지&background=3b82f6&color=fff' 
  //     },
  //     title: '한강공원 피크닉 스팟 추천',
  //     content: '날씨 좋은 날 친구들과 피크닉하기 완벽한 장소를 발견했어요! 뷰도 좋고 그늘도 많아서 하루 종일 머물기 좋았습니다. 🌳',
  //     thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop&crop=center',
  //     location: '서울 한강공원',
  //     category: '야외공간',
  //     timestamp: '2시간 전',
  //     likes: 24,
  //     comments: 8,
  //     bookmarks: 12,
  //     liked: false,
  //     bookmarked: true,
  //     rating: 4.8,
  //     tags: ['피크닉', '한강', '뷰맛집', '데이트']
  //   },
  //   {
  //     id: 2,
  //     author: { 
  //       name: '이준호', 
  //       avatar: 'https://ui-avatars.com/api/?name=이준호&background=f59e0b&color=fff' 
  //     },
  //     title: '성수동 감성 카페 숨은 옥상',
  //     content: '성수동에 숨어있는 작은 카페의 옥상 테라스가 정말 예뻐요. 서울숲 뷰와 함께 여유로운 시간을 보낼 수 있는 공간입니다 ☕️',
  //     thumbnail: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&h=300&fit=crop&crop=center',
  //     location: '서울 성수동',
  //     category: '카페',
  //     timestamp: '4시간 전',
  //     likes: 31,
  //     comments: 12,
  //     bookmarks: 18,
  //     liked: true,
  //     bookmarked: false,
  //     rating: 4.6,
  //     tags: ['카페', '옥상', '성수동', '뷰']
  //   },
  //   {
  //     id: 3,
  //     author: { 
  //       name: '박서연', 
  //       avatar: 'https://ui-avatars.com/api/?name=박서연&background=ef4444&color=fff' 
  //     },
  //     title: '홍대 루프탑 바 추천',
  //     content: '홍대에서 일몰을 보며 칵테일을 즐길 수 있는 루프탑 바를 찾았어요! 분위기 좋고 사진 찍기도 완벽한 곳이에요 🍸✨',
  //     thumbnail: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&h=300&fit=crop&crop=center',
  //     location: '서울 홍대',
  //     category: '바',
  //     timestamp: '6시간 전',
  //     likes: 45,
  //     comments: 15,
  //     bookmarks: 28,
  //     liked: false,
  //     bookmarked: true,
  //     rating: 4.9,
  //     tags: ['루프탑', '칵테일', '일몰', '홍대']
  //   },
  //   {
  //     id: 4,
  //     author: { 
  //       name: '최다영', 
  //       avatar: 'https://ui-avatars.com/api/?name=최다영&background=10b981&color=fff' 
  //     },
  //     title: '북촌 한옥 갤러리 카페',
  //     content: '전통과 현대가 만나는 특별한 공간이에요. 한옥의 고즈넉함과 모던한 인테리어가 조화롭게 어우러진 곳입니다 🏮',
  //     thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop&crop=center',
  //     location: '서울 북촌',
  //     category: '문화공간',
  //     timestamp: '8시간 전',
  //     likes: 38,
  //     comments: 9,
  //     bookmarks: 22,
  //     liked: true,
  //     bookmarked: false,
  //     rating: 4.7,
  //     tags: ['한옥', '갤러리', '전통', '포토존']
  //   }
  // ])

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