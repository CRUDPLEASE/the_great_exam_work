const express = ('express')
const cors = ('cors')
const bcrypt = ('bcrypt')
const jwt = ('jsonwebtoken')

const app = express()
const PORT = 5000
const SECRET = 'keyig'

const users = [] 

app.use(cors())
app.use(express.json())

app.post('/register', async (req, res) => {
  const { email, password } = req.body
  const existing = users.find(u => u.email === email)
  if (existing) return res.status(409).json({ message: 'User exists' })

  const hashed = await bcrypt.hash(password, 10)
  users.push({ email, password: hashed })
  res.json({ message: 'Registered' })
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = users.find(u => u.email === email)
  if (!user) return res.status(401).json({ message: 'Invalidated gmail' })

  const match = await bcrypt.compare(password, user.password)
  if (!match) return res.status(401).json({ message: 'No pass? :(' })

  const token = jwt.sign({ email: user.email }, SECRET, { expiresIn: '1h' })
  res.json({ message: 'Logged in', token })
})

app.get('/protected', (req, res) => {
  const auth = req.headers.authorization
  if (!auth) return res.sendStatus(401)

  const token = auth.split(' ')[1]
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403)
    res.json({ message: 'Your on', user: decoded })
  })
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
