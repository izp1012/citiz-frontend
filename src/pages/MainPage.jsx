import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import { MessageSquare, Users, Plus, TrendingUp, Clock, Heart, MessageCircle as MessageIcon } from 'lucide-react'

const MainPage = () => {
  const { user } = useAuthStore()
  
  // Mock data for demonstration
  const [posts] = useState([
    {
      id: 1,
      author: { name: '김철수', avatar: 'https://ui-avatars.com/api/?name=김철수&background=3b82f6&color=fff' },
      content: '오늘 날씨가 정말 좋네요! 산책하기 딱 좋은 날입니다. 🌞',
      timestamp: '2시간 전',
      likes: 12,
      comments: 3,
      liked: false
    },
    {
      id: 2,
      author: { name: '이영희', avatar: 'https://ui-avatars.com/api/?name=이영희&background=f59e0b&color=fff' },
      content: '새로운 카페에서 맛있는 커피를 마셨어요! 추천합니다 ☕️',
      timestamp: '3시간 전',
      likes: 8,
      comments: 5,
      liked: true
    },
    {
      id: 3,
      author: { name: '박민수', avatar: 'https://ui-avatars.com/api/?name=박민수&background=ef4444&color=fff' },
      content: 'React 프로젝트 진행중인데 WebSocket 연동이 생각보다 복잡하네요. 도움이 필요해요! 💻',
      timestamp: '5시간 전',
      likes: 15,
      comments: 7,
      liked: false
    }
  ])

  const stats = [
    { label: '총 사용자', value: '1,234', icon: Users, color: 'text-blue-600' },
    { label: '활성 채팅방', value: '56', icon: MessageSquare, color: 'text-green-600' },
    { label: '오늘의 포스트', value: '89', icon: TrendingUp, color: 'text-purple-600' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              안녕하세요, {user?.name}님! 👋
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Citiz에서 소통하고 새로운 사람들과 만나보세요
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/chat"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-200 flex items-center justify-center space-x-2"
              >
                <MessageSquare className="h-5 w-5" />
                <span>채팅 시작하기</span>
              </Link>
              <button className="bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-900 transition duration-200 flex items-center justify-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>새 포스트 작성</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-200">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10 mr-4`}>
                    <IconComponent className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-gray-600">{stat.label}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Posts */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">최근 포스트</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {posts.map((post) => (
                  <div key={post.id} className="p-6 hover:bg-gray-50 transition duration-200">
                    <div className="flex items-start space-x-3">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="h-10 w-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <p className="font-semibold text-gray-900">{post.author.name}</p>
                          <span className="text-gray-500">•</span>
                          <p className="text-sm text-gray-500 flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{post.timestamp}</span>
                          </p>
                        </div>
                        <p className="mt-2 text-gray-700">{post.content}</p>
                        
                        <div className="mt-4 flex items-center space-x-6">
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
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-6 text-center border-t border-gray-200">
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  더 많은 포스트 보기
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">빠른 액세스</h3>
              <div className="space-y-3">
                <Link
                  to="/chat"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition duration-200"
                >
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">채팅방 입장</span>
                </Link>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition duration-200">
                  <Plus className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">새 포스트 작성</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition duration-200">
                  <Users className="h-5 w-5 text-purple-600" />
                  <span className="text-gray-700">친구 찾기</span>
                </button>
              </div>
            </div>

            {/* Online Users */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">온라인 사용자</h3>
              <div className="space-y-3">
                {['김민지', '이재웅', '박서연'].map((name, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={`https://ui-avatars.com/api/?name=${name}&background=random&color=fff`}
                        alt={name}
                        className="h-8 w-8 rounded-full"
                      />
                      <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-700">{name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Notice */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">공지사항</h3>
              <p className="text-sm text-gray-600 mb-4">
                새로운 채팅 기능이 추가되었습니다! 실시간으로 소통해보세요.
              </p>
              <Link
                to="/chat"
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                자세히 보기 →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage