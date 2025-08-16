import React, { useState } from 'react'
import { Avatar, Button, Select, Checkbox, InputNumber, Slider, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import './Setting.css'
import { logoutService } from '@/utils/service'
import { useUserInfoStore } from '@/stores/userInfoStore'

const Setting = () => {
  const navigate = useNavigate()
  const [appearance, setAppearance] = useState('system')
  const [autoDownload, setAutoDownload] = useState({ enabled: true, sizeLimit: 10 })
  const [keepChatHistory, setKeepChatHistory] = useState(true)
  const [voiceToText, setVoiceToText] = useState(false)
  const [fontSize, setFontSize] = useState(14)
  const { userInfo } = useUserInfoStore()
  const logout = () => {
    logoutService().then((res) => {
      message.success('已退出登录')
      navigate('/login')
    })
  }

  const toggleAutoLogin = () => {
    message.info('自动登录已关闭')
  }

  return (
    <div className="settings-page">
      {/* 账号信息 */}
      <div className="settings-section">
        <div className="account-info">
          <div className="profile-info">
            <Avatar
              size={50}
              src={
                userInfo.avatar ||
                'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
              }
            />
            <div className="user-details">
              <div className="username">{userInfo.nickName}</div>
              <div className="user-status">在线</div>
            </div>
          </div>
          <Button type="primary" danger size="small" onClick={logout}>
            退出登录
          </Button>
        </div>
      </div>

      {/* 自动登录 */}
      <div className="settings-section">
        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-title">自动登录</div>
            <div className="setting-status">已开启</div>
          </div>
          <Button type="primary" size="small" onClick={toggleAutoLogin}>
            关闭
          </Button>
        </div>
        <div className="setting-description">
          开启后,在本机登录微信将无需手机确认。可在手机和电脑上关闭。
        </div>
      </div>

      {/* 外观 */}
      <div className="settings-section">
        <div className="setting-item">
          <div className="setting-title">外观</div>
          <Select
            value={appearance}
            onChange={setAppearance}
            size="small"
            style={{ width: 120 }}
            options={[
              { label: '跟随系统', value: 'system' },
              { label: '浅色', value: 'light' },
              { label: '深色', value: 'dark' }
            ]}
          />
        </div>
      </div>

      {/* 自动下载 */}
      <div className="settings-section">
        <div className="setting-item">
          <div className="setting-title">自动下载</div>
          <div className="auto-download-controls">
            <Checkbox
              checked={autoDownload.enabled}
              onChange={(e) => setAutoDownload((prev) => ({ ...prev, enabled: e.target.checked }))}
            />
            <span className="download-text">小于</span>
            <InputNumber
              value={autoDownload.sizeLimit}
              onChange={(value) => setAutoDownload((prev) => ({ ...prev, sizeLimit: value }))}
              min={1}
              max={100}
              size="small"
              style={{ width: 80 }}
            />
            <span className="download-text">MB的文件自动下载</span>
          </div>
        </div>
      </div>

      {/* 消息记录 */}
      <div className="settings-section">
        <div className="setting-item">
          <div className="setting-title">消息记录</div>
          <Checkbox
            checked={keepChatHistory}
            onChange={(e) => setKeepChatHistory(e.target.checked)}
          >
            退出时保留聊天记录
          </Checkbox>
        </div>
      </div>

      {/* 语音转文字 */}
      <div className="settings-section">
        <div className="setting-item">
          <div className="setting-title">语音转文字</div>
          <Checkbox checked={voiceToText} onChange={(e) => setVoiceToText(e.target.checked)}>
            聊天中的语音消息自动转成文字
          </Checkbox>
        </div>
      </div>

      {/* 字体大小 */}
      <div className="settings-section">
        <div className="setting-item">
          <div className="setting-title">字体大小</div>
          <div className="font-size-controls">
            <span className="font-size-label">小</span>
            <Slider
              value={fontSize}
              onChange={setFontSize}
              min={12}
              max={20}
              step={1}
              style={{ width: 200, margin: '0 15px' }}
            />
            <span className="font-size-label">大</span>
          </div>
        </div>
      </div>

      {/* 存储空间 */}
      <div className="settings-section">
        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-title">存储空间</div>
            <div className="setting-status">1.2GB</div>
          </div>
          <Button type="primary" size="small">
            清理
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Setting
