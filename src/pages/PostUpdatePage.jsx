import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Upload, X } from 'lucide-react'
import apiService from '../services/apiService'
import { useAuthStore } from '../stores/authStore'

const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL || "http://localhost:8080"

const PostUpdatePage = () => {
  const { postId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const id = user?.id

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState([])

  // 기존 이미지 + 새 이미지
  const [originImages, setOriginImages] = useState([])   // 서버에 이미 저장된 이미지
  const [newImages, setNewImages] = useState([])         // 새로 업로드할 이미지

  const [loading, setLoading] = useState(false)

  // 🔹 게시글 불러오기
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await apiService.request(`/posts/${postId}`, { method: "GET" })

        if (response.code !== 1) throw new Error("조회 실패")

        const p = response.data
        setTitle(p.title)
        setContent(p.content)
        setTags(p.tags || [])
        setOriginImages(p.images || [])

      } catch (err) {
        console.error(err)
        alert("게시글을 불러오지 못했습니다.")
      }
    }

    fetchPost()
  }, [postId])

  // 🔹 새 이미지 업로드
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const previewFiles = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }))
    setNewImages([...newImages, ...previewFiles])
  }

  // 🔹 태그 추가
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput)) {
      setTags([...tags, tagInput])
      setTagInput('')
    }
  }

  // 🔹 게시글 수정 요청
  const handleUpdate = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.")
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()

      formData.append("postId", postId)
      formData.append("profileId", id)
      formData.append("title", title)
      formData.append("content", content)

      tags.forEach(tag => formData.append("tagIds", tag))

      // 서버에 남겨둘 기존 이미지 URL들
      originImages.forEach(img => formData.append("imgUrls", img))

      // 새로 업로드된 이미지 파일들
      newImages.forEach(img => {
        formData.append("images", img.file)
      })

      const response = await apiService.request(`/posts/${postId}`, {
        method: "PUT",
        body: formData
      })

      if (response.code !== 1) throw new Error("수정 실패")

      alert("게시글이 수정되었습니다!")
      navigate(`/post/${postId}`)

    } catch (err) {
      console.error(err)
      alert("수정 중 오류가 발생했습니다.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8">
        
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          게시글 수정하기
        </h2>

        {/* 제목 */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* 내용 */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">내용</label>
          <textarea
            rows="6"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* 태그 */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">태그</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="예: 루프탑, 브런치, 감성"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="flex-1 p-3 border rounded-lg"
            />
            <button
              onClick={handleAddTag}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              추가
            </button>
          </div>

          <div className="flex gap-2 mt-3 flex-wrap">
            {tags.map((tag, i) => (
              <div
                key={i}
                className="flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
              >
                #{tag}
                <button
                  onClick={() => setTags(tags.filter((_, idx) => idx !== i))}
                  className="ml-2 text-blue-700 hover:text-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 기존 이미지 */}
        <div className="mb-3">
          <label className="block text-gray-700 font-medium mb-2">기존 사진</label>

          <div className="grid grid-cols-3 gap-3">
            {originImages.map((url, i) => (
              <div key={i} className="relative">
                <img src={IMG_BASE_URL + url} className="rounded-lg h-28 w-full object-cover" />

                {/* 기존 이미지 삭제 */}
                <button
                  onClick={() => setOriginImages(originImages.filter((_, idx) => idx !== i))}
                  className="absolute top-1 right-1 bg-black bg-opacity-60 p-1 rounded-full"
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 새 이미지 업로드 */}
        <div className="mb-8">
          <label className="block text-gray-700 font-medium mb-2">새 사진 업로드</label>

          <label className="p-6 border-2 border-dashed rounded-xl flex flex-col items-center cursor-pointer">
            <Upload className="h-6 w-6 text-gray-500 mb-2" />
            <span className="text-gray-600 text-sm">이미지 선택</span>
            <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>

          {newImages.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mt-4">
              {newImages.map((img, index) => (
                <div key={index} className="relative">
                  <img src={img.preview} className="rounded-lg h-28 w-full object-cover" />

                  <button
                    onClick={() => setNewImages(newImages.filter((_, i) => i !== index))}
                    className="absolute top-1 right-1 bg-black bg-opacity-60 p-1 rounded-full"
                  >
                    <X className="h-4 w-4 text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 수정 버튼 */}
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700"
        >
          {loading ? "수정 중..." : "게시글 수정하기"}
        </button>
      </div>
    </div>
  )
}

export default PostUpdatePage