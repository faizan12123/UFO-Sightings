require('dotenv').config({path: '../../.env'});

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: "postgres-dev",
      database: process.env.PGDATABASENAMEDEV,
      user: process.env.PGUSERDEV,
      password: process.env.PGPASSWORDDEV,
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
      host: "postgres-prod",
      database: process.env.PGDATABASENAMEPROD,
      user: process.env.PGUSERPROD,
      password: process.env.PGPASSWORDPROD,
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