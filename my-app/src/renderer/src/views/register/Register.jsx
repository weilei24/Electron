import React, { useState } from 'react'
import { Card, Form, Input, Button, message } from 'antd'
import { PhoneOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { registerService } from '@/utils/service'
import './Register.css'

const Register = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values) => {
    setLoading(true)
    try {
      if (values.password !== values.confirmPassword) {
        message.error('两次输入密码不一致')
        return
      }
      const params = {
        nickName: values.nickName,
        phone: values.phone,
        password: values.password
      }
      await registerService(params)
      message.success('注册成功')
      navigate('/login')
    } catch (error) {
      message.error(error.message || '注册失败，请稍后再试')
    } finally {
      setLoading(false)
    }
  }

  const goLogin = () => {
    navigate('/login')
  }

  return (
    <div className="register-container">
      <Card className="register-card">
        <h2 className="register-title">注册</h2>
        <Form form={form} onFinish={onFinish} layout="vertical" size="large">
          <Form.Item
            name="nickName"
            rules={[
              { required: true, message: '请输入昵称' },
              { min: 2, message: '昵称至少2位' },
              { max: 20, message: '昵称最多20位' }
            ]}
          >
            <Input placeholder="请输入昵称" maxLength={20} />
          </Form.Item>
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
              { min: 6, message: '密码至少6位' }
            ]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: '请再次输入密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('两次输入密码不一致'))
                }
              })
            ]}
          >
            <Input.Password placeholder="请再次输入密码" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
              注册
            </Button>
          </Form.Item>
        </Form>

        <div className="login-link">
          <Button type="link" onClick={goLogin}>
            已有账号？去登录
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default Register
