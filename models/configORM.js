const Sequelize = require('sequelize');
const sequelize = new Sequelize('todo', 'todolist', '12341234qs', {
  dialect: 'postgres',
  host: 'localhost',
  define: {
    timestamps: false
  }
});

module.exports = sequelize;