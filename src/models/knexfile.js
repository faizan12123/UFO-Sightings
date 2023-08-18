require('dotenv').config({path: '../../.env'});
// console.log(process.env.PGHOSTDEV + process.env.PGPORTDEV + process.env.PGDATABASEDEV + process.env.PGUSERDEV + process.env.PGPASSWORDDEV)

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.PGHOSTDEV,
      database: process.env.PGDATABASEDEV,
      user: process.env.PGUSERDEV,
      password: process.env.PGPASSWORDDEV,
      port: process.env.PGPORTDEV,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
    seeds: {
      directory: './seeds/'
    }
  },
  production: {
    client: 'postgresql',
    connection: {
      host: process.env.PGHOSTPROD,
      database: process.env.PGDATABASEPROD,
      user: process.env.PGUSERPROD,
      password: process.env.PGPASSWORDPROD,
      port: process.env.PGPORTPROD
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  },
};