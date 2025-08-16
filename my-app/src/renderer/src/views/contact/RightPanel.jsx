import React from 'react'
import { Button, Avatar } from 'antd'
import { UserOutlined, AntDesignOutlined } from '@ant-design/icons'

const RightPanel = ({ currentSelectedFriend, handleAgreeRequest, handleSendMessage }) => {
  return (
    currentSelectedFriend && (
      <div className="contact-right-panel">
        <div className="friend-info">
          <div className="friend-header">
            <div className="friend-basic-info">
              <div className="friend-name">
                {currentSelectedFriend?.applyNickName ||
                  currentSelectedFriend?.contactNickName ||
                  '狸不开，桃不掉'}
                <span className="gender-icon">♀</span>
              </div>
              <div className="friend-signature">どこか遠くへ行きたい。</div>
            </div>
            <img
              src={
                currentSelectedFriend?.avatar ||
                'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
              }
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
              <span className="detail-value">
                {currentSelectedFriend?.applyUserId || currentSelectedFriend?.contactId}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">来源</span>
              <span className="detail-value">通过扫一扫添加</span>
            </div>
          </div>

          <div className="moments-section">
            <div className="moments-label">朋友圈</div>
            <div className="moments-images">
              <Avatar style={{ backgroundColor: '#fde3cf' }}>A</Avatar>
              <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
              <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
              <Avatar style={{ backgroundColor: '#1677ff' }} icon={<AntDesignOutlined />} />
            </div>
          </div>

          <div className="action-buttons ">
            <Button
              style={{ backgroundColor: '#3cc160' }}
              type="primary"
              onClick={handleSendMessage}
            >
              发消息
            </Button>

            {currentSelectedFriend?.status !== 1 && (
              <Button
                type="primary"
                style={{ backgroundColor: '#3cc160' }}
                onClick={() => handleAgreeRequest()}
              >
                通过验证
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  )
}

export default RightPanel
