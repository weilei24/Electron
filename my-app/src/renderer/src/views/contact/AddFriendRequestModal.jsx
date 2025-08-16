import React from 'react'
import { Modal, Button, Input, Switch } from 'antd'

const AddFriendRequestModal = ({ visible, onCancel, onOk, userInfo, setApplyInfo, applyInfo }) => {
  return (
    <Modal
      title="申请添加朋友"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={onOk}>
          确定
        </Button>
      ]}
      width={400}
      className="friend-request-modal"
      closable={false}
      maskClosable={true}
      centered={true}
    >
      <div className="friend-request-content">
        <div className="request-section">
          <p className="section-title">发送添加朋友申请</p>
          <Input.TextArea
            rows={4}
            onBlur={(e) => setApplyInfo({ ...applyInfo, nickName: e.target.value })}
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
  )
}

export default AddFriendRequestModal
