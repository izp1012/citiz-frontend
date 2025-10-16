import React from 'react'
import { Link } from 'react-router-dom'
import { MessageSquare, MapPin, Star, Camera } from 'lucide-react'

const HeroSection = ({ userName }) => {
  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in">
            특별한 공간을 발견하고 공유하세요
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {userName && `${userName}님, `}오늘은 어떤 멋진 공간을 찾아보시겠어요?<br/>
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
  )
}

export default HeroSection