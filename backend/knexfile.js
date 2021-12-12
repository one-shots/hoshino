const { DATABASE_URL } = require('./config')

module.exports = {
  client: 'postgresql',
  connection: {
    connectionString: DATABASE_URL,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
  pool: {
    min: 2,
    max: 10,
  },
  seeds: {
    directory: './seeds',
  },
}
