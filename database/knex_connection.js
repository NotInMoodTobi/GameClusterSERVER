// PRAGMA foreign_keys = ON;

const knex = require('knex');

const dbConnection = knex({
    client: 'sqlite3',
    connection: {
        filename: 'database.sqlite3'
    }
})

module.exports = dbConnection;