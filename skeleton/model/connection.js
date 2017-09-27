'use strict'
const config = require('../config/index')
const createKnex = require('knex')

const knex = createKnex(config.db)

module.exports = knex
