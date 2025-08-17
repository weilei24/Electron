import React from 'react'
import { Modal, Space, Avatar, Flex } from 'antd'
import { UserAddOutlined, ShareAltOutlined, MessageOutlined } from '@ant-design/icons'

const FriendInfoModal = ({
  visible,
  onCancel,
  searchedFriendInfo,
  userInfo,
  handleAddFriendClick,
  handleSendMessage,
  contactList
}) => {
  const isFriend =
    contactList &&
    searchedFriendInfo &&
    contactList.some((contact) => contact.contactId === searchedFriendInfo.userId)
  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={400}
      className="friend-info-modal"
      closable={false}
      maskClosable={true}
      centered={false}
    >
      {searchedFriendInfo && (
        <div className="friend-info-modal-content">
          <div className="friend-header friend-header-modal">
            <div className="friend-basic-info">
              <div className="friend-name">
                {searchedFriendInfo?.nickName}
                <span className="gender-icon">♀</span>
              </div>
              <div className="friend-signature">
                {searchedFriendInfo?.signature || '这个人很懒，什么都没留下'}
              </div>
            </div>
            <img
              src={
                searchedFriendInfo.avatar ||
                'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
              }
              className="info-avatar"
              alt={searchedFriendInfo.nickName || '狸不开，桃不掉'}
            />
          </div>

          <div className="contact-details">
            <div className="detail-item">
              <span className="detail-label">备注名</span>
              <span className="detail-value">{searchedFriendInfo?.remark || '添加备注名'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">地区</span>
              <span className="detail-value">{searchedFriendInfo?.region || '未设置'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">微信号</span>
              <span className="detail-value">{searchedFriendInfo?.userId || '未设置'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">来源</span>
              <span className="detail-value">{searchedFriendInfo?.source || '通过微信号添加'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">标签</span>
              <span className="detail-value">{searchedFriendInfo?.tags || '位设置'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">朋友权限</span>
              <span className="detail-value">{searchedFriendInfo?.permissions || ''}</span>
            </div>
          </div>

          <div className="contact-details">
            <div className="detail-item">
              <span className="detail-label">朋友圈</span>
              <div className="moments-images">
                <Avatar style={{ backgroundColor: '#fde3cf' }}>A</Avatar>
              </div>
            </div>
          </div>

          <div className="action-buttons action-buttons-modal">
            <Flex align="end" justify="flex-end">
              <Space size={24}>
                {!isFriend && (
                  <UserAddOutlined onClick={handleAddFriendClick} style={{ fontSize: 24 }} />
                )}
                <ShareAltOutlined style={{ fontSize: 24 }} />
                <MessageOutlined onClick={handleSendMessage} style={{ fontSize: 24 }} />
              </Space>
            </Flex>
          </div>
        </div>
      )}
    </Modal>
  )
}

export default FriendInfoModal
