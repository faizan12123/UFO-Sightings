require('dotenv').config({path: '../../.env'});
const knex = require('knex');
const knexfile = require('./knexfile');

let db
if (process.env.NODE_ENV === 'production') {
    db = knex(knexfile.production);
} else {
    db = knex(knexfile.development);
}

module.exports = db;