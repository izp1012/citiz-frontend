import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { User, Mail, Lock, Image as ImageIcon, CheckCircle, AlertCircle } from 'lucide-react'
import { apiService } from '../services/apiService'

const RegisterPage = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    profileImage: null,
  })

  const [preview, setPreview] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // 입력 변경
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // 이미지 업로드 선택
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({ ...formData, profileImage: file })
      setPreview(URL.createObjectURL(file))
    }
  }
  // 🔥 2) 회원가입(JSON) 요청
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const form = new FormData()

      // text 데이터 추가
      form.append("email", formData.email)
      form.append("name", formData.name)
      form.append("password", formData.password)
  
      // 파일 추가
      if (formData.profileImage) {
        form.append("profileImage", formData.profileImage)
      }
  
      const res = await apiService.request('/users', {
        method: 'POST',
        body: form 
      })

      setSuccess('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.')
      setTimeout(() => navigate('/login'), 1500)

    } catch (err) {
      console.error(err)
      setError('회원가입에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-green-600 rounded-full flex items-center justify-center animate-bounce-in">
            <User className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">회원가입</h2>
          <p className="mt-2 text-sm text-gray-600">Citiz의 새로운 멤버가 되어보세요 🌟</p>
        </div>

        <form className="mt-8 space-y-6 animate-slide-up" onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">

            {/* 오류 / 성공 메시지 */}
            {error && (
              <div className="flex items-center space-x-3 text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                <AlertCircle className="h-5 w-5" />
                <span className="text-sm">{error}</span>
              </div>
            )}
            {success && (
              <div className="flex items-center space-x-3 text-green-600 bg-green-50 p-3 rounded-lg border border-green-200">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm">{success}</span>
              </div>
            )}

            <div className="space-y-4">

              {/* email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              {/* name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="홍길동"
                  />
                </div>
              </div>

              {/* password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">비밀번호</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="비밀번호를 입력하세요"
                  />
                </div>
              </div>

              {/* profile image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">프로필 사진</label>
                <div className="flex items-center space-x-3">
                  <label className="flex items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-400 transition">
                    {preview ? (
                      <img src={preview} alt="미리보기" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                    )}
                    <input type="file" className="hidden" onChange={handleFileChange} />
                  </label>
                  <span className="text-sm text-gray-500">JPG, PNG 파일 업로드</span>
                </div>
              </div>
            </div>

            {/* 버튼 */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-lg text-white bg-green-600 hover:bg-green-700 transition disabled:opacity-50"
              >
                {isLoading ? '가입 중...' : '회원가입'}
              </button>
            </div>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                이미 계정이 있으신가요?{' '}
                <Link to="/login" className="text-green-600 hover:underline font-medium">
                  로그인
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage