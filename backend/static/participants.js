"use strict"

const { meta, users, tables } = require('../db')

function autoAssign() {
    const currentParticipants = users.length
    const maxParticipants = meta.maxParticipants

    // Check if event has empty seats - abort
    if (currentParticipants < maxParticipants) {
        console.log(`NOTE, autoAssign(): currentParticipants (${currentParticipants}) < maxParticipants (${maxParticipants})`)
        return false
    }

    // Check if everyone is already assigned a table
    const unassigned = users.filter(u => u.table == null).length
    if (unassigned == 0) {
        console.log('NOTE, autoAssign(): unassigned == 0')
        return false
    }

    users.forEach(u => {
        if (u.table == null) {
            const table = tables.find(t => t.seats != 2)
            u.table = table.id
            table.seats++
        }
    })

    return true
}

function clearTables() {
    users.forEach(u => u.table = null)
    tables.forEach(t => t.seats = 0)
}

module.exports = {
    autoAssign,
    clearTables
}