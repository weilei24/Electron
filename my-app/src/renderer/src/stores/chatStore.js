import { create } from 'zustand'
import { getChatHistoryService } from '../utils/service' // Correctly import the service
import { useUserInfoStore } from './userInfoStore' // Import user info store

export const useChatStore = create((set, get) => ({
  messages: [], // Messages for the active chat
  activeChatUserId: null, // The user ID of the person being chatted with

  // Set the active user to chat with
  setActiveChatUserId: async (targetUserId) => {
    console.log('Setting active chat user ID:', targetUserId)
    const currentUserId = useUserInfoStore.getState().userInfo?.userId
    if (!targetUserId || !currentUserId || get().activeChatUserId === targetUserId) {
      return
    }

    set({ activeChatUserId: targetUserId, messages: [] }) // Clear previous messages

    try {
      // Fetch chat history from the API
      const response = await getChatHistoryService(currentUserId, targetUserId)
      if (response && response.data) {
        set({ messages: response.data })
      }
    } catch (error) {
      console.error('Failed to fetch chat history:', error)
      set({ messages: [] })
    }
  },

  // Add a new message to the store (for both sent and received messages)
  addMessage: (message) => {
    const { senderId, receiverId } = message
    const activeChatUserId = get().activeChatUserId
    const currentUserId = useUserInfoStore.getState().userInfo?.userId

    // Only add the message if it belongs to the currently active chat
    if (
      (senderId === currentUserId && receiverId.toString() === activeChatUserId) ||
      (senderId.toString() === activeChatUserId && receiverId === currentUserId)
    ) {
      set((state) => ({ messages: [...state.messages, message] }))
    }
  },

  // Clear chat data on logout or disconnection
  clearChatData: () => set({ messages: [], activeChatUserId: null })
}))
