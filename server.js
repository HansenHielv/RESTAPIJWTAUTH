require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
app.use(express.json())

const data = [{
    username: 'Hansen',
    email: 'hansennaristo27@gmail.com',
    no_hp: '0812-8588-1010',
    umur: '24',
    lulusan: 'S1'
}
,{
    username: 'Aristo',
    email: 'hansenaristo27@gmail.com',
    no_hp: '0812-8588-1010',
    umur: '24',
    lulusan: 'S1'
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