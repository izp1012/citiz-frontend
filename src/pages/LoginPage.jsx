// LoginPage.jsx
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom' // ✅ Link import 추가
import { useAuthStore } from '../stores/authStore'
import { MessageCircle, User, Lock, AlertCircle } from 'lucide-react'

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const { login } = useAuthStore()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await login(formData.username, formData.password)
      
      if (result.success) {
        navigate('/', { replace: true })
      } else {
        setError(result.error || '로그인에 실패했습니다.')
      }
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center animate-bounce-in">
            <MessageCircle className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Citiz에 로그인</h2>
          <p className="mt-2 text-sm text-gray-600">소통과 포스팅이 가능한 커뮤니티</p>
        </div>

        <form className="mt-8 space-y-6 animate-slide-up" onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
            {error && (
              <div className="flex items-center space-x-3 text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* 입력 필드 */}
            <div className="space-y-4">
              {/* 사용자명 */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  사용자명
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="사용자명을 입력하세요"
                  />
                </div>
              </div>

              {/* 비밀번호 */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  비밀번호
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="비밀번호를 입력하세요"
                  />
                </div>
              </div>
            </div>

            {/* 버튼 영역 */}
            <div>
              <button
                type="submit"
                disabled={isLoading || !formData.username || !formData.password}
                className="w-full py-3 px-4 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50"
              >
                {isLoading ? '로그인 중...' : '로그인'}
              </button>
            </div>

            {/* ✅ 회원가입 링크 추가 */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                아직 계정이 없으신가요?{' '}
                <Link to="/register" className="text-blue-600 hover:underline font-medium">
                  회원가입
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage