import axios from 'axios'
import { message } from 'antd'
import api from './api'

// 创建 axios 实例
const service = axios.create({
    baseURL: api.devDomian, // 后端接口地址，可根据需要修改
    timeout: 10000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 这里可以添加 token 等操作
        const token = localStorage.getItem('token')
        if (token) config.headers.Authorization = `Bearer ${token}`
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        // 这里可以根据后端返回格式做统一处理
        if (response.data && response.code && response.code !== 200) {
            message.error(response.message || 'failed')
            return Promise.reject(response.data)
        }
        return response.data
    },
    error => {
        message.error(error.message || 'Internal server error')
        return Promise.reject(error)
    }
)

export default service
