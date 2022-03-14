"use strict"

const express = require('express')
let router = express.Router()

const db = require('../db')

router.get('/event_id/:id', (req, res) => {
    const correctId = db.session.code == req.params.id

    return res.json({ ok: true, access: correctId })
})

module.exports = router