export default function PostList({ posts, onDelete, onEdit }) {
  return (
    <div>
      {posts.map(post => (
        <div key={post.id} style={{ border: '1px solid #ccc', margin: '1rem 0', padding: '1rem' }}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <button onClick={() => onEdit(post)} style={{ marginLeft: '1rem' }}>Edit</button>
          <button onClick={() => onDelete(post.id)} style={{ marginLeft: '1rem' }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}
