// src/pages/ProfilePage.jsx
import React from 'react'
import { useAuthStore } from '../stores/authStore'
import { User, Mail, MapPin, Heart, MessageCircle, Bookmark } from 'lucide-react'

const ProfilePage = () => {
  const { user } = useAuthStore()

  // ✅ 목업 게시글 데이터 (user 정보만 실제로 섞어서 사용)
  const mockPosts = [
    {
      id: 1,
      title: '한강 피크닉 스팟 공유',
      thumbnail:
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500&h=300&fit=crop&crop=center',
      location: '서울 한강공원',
      category: '야외공간',
      likes: 24,
      comments: 8,
      bookmarks: 12,
      tags: ['피크닉', '뷰맛집'],
      timestamp: '2일 전',
    },
    {
      id: 2,
      title: '성수 루프탑 카페',
      thumbnail:
        'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=500&h=300&fit=crop&crop=center',
      location: '서울 성수동',
      category: '카페',
      likes: 31,
      comments: 12,
      bookmarks: 18,
      tags: ['카페', '루프탑'],
      timestamp: '5일 전',
    },
    {
      id: 3,
      title: '홍대 루프탑 바',
      thumbnail:
        'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=500&h=300&fit=crop&crop=center',
      location: '서울 홍대',
      category: '바',
      likes: 45,
      comments: 15,
      bookmarks: 28,
      tags: ['루프탑', '야경'],
      timestamp: '1주 전',
    },
  ]

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">로그인이 필요합니다.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* fixed navigation 때문에 pt-16 */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 상단: 프로필 + 소개 */}
        <div className="flex flex-col md:flex-row gap-8 mb-10">
          {/* 왼쪽: 프로필 카드 */}
          <div className="bg-white rounded-2xl shadow-sm p-6 md:w-1/3">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={
                  user.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.username || '사용자'
                  )}&background=3b82f6&color=fff`
                }
                alt={user.username}
                className="h-16 w-16 rounded-full"
              />
              <div className="text-left">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  {user.username}
                  <span className="inline-flex items-center px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700">
                    <User className="h-3 w-3 mr-1" />
                    내 프로필
                  </span>
                </h2>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  {user.email}
                </p>
                <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                  <MapPin className="h-3 w-3" />
                  활동 지역을 등록해보세요
                </p>
              </div>
            </div>

            <div className="text-sm text-gray-700 mb-4">
              아직 소개글이 없습니다. <br />
              프로필 편집 기능이 연결되면, 나를 소개하는 한 줄을 남겨보세요 :)
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-sm text-gray-600">
              <div className="bg-gray-50 rounded-xl py-2">
                <p className="text-xs text-gray-400">게시글</p>
                <p className="font-semibold">{mockPosts.length}</p>
              </div>
              <div className="bg-gray-50 rounded-xl py-2">
                <p className="text-xs text-gray-400">북마크</p>
                <p className="font-semibold">0</p>
              </div>
              <div className="bg-gray-50 rounded-xl py-2">
                <p className="text-xs text-gray-400">좋아요</p>
                <p className="font-semibold">
                  {mockPosts.reduce((sum, p) => sum + p.likes, 0)}
                </p>
              </div>
            </div>
          </div>

          {/* 오른쪽: 프로필 편집 목업 */}
          <div className="bg-white rounded-2xl shadow-sm p-6 md:flex-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">프로필 편집 (목업)</h3>
              <p className="text-xs text-gray-400">아직 API와는 연결되지 않은 화면입니다.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  닉네임
                </label>
                <input
                  type="text"
                  className="w-full rounded-xl border-gray-200 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  defaultValue={user.username}
                  disabled
                />
                <p className="mt-1 text-xs text-gray-400">
                  실제 수정 기능은 추후 API 연동 시 구현 예정입니다.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  한 줄 소개
                </label>
                <textarea
                  rows={3}
                  className="w-full rounded-xl border-gray-200 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="예) 카페 탐방 좋아하는 프론트엔드 개발자입니다 ☕️"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  활동 지역
                </label>
                <input
                  type="text"
                  className="w-full rounded-xl border-gray-200 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="예) 서울 성수동, 부산 해운대"
                  disabled
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 rounded-xl bg-gray-100 text-sm text-gray-500 cursor-not-allowed"
                >
                  저장하기 (준비중)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 아래: 내가 쓴 게시글 목업 리스트 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">내가 쓴 게시글 (목업)</h3>

          {mockPosts.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-6 text-center text-sm text-gray-500">
              아직 작성한 게시글이 없습니다.
              <br />
              메인 화면에서 공간을 공유해보세요!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="relative h-40 w-full overflow-hidden">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2 py-1 bg-black/50 text-xs text-white rounded-full">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-gray-400 mb-1">{post.timestamp}</p>
                    <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2">
                      {post.title}
                    </h4>
                    <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {post.location}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span className="inline-flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {post.likes}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" />
                        {post.comments}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Bookmark className="h-3 w-3" />
                        {post.bookmarks}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-[11px]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage