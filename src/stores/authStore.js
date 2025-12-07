import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL || 'http://localhost:8080/img'
// const API_BASE_URL =  'http://localhost:8080/api'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      token: null,

      login: async (username, password) => {
        try {
          // ✅ 실제 Spring 서버로 로그인 요청 보내기
          const response = await fetch(`${API_BASE_URL}/users/login`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: username, password }),
          })
      
          // ✅ JSON 응답 파싱
          const data = await response.json();

          if (response.ok && data.code == '1') {
            // ✅ 서버에서 로그인 성공 시 받은 사용자 정보 세팅
            const userData = {
              id: data.data.id,
              username: data.data.name,
              email: data.data.email,
              // avatar: `https://ui-avatars.com/api/?name=${username}&background=3b82f6&color=fff`,
              avatar: `${IMAGE_BASE_URL}/${data.data.imgUrl}`
            }
      
            set({
              user: userData,
              isAuthenticated: true,
              token: data.data.token || null, // JWT 쓴다면 서버에서 받은 토큰 저장
            })
      
            return { success: true, user: userData }
          } else {
            // ❌ 로그인 실패 처리
            return {
              success: false,
              error: data.error || '아이디 또는 비밀번호가 잘못되었습니다.',
            }
          }
        } catch (error) {
          console.error('Login error:', error)
          return { success: false, error: '서버 연결에 실패했습니다.' }
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          token: null,
        })
      },

      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData }
        }))
      },

      getAuthHeader: () => {
        const token = get().token
        return token ? { 'Authorization': `Bearer ${token}` } : {}
      },

      getUserIdHeader: () => {
        const user = get().user
        return user ? { 'User-Id': user.id } : {}
      },
      setToken: (newToken) => {
        set({ token: newToken })
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        token: state.token,
      }),
    }
  )
)