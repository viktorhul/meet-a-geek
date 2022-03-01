const express = require('express')
const app = express()
const cors = require('cors')
const fetch = require('node-fetch')

app.use(cors())
app.use(express.json())

let users = [
    {
        username: 'bigboy',
        password: 'bigboy',
        gender: 'male',
        language: 'c',
        wow: 2,
        participant: true,
        picture: 'https://www.barncancerfonden.se/contentassets/7d3f1c95a98247b5b52eb708c1fad03c/bauhus-720x405.png'
    }
]

let languages = ['c', 'java', 'english']
let wow = [1, 2, 3, 4]

function fetchUser(gender, num) {
    fetch(`https://randomuser.me/api/?gender=${gender}&results=${num}`)
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
                    picture: p.picture.large
                }
                users.push(person)
            })
        })
}

function addUsers(males, females) {
    fetchUser('male', males)
    fetchUser('female', females)
}

app.post('/login', (req, res) => {
    const { username, password } = req.body
    const foundUser = users.find(entry => entry.username === username);

    if (!foundUser || password !== foundUser.password) {
        res.json({ access: false })
    } else {
        res.json({ access: true })
        if (users.length != 20) {
            const [males, females] = (foundUser.gender === 'male') ? [9, 10] : [10, 9];
            addUsers(males, females)
        }
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

app.listen(3000, () => {
    console.log('Listening on port 3000...')
    setInterval(() => {
        console.log(users.length)
    }, 1000)
})