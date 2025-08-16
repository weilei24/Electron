import { io } from 'socket.io-client'

const SOCKET_URL = 'http://localhost:8081' // The backend server URL

let socket

const connect = () => {
  if (socket && socket.connected) {
    return
  }

  socket = io(SOCKET_URL, {
    transports: ['websocket']
  })

  socket.on('connect', () => {
    console.log('Socket connected:', socket.id)
  })

  socket.on('disconnect', () => {
    console.log('Socket disconnected')
  })

  socket.on('error_message', (message) => {
    console.error('Socket Error:', message)
  })
}

const disconnect = () => {
  if (socket) {
    socket.disconnect()
  }
}

const register = (userId) => {
  if (socket) {
    socket.emit('register', userId)
  }
}

const sendPrivateMessage = (senderId, receiverId, content, messageType = 'text') => {
  if (socket) {
    socket.emit('private_message', {
      senderId,
      receiverId,
      messageType,
      content
    })
  }
}

const onReceiveMessage = (callback) => {
  if (socket) {
    socket.on('receive_message', callback)
  }
}

const removeReceiveMessageHandler = () => {
  if (socket) {
    socket.off('receive_message')
  }
}

const socketService = {
  connect,
  disconnect,
  register,
  sendPrivateMessage,
  onReceiveMessage,
  removeReceiveMessageHandler
}

export default socketService
