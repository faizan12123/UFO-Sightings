require('dotenv').config({path: '../../../.env'});

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports= {

  development: {
    client: 'postgresql',
    connection: {
      host:process.env.PGHOSTDEV,
      port: process.env.PGPORTDEV,
      database: process.env.PGDATABASEDEV,
      user: process.env.PGUSERDEV,
      password: process.env.PGPASSWORDDEV,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
},

production: {
  client: 'postgresql',
  connection: {
    host:process.env.PGHOSTPROD,
    port: process.env.PGPORTPROD,
    database: process.env.PGDATABASEPROD,
    user: process.env.PGUSERPROD,
    password: process.env.PGPASSWORDPROD,
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }

}

}

