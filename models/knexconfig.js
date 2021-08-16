const knex = require('knex')({
    client: 'pg',
    connection: {
        host : 'localhost',
        user: 'todolist',
        password: '12341234qs',
        database: 'todo'
    }
  });

  module.exports = knex;