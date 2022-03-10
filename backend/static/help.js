"use strict"

const { tables } = require("../db")

function createTables(num) {
    for (let i = 1; i <= num; i++) {
        const table = {
            id: i,
            seats: 0,
        }
        tables.push(table)
    }
}

function init() {
    createTables(10)
}

module.exports = {
    init
}