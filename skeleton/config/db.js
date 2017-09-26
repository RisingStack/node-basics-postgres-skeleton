'use strict'
const joi = require('joi')

const localPgUri = `postgres://${process.env.PG_USER || process.env.USER}:` +
  `${process.env.PG_PASSWORD}@localhost:5432/${process.env.PG_DATABASE || 'training-skeleton'}`

const schema = joi.object({
  PG_URI: joi.uri({scheme: 'postgres'})
}).unknown().required()

const { error, envVars } = joi.validate(process.env, schema)
if (error) {
  throw new Error('Config validation error:', error.message)
}

module.exports = {
  uri: envVars.PG_URI || localPgUri
}
