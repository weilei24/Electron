import { create } from 'zustand'

export const useUserInfoStore = create((set, get) => ({
  userInfo: {},
  
  // 设置用户信息
  setUserInfo: (info) => set({ userInfo: info }),
  
  // 获取用户信息
  getUserInfo: () => get().userInfo,
  
  // 清除用户信息
  clearUserInfo: () => set({ userInfo: null })
}))