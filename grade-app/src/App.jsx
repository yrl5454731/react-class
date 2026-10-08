import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import './App.css'

// 🆕 분리한 컴포넌트들을 위에서 불러옵니다.
import PointForm from './PointForm.jsx'
import UserList from './UserList.jsx'
import PointGraph from './PointGraph.jsx'
import PointHistory from './PointHistory.jsx'

function App() {
  const navigate = useNavigate()

  // 1. 상태 데이터 정의
  const [users, setUsers] = useState([
    { id: 1, name: '홍길동', point: 8500 },
    { id: 2, name: '김철수', point: 12000 },
    { id: 3, name: '이영희', point: 5500 }
  ])
  const [showGraph, setShowGraph] = useState(false)
  const [selectedId, setSelectedId] = useState('1')
  const [pointType, setPointType] = useState('add')
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')
  const [history, setHistory] = useState([]) // 🆕 포인트 변경 이력 상태값 추가

  // 2. 로그인 정보 및 권한 체크
  const isLogin = localStorage.getItem('isLogin')
  const role = localStorage.getItem('role')

  if (isLogin !== 'true' || role !== 'admin') {
    return <Navigate to="/" replace />
  }

  // 3. 그래프 기준 최댓값 계산
  const points = users.map((user) => user.point)
  const maxPoint = Math.max(Math.max.apply(null, points), 1)

  // 4. 포인트 연산 및 이력 생성 함수
  const handlePointUpdate = () => {
    const pointValue = Number(amount)
    const userId = Number(selectedId)

    if (amount === '' || pointValue <= 0) {
      setMessage('1 이상의 포인트를 입력하세요.')
      return
    }

    const selectedUser = users.find((user) => user.id === userId)
    if (!selectedUser) {
      setMessage('사용자를 찾을 수 없습니다.')
      return
    }

    if (pointType === 'subtract' && pointValue > selectedUser.point) {
      setMessage('현재 보유 포인트보다 많이 차감할 수 없습니다.')
      return
    }

    // 포인트 분기 처리 및 변경 반영
    const updatedUsers = users.map((user) => {
      if (user.id !== userId) return user
      
      let newPoint
      if (pointType === 'add') {
        newPoint = user.point + pointValue
      } else {
        newPoint = user.point - pointValue
      }
      return Object.assign({}, user, { point: newPoint })
    })
    setUsers(updatedUsers)

    // 🆕 새로운 변경 이력 객체 생성 및 배열 결합
    const newHistory = {
      id: Date.now(),
      name: selectedUser.name,
      type: pointType,
      point: pointValue
    }
    const updatedHistory = [newHistory].concat(history)
    setHistory(updatedHistory)

    setMessage('포인트가 정상적으로 반영되었습니다.')
    setAmount('')
  }

  // 5. 로그아웃 함수
  const handleLogout = () => {
    localStorage.removeItem('isLogin')
    localStorage.removeItem('role')
    navigate('/')
  }

  // 6. 화면 출력 (조립된 컴포넌트 렌더링)
  return (
    <main className="admin-page">
      <h1>관리자 포인트 관리</h1>

      {/* 포인트 지급 / 차감 입력 영역 */}
      <PointForm 
        users={users} 
        selectedId={selectedId}
        setSelectedId={setSelectedId} 
        pointType={pointType}
        setPointType={setPointType} 
        amount={amount}
        setAmount={setAmount} 
        message={message}
        handlePointUpdate={handlePointUpdate}
      />

      {/* 사용자 목록 영역 */}
      <UserList users={users} />

      {/* 버튼 영역 */}
      <div className="button-area">
        <button onClick={() => setShowGraph(!showGraph)}>
          {showGraph ? '그래프 닫기' : '그래프 보기'}
        </button>
        <button onClick={handleLogout}>로그아웃</button>
      </div>

      {/* 조건부 그래프 표시 */}
      {showGraph && <PointGraph users={users} maxPoint={maxPoint} />}

      {/* 포인트 변경 이력 영역 */}
      <PointHistory history={history} />
    </main>
  )
}

export default App
