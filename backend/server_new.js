"use strict"

const express = require('express')
const app = express()
const cors = require('cors')
const fetch = require('node-fetch')

const db = require('./db')

const help = require('./static/help')
help.init()

const admin = require('./routes/admin')
const user = require('./routes/user')

app.use(cors())
app.use(express.json())

app.use('/admin', admin)
app.use('/user', user)

app.get('*', (req, res) => {
    return res.json({ ok: false })
})

app.listen(3000, () => {
    console.log('running')
})