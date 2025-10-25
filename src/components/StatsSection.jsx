import React from 'react'
import { MapPin, Users, Star } from 'lucide-react'

const StatsSection = () => {
  const stats = [
    { label: '공유된 공간', value: '1,234', icon: MapPin, color: 'text-blue-600' },
    { label: '활성 사용자', value: '856', icon: Users, color: 'text-green-600' },
    { label: '오늘의 추천', value: '42', icon: Star, color: 'text-yellow-600' },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 -mt-8 relative z-10">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon
        return (
          <div 
            key={index} 
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
          >
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
  )
}

export default StatsSection