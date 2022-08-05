import knex from 'knex'

const configMariaDB = {
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      port: 3306,
      password : '',
      database : 'ecommerce'
    },
    pool: { min: 0, max: 7 }
  }
  

const dbMariadb = knex(configMariaDB)

export default dbMariadb 