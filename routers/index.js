const express = require('express')
const router = express.Router();

const task = require('./lists')

router
  .use('/lists', task)
//   .use('/meetups', meetups)

module.exports = router
