import React, { useState, useEffect, useRef } from 'react'
import { Avatar, Modal, Space, Flex } from 'antd'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  MessageOutlined,
  UserOutlined,
  SettingOutlined,
  MenuOutlined,
  ShareAltOutlined,
  CameraOutlined
} from '@ant-design/icons'
import './Main.css'
import { useUserInfoStore } from '@/stores/userInfoStore'
import { updateAvatarService } from '@/utils/service'
import WindowControls from '../../components/WindowControls'
const Main = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeChatId, setActiveChatId] = useState(null)
  const [activeMenu, setActiveMenu] = useState('chat')
  const [visible, setVisible] = useState(false)
  const { userInfo, setUserInfo } = useUserInfoStore()
  const fileInputRef = useRef(null)
  //更新用户头像
  const handleAvatarClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = async (event) => {
    const file = event.target.files[0]
    if (file) {
      const formData = new FormData()
      formData.append('avatar', file)
      try {
        const response = await updateAvatarService(formData)
        // Assuming the response contains the updated user info with the new avatar URL
        if (response.data) {
          setUserInfo({ ...userInfo, avatar: response.data.avatarUrl })
        }
      } catch (error) {
        console.error('Failed to update avatar:', error)
      }
    }
  }
  const selectMenu = (menuItem) => {
    setActiveMenu(menuItem)
    if (menuItem === 'chat') {
      navigate(`/main/chat/${activeChatId}`)
    } else if (menuItem === 'contacts') {
      navigate('/main/contacts')
    } else if (menuItem === 'setting') {
      navigate('/main/setting')
    }
  }

  useEffect(() => {
    if (location.pathname.startsWith('/main/chat')) {
      setActiveMenu('chat')
      // // 如果路径包含聊天ID，更新activeChatId
      // const chatIdMatch = location.pathname.match(/\/main\/chat\/(\d+)/)
      // console.log('Chat ID Match:', chatIdMatch)
      // if (chatIdMatch) {
      //   setActiveChatId(parseInt(chatIdMatch[1]))
      // }
    } else if (location.pathname.startsWith('/main/contacts')) {
      setActiveMenu('contacts')
    } else if (location.pathname.startsWith('/main/setting')) {
      setActiveMenu('settings')
    } else {
      // 默认跳转到聊天页面
      navigate(`/main/chat/${activeChatId}`)
    }
  }, [location.pathname, navigate, activeChatId])
  const handleSendMessage = () => {
    // Add logic to send message to the user
  }
  console.log('User Info:', userInfo)
  return (
    <div className="wechat-container">
      {/* 左侧边栏 */}
      <div className="sidebar">
        {/*窗口操作按钮*/}
        <WindowControls />

        {/* 用户头像 */}
        <div className="user-avatar" onClick={() => setVisible(true)}>
          <Avatar size={36} shape="square" src={userInfo.avatar} />
        </div>

        {/* 功能菜单 */}
        <div className="menu-list">
          <div
            className={`menu-item ${activeMenu === 'chat' ? 'active' : ''}`}
            onClick={() => selectMenu('chat')}
          >
            <MessageOutlined />
          </div>
          <div
            className={`menu-item ${activeMenu === 'contacts' ? 'active' : ''}`}
            onClick={() => selectMenu('contacts')}
          >
            <UserOutlined />
          </div>
          <div
            className={`menu-item ${activeMenu === 'moments' ? 'active' : ''}`}
            onClick={() => selectMenu('moments')}
          >
            <CameraOutlined />
          </div>
          <div
            className={`menu-item ${activeMenu === 'settings' ? 'active' : ''}`}
            onClick={() => selectMenu('setting')}
          >
            <SettingOutlined />
          </div>
        </div>

        {/* 底部菜单 */}
        <div className="bottom-menu">
          <MenuOutlined />
        </div>
      </div>

      {/* 主内容区域 (Router View) */}
      <div className="chat-window">
        <Outlet key={activeChatId} />
      </div>

      <Modal
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width={400}
        className="friend-info-modal"
        closable={false}
        maskClosable={true}
        centered={false}
      >
        {userInfo && (
          <div className="friend-info-modal-content">
            <div className="friend-header friend-header-modal">
              <div className="friend-basic-info">
                <div className="friend-name">
                  {userInfo?.nickName}
                  <span className="gender-icon">♀</span>
                </div>
                <div className="friend-signature">
                  微信号: {userInfo?.userId || '这个人很懒，什么都没留下'}
                </div>
              </div>
              <div className="info-avatar-container" onClick={handleAvatarClick}>
                <img
                  src={
                    userInfo.avatar ||
                    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                  }
                  className="info-avatar"
                  alt={userInfo.nickName || '狸不开，桃不掉'}
                />
                <CameraOutlined className="update-avatar-icon" />
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>
            </div>

            <div className="contact-details">
              <div className="detail-item">
                <span className="detail-label">地区</span>
                <span className="detail-value">{userInfo?.region || '未设置'}</span>
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
              <Flex align="end" justify="flex-end">
                <Space size={24}>
                  <ShareAltOutlined style={{ fontSize: 24 }} />
                  <MessageOutlined onClick={handleSendMessage} style={{ fontSize: 24 }} />
                </Space>
              </Flex>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Main
