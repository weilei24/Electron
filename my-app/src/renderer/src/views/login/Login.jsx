import React, { useState } from 'react'
import { Card, Form, Input, Button, Row, Col, message } from 'antd'
import { PhoneOutlined, MessageOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { loginService } from '@/utils/service'
import { useUserInfoStore } from '@/stores/userInfoStore'
import './Login.css'

const Login = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { setUserInfo, getUserInfo } = useUserInfoStore()

  const onFinish = async (values) => {
    setLoading(true)
    const params = {
      phone: values.phone,
      password: values.password
    }
    const res = await loginService(params)
    try {
      const res = await loginService(params)
      if (res) {
        // setUserInfo(res)
        localStorage.setItem('token', res.data.token)
        setUserInfo(res.data)
        message.success('登录成功')
        navigate('/main')
      }
    } catch (err) {
      message.error('登录失败')
    } finally {
      setLoading(false)
    }
  }

  const goRegister = () => {
    navigate('/register')
  }

  return (
    <div className="login-container">
      <Card className="login-card">
        <h2 className="login-title">登录</h2>
        <Form form={form} onFinish={onFinish} layout="vertical" size="large">
          <Form.Item
            name="phone"
            rules={[
              { required: true, message: '请输入手机号' },
              { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }
            ]}
          >
            <Input placeholder="请输入手机号" maxLength={11} />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码长度不能少于6位' }
            ]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
              登录
            </Button>
          </Form.Item>
        </Form>

        <div className="register-link">
          <Button type="link" onClick={goRegister}>
            没有账号请注册
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default Login
