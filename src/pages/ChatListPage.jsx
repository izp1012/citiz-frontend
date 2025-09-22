import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import { useChatStore } from '../stores/chatStore'
import apiService from '../services/apiService'
import websocketService from '../services/websocketService'
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Users, 
  Clock, 
  MessageCircle,
  AlertCircle,
  RefreshCw
} from 'lucide-react'

const ChatListPage = () => {
  const { user } = useAuthStore()
  const { chatRooms, setChatRooms, isConnected } = useChatStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newRoomName, setNewRoomName] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    loadChatRooms()
    initializeWebSocket()
  }, [])

  const initializeWebSocket = async () => {
    try {
      if (!websocketService.isConnected()) {
        await websocketService.connect()
      }
    } catch (error) {
      console.error('Failed to connect to WebSocket:', error)
    }
  }

  const loadChatRooms = async () => {
    try {
      setIsLoading(true)
      setError('')
      const rooms = await apiService.getChatRooms()
      setChatRooms(Array.isArray(rooms) ? rooms : [])
    } catch (error) {
      console.error('Failed to load chat rooms:', error)
      setError('채팅방 목록을 불러오는데 실패했습니다.')
      setChatRooms([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateRoom = async (e) => {
    e.preventDefault()
    if (!newRoomName.trim()) return

    try {
      const roomData = {
        name: newRoomName.trim(),
        description: `${user.name}님이 만든 채팅방`,
        maxParticipants: 100,
        isPublic: true
      }

      const newRoom = await apiService.createChatRoom(roomData)
      setChatRooms([...chatRooms, newRoom])
      setNewRoomName('')
      setShowCreateModal(false)
      
      // 방 생성 후 바로 입장
      navigate(`/chat/${newRoom.id}`)
    } catch (error) {
      console.error('Failed to create chat room:', error)
      setError('채팅방 생성에 실패했습니다.')
    }
  }

  const handleJoinRoom = async (roomId) => {
    try {
      await apiService.joinChatRoom(roomId)
      navigate(`/chat/${roomId}`)
    } catch (error) {
      console.error('Failed to join chat room:', error)
      setError('채팅방 입장에 실패했습니다.')
    }
  }

  const filteredRooms = chatRooms.filter(room =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatLastActivity = (timestamp) => {
    if (!timestamp) return '활동 없음'
    
    const now = new Date()
    const lastActivity = new Date(timestamp)
    const diffInMinutes = Math.floor((now - lastActivity) / (1000 * 60))
    
    if (diffInMinutes < 1) return '방금 전'
    if (diffInMinutes < 60) return `${diffInMinutes}분 전`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}시간 전`
    return `${Math.floor(diffInMinutes / 1440)}일 전`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-top-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">채팅방 목록을 불러오는 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">채팅방</h1>
              <p className="text-gray-600">다른 사용자들과 실시간으로 소통해보세요</p>
            </div>
            
            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
              {!isConnected && (
                <div className="flex items-center text-orange-600 text-sm">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <span>연결 끊어짐</span>
                </div>
              )}
              
              <button
                onClick={loadChatRooms}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition duration-200"
              >
                <RefreshCw className="h-4 w-4" />
                <span>새로고침</span>
              </button>
              
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                <Plus className="h-4 w-4" />
                <span>새 채팅방</span>
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="채팅방 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 flex items-center space-x-3 text-red-600 bg-red-50 p-4 rounded-lg border border-red-200">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Chat Rooms Grid */}
        {filteredRooms.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? '검색 결과가 없습니다' : '참여중인 채팅방이 없습니다'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm ? '다른 검색어로 시도해보세요' : '새로운 채팅방을 만들어 대화를 시작해보세요'}
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              <Plus className="h-5 w-5" />
              <span>첫 채팅방 만들기</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room) => (
              <div
                key={room.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:scale-105"
                onClick={() => handleJoinRoom(room.id)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
                        {room.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {room.description || '설명이 없습니다.'}
                      </p>
                    </div>
                    <div className="ml-3">
                      <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <MessageCircle className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{room.currentParticipants || 0}/{room.maxParticipants || '∞'}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{formatLastActivity(room.lastActivity)}</span>
                    </div>
                  </div>

                  {room.isPrivate && (
                    <div className="mt-3 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full inline-block">
                      비공개 채팅방
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create Room Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md animate-bounce-in">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">새 채팅방 만들기</h3>
                
                <form onSubmit={handleCreateRoom}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      채팅방 이름
                    </label>
                    <input
                      type="text"
                      value={newRoomName}
                      onChange={(e) => setNewRoomName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="채팅방 이름을 입력하세요"
                      maxLength={50}
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowCreateModal(false)
                        setNewRoomName('')
                      }}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 transition duration-200"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      disabled={!newRoomName.trim()}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                    >
                      만들기
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatListPage