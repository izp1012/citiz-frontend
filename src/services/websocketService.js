import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
import { useChatStore } from '../stores/chatStore'
import { useAuthStore } from '../stores/authStore'

class WebSocketService {
  constructor() {
    this.client = null
    this.reconnectAttempts = 0
    this.maxReconnectAttempts = 5
    this.reconnectDelay = 1000
    this.subscriptions = new Map()
    this.pendingMessages = new Map() // 임시 메시지 저장
  }

  // 임시 ID 생성 함수
  generateTempId() {
    return 'temp-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
  }

  connect() {
    const { user } = useAuthStore.getState()
    const { setStompClient, setConnectionStatus, incrementRetries, resetRetries } = useChatStore.getState()

    if (!user) {
      console.error('User not authenticated')
      return Promise.reject('User not authenticated')
    }
    
    return new Promise((resolve, reject) => {
      try {
        // SockJS를 사용하여 WebSocket 연결 설정
        const socket = new SockJS(
          import.meta.env.VITE_WS_BASE_URL || 'http://localhost:8080/ws/chat'
        )

        this.client = new Client({
          webSocketFactory: () => socket,
          connectHeaders: {
            'User-Id': user.id.toString(),
            'Authorization': `Bearer ${useAuthStore.getState().token}`
          },
          debug: (str) => {
            if (!import.meta.env.PROD) {
              // console.log('STOMP Debug:', str)
            }
          },
          reconnectDelay: this.reconnectDelay,
          heartbeatIncoming: 4000,
          heartbeatOutgoing: 4000,
          
          onConnect: (frame) => {
            console.log('Connected to WebSocket:', frame)
            setConnectionStatus(true)
            setStompClient(this.client)
            resetRetries()
            this.reconnectAttempts = 0
            resolve(this.client)
          },

          onStompError: (frame) => {
            console.error('STOMP protocol error:', frame)
            setConnectionStatus(false)
            reject(frame)
          },

          onWebSocketError: (error) => {
            console.error('WebSocket error:', error)
            setConnectionStatus(false)
          },

          onWebSocketClose: (event) => {
            console.log('WebSocket connection closed:', event)
            setConnectionStatus(false)
            this.handleReconnect()
          },

          onDisconnect: (frame) => {
            console.log('Disconnected from WebSocket:', frame)
            setConnectionStatus(false)
          }
        })

        this.client.activate()

      } catch (error) {
        console.error('Failed to create WebSocket connection:', error)
        setConnectionStatus(false)
        reject(error)
      }
    })
  }

  disconnect() {
    const { setConnectionStatus, setStompClient, clearAllData } = useChatStore.getState()
    
    if (this.client && this.client.connected) {
      // 모든 구독 해제
      this.subscriptions.forEach((subscription, topic) => {
        try {
          subscription.unsubscribe()
        } catch (error) {
          console.error(`Failed to unsubscribe from ${topic}:`, error)
        }
      })
      this.subscriptions.clear()

      this.client.deactivate()
    }
    
    setConnectionStatus(false)
    setStompClient(null)
    clearAllData()
    this.reconnectAttempts = 0
  }

  handleReconnect() {
    const { connectionRetries, maxRetries } = useChatStore.getState()
    
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      
      setTimeout(() => {
        console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`)
        this.connect().catch((error) => {
          console.error('Reconnection failed:', error)
        })
      }, this.reconnectDelay * this.reconnectAttempts)
    } else {
      console.error('Max reconnection attempts reached')
    }
  }

  subscribeToRoom(roomId, onMessageReceived) {
    if (!this.client || !this.client.connected) {
      console.error('WebSocket not connected')
      return null
    }

    const topic = `/topic/chat/${roomId}`
    
    try {
      const subscription = this.client.subscribe(topic, (message) => {
        try {
          const messageData = JSON.parse(message.body)
          // 임시 메시지 처리 로직
          this.handleIncomingMessage(messageData, onMessageReceived)
        } catch (error) {
          console.error('Failed to parse message:', error)
        }
      })

      this.subscriptions.set(topic, subscription)
      console.log(`Subscribed to room: ${roomId}`)
      
      return subscription
    } catch (error) {
      console.error(`Failed to subscribe to room ${roomId}:`, error)
      return null
    }
  }

  // 수신된 메시지 처리 (중복 제거 로직 포함)
  handleIncomingMessage(messageData, onMessageReceived) {
    const { user } = useAuthStore.getState()
    
    // 본인이 보낸 메시지이고 tempId가 있는 경우 (임시 메시지가 존재하는 경우)
    if (messageData.senderId === user.id && messageData.tempId && this.pendingMessages.has(messageData.tempId)) {
      const tempMessage = this.pendingMessages.get(messageData.tempId)
      
      // 임시 메시지를 실제 메시지로 업데이트
      const updatedMessage = {
        ...tempMessage,
        ...messageData,
        status: 'DELIVERED',
        messageId: messageData.messageId,
        streamId: messageData.streamId
      }
      
      // 임시 메시지 제거
      this.pendingMessages.delete(messageData.tempId)
      
      // 업데이트된 메시지로 UI 갱신
      onMessageReceived(updatedMessage, 'update')
      
      console.log('Updated temp message to real message:', updatedMessage)
    } else {
      // 다른 사람의 메시지이거나 tempId가 없는 경우 새로 추가
      onMessageReceived(messageData, 'new')
    }
  }

  subscribeToParticipants(roomId, onParticipantUpdate) {
    if (!this.client || !this.client.connected) {
      console.error('WebSocket not connected')
      return null
    }

    const topic = `/topic/chat/${roomId}/participants`
    
    try {
      const subscription = this.client.subscribe(topic, (message) => {
        try {
          const participantData = JSON.parse(message.body)
          onParticipantUpdate(participantData)
        } catch (error) {
          console.error('Failed to parse participant update:', error)
        }
      })

      this.subscriptions.set(topic, subscription)
      console.log(`Subscribed to participants for room: ${roomId}`)
      
      return subscription
    } catch (error) {
      console.error(`Failed to subscribe to participants for room ${roomId}:`, error)
      return null
    }
  }

  unsubscribeFromRoom(roomId) {
    const topics = [
      `/topic/chat/${roomId}`,
      `/topic/chat/${roomId}/participants`
    ]

    topics.forEach(topic => {
      const subscription = this.subscriptions.get(topic)
      if (subscription) {
        try {
          subscription.unsubscribe()
          this.subscriptions.delete(topic)
          console.log(`Unsubscribed from: ${topic}`)
        } catch (error) {
          console.error(`Failed to unsubscribe from ${topic}:`, error)
        }
      }
    })
  }

  sendMessage(roomId, messageContent, onTempMessageCreated) {
    if (!this.client || !this.client.connected) {
      console.error('WebSocket not connected')
      return false
    }

    const { user } = useAuthStore.getState()
    const tempId = this.generateTempId()
    
    // 임시 메시지 생성
    const tempMessage = {
      tempId: tempId,
      roomId: parseInt(roomId),
      senderId: user.id,
      senderName: user.name || `User_${user.id}`,
      content: messageContent,
      type: 'CHAT',
      status: 'SENDING',
      timestamp: new Date().toISOString()
    }

    // 임시 메시지를 저장하고 UI에 즉시 표시
    this.pendingMessages.set(tempId, tempMessage)

    try {
      // 서버로 메시지 전송 (tempId 포함)
      const messageData = {
        tempId: tempId,
        senderId: user.id,
        senderName: user.name || `User_${user.id}`,
        content: messageContent,
        type: 'CHAT'
      }

      this.client.publish({
        destination: `/app/chat/send/${roomId}`,
        body: JSON.stringify(messageData),
        headers: {
          'content-type': 'application/json',
          'User-Id': user.id.toString()
        }
      })
      
      console.log('Message sent with tempId:', tempId)
      return tempMessage
    } catch (error) {
      console.error('Failed to send message:', error)
      
      // 전송 실패 시 임시 메시지 상태를 실패로 변경
      if (this.pendingMessages.has(tempId)) {
        const failedMessage = {
          ...tempMessage,
          status: 'FAILED'
        }
        this.pendingMessages.set(tempId, failedMessage);

        return { ...failedMessage, id: tempId }; // 실패 메시지 객체 반환
      }
      
      return false
    }
  }

   // 메시지 재전송 함수
   retryMessage(tempId) {
    const tempMessage = this.pendingMessages.get(tempId)
    if (!tempMessage) {
      console.error('Temp message not found:', tempId)
      return false
    }

    // 상태를 다시 SENDING으로 변경
    tempMessage.status = 'SENDING'
    this.pendingMessages.set(tempId, tempMessage)

    try {
      const messageData = {
        tempId: tempId,
        senderId: tempMessage.senderId,
        senderName: tempMessage.senderName,
        content: tempMessage.content,
        type: tempMessage.type
      }

      this.client.publish({
        destination: `/app/chat/send/${tempMessage.roomId}`,
        body: JSON.stringify(messageData),
        headers: {
          'content-type': 'application/json',
          'User-Id': tempMessage.senderId.toString()
        }
      })

      console.log('Message retried:', tempId)
      return true
    } catch (error) {
      console.error('Failed to retry message:', error)
      tempMessage.status = 'FAILED'
      this.pendingMessages.set(tempId, tempMessage)
      return false
    }
  }

  connectToRoom(roomId) {
    if (!this.client || !this.client.connected) {
      console.error('WebSocket not connected')
      return false
    }

    try {
      this.client.publish({
        destination: `/app/chat/connect/${roomId}`,
        body: JSON.stringify({ roomId }),
        headers: {
          'content-type': 'application/json',
          'User-Id': useAuthStore.getState().user.id.toString()
        }
      })
      
      return true
    } catch (error) {
      console.error('Failed to connect to room:', error)
      return false
    }
  }

  disconnectFromRoom(roomId) {
    if (!this.client || !this.client.connected) {
      console.error('WebSocket not connected')
      return false
    }

    try {
      this.client.publish({
        destination: `/app/chat/disconnect/${roomId}`,
        body: JSON.stringify({ roomId }),
        headers: {
          'content-type': 'application/json',
          'User-Id': useAuthStore.getState().user.id.toString()
        }
      })
      
      return true
    } catch (error) {
      console.error('Failed to disconnect from room:', error)
      return false
    }
  }

  sendTypingIndicator(roomId, isTyping) {
    if (!this.client || !this.client.connected) {
      return false
    }

    try {
      const { user } = useAuthStore.getState()
      
      this.client.publish({
        destination: `/app/chat/typing/${roomId}`,
        body: JSON.stringify({
          userId: user.id,
          userName: user.name,
          typing: isTyping
        }),
        headers: {
          'content-type': 'application/json',
          'User-Id': user.id.toString()
        }
      })
      
      return true
    } catch (error) {
      console.error('Failed to send typing indicator:', error)
      return false
    }
  }

  isConnected() {
    return this.client && this.client.connected
  }
}

// 싱글톤 인스턴스 생성
export const websocketService = new WebSocketService()
export default websocketService