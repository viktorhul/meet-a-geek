"use strict"

const db = require('../db')
const { meta, users, tables, session } = require('../db')
const setup = session.setups

function autoAssign() {
    const currentParticipants = users.length
    const maxParticipants = meta.maxParticipants

    // Check if event has empty seats - abort
    if (currentParticipants < maxParticipants) {
        console.log('currentParticipants < maxParticipants')
        return false
    }

    if (session.current == session.max && session.completed) {
        console.log('session.current == session.max && session.completed')
        return false
    }

    // Check if everyone is already assigned a table
    const unassigned = users.filter(u => u.active).filter(u => u.table == null).length
    if (unassigned == 0) {
        console.log('unassigned == 0')
        return false
    }

    const tableCount = db.tables.length

    let n = 0

    users.filter(u => u.active).filter(u => u.table == null).forEach(u => {

        let table

        console.log('n: ', n++)
        while (true) {
            const r = Math.floor(Math.random() * tableCount + 1)
            table = tables.find(t => t.id == r)

            if (table.seats < 2) break
        }
        u.table = table.id
        table.seats++
    })

    console.log(users.filter(u => u.active).map(u => u.table))

    return true
}

function unreadyParticipants() {
    users.filter(u => u.active).forEach(u => {
        u.ready = false
    })
}

// TODO: might be unused
function clearTables() {
    users.forEach(u => u.table = null)
    tables.forEach(t => t.seats = 0)
}

module.exports = {
    autoAssign,
    clearTables,
    unreadyParticipants
}