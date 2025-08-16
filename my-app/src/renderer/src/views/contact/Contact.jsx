import React, { useState, useEffect } from 'react'
import { Input, Button, Avatar, Modal, Space, Switch } from 'antd'
import {
  PlusOutlined,
  RightOutlined,
  UserAddOutlined,
  ShareAltOutlined,
  MessageOutlined
} from '@ant-design/icons'
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

const Contact = () => {
  const [searchText, setSearchText] = useState('')
  const [selectedFriend, setSelectedFriend] = useState(null)
  const [visible, setVisible] = useState(false)
  const [contactList, setContactList] = useState({})
  const [currentSelectedFriend, setCurrentSelectedFriend] = useState(null)
  const [friendRequestsList, setFriendRequestsList] = useState([])
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [requestModalVisible, setRequestModalVisible] = useState(false)
  const [addFriendModalVisible, setAddFriendModalVisible] = useState(false)
  const [friendRequestModalVisible, setFriendRequestModalVisible] = useState(false)
  const [categories, setCategories] = useState()
  const [newFriendExpend, setNewFriendExpanded] = useState(false)

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

            // 更新新朋友分类的数量
            // if (response.data.length > 0) {
            //   setCategories((prev) => {
            //     const newCategories = [...prev]
            //     // 假设新朋友分类是第一个
            //     if (newCategories[0] && newCategories[0].name === '新的朋友') {
            //       newCategories[0].count = response.data.length
            //       newCategories[0].friends = response.data.map((request) => ({
            //         id: request.id || request.userId,
            //         name: request.nickName || '新朋友',
            //         avatar:
            //           request.avatar ||
            //           'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
            //         region: request.region || '未知地区',
            //         wechatId: request.userId,
            //         signature: request.signature || '这个人很懒，什么都没留下',
            //         source: request.source || '通过搜索添加',
            //         tags: '',
            //         permissions: '',
            //         moments: []
            //       }))
            //     }
            //     return newCategories
            //   })
            // }
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

  const toggleCategory = () => {
    setNewFriendExpanded(!newFriendExpend)
  }

  const selectFriend = (friend) => {
    setCurrentSelectedFriend(friend)
  }
  const handleSearch = async (value) => {
    setSearchText(value)
    // You can add API call to fetch user data here
    // For demo purposes, we'll use a mock user data
    const response = await getUserInfoService(value)
    if (response.data) {
      setCurrentSelectedFriend(response.data[0])
      setVisible(true)
    }
  }

  const handleAddContactClick = () => {
    // 检查搜索文本是否为空
    if (!searchText.trim()) {
      return
    }
    setAddFriendModalVisible(true)
    // 模拟检查是否已经是好友的逻辑
    // 这里可以根据实际需求调用API检查
    handleSearch(searchText)
    const isAlreadyFriend = checkIfAlreadyFriend(searchText)

    // if (isAlreadyFriend) {
    //   // 如果已经是好友，显示好友详情
    //   setSelectedFriend(isAlreadyFriend)
    // } else {
    //   // 如果不是好友，执行添加好友逻辑
    //   handleSearch(searchText)
    // }
  }

  const checkIfAlreadyFriend = (searchText) => {
    // 模拟检查逻辑，在实际应用中这里应该调用API
    // 这里我们假设搜索"weilei24"时返回一个已存在的好友
    if (searchText === 'weilei24') {
      return {
        id: 'existing1',
        name: 'Matthew',
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        region: '广东 广州',
        wechatId: 'weilei24',
        signature: '这个人很懒，什么都没留下',
        source: '通过搜索添加',
        tags: '朋友',
        permissions: '',
        moments: [
          'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
        ]
      }
    }
    return null
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
        // 更新好友请求列表
        // setFriendRequestsList((prev) => prev.filter((req) => req.id !== request.id))
        // 更新分类中的好友请求
        // setCategories((prev) => {
        //   const newCategories = [...prev]
        //   if (newCategories[0] && newCategories[0].name === '新的朋友') {
        //     newCategories[0].friends = newCategories[0].friends.filter(
        //       (friend) => friend.id !== request.id
        //     )
        //     newCategories[0].count = newCategories[0].friends.length
        //   }
        //   return newCategories
        // })
        // 关闭请求详情弹窗
        setRequestModalVisible(false)
      }
    } catch (error) {
      console.error('Error accepting friend request:', error)
    }
  }

  // 处理拒绝好友请求
  const handleRefuseRequest = async (request) => {
    try {
      const params = {
        applyUserId: request.wechatId || request.userId,
        receiveUserId: userInfo.userId,
        contactId: request.id
      }
      const response = await refuseAddContactService(params)
      if (response && response.data) {
        console.log('Friend request refused')
        // 更新好友请求列表
        setFriendRequestsList((prev) => prev.filter((req) => req.id !== request.id))
        // 更新分类中的好友请求
        setCategories((prev) => {
          const newCategories = [...prev]
          if (newCategories[0] && newCategories[0].name === '新的朋友') {
            newCategories[0].friends = newCategories[0].friends.filter(
              (friend) => friend.id !== request.id
            )
            newCategories[0].count = newCategories[0].friends.length
          }
          return newCategories
        })
        // 关闭请求详情弹窗
        setRequestModalVisible(false)
      }
    } catch (error) {
      console.error('Error refusing friend request:', error)
    }
  }
  const handleSendMessage = () => {
    // Add logic to send message to the user
    console.log('Send message to user', userData.id)
  }
  // console.log('CurrentSelectedFriend', currentSelectedFriend)
  const handleSendAddFriendNotifyClick = async () => {
    const params = {
      applyUserId: userInfo.userId,
      receiveUserId: currentSelectedFriend.userId,
      contactId: currentSelectedFriend.userId,
      applyInfo: applyInfo.nickName

      // Add other parameters as needed
    }
    const response = await notifyAddContactService(params)
    if (response.data) {
      console.log('Friend added successfully')
      // Update the UI as needed
    } else {
      console.error('Error adding friend')
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

        {/* 联系人分类列表 */}
        <div className="contact-categories">
          <div className="category-item">
            <div className="category-name" onClick={() => toggleCategory()}>
              新朋友
            </div>
            {friendRequestsList.length > 0 && (
              <span className="category-count">{friendRequestsList.length}</span>
            )}
            <RightOutlined
              className={newFriendExpend ? 'rotated' : ''}
              onClick={() => toggleCategory()}
            />
          </div>
          {newFriendExpend && (
            <div className="friend-list">
              {friendRequestsList.map((friend) => (
                <div key={friend.id} className="friend-item" onClick={() => selectFriend(friend)}>
                  <img
                    src={
                      friend.avatar ||
                      'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                    }
                    className="friend-avatar"
                    alt={friend.applyNickName || '狸不开，桃不掉'}
                  />
                  <div class="chat-info">
                    <div class="chat-name">{friend.applyNickName || '狸不开，桃不掉'}</div>
                    <div class="chat-message">{friend.applyInfo}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="contact-categories">
          <div className="category-item">
            <div className="category-name" onClick={() => toggleCategory()}>
              联系人
            </div>
            {contactList.length > 0 && <span className="category-count">{contactList.length}</span>}
            <RightOutlined
              className={newFriendExpend ? 'rotated' : ''}
              onClick={() => toggleCategory()}
            />
          </div>
          {newFriendExpend && (
            <div className="friend-list">
              {contactList.map((contact) => (
                <div key={contact.id} className="friend-item" onClick={() => selectFriend(contact)}>
                  <img
                    src={
                      contact.avatar ||
                      'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                    }
                    className="friend-avatar"
                    alt={contact.contactNickName || '狸不开，桃不掉'}
                  />
                  <div class="chat-info">
                    <div class="chat-name">{contact.contactNickName || '狸不开，桃不掉'}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 右侧面板 */}
      <div className="contact-right-panel">
        <div className="friend-info">
          <div className="friend-header">
            <div className="friend-basic-info">
              <div className="friend-name">
                {currentSelectedFriend?.applyNickName || '狸不开，桃不掉'}
                <span className="gender-icon">♀</span>
              </div>
              <div className="friend-signature">どこか遠くへ行きたい。</div>
            </div>
            <img
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              className="info-avatar"
              alt="阿蓉"
            />
          </div>

          <div className="contact-details">
            <div className="detail-item">
              <span className="detail-label">备注名</span>
              <span className="detail-value">添加备注名</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">地区</span>
              <span className="detail-value">广东 广州</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">微信号</span>
              <span className="detail-value">{currentSelectedFriend?.applyUserId}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">来源</span>
              <span className="detail-value">通过扫一扫添加</span>
            </div>
          </div>

          <div className="moments-section">
            <div className="moments-label">朋友圈</div>
            <div className="moments-images">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <div key={index} className="moment-image">
                  <img
                    src={`https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`}
                    alt={`朋友圈照片${index}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="action-buttons ">
            <Button type="primary">发消息</Button>
            <Button type="primary" onClick={() => handleAgreeRequest()}>
              通过验证
            </Button>
          </div>
        </div>
      </div>
      {/* 好友信息弹出框 */}
      <Modal
        open={addFriendModalVisible}
        onCancel={() => setAddFriendModalVisible(false)}
        footer={null}
        width={400}
        className="friend-info-modal"
        closable={true}
        maskClosable={true}
        centered={false}
      >
        {currentSelectedFriend && (
          <div className="friend-info-modal-content">
            <div className="friend-header friend-header-modal">
              <div className="friend-basic-info">
                <div className="friend-name">
                  {currentSelectedFriend?.nickName}
                  <span className="gender-icon">♀</span>
                </div>
                <div className="friend-signature">
                  {currentSelectedFriend?.signature || '这个人很懒，什么都没留下'}
                </div>
              </div>
              <img
                src={
                  currentSelectedFriend.avatar ||
                  'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                }
                className="info-avatar"
                alt={currentSelectedFriend.nickName || '狸不开，桃不掉'}
              />
            </div>

            <div className="contact-details">
              <div className="detail-item">
                <span className="detail-label">备注名</span>
                <span className="detail-value">
                  {currentSelectedFriend?.remark || '添加备注名'}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">地区</span>
                <span className="detail-value">{currentSelectedFriend?.region || '未设置'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">微信号</span>
                <span className="detail-value">{currentSelectedFriend?.userId || '未设置'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">来源</span>
                <span className="detail-value">
                  {currentSelectedFriend?.source || '通过微信号添加'}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">标签</span>
                <span className="detail-value">{currentSelectedFriend?.tags || '位设置'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">朋友权限</span>
                <span className="detail-value">{currentSelectedFriend?.permissions || ''}</span>
              </div>
            </div>

            <div className="contact-details">
              <div className="detail-item">
                <span className="detail-label">朋友圈</span>
                <div className="detail-value">
                  <img
                    src={
                      userInfo.avatar ||
                      'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                    }
                    className="info-avatar"
                    alt={userInfo.nickName || '狸不开，桃不掉'}
                  />
                </div>
              </div>
            </div>

            <div className="action-buttons action-buttons-modal">
              <Space size={24}>
                <UserAddOutlined onClick={handleAddFriendClick} style={{ fontSize: 24 }} />
                <ShareAltOutlined style={{ fontSize: 24 }} />
                <MessageOutlined onClick={handleSendMessage} style={{ fontSize: 24 }} />
              </Space>
            </div>
          </div>
        )}
      </Modal>

      {/* 申请添加好友弹出框 */}
      <Modal
        title="申请添加朋友"
        visible={friendRequestModalVisible}
        onCancel={() => setFriendRequestModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setFriendRequestModalVisible(false)}>
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={() => handleSendAddFriendNotifyClick()}>
            确定
          </Button>
        ]}
        width={400}
        className="friend-request-modal"
        closable={true}
        maskClosable={true}
        centered={true}
      >
        <div className="friend-request-content">
          <div className="request-section">
            <p className="section-title">发送添加朋友申请</p>
            <Input.TextArea
              rows={4}
              onBlur={(e) =>
                // console.log(e.target.value)
                setApplyInfo({ ...applyInfo, nickName: e.target.value })
              }
              defaultValue={`你好，我是${userInfo.nickName}`}
            />
          </div>
          <div className="request-section">
            <p className="section-title">设置备注</p>
            <Input defaultValue="W.L." />
          </div>
          <div className="request-section">
            <p className="section-title">标签</p>
            <Input placeholder="搜索、添加标签" />
            <div className="tags">
              <span className="tag">hsbc</span>
              <span className="tag">亲戚</span>
              <span className="tag">HR</span>
            </div>
          </div>
          <div className="request-section">
            <p className="section-title">设置朋友权限</p>
            <div className="permission-options">
              <div className="permission-option selected">
                <span>聊天、朋友圈、微信运动等</span>
                <span className="check-icon">✓</span>
              </div>
              <div className="permission-option">
                <span>仅聊天</span>
              </div>
            </div>
          </div>
          <div className="request-section">
            <p className="section-title">朋友圈和状态</p>
            <div className="status-options">
              <div className="status-option">
                <span>不让他（她）看</span>
                <Switch />
              </div>
              <div className="status-option">
                <span>不看他（她）</span>
                <Switch />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Contact
