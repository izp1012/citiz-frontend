
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

  const stats = [
    { label: '공유된 공간', value: '1,234', icon: MapPin, color: 'text-blue-600' },
    { label: '활성 사용자', value: '856', icon: Users, color: 'text-green-600' },
    { label: '오늘의 추천', value: '42', icon: Star, color: 'text-yellow-600' },
  ]

  const categories = [
    { name: '카페', count: 324, color: 'bg-brown-100 text-brown-700', emoji: '☕️' },
    { name: '야외공간', count: 256, color: 'bg-green-100 text-green-700', emoji: '🌳' },
    { name: '문화공간', count: 189, color: 'bg-purple-100 text-purple-700', emoji: '🎨' },
    { name: '바/펜스', count: 167, color: 'bg-pink-100 text-pink-700', emoji: '🍸' },
    { name: '워크스페이스', count: 143, color: 'bg-indigo-100 text-indigo-700', emoji: '💻' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6 animate-fade-in">
              특별한 공간을 발견하고 공유하세요
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {user?.name}님, 오늘은 어떤 멋진 공간을 찾아보시겠어요?<br/>
              숨겨진 보석 같은 장소들을 함께 나누어요 ✨
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition duration-200 flex items-center justify-center space-x-2 shadow-lg">
                <Camera className="h-5 w-5" />
                <span>공간 공유하기</span>
              </button>
              <Link
                to="/chat"
                className="bg-blue-800 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-900 transition duration-200 flex items-center justify-center space-x-2 shadow-lg"
              >
                <MessageSquare className="h-5 w-5" />
                <span>커뮤니티 채팅</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur">
            <MapPin className="h-8 w-8 text-white" />
          </div>
        </div>
        <div className="absolute top-32 right-20 animate-float-delayed">
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur">
            <Star className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 -mt-8 relative z-10">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
                <div className="flex items-center">
                  <div className={`p-4 rounded-xl ${stat.color} bg-opacity-10 mr-4`}>
                    <IconComponent className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-gray-600 font-medium">{stat.label}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

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
                <div key={post.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
                  {/* Image */}
                  <div className="relative">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full bg-white/90 backdrop-blur ${
                        post.category === '카페' ? 'text-brown-700' :
                        post.category === '야외공간' ? 'text-green-700' :
                        post.category === '바' ? 'text-pink-700' : 'text-purple-700'
                      }`}>
                        {post.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <button className={`p-2 rounded-full backdrop-blur transition-colors ${
                        post.bookmarked ? 'bg-yellow-500 text-white' : 'bg-white/90 text-gray-700 hover:bg-yellow-500 hover:text-white'
                      }`}>
                        <Bookmark className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur text-white px-2 py-1 rounded-lg text-sm font-medium">
                      ⭐ {post.rating}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="h-10 w-10 rounded-full border-2 border-gray-100"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">{post.author.name}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>{post.location}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {post.timestamp}
                      </p>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-6">
                        <button
                          className={`flex items-center space-x-2 text-sm transition duration-200 ${
                            post.liked 
                              ? 'text-red-500 hover:text-red-600' 
                              : 'text-gray-500 hover:text-red-500'
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${post.liked ? 'fill-current' : ''}`} />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-sm text-gray-500 hover:text-blue-500 transition duration-200">
                          <MessageIcon className="h-4 w-4" />
                          <span>{post.comments}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-sm text-gray-500 hover:text-green-500 transition duration-200">
                          <Share2 className="h-4 w-4" />
                          <span>공유</span>
                        </button>
                      </div>
                      <button className="px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-sm font-medium transition duration-200">
                        자세히 보기
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <button className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-600 rounded-xl font-medium transition duration-200">
                더 많은 공간 보기
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">빠른 액세스</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition duration-200 text-left">
                  <Camera className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700 font-medium">새 공간 공유</span>
                </button>
                <Link
                  to="/chat"
                  className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition duration-200"
                >
                  <MessageSquare className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700 font-medium">커뮤니티 채팅</span>
                </Link>
                <button className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition duration-200 text-left">
                  <MapPin className="h-5 w-5 text-purple-600" />
                  <span className="text-gray-700 font-medium">내 근처 공간</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition duration-200 text-left">
                  <Bookmark className="h-5 w-5 text-yellow-600" />
                  <span className="text-gray-700 font-medium">저장한 공간</span>
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">카테고리별 공간</h3>
              <div className="space-y-3">
                {categories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition duration-200 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{category.emoji}</span>
                      <span className="font-medium text-gray-700">{category.name}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${category.color}`}>
                      {category.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Places */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
                인기 급상승 지역
              </h3>
              <div className="space-y-3">
                {['강남구', '홍대', '이태원', '성수동'].map((area, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">{area}</span>
                    <div className="flex items-center text-purple-600">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      <span className="text-sm font-semibold">+{20 - index * 3}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Notice */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">🎉 이번 주 이벤트</h3>
              <p className="text-sm text-gray-600 mb-4">
                가장 많은 좋아요를 받은 공간 공유자에게 특별한 리워드를 드려요!
              </p>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                자세히 보기 →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage