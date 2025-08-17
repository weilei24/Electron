const api = {
  devDomian: 'http://localhost:8081',

  register: '/register',
  logout: '/logout',
  getUserInfo: '/user/getUserInfo',
  notifyAddContact: 'user/notifyAddContact',
  getContactApply: '/user/getContactApply',
  refuseAddContact: '/user/refuseAddContact',
  agreeAddContact: '/user/agreeAddContact',
  getUserContacts: '/user/getUserContacts',

  login: '/login',
  getChatHistory: '/chat/getChatHistory',
  updateAvatar: '/upload/updateAvatar'
}
export default api
