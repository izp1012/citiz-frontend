import { useAuthStore } from '../stores/authStore'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const { getAuthHeader, getUserIdHeader } = useAuthStore.getState()
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
        ...getUserIdHeader(),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        return await response.json()
      } else {
        return await response.text()
      }
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error)
      throw error
    }
  }

  // Chat Room APIs
  async createChatRoom(roomData) {
    return this.request('/chat/rooms', {
      method: 'POST',
      body: JSON.stringify(roomData),
    })
  }

  async getChatRooms() {
    return this.request('/chat/rooms')
  }

  async getChatRoom(roomId) {
    return this.request(`/chat/rooms/${roomId}`)
  }

  async joinChatRoom(roomId) {
    return this.request(`/chat/rooms/${roomId}/join`, {
      method: 'POST',
    })
  }

  async leaveChatRoom(roomId) {
    return this.request(`/chat/rooms/${roomId}/leave`, {
      method: 'POST',
    })
  }

  // Message APIs
  async getChatHistory(roomId, page = 0, size = 50) {
    return this.request(`/chat/rooms/${roomId}/messages?page=${page}&size=${size}`)
  }

  async markMessageAsRead(messageId) {
    return this.request(`/chat/messages/${messageId}/read`, {
      method: 'PUT',
    })
  }

  // Redis Test APIs (개발용)
  async testRedisConnection() {
    return this.request('/redis/health')
  }

  async publishTestMessage(message) {
    return this.request('/redis/publish', {
      method: 'POST',
      body: JSON.stringify({ message }),
    })
  }

  async addTestChatMessage(testChatData) {
    return this.request('/redis/test-chat', {
      method: 'POST',
      body: JSON.stringify(testChatData),
    })
  }

  // Utility methods
  async uploadFile(file, endpoint = '/upload') {
    const formData = new FormData()
    formData.append('file', file)
    
    const { getAuthHeader, getUserIdHeader } = useAuthStore.getState()
    
    return this.request(endpoint, {
      method: 'POST',
      headers: {
        ...getAuthHeader(),
        ...getUserIdHeader(),
      },
      body: formData,
    })
  }

  // Error handler for common API errors
  handleError(error) {
    if (error.message.includes('401') || error.message.includes('Unauthorized')) {
      useAuthStore.getState().logout()
      window.location.href = '/login'
    }
    throw error
  }
}

export const apiService = new ApiService()
export default apiService