import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './views/login/Login'
import Register from './views/register/Register'
import Main from './views/main/Main'
import Chat from './views/chat/Chat'
import Contact from './views/contact/Contact'
import Setting from './views/setting/Setting'
import Moments from './views/moments/Moments'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/main" element={<Main />}>
        <Route index element={<Navigate to="/main/chat" replace />} />
        <Route path="chat" element={<Chat />} />
        <Route path="chat/:chatId" element={<Chat />} />
        <Route path="contacts" element={<Contact />} />
        <Route path="moments" element={<Moments />} />
        <Route path="setting" element={<Setting />} />
      </Route>
    </Routes>
  )
}

export default App
