"use strict"

const express = require('express')
let router = express.Router()

const db = require('../db')

router.get('/event_id/:id/:user', (req, res) => {
    const correctId = db.session.code == req.params.id

    if (correctId) {
        const user = db.users.find(u => u.id == req.params.user)

        if (user) {
            user.active = true
            user.ready = true
        }
    }

    return res.json({ ok: true, access: correctId })
})

router.post('/login', (req, res) => {
    const { username, password } = req.body
    const foundUser = db.users.find(entry => entry.username === username);

    if (!foundUser || password !== foundUser.password) {
        res.json({ access: false })
    } else {
        res.json({ access: true, id: foundUser.id })
    }
})

router.post('/create', (req, res) => {
    const user = req.body
    const foundUser = db.users.find(entry => entry.username === user.username)

    if (foundUser) {
        return res.json({ created: false, message: 'Username is taken' })
    }

    if (user.password.length == 0 || user.username.length == 0) {
        return res.json({ created: false, message: 'Username or password cannot be empty' })
    }

    let newId
    while (true) {
        newId = Math.floor(Math.random() * 10000)
        if (db.users.filter(u => u.id == newId).length == 0) break
    }

    const newUser = {
        id: newId,
        username: user.username,
        fullname: user.fullname,
        password: user.password,
        language: user.language,
        gender: (user.gender == 'male') ? 'male' : 'female',
        wow: user.wow,
        picture: db.meta.randomPictures[Math.floor(Math.random() * 4)],
        table: null
    }

    console.log(newUser.gender)

    db.users.push(newUser)

    return res.json({ created: true })
})

module.exports = router