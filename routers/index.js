const express = require('express')
const router = express.Router();

const list = require('./lists')
const task = require('./tasks')

router 
  .use('/lists', list)
  .use('/tasks', task)

module.exports = router
