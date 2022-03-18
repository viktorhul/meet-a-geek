"use strict"
const fetch = require('node-fetch')

const db = require('../db')
const { clearTables } = require('./participants')

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

// Buffer for created users to simulate loading effect
let tempUsers = []

async function createFakeUsers(gender, amount) {
    const languages = ['c', 'java', 'english']
    const wow = [1, 2, 3, 4]

    await fetch(`https://randomuser.me/api/?gender=${gender}&results=${amount}`)
        .then(res => res.json())
        .then(data => {
            data['results'].forEach(p => {
                // Create a unique ID and compare to registered user IDs 
                let newId
                while (true) {
                    newId = Math.floor(Math.random() * 1000000)
                    if (db.users.filter(u => u.id == newId).length == 0) break
                }
                //console.log(`Created a user with id ${newId}`)

                const person = {
                    id: newId,
                    fullname: p.name.first + ' ' + p.name.last,
                    username: p.email,
                    gender: p.gender,
                    language: languages[Math.floor(Math.random() * languages.length)],
                    wow: wow[Math.floor(Math.random() * wow.length)],
                    participant: true,
                    picture: p.picture.large,
                    location: p.location.city + ', ' + p.location.country,
                    table: null,
                    active: true,
                    ready: true
                }
                tempUsers.push(person)
            })
        })
}

// Add remaining seats with fake users
async function addRemainingUsers() {
    const maxParticipants = db.meta.maxParticipants

    if (db.users.length == maxParticipants) return false

    const currentMales = db.users.filter(p => p.gender === 'male' && p.active).length
    const currentFemales = db.users.filter(p => p.gender === 'female' && p.active).length

    const males = (maxParticipants / 2) - currentMales
    const females = (maxParticipants / 2) - currentFemales

    await createFakeUsers('male', males)
    await createFakeUsers('female', females)

    let n = tempUsers.length
    while (n-- > 0) {
        db.users.push(tempUsers[n])
        await delay(Math.random() * 1000)
    }

    return true
}

function autoReview() {
    db.users.filter(u => u.active).forEach(u => {
        if (!u.ready) {
            // user has not rated yet

            const partner = db.users.find(p => p.table == u.table && p.id != u.id)

            const res = {
                p1: u.id,
                p2: partner.id,
                rating: Math.floor(Math.random() * 2)
            }
            db.session.setups.push(res)
            u.ready = true

            const unreadyUsers = db.users.filter(u => u.active).filter(u => !u.ready).length

            if (!unreadyUsers) {
                db.session.startable = true
                clearTables()
            }
        }
    })

    return true
}

module.exports = {
    addRemainingUsers,
    autoReview
}