#!/usr/bin/env node
const bole = require('bole')

bole.output({
  level: 'info',
  stream: process.stdout
})

require('../index')()
