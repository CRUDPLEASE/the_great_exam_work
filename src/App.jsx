import { useEffect, useState } from 'react'
import Login from './components/Login'
import Register from './components/Register'
import PostForm from './components/PostForm'
import PostList from './components/PostList'

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [posts, setPosts] = useState([])
  const [editingPost, setEditingPost] = useState(null)

  useEffect(() => {
    if (token) {
      fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
        .then(res => res.json())
        .then(setPosts)
    }
  }, [token])

  const addPost = async (post) => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    })
    const newPost = await res.json()
    setPosts([newPost, ...posts])
  }

  const deletePost = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    })
    setPosts(posts.filter(p => p.id !== id))
  }

  const updatePost = async (updatedPost) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${updatedPost.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPost),
    })
    setPosts(posts.map(p => (p.id === updatedPost.id ? updatedPost : p)))
    setEditingPost(null)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  if (!token) {
    return (
      <div style={{ padding: '2rem' }}>
        <h1>Login or Register</h1>
        <Login onLogin={setToken} />
        <hr />
        <Register />
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Exam crud thingy</h1>
        <button onClick={handleLogout} style={{ padding: '0.5rem 1rem' }}>Logout</button>
      </div>
      <PostForm onSubmit={editingPost ? updatePost : addPost} editingPost={editingPost} />
      <PostList posts={posts} onDelete={deletePost} onEdit={setEditingPost} />
    </div>
  )
}
