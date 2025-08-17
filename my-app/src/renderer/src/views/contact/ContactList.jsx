import React, { useState } from 'react'
import { RightOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'

const ContactList = ({ contactList, selectFriend, currentSelectedFriend }) => {
  const [contactExpend, setContactExpend] = useState(false)

  const toggleCategory = () => {
    setContactExpend(!contactExpend)
  }

  return (
    <div className="contact-categories">
      <div className="category-item">
        <div className="category-name" onClick={toggleCategory}>
          联系人
        </div>
        {contactList.length > 0 && <span className="category-count">{contactList.length}</span>}
        <RightOutlined className={contactExpend ? 'rotated' : ''} onClick={toggleCategory} />
      </div>
      {contactExpend && (
        <div className="friend-list">
          {contactList.map((contact) => (
            <div
              key={contact.userId}
              className={`friend-item ${
                currentSelectedFriend &&
                !currentSelectedFriend.applyUserId &&
                currentSelectedFriend.contactId === contact.contactId
                  ? 'selected'
                  : ''
              }`}
              onClick={() => selectFriend(contact)}
            >
              <Avatar shape="square" size={36} src={contact.avatar} className="message-avatar" />
              <div className="chat-info">
                <div className="chat-name">{contact.contactNickName || '狸不开，桃不掉'}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ContactList
