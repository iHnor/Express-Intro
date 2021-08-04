const express = require('express')
const router = express.Router();

const task = require('./tasks')

router
  .use('/tasks', task)
//   .use('/meetups', meetups)

module.exports = router
