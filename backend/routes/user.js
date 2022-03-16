"use strict"

const express = require('express')
let router = express.Router()

const db = require('../db')
const { clearTables } = require('../static/participants')
const setup = db.session.setups

// Get data for specific user
router.get('/:id', (req, res) => {
    const userId = req.params.id;
    const user = db.users.find(u => u.id == userId)

    if (!user) return res.json({ ok: false })
    if (!user.active) return res.json({ ok: false })

    let partnerData = null
    if (user.table != null) {
        const partner = db.users.find(u => u.table == user.table && u.id != user.id)
        partnerData = (!partner) ? null : {
            id: partner.id,
            fullname: partner.fullname,
            picture: partner.picture,
            location: partner.location,
        }
    }


    const userInfo = {
        id: user.id,
        username: user.username,
        fullname: user.fullname,
        gender: user.gender,
        picture: user.picture,
        location: user.location,
        table: user.table,
        ready: user.ready,
        session: {
            participantCount: db.users.filter(u => u.active).filter(u => u.ready).length,
            active: db.session.active,
            completed: db.session.completed,
            current: db.session.current,
            max: db.session.max
        },
        partner: partnerData,
        time: {
            minutes: db.session.time.minutes,
            seconds: db.session.time.seconds
        }
    }

    return res.json({ ok: true, result: userInfo })
})

router.get('/geek-review/:userId/:rating', (req, res) => {
    const { userId, rating } = req.params
    const user = db.users.find(u => u.id == userId)

    if (!user) {
        return res.json({ ok: false })
    }

    const partner = db.users.find(u => u.table == user.table && u.id != user.id)
    if (!partner) {
        return res.json({ ok: false })
    }

    const userReviews = setup.filter(s => s.session == db.session.current).filter(s => s.p1 == userId).length

    if (userReviews != 0) return;

    const review = {
        session: db.session.current,
        p1: user.id,
        p2: partner.id,
        rating: rating
    }

    setup.push(review)

    user.ready = true

    const unreadyUsers = db.users.filter(u => u.active).filter(u => !u.ready).length

    if (!unreadyUsers) {
        db.session.startable = true
        clearTables()
    }

    console.log(`${user.id} wanna rate ${partner.id}. Will they share? ${rating}`)

    return res.json({ ok: true })
})

module.exports = router