import React, { useState } from 'react'
import { RightOutlined } from '@ant-design/icons'

const FriendRequestList = ({ friendRequestsList, selectFriend, currentSelectedFriend }) => {
  const [newFriendExpend, setNewFriendExpanded] = useState(false)

  const toggleCategory = () => {
    setNewFriendExpanded(!newFriendExpend)
  }

  return (
    <div className="contact-categories">
      <div className="category-item">
        <div className="category-name" onClick={toggleCategory}>
          新朋友
        </div>
        {friendRequestsList.length > 0 && (
          <span className="category-count">{friendRequestsList.length}</span>
        )}
        <RightOutlined className={newFriendExpend ? 'rotated' : ''} onClick={toggleCategory} />
      </div>
      {newFriendExpend && (
        <div className="friend-list">
          {friendRequestsList.map((friend) => (
            <div
              key={friend.applyUserId}
              className={`friend-item ${
                currentSelectedFriend && currentSelectedFriend.applyUserId === friend.applyUserId
                  ? 'selected'
                  : ''
              }`}
              onClick={() => selectFriend(friend)}
            >
              <img
                src={
                  friend.avatar ||
                  'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                }
                className="friend-avatar"
                alt={friend.applyNickName || '狸不开，桃不掉'}
              />
              <div className="chat-info">
                <div className="chat-name">
                  {friend.applyNickName || '狸不开，桃不掉'}
                  <span style={{ float: 'right', color: '#999', fontSize: '12px' }}>
                    {friend.status === 1 ? '已添加' : '等待验证'}
                  </span>
                </div>
                <div className="chat-message">{friend.applyInfo}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FriendRequestList
