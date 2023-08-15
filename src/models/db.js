require('dotenv').config()
const knex = require('knex')
const knexfile = require('.knexfile')

if (process.env.NODE_ENV == 'development') {
    const db = knex(knexfile.development)
} else if (process.env.NODE_ENV == 'production'){
    const db = knex(knexfile.production)
}






module.exports = db