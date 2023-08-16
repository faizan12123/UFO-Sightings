require('dotenv').config({path: '../../.env'});
// console.log(process.env.PGHOSTDEV + process.env.PGPORTDEV + process.env.PGDATABASEDEV + process.env.PGUSERDEV + process.env.PGPASSWORDDEV)

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      
      database: process.env.PGDATABASEDEV,

      user: process.env.PGUSERDEV,
      password: process.env.PGPASSWORDDEV,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './seeds/'
    }
  },
  production: {
    client: 'postgresql',
    connection: {
      
      database: process.env.PGDATABASEPROD,

      user: process.env.PGUSERPROD,
      password: process.env.PGPASSWORDPROD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};