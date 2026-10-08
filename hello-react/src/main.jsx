import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login.jsx'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* 1. 기본 주소(http://localhost:5173)로 들어오면 로그인 화면을 보여줍니다 */}
        <Route path="/" element={<Login />} />
        
        {/* 2. 로그인이 성공해서 /admin 주소로 이동하면 우리가 만든 포인트 관리 화면을 보여줍니다 */}
        <Route path="/admin" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
