import request from './request'
import api from './api'
// 登录接口
export function loginService(params) {
  return request.post(api.login, { ...params })
}
// 注册接口
export function registerService(params) {
  return request.post(api.register, { ...params })
}
// 退出接口
export function logoutService() {
  return request.get(api.logout)
}
//获取用户接口
export function getUserInfoService(userId) {
  return request.get(`${api.getUserInfo}?userId=${userId}`)
}
// 获取联系人接口
export function getContactsService(userId) {
  return request.get(`${api.getUserContacts}?userId=${userId}`)
}
//通知联系人接口
export function notifyAddContactService(params) {
  return request.post(api.notifyAddContact, { ...params })
}
// 获取通知联系人接口
export function getNotifyAddContactService(userId) {
  return request.get(`${api.getContactApply}?userId=${userId}`)
}
// 拒绝添加联系人接口
export function refuseAddContactService(params) {
  return request.post(api.refuseAddContact, { ...params })
}
// 同意添加联系人接口
export function agreeAddContactService(params) {
  return request.post(api.agreeAddContact, { ...params })
}

//添加联系人
export function addContactService(params) {
  return request.post(api.addContact, { ...params })
}

// 获取聊天记录
export function getChatHistoryService(senderId, receiverId) {
  return request.get(`${api.getChatHistory}?senderId=${senderId}&receiverId=${receiverId}`)
}

//修改头像
export function updateAvatarService(formData) {
  return request.put(api.updateAvatar, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
