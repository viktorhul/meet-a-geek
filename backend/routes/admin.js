"use strict"

const express = require('express')
let router = express.Router()

const db = require('../db')
const { start, isRunning } = require('../static/timer')
const fake = require('../static/fake')
const { autoAssign } = require('../static/participants')

// TODO: Might not be necessary
router.get('/', (req, res) => {
    const adminInfo = {
        session: db.session
    }
    return res.json({ ok: true, result: adminInfo })
})

// Start next session
router.get('/start_session', (req, res) => {
    if (!db.session.startable) return
    start() // start timer
    db.session.startable = false
    return res.json({ ok: true, active: isRunning() })
})

// Get session data (active users, session data etc)
router.get('/session_data', (req, res) => {
    const result = {
        users: db.users.filter(u => u.active).map(u => {
            return {
                id: u.id,
                fullname: u.fullname,
                gender: u.gender,
                picture: u.picture,
                location: u.location,
                table: u.table,
                ready: u.ready
            }
        }),
        tables: db.tables,
        session: {
            startable: db.session.startable,
            active: db.session.active,
            completed: db.session.completed,
            current: db.session.current,
            max: db.session.max
        },
        time: {
            minutes: db.session.time.minutes,
            seconds: db.session.time.seconds
        }
    }

    return res.json({ ok: true, result: result })
})

// Auto assign unassigned participants
router.get('/auto_assign', (req, res) => {
    return res.json({ ok: true, assigned: autoAssign() })
})

router.get('/auto_review', (req, res) => {
    return res.json({ ok: true, reviwed: fake.autoReview() })
})

// TODO: Not to be implemented in final product
router.get('/add_participants', (req, res) => {
    if (db.session.current == db.session.max) return;

    fake.addRemainingUsers()
    db.session.startable = true

    return res.json({ ok: true })
})

router.post('/update', (req, res) => {
    req.body.users.forEach(u => {
        if (u.table == null) return;

        db.users.forEach(s => {
            if (u.id == s.id) {
                if (s.table == u.table) return;

                const t1 = db.tables.find(t => t.id == s.table)
                const t2 = db.tables.find(t => t.id == u.table)

                if (t1) t1.seats--
                if (t2) t2.seats++

                s.table = u.table
            }
        })
    })
    return res.json({ ok: true })
})

// TODO: Dev only
router.get('/dev', (req, res) => {
    const users = db.users.map(u => u.table)
    const tables = db.tables.map(t => t.seats)
    //return res.send({ users, tables })



    return res.send(
        db.session.setups
    )

})

module.exports = router