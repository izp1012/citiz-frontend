import { create } from 'zustand'

export const useChatStore = create((set, get) => ({
  // State
  chatRooms: [],
  currentRoom: null,
  messages: {},
  onlineUsers: {},
  isConnected: false,
  stompClient: null,
  connectionRetries: 0,
  maxRetries: 5,

  // Actions
  setChatRooms: (rooms) => set({ chatRooms: rooms }),
  
  setCurrentRoom: (room) => set({ currentRoom: room }),
  
  addChatRoom: (room) => set((state) => ({
    chatRooms: [...state.chatRooms, room]
  })),

  updateChatRoom: (roomId, updates) => set((state) => ({
    chatRooms: state.chatRooms.map(room => 
      room.id === roomId ? { ...room, ...updates } : room
    )
  })),

  removeChatRoom: (roomId) => set((state) => ({
    chatRooms: state.chatRooms.filter(room => room.id !== roomId),
    currentRoom: state.currentRoom?.id === roomId ? null : state.currentRoom
  })),

  setMessages: (roomId, messages) => set((state) => ({
    messages: { ...state.messages, [roomId]: messages }
  })),

  addMessage: (roomId, message) => set((state) => {
    const roomMessages = state.messages[roomId] || []
    
    // 메시지 고유 식별자 확인 (더 엄격한 조건)
    const existingMessageIndex = roomMessages.findIndex(m => {
      // streamId가 있는 경우 streamId로 비교
      if (message.streamId && m.streamId) {
        return m.streamId === message.streamId
      }
      // tempId가 있는 경우 tempId로 비교 (같은 tempId인 경우만)
      if (message.tempId && m.tempId) {
        return m.tempId === message.tempId
      }
      // id가 있는 경우 id로 비교
      if (message.id && m.id) {
        return m.id === message.id
      }
      return false
    })
    
    if (existingMessageIndex !== -1) {
      // 기존 메시지 업데이트
      const updatedMessages = [...roomMessages]
      updatedMessages[existingMessageIndex] = {
        ...updatedMessages[existingMessageIndex],
        ...message,
        tempId: message.streamId ? undefined : updatedMessages[existingMessageIndex].tempId
      }
      
      return {
        messages: {
          ...state.messages,
          [roomId]: updatedMessages
        }
      }
    } else {
      // 새 메시지 추가
      return {
        messages: {
          ...state.messages,
          [roomId]: [...roomMessages, message]
        }
      }
    }
  }),

  updateMessageStatus: (roomId, messageId, status) => set((state) => ({
    messages: {
      ...state.messages,
      [roomId]: (state.messages[roomId] || []).map(msg =>
        msg.id === messageId || msg.streamId === messageId
          ? { ...msg, status }
          : msg
      )
    }
  })),

  setOnlineUsers: (roomId, users) => set((state) => ({
    onlineUsers: { ...state.onlineUsers, [roomId]: users }
  })),

  addOnlineUser: (roomId, user) => set((state) => {
    const currentUsers = state.onlineUsers[roomId] || []
    const userExists = currentUsers.some(u => u.id === user.id)
    
    if (!userExists) {
      return {
        onlineUsers: {
          ...state.onlineUsers,
          [roomId]: [...currentUsers, user]
        }
      }
    }
    return state
  }),

  removeOnlineUser: (roomId, userId) => set((state) => ({
    onlineUsers: {
      ...state.onlineUsers,
      [roomId]: (state.onlineUsers[roomId] || []).filter(user => user.id !== userId)
    }
  })),

  setConnectionStatus: (isConnected) => set({ isConnected }),
  
  setStompClient: (client) => set({ stompClient: client }),

  incrementRetries: () => set((state) => ({ 
    connectionRetries: state.connectionRetries + 1 
  })),

  resetRetries: () => set({ connectionRetries: 0 }),

  // Getters
  getRoomMessages: (roomId) => {
    const state = get()
    return state.messages[roomId] || []
  },

  getRoomOnlineUsers: (roomId) => {
    const state = get()
    return state.onlineUsers[roomId] || []
  },

  getUnreadCount: (roomId) => {
    const state = get()
    const messages = state.messages[roomId] || []
    return messages.filter(msg => !msg.read && msg.senderId !== state.currentUserId).length
  },

  // Utility actions
  clearRoomData: (roomId) => set((state) => {
    const newMessages = { ...state.messages }
    const newOnlineUsers = { ...state.onlineUsers }
    delete newMessages[roomId]
    delete newOnlineUsers[roomId]
    
    return {
      messages: newMessages,
      onlineUsers: newOnlineUsers
    }
  }),

  clearAllData: () => set({
    chatRooms: [],
    currentRoom: null,
    messages: {},
    onlineUsers: {},
    connectionRetries: 0
  }),
}))