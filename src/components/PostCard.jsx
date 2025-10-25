import React from 'react'
import { Heart, MessageCircle, Eye, Clock, MapPin, Bookmark } from 'lucide-react'

const PostCard = ({ post, onPostClick, onLike, onBookmark }) => {
  return (
    <div 
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 cursor-pointer"
      onClick={() => onPostClick(post)}
    >
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
          <button 
            onClick={(e) => {
              e.stopPropagation()
              onBookmark(post.id)
            }}
            className={`p-2 rounded-full backdrop-blur transition-colors ${
              post.bookmarked ? 'bg-yellow-500 text-white' : 'bg-white/90 text-gray-700 hover:bg-yellow-500 hover:text-white'
            }`}
          >
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
        <p className="text-gray-600 mb-4 line-clamp-2">{post.content.split('\n')[0]}</p>
        
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
              onClick={(e) => {
                e.stopPropagation()
                onLike(post.id)
              }}
              className={`flex items-center space-x-2 text-sm transition duration-200 ${
                post.liked 
                  ? 'text-red-500 hover:text-red-600' 
                  : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <Heart className={`h-4 w-4 ${post.liked ? 'fill-current' : ''}`} />
              <span>{post.likes}</span>
            </button>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <MessageCircle className="h-4 w-4" />
              <span>{post.comments}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Eye className="h-4 w-4" />
              <span>{post.views}</span>
            </div>
          </div>
          <div className="px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-sm font-medium transition duration-200">
            자세히 보기
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCard