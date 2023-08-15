require('dotenv').config({path: '../../../.env'});

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports[process.env.NODE_ENV] = {

    client: 'postgresql',
    connection: {
      host:process.env.PGHOST,
      port: process.env.PGPORT,
      database: process.env.PGDATABASE,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }

}

