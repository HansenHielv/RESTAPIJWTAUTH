require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
app.use(express.json())

const data = [{
    username: 'Hansen',
    title: 'Post 1'
}
,{
    username: 'Aristo',
    title: 'Post 2'
}]
app.get('/data', authenticateToken, (req,res) => {
    res.json(data.filter(post => post.username === req.user.name))
})

app.post('/login', (req, res) => {
    const username = req.body.username
    const user = { name: username }
    const accessToken = generateToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_SECRET_TOKEN)
    res.json({ accessToken: accessToken, refreshToken: refreshToken })
})

function generateToken(user){
    return jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, {expiresIn: '20s'})
}

app.listen(0897)