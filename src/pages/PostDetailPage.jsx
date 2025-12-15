import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import apiService from '../services/apiService'
import CommentSection from './CommentSection'

import { 
  ArrowLeft, Share2, MoreVertical, Eye, Clock, MapPin, 
  Heart, MessageCircle, Bookmark, ExternalLink 
} from 'lucide-react'

const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL || "http://localhost:8080"

const PostDetailPage = () => {
  const { postId } = useParams()
  const currentUser = useAuthStore().user
  const navigate = useNavigate()

  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [otherPosts, setOtherPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        const postRes = await apiService.request(`/posts/${postId}`)
        if (!isMounted) return

        const data = postRes.data ?? postRes

        setPost(data)
        setComments(data.comments)  
        // const commentsRes = await apiService.request(`/posts/${postId}/comments`)
        // if (!isMounted) return
        //setComments(commentsRes.data ?? commentsRes)

        // const similarRes = await apiService.request(`/posts/${postId}/similar`)
        // if (!isMounted) return
        // setOtherPosts(similarRes.data ?? similarRes)

      } catch (e) {
        console.error("게시글 상세 로딩 실패:", e)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchData()
    return () => { isMounted = false }
  }, [postId])

  const handleLike = async () => {
    try {
      await apiService.request(`/posts/${postId}/like`, { method: "POST" })
      setPost(prev => ({
        ...prev,
        liked: !prev.liked,
        likes: prev.liked ? prev.likes - 1 : prev.likes + 1
      }))
    } catch (e) { console.error(e) }
  }

  const handleBookmark = async () => {
    try {
      await apiService.request(`/posts/${postId}/bookmark`, { method: "POST" })
      setPost(prev => ({
        ...prev,
        bookmarked: !prev.bookmarked,
        bookmarks: prev.bookmarked ? prev.bookmarks - 1 : prev.bookmarks + 1
      }))
    } catch (e) { console.error(e) }
  }

  const handleAddComment = async (content) => {
    try {
      const newComment = await apiService.request(`/posts/${postId}/comments`, {
        method: "POST",
        body: JSON.stringify({ content })
      })

      if(newComment && newComment.code != 1){
        throw new Error("Failed to save comment")
      }

      setComments(prev => [...prev, newComment.data])
    } catch (e) { console.error(e) }
  }

  const handleUpdateComment = async (commentId, content) => {
    try {
      const updated = await apiService.request(`/posts/${postId}/comments`, {
        method: "PUT",
        body: JSON.stringify({ commentId, content })
      })

      if(updated && updated.code != 1){
        throw new Error("Failed to update comment")
      }

      setComments(prev =>
        prev.map(c => (c.id === commentId ? { ...c, content: updated.data } : c))
      )
    } catch (e) {
      console.error("댓글 수정 실패:", e)
    }
  }

  const handleDeleteComment = async (commentId) => {
    try {
      const deleted = await apiService.request(`/posts/${postId}/comments`, {
        method: "DELETE",
        body: JSON.stringify({ commentId })
      })

      if(deleted && deleted.code != 1){
        throw new Error("Failed to delete comment")
      }

      setComments(prev => prev.filter(c => c.id !== commentId))
    } catch (e) {
      console.error("댓글 삭제 실패:", e)
    }
  }

  if (loading) return <div className="p-6">로딩 중…</div>
  if (!post) return <div className="p-6">게시글을 찾을 수 없습니다.</div>

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">목록으로</span>
          </button>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Share2 className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MoreVertical className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">

          {/* Post Card */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="relative bg-black">
              <img
                src={IMG_BASE_URL + post.images[0]}
                alt={post.title}
                className="w-full h-96 object-contain"
              />

              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/90 rounded-full font-semibold">
                  {post.category}
                </span>
              </div>

              <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-lg text-sm font-medium">
                ⭐ {post.rating}
              </div>
            </div>

            {/* Thumbnails */}
            {post.images.length > 1 && (
              <div className="grid grid-cols-3 gap-2 p-4 bg-gray-50">
                {post.images.slice(1).map((img, idx) => (
                  <img
                    key={idx}
                    src={IMG_BASE_URL + img}
                    className="h-32 w-full object-cover rounded-lg"
                  />
                ))}
              </div>
            )}

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <img
                  src={post.profileImg ? IMG_BASE_URL + post.profileImg : `https://ui-avatars.com/api/?name=${post.profileName}&background=3b82f6&color=fff`}
                  className="h-12 w-12 rounded-full border"
                />
                <div>
                  <p className="font-semibold">{post.profileName}</p>
                  <div className="flex gap-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {post.createdAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" /> {post.views}
                    </span>
                  </div>
                </div>
              </div>

              <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin className="h-5 w-5 text-blue-500" />
                {post.location}
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>

              <p className="text-gray-700 whitespace-pre-line mb-6">
                {post.content}
              </p>

              {/* Actions */}
              <div className="flex justify-between border-t pt-4">
                <div className="flex gap-6">
                  <button
                    onClick={handleLike}
                    className="flex items-center gap-2 text-red-500"
                  >
                    <Heart className={`h-6 w-6 ${post.liked ? "fill-current" : ""}`} />
                    {post.likes}
                  </button>

                  <button className="flex items-center gap-2 text-gray-600">
                    <MessageCircle className="h-6 w-6" />
                    {comments.length}
                  </button>

                  <button
                    onClick={handleBookmark}
                    className="flex items-center gap-2 text-yellow-500"
                  >
                    <Bookmark className={`h-6 w-6 ${post.bookmarked ? "fill-current" : ""}`} />
                    {post.bookmarks}
                  </button>
                </div>

                <button className="flex items-center gap-2 text-gray-600">
                  <Share2 className="h-5 w-5" /> 공유하기
                </button>
              </div>

            </div>
          </div>

          {/* Comments */}
          <CommentSection
            comments={comments ?? []}
            onAddComment={handleAddComment}
            onUpdateComment={handleUpdateComment}
            onDeleteComment={handleDeleteComment}
            currentUser={currentUser}
          />
          {/* <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-3">댓글 {post.commentCount}개</h3>

            <div className="space-y-4 mb-6">
              {post.comments.map((c, i) => (
                <div key={i} className="flex gap-3 border-b pb-3">
                  <div className="font-bold">{c.name}</div>
                  <div>{c.content}</div>
                </div>
              ))}
            </div>

            <input
              className="w-full border p-3 rounded-lg mb-3"
              placeholder="댓글을 입력하세요…"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddComment(e.target.value)
              }}
            />

            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
              댓글 작성
            </button>
          </div> */}
        </div>

        {/* Side Column */}
        <div className="space-y-6">

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">위치 정보</h3>
            <p className="font-medium">{post.address}</p>
            <p className="mt-2">{post.openingHours}</p>
            <button className="mt-4 w-full px-4 py-3 bg-blue-50 rounded-lg flex justify-center gap-2">
              <ExternalLink className="h-4 w-4" /> 지도에서 보기
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb4">편의시설</h3>
            <div className="flex flex-wrap gap-2">
              {post.facilities?.map((f, i) => (
                <span key={i} className="px-3 py-1 bg-gray-100 rounded-lg">{f}</span>
              ))}
            </div>
          </div>

          {post?.tips && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-2">💡 방문 팁</h3>
              <p>{post.tips}</p>
            </div>
          )}

          {/* Similar Posts */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">비슷한 공간</h3>

            <div className="space-y-3">
              {otherPosts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => navigate(`/posts/${p.id}`)}
                  className="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
                >
                  <img src={p.thumbnail} className="h-16 w-16 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="font-medium line-clamp-1">{p.title}</p>
                    <p className="text-xs text-gray-500">{p.location}</p>
                    <p className="text-xs text-gray-500">⭐ {p.rating}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

    </div>
  )
}

export default PostDetailPage