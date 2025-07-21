import { useState } from 'react'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    const res = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()
    setMessage(data.message)
  }

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      <br />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      <br />
      <button type="submit">Register</button>
      <p>{message}</p>
    </form>
  )
}
