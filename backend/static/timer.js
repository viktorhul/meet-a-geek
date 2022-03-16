"use strict"

const db = require('../db')
const { unreadyParticipants } = require('./participants')

let timer = null;

function start() {
    // Make sure the session isn't already active
    if (db.session.active == true) {
        console.log('db.session.active == true')
        return false
    }

    // Make sure everyone is assigned a table
    const unassigned = db.users.filter(u => u.active).filter(u => u.table == null).length
    if (unassigned > 0) {
        console.log('unassigned > 0')
        return false
    }

    // Prevent starting more sessions than possible
    if (db.session.current == db.session.max) {
        console.log('db.session.current == db.session.max')
        return false
    }
    if (db.session.completed) {
        db.session.current++
        db.session.completed = false
    }

    db.session.active = true

    let time = {
        minutes: 10,
        seconds: 0
    };

    timer = setInterval(() => {
        if (time.seconds-- == 0) {
            time.seconds = 59
            time.minutes--
        }

        if (time.minutes == 0 && time.seconds == 0) {
            clearInterval(timer)
            db.session.active = false
            db.session.completed = true
            //clearTables() // users leave tables when done with geek review instead
            unreadyParticipants()
        }

        db.session.time = time

    }, 20)

    return true
}

function isRunning() {
    return timer != null;
}

module.exports = {
    start,
    isRunning
}