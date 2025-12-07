import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Heart, MessageCircle, Bookmark, Share2, ArrowLeft, MoreHorizontal} from "lucide-react"
import { useAuthStore } from '../stores/authStore'
import apiService from "../services/apiService"

import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"

const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL || 'http://localhost:8080'

const PostDetailPage = () => {
  const { postId } = useParams()
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  // 1. 게시글 조회 API
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await apiService.request(`/posts/${postId}`, {
          method: "GET",
        })

        if (response.code !== 1) throw new Error("조회 실패")
        setPost(response.data)
      } catch (e) {
        console.error(e)
        alert("게시물을 불러오지 못했습니다.")
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [postId])

  // 2. 드롭다운 메뉴 바깥 클릭 감지
  useEffect(() => {
    const closeMenu = (e) => {
      if (!e.target.closest(".dropdown-menu") && !e.target.closest(".menu-btn")) {
        setMenuOpen(false)
      }
    }

    document.addEventListener("click", closeMenu)

    return () => document.removeEventListener("click", closeMenu)
  }, [])

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return

    try {
      const response = await apiService.request(`/posts/${postId}`, {
        method: "DELETE"
      })

      if (response.code !== 1) throw new Error("삭제 실패")
      
      alert("게시글이 삭제되었습니다.")
      navigate("/")
    } catch (e) {
      console.error(e)
      alert("삭제 중 오류가 발생했습니다.")
    }
  }

  if (loading) return <div className="p-10 text-center">로딩 중...</div>
  if (!post) return <div className="p-10 text-center">게시물을 찾을 수 없습니다.</div>

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      
      {/* 가운데 정렬 + 최대 너비 제한 */}
      <div className="max-w-2xl mx-auto bg-white shadow-sm min-h-screen relative">

        {/* 상단 헤더 */}
        <div className="flex items-center p-4 border-b sticky top-0 bg-white z-50 justify-between">
          <div className="flex items-center">
            <ArrowLeft 
              className="w-6 h-6 mr-3 cursor-pointer" 
              onClick={() => navigate(-1)} 
            />
            <div className="font-semibold text-lg">{post.profileName}</div>
          </div>

          {/* 우측 ⋯ 버튼 */}
          {user?.id === post.profileId && (
            <MoreHorizontal 
              className="w-6 h-6 cursor-pointer menu-btn"
              onClick={() => setMenuOpen(prev => !prev)}
            />
          )}
        </div>

        {menuOpen && (
          <div className="absolute top-16 right-5 bg-white border shadow-lg rounded-lg z-50 dropdown-menu">
            <button
              className="px-4 py-3 text-left text-red-600 font-semibold hover:bg-red-50 w-full"
              onClick={() => {
                setMenuOpen(false)
                handleDelete()
              }}
            >
              게시글 삭제하기
            </button>
          </div>
        )}

        {/* 대표 이미지 슬라이드 */}
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          className="w-full h-[420px] bg-black"
        >
          {post.images.map((img, index) => (
            <SwiperSlide key={index}>
              <img 
                src={IMG_BASE_URL + img} 
                className="w-full h-full object-contain bg-black"
                alt=""
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 액션 버튼 */}
        <div className="flex items-center px-5 py-4 gap-5 text-gray-800">
          <Heart className="w-7 h-7 cursor-pointer" />
          <MessageCircle 
            className="w-7 h-7 cursor-pointer" 
            onClick={() => navigate(`/chat/place/${postId}`)}
          />
          <Share2 className="w-7 h-7 cursor-pointer ml-auto" />
          <Bookmark className="w-7 h-7 cursor-pointer" />
        </div>

        {/* 좋아요 수 */}
        <div className="px-5 text-sm font-medium text-gray-800">
          좋아요 {post.likeCount || 0}개
        </div>

        {/* 본문 & 태그 */}
        <div className="px-5 mt-4">
          <h2 className="text-xl font-bold">{post.title}</h2>

          <div className="flex gap-2 mt-3 flex-wrap">
            {post.tags?.map((tag, i) => (
              <span 
                key={i}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>

          <p className="mt-4 text-gray-700 whitespace-pre-line leading-relaxed">
            {post.content}
          </p>
        </div>

        {/* 장소 정보 */}
        <div className="px-5 mt-6 pb-4">
          <h3 className="font-semibold text-lg">📍 장소 정보</h3>

          <div className="mt-3 text-gray-700 text-sm">
            <div>주소: {post.address}</div>
            <div>연락처: {post.phone || "정보 없음"}</div>
            <div>운영시간: {post.openingHours || "정보 없음"}</div>

            {post.mapUrl && (
              <button 
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
                onClick={() => window.open(post.mapUrl, "_blank")}
              >
                지도에서 보기
              </button>
            )}
          </div>
        </div>
        
        {/* {user?.id === post.profileId && (
          <div className="px-5 mt-6 mb-4">
            <button
              onClick={handleDelete}
              className="w-full py-3 text-center bg-red-500 text-white font-semibold rounded-lg"
            >
              게시글 삭제하기
            </button>
          </div>
        )} */}

        {/* 업로드 정보 */}
        <div className="px-5 mt-8 mb-10 text-gray-500 text-xs">
          {post.createdAt}
        </div>
      </div>
    </div>
  )
}

export default PostDetailPage