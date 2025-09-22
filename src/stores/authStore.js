import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      token: null,

      login: async (username, password) => {
        try {
          // 실제 API 호출 대신 임시 로그인 처리
          // TODO: 실제 백엔드 인증 API와 연동
          if (username && password) {
            const mockUser = {
              id: Math.floor(Math.random() * 1000) + 1,
              name: username,
              username: username,
              email: `${username}@example.com`,
              avatar: `https://ui-avatars.com/api/?name=${username}&background=3b82f6&color=fff`,
            }

            set({
              user: mockUser,
              isAuthenticated: true,
              token: 'mock-jwt-token',
            })

            return { success: true, user: mockUser }
          }
          
          throw new Error('Invalid credentials')
        } catch (error) {
          console.error('Login error:', error)
          return { success: false, error: error.message }
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
        return user ? { 'User-Id': user.id.toString() } : {}
      },
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