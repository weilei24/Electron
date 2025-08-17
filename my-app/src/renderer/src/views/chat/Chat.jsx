import React, { useState, useEffect, useRef } from 'react'
import { Input, Avatar, Button, message } from 'antd'
import { SearchOutlined, MoreOutlined, SendOutlined } from '@ant-design/icons'
import { useParams, useNavigate } from 'react-router-dom'
import './Chat.css'

import { useUserInfoStore } from '../../stores/userInfoStore'
import { useChatStore } from '../../stores/chatStore'
import socketService from '../../utils/socket'
import { getContactsService } from '../../utils/service' // Assuming you have a service to get chatList

const { TextArea } = Input

const Chat = () => {
  const { chatId } = useParams()
  const navigate = useNavigate()

  // Stores
  const { userInfo } = useUserInfoStore()
  const { messages, activeChatUserId, setActiveChatUserId, addMessage } = useChatStore()

  // State
  const [newMessage, setNewMessage] = useState('')
  const [chatList, setChatList] = useState([])
  const [searchText, setSearchText] = useState('')
  const [activeContact, setActiveContact] = useState(null)
  const messageAreaRef = useRef(null)

  // Effect for WebSocket connection and message handling
  useEffect(() => {
    if (userInfo?.userId) {
      socketService.connect()
      socketService.register(userInfo.userId)

      const handleNewMessage = (message) => {
        addMessage(message)
      }

      socketService.onReceiveMessage(handleNewMessage)

      return () => {
        socketService.removeReceiveMessageHandler()
        socketService.disconnect()
      }
    }
  }, [userInfo, addMessage])
  console.log('chat ID is', chatId)
  // Effect for fetching chatList and setting active chat
  useEffect(() => {
    const fetchContacts = async () => {
      if (userInfo?.userId) {
        try {
          const res = await getContactsService(userInfo.userId)
          if (res.code === 200) {
            setChatList(res.data)
            // If there's a chatId in the URL, set it as active
            if (!chatId) {
              setActiveChatUserId(chatId)
            } else if (res.data.length > 0) {
              //Otherwise, default to the first contact
              const firstContactId = res.data[0]?.contactId.toString()
              navigate(`/main/chat/${firstContactId}`)
              setActiveChatUserId(firstContactId)
              setActiveContact(res.data[0])
            }
          }
        } catch (error) {
          message.error('Failed to fetch chatList.')
        }
      }
    }
    fetchContacts()
  }, [userInfo])

  // Effect for scrolling to the bottom of the message area
  useEffect(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight
    }
  }, [messages])

  const selectChat = (contact) => {
    const newChatId = contact.contactId.toString()
    if (activeChatUserId !== newChatId) {
      navigate(`/main/chat/${newChatId}`)
      setActiveChatUserId(newChatId)
      setActiveContact(contact)
    }
  }

  const sendMessage = () => {
    if (newMessage.trim() && userInfo?.userId && activeChatUserId) {
      const messageData = {
        senderId: userInfo.userId,
        receiverId: activeChatUserId,
        content: newMessage,
        messageType: 'text',
        timestamp: new Date().toISOString()
      }

      socketService.sendPrivateMessage(
        messageData.senderId,
        messageData.receiverId,
        messageData.content
      )

      // Optimistically add message to the UI
      addMessage(messageData)
      setNewMessage('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // const currentChatUser = chatList && chatList.find((c) => c.userId.toString() === activeChatUserId)
  // const filteredContacts = chatList.filter((c) =>
  //   c.username.toLowerCase().includes(searchText.toLowerCase())
  // )
  console.log('messages', messages)

  return (
    <div className="chat-container">
      <div className="chat-list">
        <div className="search-box">
          <Input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="搜索"
            prefix={<SearchOutlined />}
            allowClear
          />
        </div>
        <div className="chat-items">
          {chatList.map((contact) => (
            <div
              key={contact.contactId}
              className={`chat-item ${activeChatUserId === contact.contactId.toString() ? 'active' : ''}`}
              onClick={() => selectChat(contact)}
            >
              <div className="chat-avatar">
                <Avatar shape="square" size={40} src={contact.avatar} />
              </div>
              <div className="chat-info">
                <div className="chat-name">{contact.contactNickName}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="chat-window">
        <div className="chat-header">
          <div className="chat-title">{activeContact?.contactNickName || '选择一个聊天'}</div>
          <div className="chat-actions">
            <MoreOutlined />
          </div>
        </div>

        <div className="message-area" ref={messageAreaRef}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message-item ${msg.senderId === userInfo?.userId ? 'self' : 'other'}`}
            >
              <Avatar
                shape="square"
                size={30}
                src={msg.senderId === userInfo?.userId ? userInfo?.avatar : activeContact?.avatar}
                className="message-avatar"
              />
              <div className="message-content">
                <div className="message-bubble">{msg.content}</div>
                <div className="message-time">
                  {new Date(msg.timestamp).toLocaleTimeString('zh-CN', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="input-area">
          <div className="input-container">
            <TextArea
              rows={6}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="输入消息..."
              onKeyDown={handleKeyPress}
              autoSize={{ minRows: 4, maxRows: 8 }}
              // disabled={!activeChatUserId}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
