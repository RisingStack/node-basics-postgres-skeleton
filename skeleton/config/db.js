'use strict'
const _ = require('lodash')
const joi = require('joi')
const parse = require('pg-connection-string').parse

const localPgUri = `postgres://${process.env.PG_USER || process.env.USER}:` +
  `${process.env.PG_PASSWORD}@localhost:5432/${process.env.PG_DATABASE || 'training-skeleton'}`

const schema = joi.object({
  PG_URI: joi.string().uri({scheme: 'postgres'})
}).unknown().required()

const { error, envVars } = joi.validate(process.env, schema)
if (error) {
  throw new Error('Config validation error:', error.message)
}

module.exports = {
  client: 'pg',
  connection: parse(_.get(envVars, 'PG_URI') || localPgUri)
}
