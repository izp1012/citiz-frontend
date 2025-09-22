import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import { useChatStore } from '../stores/chatStore'
import apiService from '../services/apiService'
import websocketService from '../services/websocketService'
import { 
  Send, 
  ArrowLeft, 
  Users, 
  MoreVertical, 
  Smile,
  Paperclip,
  Phone,
  Video,
  AlertCircle
} from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'

const ChatPage = () => {
  const { roomId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const {
    currentRoom,
    setCurrentRoom,
    getRoomMessages,
    addMessage,
    setMessages,
    isConnected
  } = useChatStore()
  
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [typingUsers, setTypingUsers] = useState([])
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const typingTimeoutRef = useRef(null)

  const messages = getRoomMessages(parseInt(roomId))

  useEffect(() => {
    if (!roomId || !user) return

    initializeChatRoom()
    
    return () => {
      cleanup()
    }
  }, [roomId, user])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const initializeChatRoom = async () => {
    try {
      setIsLoading(true)
      setError('')

      // WebSocket 연결 확인 및 초기화
      if (!websocketService.isConnected()) {
        await websocketService.connect()
      }

      // 채팅방 정보 로드
      const room = await apiService.getChatRoom(parseInt(roomId))
      setCurrentRoom(room)

      // 채팅 히스토리 로드
      await loadChatHistory()

      // WebSocket 구독 설정
      setupWebSocketSubscriptions()

      // 채팅방에 연결 알림
      websocketService.connectToRoom(parseInt(roomId))

    } catch (error) {
      console.error('Failed to initialize chat room:', error)
      setError('채팅방을 불러오는데 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const loadChatHistory = async () => {
    try {
      const history = await apiService.getChatHistory(parseInt(roomId), 0, 50)
      setMessages(parseInt(roomId), Array.isArray(history) ? history.reverse() : [])
    } catch (error) {
      console.error('Failed to load chat history:', error)
      setMessages(parseInt(roomId), [])
    }
  }

  const setupWebSocketSubscriptions = () => {
    // 메시지 구독
    websocketService.subscribeToRoom(parseInt(roomId), (messageData) => {
      // 서버에서 받은 메시지에는 고유한 streamId나 id가 있어야 함
      const processedMessage = {
        ...messageData,
        timestamp: new Date(messageData.timestamp),
        id: messageData.id || messageData.streamId || uuidv4() // 고유 ID 보장
      }
      
      // 내가 보낸 메시지인지 확인 (중복 방지)
      if (processedMessage.senderId === user.id) {
        // 임시 메시지를 실제 메시지로 교체
        processedMessage.status = 'DELIVERED'
      }
      
      addMessage(parseInt(roomId), processedMessage)
    })

    // 참여자 업데이트 구독
    websocketService.subscribeToParticipants(parseInt(roomId), (participantData) => {
      handleParticipantUpdate(participantData)
    })
  }

  const handleParticipantUpdate = (participantData) => {
    if (participantData.type === 'JOIN') {
      // 입장 알림 메시지 추가
      addMessage(parseInt(roomId), {
        id: `system-${Date.now()}`,
        content: `${participantData.userName}님이 입장했습니다.`,
        type: 'SYSTEM',
        timestamp: new Date(participantData.timestamp),
        senderId: null,
        senderName: 'System'
      })
    } else if (participantData.type === 'LEAVE') {
      // 퇴장 알림 메시지 추가
      addMessage(parseInt(roomId), {
        id: `system-${Date.now()}`,
        content: `${participantData.userName}님이 퇴장했습니다.`,
        type: 'SYSTEM',
        timestamp: new Date(participantData.timestamp),
        senderId: null,
        senderName: 'System'
      })
    }
  }

  const cleanup = () => {
    if (websocketService.isConnected() && roomId) {
      websocketService.disconnectFromRoom(parseInt(roomId))
      websocketService.unsubscribeFromRoom(parseInt(roomId))
    }
    setCurrentRoom(null)
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!message.trim() || !websocketService.isConnected()) return

    const tempId = uuidv4()
    const messageData = {
      tempId,
      roomId: parseInt(roomId),
      senderId: user.id,
      senderName: user.name,
      content: message.trim(),
      type: 'CHAT',
      status: 'SENDING',
      timestamp: new Date()
    }

    // 즉시 UI에 메시지 추가 (임시 - tempId 사용)
    addMessage(parseInt(roomId), {
      ...messageData,
      id: tempId // 임시 ID로 사용
    })

    // WebSocket으로 메시지 전송 (tempId는 전송하지 않음)
    const { tempId: _, ...sendData } = messageData
    const success = websocketService.sendMessage(parseInt(roomId), sendData)

    if (!success) {
      // 전송 실패시 상태 업데이트
      addMessage(parseInt(roomId), {
        ...messageData,
        id: tempId,
        status: 'FAILED'
      })
    }

    setMessage('')
    handleTypingStop()
  }

  const handleTypingStart = () => {
    if (!isTyping) {
      setIsTyping(true)
      websocketService.sendTypingIndicator(parseInt(roomId), true)
    }

    // 타이핑 중지 타이머 재설정
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    typingTimeoutRef.current = setTimeout(() => {
      handleTypingStop()
    }, 2000)
  }

  const handleTypingStop = () => {
    if (isTyping) {
      setIsTyping(false)
      websocketService.sendTypingIndicator(parseInt(roomId), false)
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
      typingTimeoutRef.current = null
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const formatMessageTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleLeaveRoom = async () => {
    if (window.confirm('채팅방에서 나가시겠습니까?')) {
      try {
        await apiService.leaveChatRoom(parseInt(roomId))
        navigate('/chat')
      } catch (error) {
        console.error('Failed to leave chat room:', error)
        setError('채팅방 나가기에 실패했습니다.')
      }
    }
  }

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-top-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">채팅방에 연결하는 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white shadow-sm">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate('/chat')}
            className="p-2 hover:bg-gray-100 rounded-lg transition duration-200"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                {currentRoom?.name || '채팅방'}
              </h1>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>{isConnected ? '연결됨' : '연결 끊어짐'}</span>
                <span>•</span>
                <span>{currentRoom?.currentParticipants || 0}명 참여</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition duration-200">
            <Phone className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition duration-200">
            <Video className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={handleLeaveRoom}
            className="p-2 hover:bg-gray-100 rounded-lg transition duration-200"
          >
            <MoreVertical className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center space-x-3 text-red-600 bg-red-50 p-3 border-b border-red-200">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500">아직 메시지가 없습니다.</p>
            <p className="text-gray-400 text-sm mt-1">첫 메시지를 보내보세요!</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={msg.id || msg.tempId || index}>
              {msg.type === 'SYSTEM' ? (
                <div className="text-center">
                  <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm">
                    {msg.content}
                  </span>
                </div>
              ) : (
                <div className={`flex ${msg.senderId === user.id ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md ${msg.senderId === user.id ? 'order-2' : 'order-1'}`}>
                    {msg.senderId !== user.id && (
                      <div className="flex items-center space-x-2 mb-1">
                        <img
                          src={`https://ui-avatars.com/api/?name=${msg.senderName}&background=random&color=fff&size=32`}
                          alt={msg.senderName}
                          className="h-6 w-6 rounded-full"
                        />
                        <span className="text-xs font-medium text-gray-600">{msg.senderName}</span>
                      </div>
                    )}
                    
                    <div className={`px-4 py-2 rounded-lg ${
                      msg.senderId === user.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-900 border border-gray-200'
                    }`}>
                      <p className="text-sm">{msg.content}</p>
                    </div>
                    
                    <div className={`flex items-center space-x-1 mt-1 ${
                      msg.senderId === user.id ? 'justify-end' : 'justify-start'
                    }`}>
                      <span className="text-xs text-gray-500">
                        {formatMessageTime(msg.timestamp)}
                      </span>
                      {msg.senderId === user.id && msg.status && (
                        <span className={`text-xs ${
                          msg.status === 'FAILED' ? 'text-red-500' : 
                          msg.status === 'SENDING' ? 'text-yellow-500' : 'text-green-500'
                        }`}>
                          {msg.status === 'FAILED' ? '실패' : 
                           msg.status === 'SENDING' ? '전송중' : '전송됨'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Typing Indicator */}
      {typingUsers.length > 0 && (
        <div className="px-4 py-2 text-sm text-gray-500">
          {typingUsers.join(', ')}님이 입력 중...
        </div>
      )}

      {/* Message Input */}
      <div className="border-t border-gray-200 bg-white p-4">
        <form onSubmit={handleSendMessage} className="flex items-end space-x-3">
          <div className="flex space-x-2">
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-gray-600 transition duration-200"
            >
              <Paperclip className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-gray-600 transition duration-200"
            >
              <Smile className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex-1">
            <textarea
              ref={inputRef}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value)
                handleTypingStart()
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage(e)
                }
              }}
              placeholder="메시지를 입력하세요... (Shift + Enter로 줄바꿈)"
              rows={1}
              className="w-full resize-none border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{ minHeight: '40px', maxHeight: '120px' }}
            />
          </div>
          
          <button
            type="submit"
            disabled={!message.trim() || !isConnected}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatPage