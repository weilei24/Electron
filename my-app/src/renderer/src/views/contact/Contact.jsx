import React, { useState, useEffect } from 'react'
import { Input, Button, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import './Contact.css'
import {
  getUserInfoService,
  getContactsService,
  notifyAddContactService,
  getNotifyAddContactService,
  agreeAddContactService,
  refuseAddContactService
} from '@/utils/service'
import { useUserInfoStore } from '@/stores/userInfoStore'

import ContactList from './ContactList'
import FriendRequestList from './FriendRequestList'
import RightPanel from './RightPanel'
import FriendInfoModal from './FriendInfoModal'
import AddFriendRequestModal from './AddFriendRequestModal'

const Contact = () => {
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState('')
  const [contactList, setContactList] = useState([])
  const [currentSelectedFriend, setCurrentSelectedFriend] = useState(null)
  const [searchedFriendInfo, setSearchedFriendInfo] = useState(null)
  const [friendRequestsList, setFriendRequestsList] = useState([])
  const [addFriendModalVisible, setAddFriendModalVisible] = useState(false)
  const [friendRequestModalVisible, setFriendRequestModalVisible] = useState(false)

  const [applyInfo, setApplyInfo] = useState({})
  const { userInfo } = useUserInfoStore()

  // 在组件挂载时获取好友请求信息
  useEffect(() => {
    const fetchFriendRequests = async () => {
      if (userInfo && userInfo.userId) {
        const userId = userInfo.userId
        try {
          const response = await getNotifyAddContactService(userId)
          if (response && response.data) {
            setFriendRequestsList(response.data)
          }
        } catch (error) {
          console.error('Error fetching friend requests:', error)
        }
      }
    }
    const fetchContacts = async () => {
      if (userInfo && userInfo.userId) {
        const userId = userInfo.userId
        try {
          const response = await getContactsService(userId)
          if (response && response.data) {
            setContactList(response.data)
            setCurrentSelectedFriend(response.data[0] || null)
          }
        } catch (error) {
          console.error('Error fetching contacts:', error)
        }
      }
    }
    fetchFriendRequests()
    fetchContacts()
  }, [userInfo])

  const selectFriend = (friend) => {
    setCurrentSelectedFriend(friend)
  }
  const handleSearch = async (value) => {
    setSearchText(value)
    const response = await getUserInfoService(value)
    if (response.data) {
      setSearchedFriendInfo(response.data[0])
      setAddFriendModalVisible(true)
    }
  }

  const handleAddContactClick = () => {
    if (!searchText.trim()) {
      return
    }
    handleSearch(searchText)
  }

  const handleAddFriendClick = () => {
    setFriendRequestModalVisible(true)
    setAddFriendModalVisible(false)
  }
  // 处理同意好友请求
  const handleAgreeRequest = async () => {
    try {
      const params = {
        userId: userInfo.userId,
        contactId: currentSelectedFriend.applyUserId
      }
      const response = await agreeAddContactService(params)
      if (response && response.data) {
        console.log('Friend request accepted')
        // Refresh friend requests
        const newFriendRequests = await getNotifyAddContactService(userInfo.userId)
        if (newFriendRequests && newFriendRequests.data) {
          message.success('好友请求已接受')
          setFriendRequestsList(newFriendRequests.data)
        }
        // Refresh contact list
        const newContacts = await getContactsService(userInfo.userId)
        if (newContacts && newContacts.data) {
          setContactList(newContacts.data)
        }
      }
    } catch (error) {
      console.error('Error accepting friend request:', error)
    }
  }

  const handleSendMessage = () => {
    if (currentSelectedFriend) {
      const chatId =
        currentSelectedFriend.contactId ||
        currentSelectedFriend.applyUserId ||
        currentSelectedFriend.userId
      if (chatId) {
        navigate(`/main/chat/${chatId}`)
      }
    }
  }

  const handleSendAddFriendNotifyClick = async () => {
    const params = {
      applyUserId: userInfo.userId,
      receiveUserId: searchedFriendInfo.userId,
      contactId: userInfo.userId,
      applyInfo: applyInfo.nickName
    }
    const response = await notifyAddContactService(params)
    if (response.data) {
      message.success('好友申请已发送')
    } else {
      message.error('发送好友申请失败')
    }
    setFriendRequestModalVisible(false)
  }

  return (
    <div className="contact-page">
      {/* 左侧面板 */}
      <div className="contact-left-panel">
        {/* 顶部搜索和添加按钮 */}
        <div className="contact-header">
          <Input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="搜索"
            className="search-input"
          />
          <Button type="text" className="add-contact-btn" onClick={() => handleAddContactClick()}>
            <PlusOutlined />
          </Button>
        </div>
        {/* 好友申请分类列表 */}
        <FriendRequestList
          friendRequestsList={friendRequestsList}
          selectFriend={selectFriend}
          currentSelectedFriend={currentSelectedFriend}
        />
        {/* 联系人分类列表 */}
        <ContactList
          contactList={contactList}
          selectFriend={selectFriend}
          currentSelectedFriend={currentSelectedFriend}
        />
      </div>

      {/* 右侧面板 */}
      <RightPanel
        currentSelectedFriend={currentSelectedFriend}
        handleAgreeRequest={handleAgreeRequest}
        handleSendMessage={handleSendMessage}
      />

      {/* 好友详情弹出框 */}
      <FriendInfoModal
        visible={addFriendModalVisible}
        contactList={contactList}
        onCancel={() => setAddFriendModalVisible(false)}
        searchedFriendInfo={searchedFriendInfo}
        userInfo={userInfo}
        handleAddFriendClick={handleAddFriendClick}
        handleSendMessage={handleSendMessage}
      />

      {/* 申请添加好友弹出框 */}
      <AddFriendRequestModal
        visible={friendRequestModalVisible}
        onCancel={() => setFriendRequestModalVisible(false)}
        onOk={() => handleSendAddFriendNotifyClick()}
        userInfo={userInfo}
        setApplyInfo={setApplyInfo}
        applyInfo={applyInfo}
      />
    </div>
  )
}

export default Contact
