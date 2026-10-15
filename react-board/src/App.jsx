import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')

    .then((response) => response.json())
    .then((data) => {
      setPosts(data)
      setLoading(false)})

    }, [])

    if (loading) {
      return (
        <main className = "page">
          <p>불러오는 중...</p>
        </main>
      )
    }

    const fileteredPosts = posts.filter((post) =>
      post.title
        .toLowerCase()
        .includes(search.toLowerCase())
      )

  // 5. 데이터 로딩이 끝난 후 보여줄 화면
  return (
    <main className="page">
      <h1>React 게시판</h1>
      {/* 게시글 검색 영역 */}
      <div className="search-area">
        <input 
          type="text" 
          placeholder="게시글 제목 검색" 
          value={search}
          // 입력할 때마다 search 값 변경
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {/* 검색된 게시글 개수 */}
      <p className="search-count">
        검색 결과 : { ' ' } {filteredPosts.length}개
      </p>

      {/* filteredPosts.map() 사용 */}
      {filteredPosts.map((post) => (
        <article
          // 검색어가 있으면 게시글을 크게 보여줌
          className={search !== ''
            ? 'post-card post-card-search'
            : 'post-card'
          }
          // 게시글을 구분하기 위한 값
          key={post.id}
        >
          {/* 게시글 번호 */}
          <span className="post-number">
            게시글 #{post.id}
          </span>
          {/* 게시글 제목 */}
          <h2>{post.title}</h2>
          {/* 게시글 내용 */}
          <p>{post.body}</p>
        </article>
      ))}
      {/* 검색 결과가 없을 경우 */}
      {filteredPosts.length === 0 && (
        <p className="no-result">
          검색 결과가 없습니다.
        </p>
      )}
    </main>
  )
  }

  export default App