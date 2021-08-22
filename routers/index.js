const express = require('express')
const router = express.Router();

const list = require('./lists')
const task = require('./tasks')
const dashboard = require('./dashboard')
const collection = require('./collection')
const inputORM = require('./orm')

router
  .use('/lists', list)
  .use('/tasks', task)
  .use('/dashboard', dashboard)
  .use('/collection', collection)
  .use('/orm/lists/', inputORM);

  
module.exports = router
