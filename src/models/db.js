require('dotenv').config({path: '../../.env'});
const knex = require('knex');
const knexfile = require('./knexfile');

if (process.env.NODE_ENV === 'production') {
    const db = knex(knexfile.production);
} else {
    const db = knex(knexfile.development);
}

module.exports = db;