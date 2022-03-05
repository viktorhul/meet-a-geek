const express = require('express')
const app = express()
const cors = require('cors')
const fetch = require('node-fetch')

app.use(cors())
app.use(express.json())

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const maxParticipants = 20

const pictures = [
    'https://cdn.discordapp.com/attachments/932568365699051532/948939755712819220/unknown.png',
    'https://cdn.discordapp.com/attachments/932568365699051532/948659091406983238/unknown.png',
    'https://cdn.discordapp.com/attachments/932568365699051532/948579977333456918/unknown.png',
    'https://cdn.discordapp.com/attachments/932568365699051532/948550531763290132/unknown.png'
]

let tables = []
function createTables(num) {
    for (i = 0; i < num; i++) {
        const table = {
            id: i + 1,
            seats: 0
        }
        tables.push(table)
    }
}
createTables(10)

let tempUsers = []
let users = [
    {
        id: 0,
        username: 'bigboy',
        fullname: 'Bengt Bauhaus',
        password: 'bigboy',
        gender: 'male',
        language: 'c',
        wow: 2,
        participant: true,
        picture: 'https://cdn.discordapp.com/attachments/920273373240655912/948642479505281084/r5yt.png',
        location: 'Moms basement',
        table: null,
    }
]

let languages = ['c', 'java', 'english']
let wow = [1, 2, 3, 4]

async function fetchUser(gender, num) {
    await fetch(`https://randomuser.me/api/?gender=${gender}&results=${num}`)
        .then(res => res.json())
        .then(data => {
            let n = tempUsers.length + users.length;
            data['results'].forEach(p => {
                const person = {
                    id: n++,
                    fullname: p.name.first + ' ' + p.name.last,
                    username: p.email,
                    gender: p.gender,
                    language: languages[Math.floor(Math.random() * languages.length)],
                    wow: wow[Math.floor(Math.random() * wow.length)],
                    participant: true,
                    picture: p.picture.large,
                    location: p.location.city + ', ' + p.location.country,
                    table: null
                }
                tempUsers.push(person)
            })
        })
}

async function addUsers() {
    const males = (maxParticipants / 2) - users.filter(p => p.gender === 'male').length
    const females = (maxParticipants / 2) - users.filter(p => p.gender === 'female').length

    await fetchUser('male', males)
    await fetchUser('female', females)

    let n = tempUsers.length

    while (n-- > 0) {
        users.push(tempUsers[n])
        await delay(Math.random() * 1000)
    }
}

app.post('/login', (req, res) => {
    const { username, password } = req.body
    const foundUser = users.find(entry => entry.username === username);

    if (!foundUser || password !== foundUser.password) {
        res.json({ access: false })
    } else {
        res.json({ access: true })
    }
})

app.post('/create-account', (req, res) => {
    const user = req.body
    const foundUser = users.find(entry => entry.username === user.username)

    if (foundUser) {
        return res.json({ created: false, message: 'Username is taken' })
    }

    if (user.password.length == 0 || user.username.length == 0) {
        return res.json({ created: false, message: 'Username or password cannot be empty' })
    }

    const nextId = users.length + tempUsers.length

    const newUser = {
        id: nextId,
        username: user.username,
        fullname: user.fullname,
        password: user.password,
        language: user.language,
        wow: user.wow,
        picture: pictures[Math.floor(Math.random() * 4)],
        table: null
    }

    users.push(newUser)

    return res.json({ created: true })

})

app.get('/participants', (req, res) => {
    if (req.query.count != null) {
        res.json({
            ok: true,
            count: users.length
        })
    } else {
        res.json({
            ok: true,
            participants: users
        })
    }
})

let addedRemaining = false
app.post('/participants', (req, res) => {
    if (req.body.action == 'addRemaining' && !addedRemaining) {
        addedRemaining = true

        addUsers()

        res.json({ ok: true })
    }
})

function resetTimer() {
    adminResponse.sessionTime = { m: 10, s: 0 }
}

function startTimer() {
    if (adminResponse.activeSession == 3) return

    if (adminResponse.activeSession == 1 && adminResponse.sessionTime.m == 10) adminResponse.activeSession--
    adminResponse.activeSession++
    resetTimer()
    adminResponse.sessionStatus = 1

    sessionTimer = setInterval(() => {
        if (adminResponse.sessionTime.s-- == 0) {
            adminResponse.sessionTime.s = 59
            adminResponse.sessionTime.m--
        }

        if (adminResponse.sessionTime.m == 0 && adminResponse.sessionTime.s == 0) {
            clearInterval(sessionTimer)

            adminResponse.sessionStatus = (adminResponse.activeSession == 3) ? 1 : 0
        }
    }, 1) // TODO: Change to 1000 when done debugging
}

let adminResponse = {
    activeSession: 1,
    sessionStatus: 0,
    sessionTime: { m: 10, s: 0 },
    participants: users,
    tables: tables,
    kraken: false
}

app.get('/admin_fetch', (req, res) => {
    adminResponse.kraken = addedRemaining
    res.json({ ok: true, result: adminResponse })
})

app.get('/user_info', (req, res) => {
    const userId = req.query.id

    const user = users.find(u => u.id == userId)

    if (!user) {
        return res.json({ ok: false })
    } else {
        // TODO: Return table data and so on
        return res.json({
            ok: true, result: {
                session: adminResponse.activeSession,
                sessionTime: adminResponse.sessionTime,
                tableNumber: user.table,
            }
        })
    }
})

app.post('/admin', (req, res) => {
    switch (req.body.action) {
        case 'toggleTimer':
            if (adminResponse.sessionStatus == 0 && !(adminResponse.sessionTime.m == 0 && adminResponse.activeSession == 3)) {
                startTimer()
                return res.json({ ok: true })
            }
            break;

        case 'updateUsers':
            req.body.users.forEach(u => {
                if (u.table == null) return;

                users.forEach(s => {
                    if (u.id == s.id) {
                        s.table = u.table

                        const tableToChange = tables.find(t => t.id == s.table)
                        tableToChange.seats++
                    }
                })
            })
            return res.json({ ok: true })
            break;

        case 'autoAssign':
            if (users.length < 20) return;
            users.forEach(u => {
                if (u.table == null) {
                    const table = tables.find(t => t.seats != 2)
                    u.table = table.id
                    table.seats++
                }
            })
            break;
    }
})

app.listen(3000, () => {
    console.log('Listening on port 3000...')
})