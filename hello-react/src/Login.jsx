import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()

    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()

    // 🌟 admin과 student 모두 로그인에 성공하도록 조건을 맞췄습니다.
    if (
      (trimmedEmail === 'admin@school.ac.kr' || trimmedEmail === 'student@school.ac.kr') && 
      trimmedPassword === '1234'
    ) {
      localStorage.setItem('isLogin', 'true')
      // admin 메일이면 admin 권한, student 메일이면 user 권한 부여
      localStorage.setItem('role', trimmedEmail === 'admin@school.ac.kr' ? 'admin' : 'user')
      setErrorMessage('')
      
      // 🌟 수업 가이드에 맞춰 관리자 페이지(/admin)로 이동시킵니다.
      navigate('/admin') 
    } else {
      setErrorMessage('이메일 또는 비밀번호가 일치하지 않습니다.')
    }
  }

  return (
    <div style={{ padding: '50px', textAlign: 'center', maxWidth: '400px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ color: '#4f46e5', fontWeight: 'bold', fontSize: '12px', letterSpacing: '1px' }}>STUDENT LOGIN</div>
      <h2 style={{ marginTop: '5px', fontSize: '28px', color: '#1e293b' }}>로그인</h2>
      <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '30px' }}>학교 이메일과 비밀번호를 입력하세요.</p>

      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold', color: '#475569', textAlign: 'center' }}>이메일</label>
          <input 
            type="email" 
            placeholder="이메일 입력" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '15px' }}
            required
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold', color: '#475569', textAlign: 'center' }}>비밀번호</label>
          <input 
            type="password" 
            placeholder="비밀번호 입력" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '15px' }}
            required
          />
        </div>
        
        {errorMessage && (
          <p style={{ color: '#ef4444', fontSize: '14px', margin: '0', fontWeight: 'bold', textAlign: 'center' }}>
            {errorMessage}
          </p>
        )}

        <button 
          type="submit" 
          style={{ 
            padding: '14px', 
            background: '#0f172a', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '16px',
            marginTop: '10px'
          }}
        >
          로그인
        </button>
      </form>

      <div style={{ marginTop: '30px', fontSize: '13px', color: '#94a3b8' }}>
        <p style={{ margin: '0' }}>테스트 계정</p>
        <p style={{ margin: '3px 0 0 0' }}>student@school.ac.kr</p>
        <p style={{ margin: '3px 0 0 0' }}>비밀번호: 1234</p>
      </div>
    </div>
  )
}

export default Login
