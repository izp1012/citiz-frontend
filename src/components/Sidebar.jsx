import React from 'react'
import { Link } from 'react-router-dom'
import { Camera, MessageSquare, MapPin, Bookmark, TrendingUp } from 'lucide-react'

const Sidebar = () => {
  const categories = [
    { name: '카페', count: 324, color: 'bg-brown-100 text-brown-700', emoji: '☕️' },
    { name: '야외공간', count: 256, color: 'bg-green-100 text-green-700', emoji: '🌳' },
    { name: '문화공간', count: 189, color: 'bg-purple-100 text-purple-700', emoji: '🎨' },
    { name: '바/펍', count: 167, color: 'bg-pink-100 text-pink-700', emoji: '🍸' },
    { name: '워크스페이스', count: 143, color: 'bg-indigo-100 text-indigo-700', emoji: '💻' },
  ]

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">빠른 액세스</h3>
        <div className="space-y-3">
          <Link
                to="/post/new"
                className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition duration-200 text-left"
              >
            <Camera className="h-5 w-5 text-blue-600" />
            <span className="text-gray-700 font-medium">새 공간 공유</span>
          </Link>
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
            <div 
              key={index} 
              className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition duration-200 cursor-pointer"
            >
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
  )
}

export default Sidebar