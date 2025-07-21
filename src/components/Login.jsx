import { useState } from 'react'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    const res = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()
    if (data.token) {
      localStorage.setItem('token', data.token)
      onLogin && onLogin(data.token)
      setMessage('Logged innn')
    } else {
      setMessage(data.message || 'Logged NOT')
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      <br />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      <br />
      <button type="submit">Login</button>
      <p>{message}</p>
    </form>
  )
}
