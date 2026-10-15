function PostItem({post}) {
    return (
        <articel className = "post-card">
            {}
            <h2>{post.title}</h2>
            {}
            <p>{post.body}</p>
        </articel>
    )
}

export default PostItem