import { useEffect, useState } from 'react'
import './App.css'

export default function App() {
  const [posts, setPosts] = useState([])       // 게시글 목록 저장
  const [loading, setLoading] = useState(true) // 데이터 로딩 상태
  const [search, setSearch] = useState('')     // 검색어 저장

  useEffect(() => {
    // 💡 인터넷 서버(fetch) 대신 컴퓨터 내부에 가짜 데이터를 직접 심어줍니다.
    // 이렇게 하면 네트워크 차단과 상관없이 무조건 화면이 켜집니다!
    const mockData = [
      {
        id: 1,
        title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      },
      {
        id: 2,
        title: "qui est esse",
        body: "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis\nvoluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla"
      },
      {
        id: 3,
        title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
        body: "et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad voluptatem doloribus vel accusantium\nquis pariatur molestiae porro eius odio et labore et velit aut"
      }
    ];

    setPosts(mockData); // 데이터를 즉시 저장
    setLoading(false);  // 로딩 상태 즉시 완료 처리
  }, [])

  // 실시간 검색어 필터링 로직 (23p)
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <main className="page">
        <p>불러오는 중...</p>
      </main>
    )
  }

  return (
    <main className="page">
      <h1>React 게시판</h1>

      {/* 24p: 게시글 검색 입력창 */}
      <div className="search-area">
        <input 
          type="text" 
          placeholder="게시글 제목 검색" 
          value={search}
          onChange={(e) => setSearch(e.target.value)} // 글자 입력 시 search 값 변경
        />
      </div>

      {/* 24p: 검색 결과 개수 */}
      <p className="search-count">
        검색 결과 : { ' ' } {filteredPosts.length}개
      </p>

      {/* 24p: 필터링된 결과 반복 출력 */}
      {filteredPosts.map((post) => (
        <article
          key={post.id}
          // 25p: 검색어가 입력되면 강조 스타일(post-card-search) 적용
          className={search !== '' ? 'post-card post-card-search' : 'post-card'}
        >
          {/* 20p: 게시글 번호 표시 */}
          <span className="post-number">
            게시글 #{post.id}
          </span>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </article>
      ))}

      {/* 24p: 검색 결과가 없을 경우 예외 처리 */}
      {filteredPosts.length === 0 && (
        <p className="no-result">
          검색 결과가 없습니다.
        </p>
      )}
    </main>
  )
}
