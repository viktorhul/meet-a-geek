const express = require('express')
const app = express()
const cors = require('cors')
const fetch = require('node-fetch')

app.use(cors())
app.use(express.json())

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const maxParticipants = 20

let tempUsers = []

let users = [
    {
        username: 'bigboy',
        fullname: 'Bengt Bauhaus',
        password: 'bigboy',
        gender: 'male',
        language: 'c',
        wow: 2,
        participant: true,
        picture: 'https://www.barncancerfonden.se/contentassets/7d3f1c95a98247b5b52eb708c1fad03c/bauhus-720x405.png',
        location: 'Moms basement'
    }
]

let languages = ['c', 'java', 'english']
let wow = [1, 2, 3, 4]

async function fetchUser(gender, num) {
    await fetch(`https://randomuser.me/api/?gender=${gender}&results=${num}`)
        .then(res => res.json())
        .then(data => {
            data['results'].forEach(p => {
                const person = {
                    fullname: p.name.first + ' ' + p.name.last,
                    username: p.email,
                    gender: p.gender,
                    language: languages[Math.floor(Math.random() * languages.length)],
                    wow: wow[Math.floor(Math.random() * wow.length)],
                    participant: true,
                    picture: p.picture.large,
                    location: p.location.city + ', ' + p.location.country
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

    const newUser = {
        username: user.username,
        password: user.password,
        language: user.language,
        wow: user.wow
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

app.listen(3000, () => {
    console.log('Listening on port 3000...')
})