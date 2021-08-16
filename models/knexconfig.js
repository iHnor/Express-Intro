const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'todo',
        password: '12341234qs',
        database: 'todolist'
    }
  });

  module.exports = knex;