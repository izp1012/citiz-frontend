import React from 'react'
import { 
  ArrowLeft, Share2, MoreVertical, Eye, Clock, MapPin, 
  Heart, MessageCircle, Bookmark, ExternalLink 
} from 'lucide-react'
import CommentSection from './CommentSection'

const PostDetail = ({ 
  post, 
  onBack, 
  onLike, 
  onBookmark, 
  comments, 
  onAddComment,
  otherPosts,
  onPostClick 
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">목록으로</span>
            </button>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-full transition">
                <Share2 className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition">
                <MoreVertical className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Post Card */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              {/* Images Gallery */}
              <div className="relative">
                <img
                  src={post.images[0]}
                  alt={post.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full bg-white/90 backdrop-blur ${
                    post.category === '카페' ? 'text-brown-700' :
                    post.category === '야외공간' ? 'text-green-700' :
                    post.category === '바' ? 'text-pink-700' : 'text-purple-700'
                  }`}>
                    {post.category}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur text-white px-3 py-1 rounded-lg text-sm font-medium">
                  ⭐ {post.rating}
                </div>
              </div>

              {/* Additional Images */}
              {post.images.length > 1 && (
                <div className="grid grid-cols-3 gap-2 p-4 bg-gray-50">
                  {post.images.slice(1).map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`${post.title} ${index + 2}`}
                      className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
                    />
                  ))}
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                {/* Author Info */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="h-12 w-12 rounded-full border-2 border-gray-100"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{post.author.name}</p>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.timestamp}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {post.views}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-sm font-medium transition">
                    팔로우
                  </button>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {post.title}
                </h1>

                {/* Location */}
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">{post.location}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full font-medium hover:bg-blue-100 cursor-pointer transition"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Content */}
                <div className="prose prose-lg max-w-none mb-6">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {post.content}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => onLike(post.id)}
                      className={`flex items-center gap-2 transition ${
                        post.liked
                          ? 'text-red-500 hover:text-red-600'
                          : 'text-gray-500 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`h-6 w-6 ${post.liked ? 'fill-current' : ''}`} />
                      <span className="font-semibold">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition">
                      <MessageCircle className="h-6 w-6" />
                      <span className="font-semibold">{post.comments}</span>
                    </button>
                    <button
                      onClick={() => onBookmark(post.id)}
                      className={`flex items-center gap-2 transition ${
                        post.bookmarked
                          ? 'text-yellow-500 hover:text-yellow-600'
                          : 'text-gray-500 hover:text-yellow-500'
                      }`}
                    >
                      <Bookmark className={`h-6 w-6 ${post.bookmarked ? 'fill-current' : ''}`} />
                      <span className="font-semibold">{post.bookmarks}</span>
                    </button>
                  </div>
                  <button className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition">
                    <Share2 className="h-5 w-5" />
                    <span className="font-medium">공유하기</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Comments */}
            <CommentSection 
              comments={comments} 
              onAddComment={onAddComment}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Location Info */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">위치 정보</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 mb-1">주소</p>
                  <p className="text-gray-900 font-medium">{post.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">운영시간</p>
                  <p className="text-gray-900 font-medium">{post.openingHours}</p>
                </div>
                <button className="w-full mt-4 px-4 py-3 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg font-medium transition flex items-center justify-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  지도에서 보기
                </button>
              </div>
            </div>

            {/* Facilities */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">편의시설</h3>
              <div className="flex flex-wrap gap-2">
                {post.facilities.map((facility, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg"
                  >
                    {facility}
                  </span>
                ))}
              </div>
            </div>

            {/* Tips */}
            {post.tips && (
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  💡 방문 팁
                </h3>
                <p className="text-gray-700">{post.tips}</p>
              </div>
            )}

            {/* Similar Posts */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">비슷한 공간</h3>
              <div className="space-y-3">
                {otherPosts
                  .filter(p => p.id !== post.id && p.category === post.category)
                  .slice(0, 3)
                  .map((similarPost) => (
                    <div
                      key={similarPost.id}
                      onClick={() => onPostClick(similarPost)}
                      className="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition"
                    >
                      <img
                        src={similarPost.thumbnail}
                        alt={similarPost.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm line-clamp-1">
                          {similarPost.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{similarPost.location}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">⭐ {similarPost.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetail