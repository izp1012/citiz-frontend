import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, X } from 'lucide-react'
import apiService from '../services/apiService'
import { useAuthStore } from '../stores/authStore'

const PostCreatePage = () => {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const profileId = user?.profileId

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState([])
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput)) {
      setTags([...tags, tagInput])
      setTagInput('')
    }
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const previewFiles = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }))
    setImages([...images, ...previewFiles])
  }

  // 🔥 이미지 업로드 API (서버에서 URL 반환한다고 가정)
  const uploadImages = async () => {
    if (images.length === 0) return []

    const formData = new FormData()
    images.forEach(img => formData.append("files", img.file))

    const response = await fetch("/posts/upload", {   // 업로드 엔드포인트 필요
      method: "POST",
      body: formData
    })

    if (!response.ok) throw new Error("이미지 업로드 실패")

    const imgUrls = await response.json()
    return imgUrls // ["url1", "url2", ...]
  }

  // 🔥 최종 POST /posts 호출
  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요!")
      return
    }

    setLoading(true)

    try {
      // 👉 1) 이미지 업로드 후 URL 배열 받기
      const imgUrls = await uploadImages()

      // 👉 2) PostReqDto 구조에 맞춰 JSON 생성
      const reqBody = {
        profileId: profileId, // TODO: 로그인한 사용자 프로필 ID로 변경
        postId: null,
        title: title,
        content: content,
        imgUrls: imgUrls,
        tagIds: tags
      }
      const response = await apiService.request('/posts', {
        method: 'POST',
        body: JSON.stringify(reqBody)
      })

      if (response.code != 1) throw new Error("게시글 저장 실패")

      alert("게시글이 등록되었습니다!")
      navigate("/")
    } catch (e) {
      console.error(e)
      alert("오류가 발생했습니다.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          새 공간 공유하기
        </h2>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">제목</label>
          <input
            type="text"
            placeholder="공간의 제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">내용</label>
          <textarea
            rows="6"
            placeholder="공간에 대한 소개를 작성해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />
        </div>

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
              <span
                key={i}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-gray-700 font-medium mb-2">사진 업로드</label>

          <label className="p-6 border-2 border-dashed rounded-xl flex flex-col items-center cursor-pointer">
            <Upload className="h-6 w-6 text-gray-500 mb-2" />
            <span className="text-gray-600 text-sm">이미지 선택</span>
            <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>

          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mt-4">
              {images.map((img, index) => (
                <div key={index} className="relative">
                  <img src={img.preview} className="rounded-lg h-28 w-full object-cover" />
                  <button
                    onClick={() => setImages(images.filter((_, i) => i !== index))}
                    className="absolute top-1 right-1 bg-black bg-opacity-60 p-1 rounded-full"
                  >
                    <X className="h-4 w-4 text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700"
        >
          {loading ? "등록 중..." : "게시글 등록하기"}
        </button>
      </div>
    </div>
  )
}

export default PostCreatePage