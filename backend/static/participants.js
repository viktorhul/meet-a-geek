"use strict"

const db = require('../db')
const { meta, users, tables, session } = require('../db')
const setup = session.setups

function autoAssign() {
    const currentParticipants = users.length
    const maxParticipants = meta.maxParticipants

    // Check if event has empty seats - abort
    if (currentParticipants < maxParticipants) {
        return false
    }

    if (session.current == session.max && session.completed) {
        return false
    }

    // Check if everyone is already assigned a table
    const unassigned = users.filter(u => u.active).filter(u => u.table == null).length
    if (unassigned == 0) {
        return false
    }

    users.filter(u => u.active).forEach(u => {
        if (u.table == null) {
            const table = tables.find(t => t.seats != 2)
            if (table.seats == 1) {
                // TODO: Check if user has already met this person
            }

            // TODO: Make this a heterosexual dating page as required by the product OWNeR

            u.table = table.id
            table.seats++
        }
    })

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