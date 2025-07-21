import { useState, useEffect } from 'react'

export default function PostForm({ onSubmit, editingPost }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title)
      setBody(editingPost.body)
    } else {
      setTitle('')
      setBody('')
    }
  }, [editingPost])

  const handleSubmit = (e) => {
    e.preventDefault()
    const post = {
      title,
      body,
      userId: 1,
      ...(editingPost ? { id: editingPost.id } : {}),
    }
    onSubmit(post)
    setTitle('')
    setBody('')
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <br />
      <textarea
        placeholder="Body"
        value={body}
        onChange={e => setBody(e.target.value)}
        required
      />
      <br />
      <button type="submit">{editingPost ? 'Update' : 'Create'} Post</button>
    </form>
  )
}
