import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import './App.css' 

function App() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([
    {id: 1, name: '홍길동', point: 8500},
    {id: 2, name: '김철수', point: 12000},
    {id: 3, name: '이영희', point: 5500}])

  const [showGraph, setShowGraph] = useState(false)
  const [selectedId, setSelectedId] = useState('1')
  const [pointType, setPointType] = useState('add')
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')
  const isLogin = localStorage.getItem('isLogin')
  const role = localStorage.getItem('role')

  if (isLogin !== 'true' || role !== 'admin') {
    return <Navigate to="/" replace />
  }

  const points = users.map((user) => user.point);
  const maxPoint = Math.max(Math.max.apply(null, points), 1);
  const handlePointUpdate = () => {
    const pointValue = Number (amount)
    const userId = Number(selectedId)
    if (amount === '' || pointValue <= 0) {
      setMessage('1 이상의 포인트를 입력하세요.')
      return      
    }

    const selectedUser = users.find(
      (user) => user.id === userId
    )

    if (pointType === 'subtract' && pointValue > selectedUser.point) {
      setMessage('현재 보유 포인트보다 많이 차감할 수 없습니다.')
      return
    }

    setUsers(
      users.map((user) => {
        if (user.id !== userId) {
          return user
        }

        let newPoint 

        if (pointType === 'add') {
          newPoint = user.point + pointValue
        } else {
          newPoint = user.point - pointValue
        }
        return Object.assign({}, user, { point: newPoint })
      })
    )

    setMessage('포인트가 정상적으로 반영되었습니다.')

    setAmount('')    
  }

  // 8. 로그아웃 함수
  const handleLogout = () => {
    localStorage.removeItem('isLogin') // 로그인 정보 삭제
    localStorage.removeItem('role') // 사용자 권한 정보 삭제
    navigate('/') // 로그인 화면으로 이동
  }

  // 9. 화면 출력
  return (// 관리자 화면 전체 영역
    <main className="admin-page">
      <h1>관리자 포인트 관리</h1>
      <section className="point-control">
        <h2>포인트 지급·차감</h2>
        <div className="point-form">
          <label>사용자 선택</label>
          <select value={selectedId}
            // 사용자를 변경하면 selectedId 변경
            onChange={(e) => setSelectedId(e.target.value)}>
            {/* users 배열을 반복해서 option 생성 */}
            {users.map((user) => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>
        <div className="point-form">{/* 적립 / 차감 선택 */}
          <label>처리 유형</label>
          <select value={pointType} // 현재 처리 유형
            // 처리 유형 변경
            onChange={(e) => setPointType(e.target.value)}>
            <option value="add">포인트 적립</option>
            <option value="subtract">포인트 차감</option>
          </select>
        </div>
        <div className="point-form"> {/* 포인트 입력 */}
          <label>포인트</label>
          <input type="number" min="1" placeholder="포인트 입력" value={amount}
            onChange={(e) => setAmount(e.target.value)}/>
        </div>
        <button className="apply-button" onClick={handlePointUpdate}>포인트 반영</button>
        {message && (
          <p className="result-message">{message}</p>
        )}
      </section>
      <h2>사용자 목록</h2>
      {users.map((user) => (
        <div className="user-item" key={user.id}>
          <span>{user.name}</span>
          <strong>{user.point.toLocaleString()} P</strong>
        </div>
      ))}
      <p className="user-count">전체 사용자: {users.length}명</p>
      <div className="button-area">
        <button
          // 현재 showGraph 값을 반대로 변경
          onClick={() => setShowGraph(!showGraph)}>
          {/* showGraph가 true이면 그래프 닫기 false이면 그래프 보기 */}
          {showGraph ? '그래프 닫기' : '그래프 보기'}
        </button>
        <button onClick={handleLogout}>로그아웃</button>
      </div>
      {showGraph && (
        <section className="graph-area">
          <h2>사용자별 포인트 그래프</h2>
          {users.map((user) => (
            <div className="graph-row" key={user.id}>
              <span className="graph-name">{user.name}</span>
              <div className="graph-background">
                <div className="graph-bar"
                  style={{width: `${(user.point / maxPoint) * 100}%`}}>
                </div>
              </div>
              <strong>{user.point.toLocaleString()} P</strong>
            </div>
          ))}
        </section>
      )}
    </main>
  )
}

// main.jsx에서 App을 가져다 사용할 수 있도록 설정
export default App
