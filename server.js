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

function authenticateToken(req, res, next){
    const authorizationHeader = req.headers['authorization']
    const token = authorizationHeader && authorizationHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}
app.listen(2708)