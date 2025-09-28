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

  addOrUpdateMessage: (roomId, message, type) => {
    set((state) => {
      const roomMessages = state.messages[roomId] || [];
      
      if (type === 'update') {
        const updatedMessages = roomMessages.map(msg => 
          (msg.tempId && msg.tempId === message.tempId) || (msg.streamId && msg.streamId === message.streamId)
          ? { ...msg, ...message }
          : msg
      );
        return {
          messages: {
            ...state.messages,
            [roomId]: updatedMessages,
          },
        };
      } else if (type === 'new') {
        // 중복 메시지 방지를 위해 streamId와 tempId 모두 확인
        const messageExists = roomMessages.some(msg => 
          (msg.tempId && msg.tempId === message.tempId) || (msg.streamId && msg.streamId === message.streamId)
        );
        if (messageExists) {
            console.warn("Message with this ID already exists, not adding:", message.tempId);
            return state;
        }
        return {
          messages: {
            ...state.messages,
            [roomId]: [...roomMessages, message],
          },
        };
      }
      return state;
    });
  },

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